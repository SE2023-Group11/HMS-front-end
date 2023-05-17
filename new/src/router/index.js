import { createRouter, createWebHistory } from "vue-router";
import AddAppointment from "../views/AddAppointment.vue";
import CheckDoctorInfo from "../views/CheckDoctorInfo.vue";
import CheckMyAppointment from "../views/CheckMyAppointment.vue";
import ConfirmAppointment from "../views/ConfirmAppointment.vue";
import PatientRoot from "../views/PatientRoot.vue"


const routes = [
    {path:"/",
    redirect:"/patientRoot"
    },
    {
        path:"/patientRoot",
        name:"PatientRoot",
        component: PatientRoot
    },
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