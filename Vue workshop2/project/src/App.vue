<!-- <script setup lang="ts">
import ProductManagementPage from './pages/ProductManagementPage.vue'
</script>
<template>
 <ProductManagementPage />
</template>
<style>
body{
 /* background-image: url("../../public/image.jpg"); */

}
</style> -->
<script setup lang="ts">
</script>

<template>

  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/products">Products</RouterLink>
      <RouterLink to="/details">details</RouterLink>
      

    </nav>
  </header>
  <main>
      <RouterView/>

  </main>
</template>
<style scoped>
header {
  width: 100%;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

nav {
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
</style>