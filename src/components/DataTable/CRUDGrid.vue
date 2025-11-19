<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: Array,
  columns: Array,
  filterKey: String
})

const emit = defineEmits(['add', 'edit', 'delete'])

const sortKey = ref('')
const sortOrders = ref(
  props.columns.reduce((o, key) => ((o[key] = 1), o), {})
)

// For CRUD operations
const editingItem = ref(null)
const isAdding = ref(false)
const showModal = ref(false)
const formData = ref({})

const filteredData = computed(() => {
  let { data, filterKey } = props
  if (filterKey) {
    filterKey = filterKey.toLowerCase()
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
      })
    })
  }
  const key = sortKey.value
  if (key) {
    const order = sortOrders.value[key]
    data = data.slice().sort((a, b) => {
      a = a[key]
      b = b[key]
      return (a === b ? 0 : a > b ? 1 : -1) * order
    })
  }
  return data
})

function sortBy(key) {
  sortKey.value = key
  sortOrders.value[key] *= -1
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// CRUD Functions
function handleAdd() {
  isAdding.value = true
  editingItem.value = null
  formData.value = {}
  showModal.value = true
}

function handleEdit(item) {
  isAdding.value = false
  editingItem.value = item
  formData.value = { ...item }
  showModal.value = true
}

function handleDelete(item) {
  if (confirm(`Are you sure you want to delete ${item.name || 'this item'}?`)) {
    emit('delete', item)
  }
}

function saveItem() {
  if (isAdding.value) {
    emit('add', formData.value)
  } else {
    emit('edit', { original: editingItem.value, updated: formData.value })
  }
  closeModal()
}

function closeModal() {
  showModal.value = false
  editingItem.value = null
  formData.value = {}
}
</script>

<template>
  <div>
    <div style="margin-bottom: 15px;">
      <button @click="handleAdd" style="background-color: #42b983; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
        Add New Item
      </button>
    </div>
    
    <table v-if="filteredData.length">
      <thead>
        <tr>
          <th v-for="key in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }">
            {{ capitalize(key) }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredData" :key="entry.id || entry.name">
          <td v-for="key in columns">
            {{entry[key]}}
          </td>
          <td>
            <button @click="handleEdit(entry)" style="margin-right: 5px; background-color: #409eff; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer;">Edit</button>
            <button @click="handleDelete(entry)" style="background-color: #f56c6c; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer;">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No matches found.</p>
    
    <!-- Modal for Add/Edit -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>{{ isAdding ? 'Add New Item' : 'Edit Item' }}</h3>
        <form @submit.prevent="saveItem">
          <div v-for="key in columns" :key="key" class="form-group">
            <label>{{ capitalize(key) }}:</label>
            <input 
              v-model="formData[key]" 
              :type="typeof formData[key] === 'number' ? 'number' : 'text'"
              class="form-control"
            >
          </div>
          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
            <button type="submit" class="btn-save">{{ isAdding ? 'Add' : 'Update' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
  text-align: left;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 90%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-actions {
  text-align: right;
  margin-top: 20px;
}

.btn-cancel {
  background-color: #909399;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-save {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>