import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';
import router from "./router/index";
import Dialog from 'primevue/dialog';
import Button from "primevue/button";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   
import Listbox from 'primevue/listbox';
import Row from 'primevue/row';          
import Carousel from 'primevue/carousel';
import Card from 'primevue/card';
import Paginator from 'primevue/paginator';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);
app.directive('ripple', Ripple);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('DataTable',DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Listbox',Listbox);
app.component('Carousel',Carousel);
app.component('Paginator',Paginator);
app.component('Card',Card);
app.use(router).mount('#app');
