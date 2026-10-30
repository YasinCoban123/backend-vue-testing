<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'

const route = useRoute()
const { getProduct } = useProducts()

const productId = computed(() => Number(route.params.id))
const product = computed(() => getProduct(productId.value))
</script>

<template>
	<div v-if="product">
		<h1>{{ product.name }}</h1>
		<img v-if="product.image" :src="product.image" :alt="product.name" class="product-image">
		<p>Price: ${{ product.price }}</p>
		<RouterLink to="/products">← Back to Products</RouterLink>
	</div>
	<div v-else>
		<h1>Product Not Found</h1>
		<p>No product exists with ID {{ productId }}.</p>
		<RouterLink to="/products">← Back to Products</RouterLink>
	</div>
</template>

<style scoped>
.product-image {
	max-width: 320px;
	max-height: 320px;
	object-fit: contain;
}
</style>
