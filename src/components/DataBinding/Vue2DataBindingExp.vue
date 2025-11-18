<template>
  <div class="product-selector">
    <h3>购物表单</h3>
    
    <!-- Product selection dropdown -->
    <div class="form-group">
      <label for="product-select">选择商品:</label>
      <select id="product-select" v-model="selectedProduct" @change="onProductChange">
        <option value="" disabled>Select a product</option>
        <option 
          v-for="product in products" 
          :key="product.id" 
          :value="product"
        >
          {{ product.name }} - ${{ product.price }}
        </option>
      </select>
    </div>

    <!-- Quantity input -->
    <div class="form-group" v-if="selectedProduct">
      <label for="quantity-input">数量:</label>
      <input 
        id="quantity-input"
        type="number" 
        v-model.number="quantity" 
        min="1"
        @input="onQuantityChange"
      />
    </div>

    <!-- Display selected product info -->
    <div class="product-info" v-if="selectedProduct">
      <h4>===========明细===============</h4>
      <p><strong>商品名称:</strong> {{ selectedProduct.name }}</p>
      <p><strong>单价:</strong> ${{ selectedProduct.price }}</p>
      <p><strong>数量:</strong> {{ quantity }}</p>
      <p><strong>总价:</strong> ${{ (selectedProduct.price * quantity).toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vue2DataBindingExp',
  data() {
    return {
      // Available products with name and price
      products: [
        { id: 1, name: 'Laptop', price: 999.99 },
        { id: 2, name: 'Smartphone', price: 599.99 },
        { id: 3, name: 'Tablet', price: 299.99 },
        { id: 4, name: 'Headphones', price: 199.99 },
        { id: 5, name: 'Smart Watch', price: 149.99 }
      ],
      // Selected product object
      selectedProduct: null,
      // Quantity of selected product
      quantity: 1
    }
  },
  methods: {
    /**
     * Handle product selection change
     */
    onProductChange() {
      console.log('Selected product:', this.selectedProduct);
      // Reset quantity when product changes
      this.quantity = 1;
    },

    /**
     * Handle quantity input change
     */
    onQuantityChange() {
      // Ensure quantity is at least 1
      if (this.quantity < 1) {
        this.quantity = 1;
      }
      console.log('Quantity changed:', this.quantity);
    }
  }
}
</script>

<style scoped>
.product-selector {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select, input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.product-info {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}

.product-info h4 {
  margin-top: 0;
}

.product-info p {
  margin: 5px 0;
}
</style>