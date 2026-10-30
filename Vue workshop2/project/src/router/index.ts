import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProductManagementPage from "@/pages/ProductManagementPage.vue";
import ProductDetailPage from "@/pages/ProductDetailPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const AboutPage = () => import("@/pages/AboutPage.vue");

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomePage },
  { path: "/products", component: ProductManagementPage },
  { path: "/products/:id", component: ProductDetailPage },
  { path: "/about", component: AboutPage },
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});