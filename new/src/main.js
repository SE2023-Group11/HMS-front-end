import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";

const app = createApp(App);
app.config.globalProperties.$baseURL='http://121.199.161.134:8080/'
app.use(router);
app.mount('#app')
