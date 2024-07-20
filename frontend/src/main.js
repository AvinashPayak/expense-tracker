import { createApp } from 'vue'
import GAuth from 'vue3-google-oauth2';
import './style.css'
import App from './App.vue'

const CLIENT_ID = '1082781100266-d3o6769afej4nglupb8tv9na4dej1djn.apps.googleusercontent.com'

const gAuthOptions = {
    clientId: CLIENT_ID,
    scope: 'email',
    prompt: 'consent',
    fetch_basic_profile: true,
    plugin_name: 'expense-tracker'
}
const app = createApp(App);
app.use(GAuth, gAuthOptions);
app.mount('#app')
