<template>
    <!-- <canvas id="myCanvas2"></canvas> -->
    <div class="all">
        <button @click="add">增加消息</button>
        <div class="header">
            <h1>消息通知{{ ss }}</h1>
            <div class="badge" v-if="unreadCount > 0">{{ unreadCount }}</div>
        </div>
        <h2>&nbsp&nbsp未读消息</h2>
        <div class="notifications">
            <div class="notification" v-for="(notification, index) in notifications" :key="index">
                <div class="title">{{ notification.title }}</div>
                <div class="description">{{ notification.description }}</div>
                <!-- <button @click="deleteNotification(index)">删除</button>
                &nbsp;&nbsp; -->
                <button @click="alreadyread(index)">标为已读</button>
            </div>
        </div>
        <h2>&nbsp&nbsp已读消息</h2>
        <div class="notifications">
            <div class="notification" v-for="(notification1, index) in notificationalready" :key="index">
                <div class="title">{{ notification1.title }}</div>
                <div class="description">{{ notification1.description }}</div>
                <button @click="deleteNotification(index)">删除</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
//import notifications from './mock/notifications.js'
//primevue
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Textarea from 'primevue/textarea';
import Message from 'primevue/message';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

const notifications = ref([]);
const notificationalready = ref([]);
const unreadCount = ref(0);

// onMounted(() => {
//     created();
// })

// function created() {
//     loadNotifications()
//     setInterval(this.loadNotifications, 5000) // 每5秒请求一次数据
// }

// function loadNotifications() {
//     axios.get('/api/notifications')
//         .then(response => {
//             const newNotifications = response.data.filter(notification => {
//                 return !this.notifications.some(n => n.id === notification.id)
//             })
//             this.notifications = this.notifications.concat(newNotifications)
//             this.unreadCount += newNotifications.length
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }

function add() {
    notifications.value.push({
        id: notifications.length + 1,
        title: '新消息' + (notifications.length + 1),
        description: '这是一条新的通知消息。',
        read: false
    })
    unreadCount.value += 1
}
function deleteNotification(index) {
    const notification = notificationalready[index]
    //axios.delete(`/api/notifications/${notification.id}`)
    //    .then(() => {
    notificationalready.value.splice(index, 1)
    //     if (!notification.read) {
    //         unreadCount.value -= 1
    //     }
    // })
    // .catch(error => {
    //     console.log(error)
    // })
}
const ss = ref('d');
function alreadyread(index) {
    ss.value = 'dasss'
    const notification = notifications[index]

    //axios.delete(`/api/notifications/${notification.id}`)
    //    .then(() => {
    notifications.value.splice(index, 1)
    unreadCount.value -= 1
    //    })
    //    .catch(error => {
    //        console.log(error)
    //    })
    notificationalready.value.push(notification);
}



// export default {
//     data() {
//         return {
//             notifications: notifications,
//             unreadCount: notifications.filter(notification => !notification.read).length
//         }
//     },
//     created() {
//         setInterval(() => {
//             this.loadNotifications()
//         }, 5000000)
//     },
//     methods: {
//         loadNotifications() {
//             // 用mock数据模拟后端返回
//             this.notifications.push({
//                 id: this.notifications.length + 1,
//                 title: '新消息' + (this.notifications.length + 1),
//                 description: '这是一条新的通知消息。',
//                 read: false
//             })
//             this.unreadCount += 1
//         },
//         deleteNotification(index) {
//             const notification = this.notifications[index]
//             this.notifications.splice(index, 1)
//             if (!notification.read) {
//                 this.unreadCount -= 1
//             }
//         },
//     }
// }
</script>
  
<style>
.all {
    position: absolute;
    left: 400px;
    top: 50px;
    width: 650px;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 1%;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    left: 20px;
}

.notifications {
    margin-top: 20px;
    position: relative;
    left: 20px;
}

.notification {
    border: 1px solid #ccc;
    padding: 10px;
    width: 600px;

    margin-bottom: 10px;
}

.title {
    font-weight: bold;
}

.description {
    margin-top: 10px;
}

button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
}

.badge {
    background-color: red;
    color: #fff;
    font-size: 12px;
    padding: 2px 5px;
    border-radius: 50%;
    margin-left: 5px;

    position: relative;
    right: 50px;
}
</style>