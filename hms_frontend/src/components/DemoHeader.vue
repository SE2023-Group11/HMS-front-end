<template>
    <div class="header">
            <img src="https://f.pz.al/pzal/2023/05/19/d218206d1e4dd.png" alt="" class="header_img"/>
            <h1 class="header_tag">HMS医院门诊预约系统</h1>
            <div class="header_user" onmouseenter="showList()" onmouseleave="unShowList()">
                <!-- 显示头像 -->
                <img src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="" class="header_user_img"/>
                <!-- 未登录时显示登录/注册 -->
                <!-- 登录后显示用户名 -->
                <h1 class="header_user_word">登录/注册</h1>
                <div id="triangle-down"></div>

                <div id="header_list">
                    <div class="header_list_item">个人主页</div>
                    <div class="header_list_item">消息通知</div>
                    <div class="header_list_item">账号注销</div>
                    <div class="header_list_item">退出登录</div>
                </div>
            </div>
        </div>
  
</template>

<script>
export default {
    methods:{
        showList(){
            var list = document.getElementById("header_list");
            console.log("in");
            list.style.display = "block";
        },
        unShowList(){
            var list = document.getElementById("header_list");
            console.log("out");
            list.style.display = "none";
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
html {
    height: 100%;
}
body {
    height: 100%;
}
.container {
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
    height: 60px;
    width: 100%;
    background-color: whitesmoke;
    /* background-color: #ECEBEB; */
    border-bottom: rgba(0, 0, 0, 0.3) solid 1px;
    /* background-color: rgba(0, 0, 0, 0.5); */
    position: fixed;
    z-index: 10;
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
    /* background-color: rgba(255, 255, 255, 0.6); */
    background-color: red;
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