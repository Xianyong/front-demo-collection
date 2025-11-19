<template>
  <div class="table-container">
    <el-card class="search-card">
      <template #header>
        <div class="search-header">
          <h2>商品列表</h2>
          <div class="search-actions">
            <el-input
              v-model="searchQuery"
              placeholder="请输入商品名称..."
              style="width: 300px; margin-right: 15px;"
              clearable
              @keyup.enter="handleQuery"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-button type="primary" @click="handleQuery" :loading="loading">
              <el-icon><Search /></el-icon>
              查询
            </el-button>
            <el-button type="success" @click="handleCreate">
              <el-icon><Plus /></el-icon>
              新增商品
            </el-button>
          </div>
        </div>
      </template>

      <el-table
        :data="filteredGoodsList"
        v-loading="loading"
        element-loading-text="加载中..."
        style="width: 98%"
        
      >
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="name" label="商品名称" min-width="200" />
        <el-table-column prop="category" label="分类" width="120" />
        <el-table-column prop="madeAddress" label="产地" width="150" />
        <el-table-column prop="price" label="价格" width="100" align="right">
          <template #default="scope">
            ¥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="orderCount" label="订单数" width="100" align="center" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="totalItems"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- Create/Edit Dialog -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        :model="currentGoods"
        :rules="formRules"
        ref="formRef"
        label-width="100px"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="currentGoods.name" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-input v-model="currentGoods.category" />
        </el-form-item>
        <el-form-item label="产地" prop="madeAddress">
          <el-input v-model="currentGoods.madeAddress" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number
            v-model="currentGoods.price"
            :precision="2"
            :step="0.1"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="订单数" prop="orderCount">
          <el-input-number
            v-model="currentGoods.orderCount"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- Delete Confirmation Dialog -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="确认删除"
      width="400px"
      center
      :modal="true"
      :lock-scroll="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="text-align: center; padding: 20px 0;">
        <el-icon style="font-size: 40px; color: #F56C6C; margin-bottom: 15px;">
          <Warning />
        </el-icon>
        <p v-if="itemToDelete">确定要删除商品 "{{ itemToDelete.name }}" 吗？</p>
      </div>
      <template #footer>
        <div style="text-align: center;">
          <el-button @click="cancelDelete">取消</el-button>
          <el-button type="danger" @click="confirmDelete">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { Search, Plus,Warning } from '@element-plus/icons-vue'
  import GoodsAPI, { GoodsVO } from '@/api/goods.api'

  // Reactive data
  const goodsList = ref<GoodsVO[]>([])
  const loading = ref(false)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const pageSize = ref(10)
  const totalItems = ref(0)

  // Form related
  const dialogVisible = ref(false)
  const dialogTitle = ref('')
  const isEdit = ref(false)
  const formRef = ref()
  const currentGoods = reactive({
    id: undefined,
    name: '',
    category: '',
    madeAddress: '',
    price: 0,
    orderCount: 0
  })

  // Add these to your existing reactive variables
  const deleteDialogVisible = ref(false)
  const itemToDelete = ref<GoodsVO | null>(null)

  // Form validation rules
  const formRules = {
    name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
    category: [{ required: true, message: '请输入分类', trigger: 'blur' }],
    madeAddress: [{ required: true, message: '请输入产地', trigger: 'blur' }],
    price: [{ required: true, message: '请输入价格', trigger: 'change' }],
    orderCount: [{ required: true, message: '请输入订单数', trigger: 'change' }]
  }

const filteredGoodsList = computed(() => {
  let result = goodsList.value
  
  // Apply search filter if query exists
  if (searchQuery.value) {
    result = result.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // Update totalItems to reflect filtered count
  totalItems.value = result.length
  
  // Apply pagination
  return result.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
})
function handleQuery() {
  loading.value = true
  GoodsAPI.getList(null)
    .then((data) => {
      goodsList.value = data
      // Update this line to properly handle filtered items count
      totalItems.value = data.length
      ElMessage.success('数据加载成功')
    })
    .catch((error) => {
      console.error('Failed to fetch goods list:', error)
      ElMessage.error('数据加载失败')
    })
    .finally(() => {
      loading.value = false
    })
}

  function handleCreate() {
    dialogTitle.value = '新增商品'
    isEdit.value = false
    Object.assign(currentGoods, {
      id: undefined,
      name: '',
      category: '',
      madeAddress: '',
      price: 0,
      orderCount: 0
    })
    dialogVisible.value = true
  }

  function handleEdit(row: GoodsVO) {
    dialogTitle.value = '编辑商品'
    isEdit.value = true
    Object.assign(currentGoods, row)
    dialogVisible.value = true
  }

  function handleDelete(row: GoodsVO) {
    itemToDelete.value = row
    deleteDialogVisible.value = true
  }

  function confirmDelete() {
    if (itemToDelete.value) {
      const index = goodsList.value.findIndex(item => item.id === itemToDelete.value!.id)
      if (index > -1) {
        goodsList.value.splice(index, 1)
        ElMessage.success('删除成功')
      }
      deleteDialogVisible.value = false
      itemToDelete.value = null
    }
  }

  function cancelDelete() {
    deleteDialogVisible.value = false
    itemToDelete.value = null
    ElMessage.info('已取消删除')
  }

  function submitForm() {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        if (isEdit.value) {
          // Update existing item
          const index = goodsList.value.findIndex(item => item.id === currentGoods.id)
          if (index > -1) {
            goodsList.value[index] = { ...currentGoods }
            ElMessage.success('更新成功')
          }
        } else {
          // Add new item
          const newItem = {
            ...currentGoods,
            id: Date.now().toString() // Generate a temporary ID
          }
          goodsList.value.unshift(newItem)
          ElMessage.success('添加成功')
        }
        dialogVisible.value = false
      }
    })
  }

  function handleDialogClose() {
    formRef.value.resetFields()
  }

  function handleSizeChange(val: number) {
    pageSize.value = val
    currentPage.value = 1
  }

  function handleCurrentChange(val: number) {
    currentPage.value = val
  }

  onMounted(() => {
    handleQuery()
  })
</script>

<style scoped>
.table-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.search-card {
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.search-header h2 {
  margin: 0;
  color: #303133;
}

.search-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Table header styling - black color and bold */
:deep(.el-table th.el-table__cell) {
  color: #000000 !important;
  font-weight: bold !important;
  background-color: #f5f7fa !important;
}


</style>