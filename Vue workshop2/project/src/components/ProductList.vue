<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import type { Product } from '../types/Product'

defineProps<{
  products: Product[]
}>()

const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
    />
  </div>
</template>