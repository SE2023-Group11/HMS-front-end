<template>

<div>
        <head>
            <meta charset="UTF-8">
            <title>HMS医院门诊预约系统</title>
        </head>
    <div class='body'>
            <div class="container" id="container">
                <div class="header">
                    <img src="https://f.pz.al/pzal/2023/05/19/d218206d1e4dd.png" alt="" class="header_img"/>
                    <h1 class="header_tag">HMS医院门诊预约系统</h1>
                    <div class="header_user" @mouseenter="showList()" @mouseleave="unShowList()">
                        <img src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="" class="header_user_img"/>
                        <h1 class="header_user_word">登录/注册</h1>
                        <div id="triangle-down"></div>
                        <div id="header_list">
                            <div οnclick="window.location.href='/patientspace';" class="header_list_item">个人主页</div>
                            <div οnclick="window.location.href='/message';" class="header_list_item">消息通知</div>
                            <div class="header_list_item">账号注销</div>
                            <div class="header_list_item">退出登录</div>
                        </div>
                    </div>
                </div>
                <!-- <div class="main"></div> -->
            <div class="main1">
            <!-- 从这里开始是重要的 -->
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
                        <label for="file-ibt_changePicnput" class="custom-file-upload">
                            <i class="fa fa-cloud-upload"></i> 点击更换头像
                        </label>
                        <input id="file-input" type="file" @click="changePic" style="display:none;">
                    </div>
                </div>

                <!-- <button class="bttt" @click="loadNotifications">增加消息</button> -->
                <div class="header1">
                    <h1>消息通知</h1>
                    <div class="badge" v-if="unreadCount > 0">{{ unreadCount }}</div>
                </div>
                <div class="pp1">
                    <div class="all">
                            <Accordion :activeIndex="0" class="notification" v-for="(notification, index) in notifications"
                                :key="index">

                                <AccordionTab :header="notification.title">
                                    <p>
                                        {{ notification.description }}
                                    </p>
                                </AccordionTab>
                            </Accordion>
                        <div class="tian"></div>
                    </div>
                </div>
            </div>
    
                <!-- <div class="footer">
                    <div class="footer_box">
                        <ul class="footer_list_box">
                            <li>
                                <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_1.png" alt="">
                                <span>电话：010-82317114</span>
                            </li>
                            <li>
                                <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_2.png" alt="">
                                <span>传真：010-82328136</span>
                            </li>
                            <li>
                                <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_3.png" alt="">
                                <span>邮编：100191</span>
                            </li>
                            <li>
                                <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_4.png" alt="">
                                <span>地址：北京市海淀区学院路37号</span>
                            </li>
                        </ul>
                    </div>
                    <div class="footer_item">Copyright ©️ 2023-2033</div>
                    <div class="footer_item">HMS Powered by SEGroup11</div>
                    <div class="footer_item">HMS Designed by AlpaCa</div>
                </div> -->
            </div>
            </div>
</div>

</template>
    
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
//primevue
import Button from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { useRouter } from 'vue-router'
const notifications = ref([]);
const notificationalready = ref([]);
const unreadCount = ref(0);
const token = sessionStorage.getItem('token')
const activeTabIndex = ref(1)

const namecontent = ref('')
const router = useRouter()
onMounted(() => {
    loadNotifications();
    getinfo();
    console.log(sessionStorage.getItem("role"));
    console.log(sessionStorage.getItem("token"));
    console.log('dasdasd'+namecontent.value)
})
//首先需要确定一下当前的用户的身份
const role = sessionStorage.getItem('role');

// const containerHeight = ref(500)
// function mounted() {
//         // 在组件挂载完成后计算容器高度
//         containerHeight = refs.all
//     },
function handleTabChange(e) {
    const str = sessionStorage.getItem('role')
    console.log(str);
    const index = e.index;
    if (index === 0) {
        if (str === 'patient') router.push('/patientSpace');
        else router.push('/doctorSpace');
    } else if (index === 1) {
    } else if (index === 2) {
        if (str === 'patient') router.push('/patientRoot');
        else router.push('/doctorRoot');
    }
}
function created() {
    loadNotifications()
    setInterval(this.loadNotifications, 5000) // 每5秒请求一次数据
}

const str = ref('');
function loadNotifications() {
    if (role.value == 'doctor') str.value = 'http://121.199.161.134:8080/getDoctorMessage'
    else str.value = 'http://121.199.161.134:8080/getPatientMessage'
    axios.post(str.value,null,{
        params:{
            token:token
        }
    })
    .then(response => {
        console.log(response.data.data);
        const data = response.data.data
        console.log(data[0].infoId);
        for (let i = 0; i < data.length; i++) {
            const newN = {};
            newN.id = data[i].infoId,
            newN.title = "新消息  "+data[i].infoTime,
            newN.description = data[i].infoBody,
            notifications.value.push(newN)
        }
        // unreadCount += newNotifications.length
    })
    .catch(error => {
        console.log(error)
    })
}
//用于测试界面的函数
// function add() {
//     notifications.value.push({
//         id: notifications.value.length + 1,
//         title: '新消息' + (notifications.value.length + 1),
//         description: '这是一条新的通知消息。',
//         read: false
//     })
//     unreadCount.value += 1
// }
// function deleteNotification() {
//     while (notificationalready.value.length > 0) {
//         //const notification = notificationalready.value[index]
//         //axios.delete(`/api/notifications/${notification.id}`)
//         //    .then(() => {
//         notificationalready.value.splice(index, 1)
//         //     if (!notification.read) {
//         //         unreadCount.value -= 1
//         //     }
//         // })
//         // .catch(error => {
//         //     console.log(error)
//         // })
//     }
// }
// const index = ref(0);
// function alreadyread() {
//     index.value = notifications.value.length;
//     while (index.value > 0) {
//         index.value--;
//         const notification = notifications.value[index.value]
//         //axios.delete(`/api/notifications/${notification.id}`)
//         //    .then(() => {
//         notifications.value.splice(index, 1)
//         unreadCount.value -= 1
//         //    })
//         //    .catch(error => {
//         //        console.log(error)
//         //    })
//         notificationalready.value.push(notification);
//     }
// }
// function deleteNotification1() {
//     index.value = notifications.value.length;
//     while (index.value > 0) {
//         index.value--;
//         const notification = notifications.value[index.value]
//         axios.delete('http://localhost:8080/deleteMessage',
//             token = token.value,
//             info_id = notification.value.id
//         )
//             .then(() => {
//                 notifications.value.splice(index, 1)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }
// }
function getinfo() {
    if(sessionStorage.getItem('role') == 'patient'){
        axios.get('http://121.199.161.134:8080/getPatientInformation',{
        params: {
            // token: token.value, 
            token:token
        }
    })
        .then(response => {
            // 成功获取数据后的处理逻辑
            console.log(response.data)
            const data = response.data.data;  
            namecontent.value= data.patientName; 
        })
        .catch(error => {
            // 处理错误的逻辑
            console.error(error)
        })
    }
    else{
        axios.get('http://121.199.161.134:8080/getDoctorInformation',{
        params: {
            // token: token.value, 
            token:token
        }
    })
        .then(response => {
            // 成功获取数据后的处理逻辑
            console.log(response.data)
            const data = response.data.data;
            namecontent.value= data.doctorName;     
        })
        .catch(error => {
            // 处理错误的逻辑
            console.error(error)
        })
    }
    
}
//统一的函数
function showList(){
    var list = document.getElementById("header_list");
    console.log("in");
    list.style.display = "block";
};
function unShowList(){
    var list = document.getElementById("header_list");
    console.log("out");
    list.style.display = "none";
};
</script>
    
<style scoped>
.jian {
    position: relative;
    top: 50px;
    width: 100%;
    height: 200px;
    background-image: url("../Pic/jianyue.jpg");
    z-index: 9999999;
}
.bttt{
    position: absolute;
    top:100px;
    z-index: 1000000000000;
}
/* .main1 {
  position: absolute;
  left: 15%;
  right: 15%;
  height: 900px;
  top: 150px;
  background-color: #ffffff;
} */
.zi {
    font-size: 40px;
z-index: 999999999;
position: relative;
left: 44%;
top: 60%;
color: #fff;
}
.bt_changePic {
    position: relative;
    left: 50px;
    top: 20px;
    z-index: 9999;
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
    width: 1052px;
    z-index: 99999;
    /* border-radius: 1%; */
    background-color: #ffffff;

}

.tian {
    position: absolute;
    left: 0%;
    right: -0%;
    /* width: 1000px; */
    height: 300px;
    z-index: 100;
    background-color: #ffffff;
}

.pp1 {
    position: absolute;
    left: 15%;
    right: 15%;
    /* width: 1000px; */
    height: 1200px;
    top: 150px;
    background-color: #ffffff;
}

.header1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    position: absolute;
    left: 400px;
    top:400px;
    z-index: 99999999;
}

.yidu {
    position: relative;
    left: 200px;
    bottom: 55px;
}

.notification {
    position: relative;
    left: 150px;
    width: 760px;
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
.leftpart {
    position: relative;
    left: 430px;
    width: 250px;
    height: 600px;
    top: -80px;
    z-index: 9999999;
}


.avatar {
    position: relative;
    /* left: 150px;*/
    width: 200px;
    height: 200px;
    top: 10px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 999999;
}

.choosePic {
    color: blue;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}





/* 这是统一的css */
* {
        margin: 0;
        padding: 0;
    }
    html {
        height: 100%;
    }
    .body {
        /* height: 100%; */
        min-height: 100vh;
        
    }
body{
    position: relative;
}
    .container {
        position: relative;
        height: 100%;
        padding-top: 0.1px;
        /*background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);*/
        /*background-image: url("../img/back_img3.jpg");*/
        /*background-size: cover;*/
    }
    .background{
        width: 100%;
        height: 100%;
        background-size: cover;
        /*background-image: url("../img/back_img3.jpg");*/
        position: fixed;
        z-index: -999;
    }
    .header{
        top:0px;
        height: 60px;
        width: 100%;
        background-color: whitesmoke;
        border-bottom: rgba(0, 0, 0, 0.3) solid 1px;
        position: fixed;
        z-index: 99999999999;
    }
    .header_img{
        /* background-color: red; */
        width: 60px;
        height: 60px;
        float: left;
        margin-left: 8%;
    }
    .header_tag{
        /* background-color: blue; */
        margin-left: 1%;
        line-height: 60px;
        font-family: Arial;
        float: left;
        font-size: 18px;
    }
    .header_user{
        /* background-color: green; */
        float: right;
        margin-right: 8%;
        height: 60px;
        width: 150px;
    }
    #header_list{
        background-color: #c1c0c0;
        display: none;
        margin-top: 60px;
        width: 150px;
        height: 200px;
    }
    .header_list_item{
        width: 150px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .header_list_item:hover{
        background-color: rgb(137, 132, 132);
        cursor: pointer;
    }
    .header_user:hover{
        background-color: #c1c0c0;
        /* cursor: pointer; */
    }
    .header_user_word{
        /* background-color: white; */
        margin-left: 10px;
        line-height: 60px;
        font-size: 13px;
        float: left;
    }
    .header_user_img{
        /* background-color: blue; */
        margin-top: 5px;
        margin-left: 5px;
        width: 50px;
        height: 50px;
        float: left;
        border-radius: 100%;
    }
    #triangle-down{
        float: left;
        margin-top: 25px;
        margin-left: 5px;
        width:0px;
        height:0px;
        border-left:6px solid transparent;
        border-right:6px solid transparent;
        border-top:10px black solid;
    }
    .main{
        border-radius: 5px;
        margin-left: 15%;
        margin-right: 15%;
        margin-top: 70px;
        width: 70%;
        min-height: 600px;
        background-color: rgb(255, 255, 255);
    }
    .footer{
        position: absolute;
        bottom: -1000px;
        height: 220px;
        width: 100%;
        /* margin-top: 300px; */
        background-color: rgba(0, 0, 0, 0.85);
    }
    .footer_img{
        margin: auto;
        width: 400px;
    }
    .footer_item{
        width: 100%;
        text-align: center;
        color: rgba(255,255,255,0.7);
        font-size: 15px;
        line-height: 25px;
    }
    .footer_box{
        padding-top: 10px;
        margin-top: 20px;
        margin: auto;
        width: 100%;
        height: 120px;
    }
    .footer_list_box{
        margin: auto;
        list-style: none;
        width: 620px;
        height: 100%;
        /* float: left; */
    }
    .footer_list_box>li {
        padding: 15px 0 10px;
        width: 310px;
        height: 50px;
        color: rgba(255,255,255,0.7);
        box-sizing: border-box;
        float: left;
        position: relative;
    }
</style>