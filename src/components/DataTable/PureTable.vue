<!-- src/components/DataTable/PureTable.vue -->
<script setup>
import DemoGrid from './Grid.vue'
import { ref } from 'vue'

const searchQuery = ref('')
const gridColumns = ['name', 'power']
const gridData = [
  { name: 'Chuck Norris', power: Infinity },
  { name: 'Bruce Lee', power: 9000 },
  { name: 'Jackie Chan', power: 7000 },
  { name: 'Jet Li', power: 8000 }
]
</script>

<template>
  <div class="table-container">
    <div class="search-header">
      <h2>Hero Power Rankings</h2>
      <div class="search-box">
        <label for="search-query">Search Heroes:</label>
        <input 
          id="search-query"
          v-model="searchQuery" 
          placeholder="Enter hero name..."
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
  max-width: 800px;
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