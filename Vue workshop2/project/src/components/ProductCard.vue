<script setup lang="ts">
import type { Product } from '../types/Product'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  delete: [id: number]
  edit: [id: number]
}>()
</script>
<template>
  <div class="product-card">
    <h2><RouterLink :to="`/products/${product.id}`">{{ product.name }}</RouterLink></h2>
    <img v-if="product.image" :src="product.image" :alt="product.name" class="product-image">
    <p class="price">${{ product.price.toFixed(2) }}</p>
    <p class="description">{{ product.description }}</p>
    <p class="description">{{ product.id }}</p>
    <p class="description">{{ product.category }}</p>
    <p class="description">{{ product.stock }}</p>




    <div class="actions">
      <button @click="emit('edit', product.id)">Edit</button>
      <button @click="emit('delete', product.id)" class="secondary">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1rem;
}

.product-image {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin: 0.75rem 0;
}

.price {
  font-weight: bold;
}

.description {
  color: var(--color-text-muted, #666);
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
