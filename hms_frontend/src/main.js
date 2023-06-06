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
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import RadioButton from 'primevue/radiobutton';
import Tag from 'primevue/tag';
import Tooltip from 'primevue/tooltip';



import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'


const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);
app.component('Button', Button);
app.component('InputText',InputText);
app.component('Dialog', Dialog);
app.component('DataTable',DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Listbox',Listbox);
app.component('Carousel',Carousel);
app.component('Paginator',Paginator);
app.component('Card',Card);
app.component('Message',Message);
app.component('RadioButton',RadioButton);
app.component('Tag',Tag);
app.use(router).mount('#app');