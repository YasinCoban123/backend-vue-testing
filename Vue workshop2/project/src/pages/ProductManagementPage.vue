<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ProductList from '../components/ProductList.vue'
import { useProducts } from '../composables/useProducts'
import ProductForm from '../components/ProductForm.vue'
import type { Product } from '../types/Product'




const editingProduct = ref<Product | null>(null)

function startEditing(id: number) {
 editingProduct.value = products.value.find((product) => product.id === id) ?? null
}
function cancelEdit() {
 editingProduct.value = null
}
onUnmounted(() =>
{
  console.log("onMounted is ready>");
  console.log("onMounted is ready or sumn", products.value.length);


})


console.log("My meesage too soon mfa");

const testInput = ref<string>('')
const message = ref<string>('Welcome to Vue with TypeScript!')
const subtitle = ref<string>('Learning reactivity and components')
const count = ref<number>(0)

const {
  products,
  loading, 
  error, 
  addProduct: addToProducts,
  updateProduct,
  deleteProduct,
  clearAll,
  initProducts,
  fetchProducts,

} = useProducts()



function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}


function handleKeyPress(event: KeyboardEvent) {
if (event.key === 'Escape' && editingProduct.value !== null) {
cancelEdit()
}
}
onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
  initProducts()
})
onUnmounted(() => {
document.removeEventListener('keydown', handleKeyPress)
console.log('Cleaned up keyboard listener')
})

function handleAdd(name: string, price: number, description: string, category: string, stock: number) {
  addToProducts(name, price, description, category, stock)
}
function handleUpdate(product: Product) {
 updateProduct(product)
 cancelEdit()
}


</script>

<template>
  <!-- <form @submit.prevent="editingId !== null ? updateProduct() : addProduct()">
    <h2>{{ editingId !== null ? 'Edit Product' : 'Add New Product' }}</h2>

    <label>
      Product Name
      <input v-model="newProductName" type="text">
    </label>

    <label>
      Description
      <input v-model="newProductDescription" type="text">
    </label>

    <label>
      Price
      <input v-model.number="newProductPrice" type="number" min="0" step="0.01">
    </label>

    <div class="stats">
      <div class="stat"><strong>Products:</strong> {{ productCount }}</div>
      <div class="stat"><strong>Total Value:</strong> ${{ totalValue.toFixed(2) }}</div>
      <div class="stat"><strong>Average Price:</strong> ${{ averageProductPrice.toFixed(2) }}</div>
    </div>
    <div v-if="lastSaved">Last saved: {{ lastSaved }}</div>

    <p v-if="formError" class="error">{{ formError }}</p>
    <button type="submit">
      {{ editingId !== null ? 'Update Product' : 'Add Product' }}
    </button>
    <button v-if="editingId !== null" type="button" class="secondary" @click="resetForm">
      Cancel
    </button>
  </form> -->

  <div>
    <h1>{{ message }}</h1>
    <p>{{ subtitle }}</p>

    <!-- <section>
      <label>
        Test two-way binding
        <input v-model="testInput" type="text">
      </label>
      <p>{{ testInput }}</p>
    </section>

    <section>
      <p>Count: {{ count }}</p>
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
      <button @click="reset" class="secondary">Reset</button>

      <p v-if="count === 0">Start counting!</p>
      <p v-else-if="count > 0">Positive</p>
      <p v-else>Negative</p>

      <p v-if="count > 10 || count < -10" class="warning">
        Warning: count is far from zero!
      </p>
    </section> -->
    <div v-if="loading">Loading products...</div>
<div v-else-if="error" class="error">{{ error }}</div>

    <button type="button" class="secondary" :disabled="products.length === 0" @click="clearAll">
      Clear All
    </button>
  </div>
<ProductForm 
 :editing-product="editingProduct"
 @add="handleAdd"
 @update="handleUpdate"
 @cancel="cancelEdit"
/>
<ProductList
 :products="products"
 @edit="startEditing"
 @delete="deleteProduct"
/>

</template>

<style scoped>
body{
 background-image: url("../../public/image.jpg");
}
h1 {
  color: #42b983;
}

.warning {
  color: red;
  font-weight: bold;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0 1rem;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.stat {
  margin: 0;
}
</style>

