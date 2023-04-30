<template>
    <!-- <canvas id="myCanvas2"></canvas> -->
    <div class="all">
        <button @click="add">增加消息</button>
        <div class="header">
            <h1>消息通知</h1>
            <div class="badge" v-if="unreadCount > 0">{{ unreadCount }}</div>
        </div>
        <div class="topp">
            <h2>&nbsp&nbsp未读消息</h2>
            <Button label="标为已读" class="btt" @click="alreadyread()" />

            <div class="notifications">
                <Accordion :activeIndex="0" class="notification" v-for="(notification, index) in notifications"
                    :key="index">
                    <!-- <div class="title">{{ notification.title }}</div>
                <div class="description">{{ notification.description }}</div> -->
                    <AccordionTab :header="notification.title">
                        <p>
                            {{ notification.description }}
                        </p>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>
        <h2>&nbsp&nbsp已读消息</h2>
        <div class="notifications">
            <Accordion :activeIndex="0" class="notification" v-for="(notification1, index) in notificationalready"
                :key="index">
                <!-- <div class="title">{{ notification1.title }}</div>
                <div class="description">{{ notification1.description }}</div> -->
                <AccordionTab :header="notification1.title">
                    <p>
                        {{ notification1.description }}
                    </p>
                </AccordionTab>
                <Button @click="deleteNotification(index)">删除</Button>
            </Accordion>
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
        id: notifications.value.length + 1,
        title: '新消息' + (notifications.value.length + 1),
        description: '这是一条新的通知消息。',
        read: false
    })
    unreadCount.value += 1
}
function deleteNotification(index) {
    const notification = notificationalready.value[index]
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
const index = ref(0);
function alreadyread() {
    index.value = notifications.value.length;
    while (index.value > 0) {
        index.value--;
        const notification = notifications.value[index.value]
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

.topp {
    border: 1px solid rgb(204, 204, 204);
    position: relative;
    left: 10px;
    width: 630px
}

.notifications {
    margin-top: 20px;
    position: relative;
    left: 10px;
    width: 520px;
    border: 1px solid rgb(204, 204, 204);
}

.notification {
    /* border: 1px solid #ccc; */
    position: relative;
    left: 10px;
    width: 500px;
    border-radius: 1%;
    margin-bottom: 10px;
}

.btt {
    position: relative;
    right: 10px;
    button: 80px;
    z-index: 9999;
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