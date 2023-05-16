

// //新添加的
// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router/index.js";
// import 'element-plus/dist/index.css'
// import ElementPlus from 'element-plus';
// import PrimeVue from 'primevue/config';
// //theme
// import "primevue/resources/themes/lara-light-indigo/theme.css";
// //core
// import "primevue/resources/primevue.min.css";
// //icons
// import "primeicons/primeicons.css";
// const app = createApp(App);

// app.use(router);
// app.use(ElementPlus);
// app.use(PrimeVue);
// app.mount('#app');

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';
import router from "./router/index.js";

import Dialog from 'primevue/dialog';
// css
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


const app = createApp(App);
// app.config
app.use(PrimeVue, { ripple: true });
app.use(router);
app.directive('ripple', Ripple);
app.mount('#app')
Vue.prototype.$primevue = { ripple: true };
Vue.component('Dialog', Dialog);