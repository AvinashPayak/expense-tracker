import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'
import GAuth from 'vue3-google-oauth2';
import './style.css'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue';
import Login from './views/Login.vue';
import store from './store/store'; 

const CLIENT_ID = '1082781100266-d3o6769afej4nglupb8tv9na4dej1djn.apps.googleusercontent.com'

const routes = [
    {  name: 'home', path: '/home', component: Dashboard },
    {  name: 'login', path: '/login', component: Login }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const gAuthOptions = {
    clientId: CLIENT_ID,
    scope: 'email',
    prompt: 'consent',
    fetch_basic_profile: true,
    plugin_name: 'expense-tracker'
}
const app = createApp(App);
app.use(router).use(store).use(GAuth, gAuthOptions);
app.mount('#app')
