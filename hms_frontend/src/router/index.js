import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginForm.vue";
import Register from "../views/RegisterForm.vue";
import Temp from "../views/TempAll.vue";
import Space from "../views/SelfSpace.vue";
import Message from "../views/SendMessage.vue";
import Selfmessage from "@/views/selfmessage.vue";
import Changemessage from "@/views/changemessage.vue";
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
        path: "/selfmessage",
        name: "Selfmessage",
        component: Selfmessage
    },
    {
        path: "/changemessage",
        name: "Changemessage",
        component: Changemessage
    },
    {
        path: "/space",
        name: "Spaceself",
        component: Space
    },
    {
        path: "/message",
        name: "SendMessage",
        component: Message
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;