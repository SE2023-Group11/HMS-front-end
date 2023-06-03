import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";
import Login from "../views/LoginForm.vue";
import Register from "../views/RegisterForm.vue";
import Temp from "../views/TempAll.vue";
import DoctorSpace from "../views/DoctorSelfSpace.vue";
import PatientSpace from "../views/PatientSelfSpace.vue";
import Message from "../views/SendMessage.vue";
import ForgetPwd from "../views/ForgetPwd.vue";
import DoctorRoot from "../views/DoctorRoot.vue";
import D_PatientInfo from "../views/D_PatientInfo.vue";
import AddAppointment from "../views/AddAppointment.vue";
import CheckDoctorInfo from "../views/CheckDoctorInfo.vue";
import CheckMyAppointment from "../views/CheckMyAppointment.vue";
import ConfirmAppointment from "../views/ConfirmAppointment.vue";
import PatientRoot from "../views/PatientRoot.vue";
import ManagerInfo from '../manager/components/infoManage/ManagerInfo'
import NotifyInfo from '../manager/components/notifyManage/NotifyInfo'
import jobInfo from '../manager/components/jobManage/jobInfo'
import newsShow from '../manager/components/newsManage/newsShow'
import managerEnter from '../manager/ManagerEnter'
import DefaultView from '../manager/DefaultView'
const routes = [
    {   path:"/",
        redirect:"/login"
    },
    {
        path:"/doctorRoot",
        name:"DoctorRoot",
        component:DoctorRoot
    },
    {
        path: "/d_PatientInfo",
        name: "D_PatientInfo",
        component: D_PatientInfo
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
        path: "/doctorSpace",
        name: "DoctorSpace",
        component: DoctorSpace
    },
    { path: "/patientSpace",
      name: "PatientSpace",
      component: PatientSpace
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
    },
    {
        path:"/patientRoot",
        name:"PatientRoot",
        component:PatientRoot
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
    },

    {
        path: '/managerEnter',
        component: managerEnter,
        children:[
            {
                path: '/managerInfo',
                component: ManagerInfo
            },
            {
                path:'/defaultView',
                component: DefaultView
            },
            {
                path: '/notifications',
                component: NotifyInfo
            },
            {
                path: '/jobManage',
                component: jobInfo
            },
            {
                path: '/newsManage',
                component: newsShow
            },
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;