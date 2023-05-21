<template>
  <div class="page-wrapper">
    <div class="header">
      <div class="logo">
        <i class="pi pi-hospital"></i>
        <img class="img_top" src="./Pic/img.jpeg" alt="User Avatar"/>
        <span display="flex" >医院信息管理系统</span>
      </div>
      <div class="user-info" @mouseover="showMenu = true" @mouseleave="showMenu = false">
        <img class="avatar" src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="User Avatar"/>
        <div v-if="showMenu" class="user-menu" >
          <ul>
            <li> <router-link to="/message">消息通知</router-link></li>
            <li><a href="/login">退出登录</a></li>
            <li><a href="/space">个人信息</a></li>
          </ul>
        </div>
      </div> 
    </div>
    <div class="content">
 <router-view></router-view>
    </div>
  <div class="page-footer">
      <div class="left">
      <p>版权所有 2014-2022 北京航空航天大学<br>
         京ICP备05004617-3<br>
         文保网安备案号1101080018</p>
      </div>
      <img class="img_bottom" src="./Pic/img.jpeg" />
    <div class="right">
    <p>地址：北京市海淀区学院路37号<br> 
       邮编：100191<br>
       电话：82317114</p>
    </div>
  </div>
</div>
</template>

<script> 
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Vue from 'vue';
export default {
  name:'App',
  setup() {
      const showMenu =ref(false);
    const route = useRoute();
    const router = useRouter();
      return {showMenu,route, router};},
}

</script>

<style scoped>

  .img_top{
    height: 80px;
  }
  .header {
      position: absolute; /* 绝对定位 */
      top: 0; /* 从顶部开始 */
      left: 0; /* 从左边开始 */
      width: 100%; /* 宽度占满整个页面 */
      height: 80px; /* 设置高度 */
      background-color: #ffffff; /* 设置背景颜色 */
  }
  .avatar{
    position: absolute;
    top:10px;
    right: 50px;
  }
  .rowTitle{
    width: 100px;
    font-size: 10px;
  }
  .logo {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
  }
  
  .logo i {
    font-size: 32px;
    margin-right: 10px;
  }
  
  .user-info {
    align-items: center;
    cursor: pointer;
    z-index: 9999;
  }
  
  .user-info img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 60px;
  }
  
  .user-menu {
    position: absolute;
    top:70px;
    right: 0;
    width: 160px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.2);
  }
  
  .user-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .user-menu li {
    border-bottom: 1px solid #ccc;
  }
  
  .user-menu li:last-child {
    border-bottom: none;
  }
  
  .user-menu a {
    display: block;
    padding: 10px;
    color: #333;
  }
  .content {
    position: absolute;
    min-height: calc(100vh - 100px); /* 计算内容区域的最小高度 */
  }
  .user-menu a:hover {
    background-color:rgb(255, 255, 255);
  }
  .page-footer {
    position: absolute; /* 绝对定位 */
    bottom: 0; /* 从底部开始 */
    left: 0; /* 从左边开始 */
    width: 100%; /* 宽度占满整个页面 */
    height: 50px; /* 设置高度 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2px;
    background-color:rgb(255, 255, 255);
  }
  .page-footer .left p {
    margin-left: 50px;
    width: 300px;
    height: 50px;
    overflow: auto;
  }
  .img_bottom {
    height: 100px;
    left:550px;
  }
  .page-footer .right p {
    bottom: 0;
     margin-right: 20px;
    width: 300px;
    height: 50px;
    overflow: auto;
  }
  </style>