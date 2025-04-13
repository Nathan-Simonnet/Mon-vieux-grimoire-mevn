import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import routes from './routes'
import './style.css'
import { createPinia } from 'pinia';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App)
app.use(router);
app.use(createPinia())
app.mount('#app')

// createApp(App)
//   .use(router)
//   .mount('#app')
