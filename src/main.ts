import './assets/main.css'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app
  .use(createPinia())
  .use(router)
  .mount('#app')
