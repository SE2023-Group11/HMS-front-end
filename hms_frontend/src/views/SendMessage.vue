<template>
    <!-- 头部 -->
    <div class="header9">
        <div class="logo9">
            <i class="pi pi-hospital9"></i>
            <img class="img_top9" src="../Pic/img.jpeg" />
            <span display="flex9">医院信息管理系统</span>
        </div>
        <div class="user-info9">
            <img class="avatar9" src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="User Avatar" />
        </div>
    </div>

    <div class="jian">
        <div class="zi">
            {{ namecontent }}
        </div>
    </div>
    <div class="card">
        <TabView :activeIndex="activeTabIndex" @tab-change="handleTabChange">
            <TabPanel header="个人空间">

            </TabPanel>
            <TabPanel header="消息通知">

            </TabPanel>
            <TabPanel header="返回主页">

            </TabPanel>
        </TabView>
    </div>
    <div class="leftpart">
        <div class="avatar">
            <img src="../../public/person.png" v-if="!imageUrl" />
            <img :src="imageUrl" v-if="imageUrl">
        </div>
        <div class="bt_changePic">
            <label for="file-input" class="custom-file-upload">
                <i class="fa fa-cloud-upload"></i> 点击更换头像
            </label>
            <input id="file-input" type="file" @click="changePic" style="display:none;">
        </div>
    </div>
    <button @click="add">增加消息</button>
    <div class="header">
        <h1>消息通知</h1>
        <div class="badge" v-if="unreadCount > 0">{{ unreadCount }}</div>
    </div>
    <div class="pp1">
        <div class="all">
            <div class="topp">
                <!-- <div class="f1">
                <h2 class="hea">&nbsp&nbsp未读消息</h2>
                <Button label="标为已读" class="yidu" @click="alreadyread()" />
            </div> -->
                <Accordion :activeIndex="0" class="notification" v-for="(notification, index) in notifications"
                    :key="index">

                    <AccordionTab :header="notification.title">
                        <p>
                            {{ notification.description }}
                        </p>
                    </AccordionTab>
                </Accordion>
            </div>
            <div class="tian">

            </div>
            <br>
            <!-- <div class="topp">
            <div class="f1">
                <h2 class="hea">&nbsp&nbsp已读消息</h2>
                <Button label="删除" class="yidu" @click="deleteNotification()" />
            </div>
            <Accordion :activeIndex="-1" class="notification" v-for="(notification1, index) in notificationalready"
                :key="index">

                <AccordionTab :header="notification1.title">
                    <p>
                        {{ notification1.description }}
                    </p>
                </AccordionTab>
            </Accordion>
        </div> -->
            <br>
        </div>
    </div>
    <!-- 尾部 -->
    <!-- <div class="content9">
        <div class="footer9">
            <div class="left9">
                <p>版权所有 2014-2022 北京航空航天大学<br>
                    京ICP备05004617-3<br>
                    文保网安备案号1101080018</p>
            </div>
            <img class="img_bottom9" src="../Pic/img.jpeg" />
            <div class="right9">
                <p>地址：北京市海淀区学院路37号<br>
                    邮编：100191<br>
                    电话：82317114</p>
            </div>
        </div>
    </div> -->
    <div>
        <img class="img_foot9" src="../Pic/bottom.jpg" />
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
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const notifications = ref([]);
const notificationalready = ref([]);
const unreadCount = ref(0);
const token = sessionStorage.getItem('token');
const activeTabIndex = ref(1)
import { useRouter } from 'vue-router'
const router = useRouter()
//首先需要确定一下当前的用户的身份
// const role = sessionStorage.getItem('role');
const role = ref('y')//用于测试
// onMounted(() => {
//     created();
// })
// const containerHeight = ref(500)
// function mounted() {
//         // 在组件挂载完成后计算容器高度
//         containerHeight = refs.all
//     },
function handleTabChange(e) {
    const index = e.index;
    if (index === 0) {
        if (role.value === 'y') router.push('/patientSpace');
        else router.push('/doctorSpace');
    } else if (index === 1) {
        router.push('/page2');
    } else if (index === 2) {
        router.push('/page3');
    }
}
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
.jian {
    position: absolute;
    top: 70px;
    width: 100%;
    height: 200px;
    background-image: url("../Pic/jianyue.jpg");
    z-index: 200;
}

.zi {
    font-size: 40px;
    z-index: 400;
    position: relative;
    left: 40%;
    top: 50%;
    z-index: 500;
    color: #fff;
}

.card {
    position: absolute;
    z-index: 60990;
    left: 710px;
    top: 280px;
}

.all {
    position: absolute;
    left: 0px;
    top: 350px;
    width: 1000px;
    z-index: 99999;
    /* border: 1px solid rgb(204, 204, 204); */
    border-radius: 1%;
    background-color: #ffffff;

}

.tian {
    position: absolute;
    left: 0%;
    width: 1000px;
    height: 300px;
    z-index: 100;
    background-color: #ffffff;
}

.pp1 {
    position: absolute;
    left: 22%;
    width: 1000px;
    height: 900px;
    top: 150px;
    background-color: #ffffff;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    position: absolute;
    left: 500px;
    z-index: 99999999;
}

.yidu {
    position: relative;
    left: 200px;
    bottom: 55px;
}

/* .topp {
    border: 1px solid rgb(204, 204, 204);
    position: relative;
    left: 10px;
    width: 800px
} */

.notification {
    position: relative;
    left: 10px;
    width: 700px;
    border-radius: 1%;
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
    left: 550px;
    z-index: 99999999;
}

.img_top9 {
    height: 80px;
}

.appointmentListHead9 {
    width: 2000px;
}

.header9 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    height: 60px;
    border-bottom: 1px solid #ccc;
}

.avatar9 {
    position: fixed;
    top: 10px;
    right: 50px;
}

.rowTitle9 {
    width: 100px;
    font-size: 10px;
}

.logo9 {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
}

.img_foot9 {
    z-index: 999999999;
    position: fixed;
    bottom: 0px;
    left: 0px;
    border-top: 1px solid #ccc;
}

.logo i {
    font-size: 32px;
    margin-right: 10px;
}

.user-info9 {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
}

.user-info9 img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 60px;
}

.user-menu9 ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.user-menu9 li {
    border-bottom: 1px solid #ccc;
}

.user-menu9 li:last-child {
    border-bottom: none;
}

.user-menu9 a {
    display: block;
    padding: 10px;
    color: #333;
}

.user-menu9 a:hover {
    background-color: rgb(255, 255, 255);
}

.content9 {
    position: absolute;
    bottom: 100px;
    z-index: 999999;
    width: 100%;
    /* height: 200px; */
    /* border-top: 1px solid rgb(82, 79, 79); */
    opacity: 1;
}

.footer9 {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    font-size: 1.2px;
    background-color: rgb(157, 151, 151);

}

.footer9 .left9 p {
    position: fixed;
    bottom: 50px;
    left: 50px;
    width: 300px;
    height: 50px;
    overflow: auto;
}

.img_bottom9 {
    position: fixed;
    bottom: 50px;
    height: 100px;
    left: 800px;
}

.footer9 .right9 p {
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 300px;
    height: 50px;
    overflow: auto;
}
</style>