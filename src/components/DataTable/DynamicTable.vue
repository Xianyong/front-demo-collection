
<script setup lang="ts">
  import DemoGrid from './Grid.vue'
  import GoodsAPI, { GoodsVO } from '@/api/goods.api';
  import { setAccessToken } from '@/utils/auth';
  import { onMounted, ref } from 'vue'

  const goodsList = ref<GoodsVO[]>();
  const loading = ref(false)
  const searchQuery = ref('')
  const gridColumns = ['name', 'category', 'madeAddress', 'price', 'orderCount']
  const gridData = ref([])

  setAccessToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImRlcHRJZCI6MSwiZGF0YVNjb3BlIjoxLCJ0b2tlblR5cGUiOmZhbHNlLCJleHAiOjE3NjM1NjY1NDcsInVzZXJJZCI6MiwiaWF0IjoxNzYzNTU5MzQ3LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sImp0aSI6IjQ4YjljZjZjM2QxNDQ4MWM5YjU5YTE0MzU4ZTIyYzQwIn0.SPKM6gU1r3bdEIZZw5z-xAPlKkDZzeBi3iOrwvK8--E');

  // Query department
  function handleQuery() {
    loading.value = true;
    GoodsAPI.getList(null).then((data) => {
      goodsList.value = data;
      // console.log(data);
      gridData.value = data;
    }).catch((error) => {
      // Handle error appropriately, e.g., show notification or log error
      console.error('Failed to fetch goods list:', error);
    }).finally(() => {
      loading.value = false;
    });
  }

  onMounted(() => {
    // console.log("DynamicTable mounted");
    handleQuery();
  });

</script>

<template>
  <div class="table-container">
    <div class="search-header">
      <h2>商品列表：</h2>
      <div class="search-box">
        <label for="search-query">Search goods:</label>
        <input 
          id="search-query"
          v-model="searchQuery" 
          placeholder="Enter a name..."
          class="search-input"
        >
      </div>
    </div>
    
    <DemoGrid
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery"
      class="demo-grid-wrapper"
    />
    
  </div>

</template>

<style scoped>
.table-container {
  max-width: 90%;
  margin: 2rem auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-header h2 {
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 600;
}

.search-box {
  display: flex;
  flex-direction: column;
  min-width: 200px;
}

.search-box label {
  color: #f0f0f0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
}

.search-input {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.demo-grid-wrapper {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
  .table-container {
    margin: 1rem;
    padding: 1rem;
  }
  
  .search-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
  }
}
</style>