import { computed, ref, watch } from 'vue'
import type { Product } from '../types/Product'
import type { FakeStoreProduct } from '../types/FakeStoreProduct'

const storedProducts = localStorage.getItem('products')
const products = ref<Product[]>(storedProducts ? JSON.parse(storedProducts) as Product[] : [])
const lastSaved = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

watch(products, (latest) => {
  localStorage.setItem('products', JSON.stringify(latest))
  lastSaved.value = new Date().toLocaleTimeString()
}, { deep: true })


export function useProducts() {
  const productCount = computed(() => products.value.length)
  const totalValue = computed(() => products.value.reduce((sum, product) => sum + product.price, 0))
  const averageProductPrice = computed(() =>
    productCount.value === 0 ? 0 : totalValue.value / productCount.value,
  )

  function updateProduct(editingProduct: Product) {
    const product = products.value.find((item) => item.id === editingProduct.id)
    if (product) {
      product.name = editingProduct.name
      product.price = editingProduct.price
      product.description = editingProduct.description
      product.category = editingProduct.category
      product.stock = editingProduct.stock
    }
  }

  function getProduct(id: number): Product | undefined {
    return products.value.find((product) => product.id === id)
  }

  function addProduct(name: string, price: number, description: string, category: string, stock: number) {
    products.value.push({ id: Date.now(), name, price, description, category, stock })
  }

  function deleteProduct(id: number) {
    products.value = products.value.filter((product) => product.id !== id)
  }

  function clearAll() {
    products.value = []
  }

  async function fetchProducts() {
    if (loading.value) return
    loading.value = true
    error.value = null

    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data: FakeStoreProduct[] = await response.json()
      products.value = data.map((item) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
        description: item.description,
        category: item.category,
      }))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
    } finally {
      loading.value = false
    }
  }

  async function initProducts() {
    if (localStorage.getItem('products') === null) {
      await fetchProducts()
    }
  }

  return {
    products,
    lastSaved,
    loading,
    error,
    productCount,
    totalValue,
    averageProductPrice,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    fetchProducts,
    initProducts,
    clearAll,
  }
}
