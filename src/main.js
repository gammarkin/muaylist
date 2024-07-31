import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import NotFound from './components/NotFound.vue'
import Moves from './components/Moves.vue'

import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/aura-dark-green/theme.css'
import './style.css'

const pinia = createPinia()

const routes = {
    '/': App,
    '/moves': Moves
}

const SimpleRouter = {
    data: () => ({
        currentRoute: window.location.pathname
    }),

    computed: {
        CurrentComponent() {
            return routes[this.currentRoute] || NotFound
        }
    },

    render() {
        return h(this.CurrentComponent)
    }
}

const app = createApp(SimpleRouter)

app.use(pinia)
app.use(PrimeVue)
app

app.mount('#app')
