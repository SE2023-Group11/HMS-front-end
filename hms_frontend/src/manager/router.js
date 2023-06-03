import {createRouter, createWebHistory} from "vue-router"
import ManagerInfo from './components/infoManage/ManagerInfo'
import NotifyInfo from './components/notifyManage/NotifyInfo'
import jobInfo from './components/jobManage/jobInfo'
import newsShow from './components/newsManage/newsShow'
import DefaultView from './DefaultView'


const managerRouter = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: DefaultView
        },
        {
            path: '/managerInfo',
            component: ManagerInfo
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
        }
    ]
});

export default managerRouter;