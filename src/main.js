import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import NotFound from './components/NotFound.vue'
import Admin from './components/Admin.vue'
import Landing from './components/Landing.vue'

import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/aura-dark-green/theme.css'
import 'primeicons/primeicons.css'
import './style.css'

const pinia = createPinia()

const routes = [
    { path: '/', component: Landing },
    { path: '/admin', component: Admin },
    { path: '/:catchAll(.*)', name: 'not-found', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(PrimeVue)

app.mount('#app')
