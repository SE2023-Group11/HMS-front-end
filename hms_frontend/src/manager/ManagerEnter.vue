<template>
    <div>
    <div class='body'>
    
            <div class="container" id="container">
              <div class="header">
                <img src="https://f.pz.al/pzal/2023/05/19/d218206d1e4dd.png" alt="" class="header_img"/>
                <h1 class="header_tag">HMS医院门诊预约系统——后台管理</h1>
                <div class="header_user" @mouseenter="showList()" @mouseleave="unShowList()">
                    <img src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="" class="header_user_img"/>
                    <h1 class="header_user_word">登录/注册</h1>
                    <div id="triangle-down"></div>
                    <div id="header_list">
                        <div class="header_list_item" href="/doctorSpace">个人主页</div>
                        <div class="header_list_item" href="/message">消息通知</div>
                        <div class="header_list_item" href="/login">账号注销</div>
                        <div class="header_list_item" href="/login">退出登录</div>
                    </div>
                </div>
            </div> 
                <div class="main">
                  <ManagerView />
                   
                    </div>
    </div>
                <div class="footer">
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
                </div>
              </div>
            </div>
    </template>
    <script scope>
      import axios from 'axios';
    import { defineComponent, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Vue from 'vue';
import ManagerView from './ManagerView.vue';
    
    export default {
    methods: {
        showList() {
            var list = document.getElementById("header_list");
            console.log("in");
            list.style.display = "block";
        },
        unShowList() {
            var list = document.getElementById("header_list");
            console.log("out");
            list.style.display = "none";
        },
    },
    components: { ManagerView }
}
    </script>
    <style>
    * {
        margin: 0;
        padding: 0;
    }
    .body {
        height: 100%;
    }
    .container {
        height: 100%;
        width: 100%;
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
        height: 60px;
        width: 100%;
        top:0px ;
        left:0px;
        background-color: whitesmoke;
        /* background-color: #ECEBEB; */
        border-bottom: rgba(0, 0, 0, 0.3) solid 1px;
        /* background-color: rgba(0, 0, 0, 0.5); */
        position: fixed;
        z-index: 999;
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
        background-color: #c1c0c0b4;
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
        background-color: #c1c0c055;
        cursor: pointer;
    }
    .header_user:hover{
        background-color: #c1c0c055;
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
        height: 580px;
        background-color: rgb(255, 255, 255);
    }
    .footer{
        height: 220px;
        width: 100%;
        margin-top: 20px;
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