import { createRouter, createWebHistory } from "vue-router";
import AddAppointment from "../views/AddAppointment.vue";
import CheckDoctorInfo from "../views/CheckDoctorInfo.vue";
import CheckMyAppointment from "../views/CheckMyAppointment.vue";
import ConfirmAppointment from "../views/ConfirmAppointment.vue";



const routes = [
    {
        path: "/addAppointment",
        name: "AddAppointment",
        component: AddAppointment
    },
    {
        path: "/checkDoctorInfo",
        name: "CheckDoctorInfo",
        component: CheckDoctorInfo
    },
    {
        path: "/checkMyAppointment",
        name: "CheckMyAppointment",
        component: CheckMyAppointment
    },
    {
        path: "/confirmAppointment",
        name: "ConfirmAppointment",
        component: ConfirmAppointment
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;