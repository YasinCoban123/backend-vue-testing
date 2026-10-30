<script setup lang="ts">
import { ref } from 'vue'

const newProductName = ref('')
const newProductPrice = ref(0)
const newProductDescription = ref('')
const newProductCategory = ref('')
const newProductStock = ref(0)

const formError = ref('')
import type { Product } from '../types/Product'

const props = defineProps<{
 editingProduct: Product | null
}>()

import { watch } from 'vue'
watch(() => props.editingProduct, (product) => {
 if (product) {
 newProductName.value = product.name
 newProductPrice.value = product.price
 newProductDescription.value = product.description
 newProductCategory.value = product.category
 newProductStock.value = product.stock
 } else {
 newProductName.value = ''
 newProductPrice.value = 0
 newProductDescription.value = ''
 newProductCategory.value = ''
 newProductStock.value = 0
 }
}, { immediate: true })

const emit = defineEmits<{
  add: 
  [name: string, 
  price: number, 
  description: string,
  category: string,
  stock: number
]
  update: [product: Product]
 cancel: []
}>()

function handleSubmit() {
    if (
    newProductName.value.trim() === '' ||
    newProductPrice.value <= 0
  ) {
    formError.value = 'Please enter a valid name and price.'
    return
  }
      if (props.editingProduct) {
    // create new product, never adjust the props
    const updated: Product = {
    id: props.editingProduct.id,
    name: newProductName.value,
    price: newProductPrice.value,
    description: newProductDescription.value,
    category: newProductCategory.value,
    stock: newProductStock.value
    }
    emit('update', updated)
    } else {
    emit('add', newProductName.value, newProductPrice.value, newProductDescription.value, newProductCategory.value, newProductStock.value)
    formError.value = ''

    return
    }
  formError.value = ''
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
<h2>{{ props.editingProduct ? 'Edit Product' : 'Add Product' }}</h2>

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

    <p v-if="formError" class="error">{{ formError }}</p>
    <button type="submit">Add Product</button>
  </form>
</template>
