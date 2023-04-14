import App from './App.vue'
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';

const app = createApp(App);
app.mount('#app');
app.use(PrimeVue);
