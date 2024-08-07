import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import Admin from './components/Admin.vue'
import Move from './components/Move.vue'
import Landing from './components/Landing.vue'
import NotFound from './components/NotFound.vue'

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmService from 'primevue/confirmationservice'

import 'primevue/resources/themes/aura-dark-green/theme.css'
import 'primeicons/primeicons.css'
import './style.css'

const pinia = createPinia()

const routes = [
    { path: '/', component: Landing },
    { path: '/admin', component: Admin },
    { path: '/admin/move/:id', component: Move, sensitive: true },
    { path: '/:catchAll(.*)', name: 'not-found', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmService)

app.mount('#app');
