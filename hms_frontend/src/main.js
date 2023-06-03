import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';
import router from "./router/index";
import Dialog from 'primevue/dialog';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(PrimeVue)
app.use(ConfirmationService)
app.use(ToastService)
app.use(router).mount('#app');
app.directive('ripple', Ripple);