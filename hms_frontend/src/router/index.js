import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginForm.vue";
import Register from "../views/RegisterForm.vue";
import Temp from "../views/TempAll.vue";
import Space from "../views/SelfSpace.vue";
import Message from "../views/Message.vue";
import ForgetPwd from "../views/ForgetPwd.vue";
import Doctor from "../views/Doctor.vue";
const routes = [
    {   path:"/",
        redirect:"/doctor"
    },
    {
        path:"/doctor",
        name:"Doctor",
        component:Doctor
    },
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
        path: "/space",
        name: "Spaceself",
        component: Space
    },
    {
        path: "/message",
        name: "Message",
        component: Message
    },
    {
        path: "/ForgetPwd",
        name: "ForgetPwd",
        component: ForgetPwd
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;