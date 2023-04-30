import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginForm.vue";
import Register from "../views/RegisterForm.vue";
import Temp from "../views/TempAll.vue";
import PatientSpace from "../views/PatientSelfSpace.vue";
import DoctorSpace from "../views/DoctorSelfSpace.vue";
import Message from "../views/SendMessage.vue";
import ForgetPwd from "@/views/ForgetPwd.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/temp",
        name: "Temp",
        component: Temp
    },
    {
        path: "/patientspace",
        name: "PatientSpaceself",
        component: PatientSpace
    },
    {
        path: "/doctorspace",
        name: "DoctorSpaceself",
        component: DoctorSpace
    },
    {
        path: "/message",
        name: "SendMessage",
        component: Message
    },
    {
        path: "/ForgetPwd",
        name: "ForgetPwd",
        component: ForgetPwd
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;