<template>
    <div class="all">
        <button @click="add">增加消息</button>
        <div class="header">
            <h1>消息通知</h1>
            <div class="badge" v-if="unreadCount > 0">{{ unreadCount }}</div>
        </div>
        <div class="topp">

            <div class="f1">
                <h2 class="hea">&nbsp&nbsp未读消息</h2>
                <Button label="标为已读" class="yidu" @click="alreadyread()" />
            </div>
            <!-- <div class="notifications"> -->
            <Accordion :activeIndex="-1" class="notification" v-for="(notification, index) in notifications" :key="index">

                <AccordionTab :header="notification.title">
                    <p>
                        {{ notification.description }}
                    </p>
                </AccordionTab>
            </Accordion>
            <!-- </div> -->
        </div>
        <br>
        <div class="topp">
            <div class="f1">
                <h2 class="hea">&nbsp&nbsp已读消息</h2>
                <Button label="删除" class="yidu" @click="deleteNotification()" />
            </div>
            <!-- <div class="notifications"> -->
            <Accordion :activeIndex="-1" class="notification" v-for="(notification1, index) in notificationalready"
                :key="index">

                <AccordionTab :header="notification1.title">
                    <p>
                        {{ notification1.description }}
                    </p>
                </AccordionTab>
                <!-- <Button @click="deleteNotification(index)">删除</Button> -->
            </Accordion>
            <!-- </div> -->
        </div>
        <br>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
//import notifications from './mock/notifications.js'
//primevue
import Button from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

const notifications = ref([]);
const notificationalready = ref([]);
const unreadCount = ref(0);
const token = sessionStorage.getItem('token');

//首先需要确定一下当前的用户的身份
const role = sessionStorage.getItem('role');
// onMounted(() => {
//     created();
// })

function created() {
    loadNotifications()
    setInterval(this.loadNotifications, 5000) // 每5秒请求一次数据
}

const str = ref('');
function loadNotifications() {
    if (role.value == 'n') str.value = 'http://localhost:8080//getDoctorMessage'
    else str.value = 'http://localhost:8080//getPatientMessage'
    axios.get(str,
        token = token.value
    )
        .then(response => {
            const data = response.data
            for (let i = 0; i < data.length; i++) {
                let newN
                newN.id = data[i].info_id.value,
                    newN.title = "新消息",
                    newN.description = data[i].info_body,
                    notifications = notifications.value.push(newN)
            }

            unreadCount += newNotifications.length
        })
        .catch(error => {
            console.log(error)
        })
}
//用于测试界面的函数
function add() {
    notifications.value.push({
        id: notifications.value.length + 1,
        title: '新消息' + (notifications.value.length + 1),
        description: '这是一条新的通知消息。',
        read: false
    })
    unreadCount.value += 1
}
function deleteNotification() {
    while (notificationalready.value.length > 0) {
        //const notification = notificationalready.value[index]
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
//真正的函数,删除信息
function deleteNotification1() {
    index.value = notifications.value.length;
    while (index.value > 0) {
        index.value--;
        const notification = notifications.value[index.value]
        axios.delete('http://localhost:8080/deleteMessage',
            token = token.value,
            info_id = notification.value.id
        )
            .then(() => {
                notifications.value.splice(index, 1)
            })
            .catch(error => {
                console.log(error)
            })
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

.yidu {
    position: relative;
    left: 200px;
    bottom: 55px;
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

/* .btt {
    position: relative;
    right: 10px;
    button: 80px;
    z-index: 9999;
} */

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