<template>
    <div class="main">
      <div class="title">
        <img class="img_top" src="../Pic/img.jpeg" />
        <div class="text">医院信息管理系统(患者端)           </div>
        <img src="../Pic/img2.png" alt="" class="img_peo" />
      </div>
      <hr>
    </div>
  </template>

  <script>
    export default {
        name: 'DemoTitle',
        props: {
            msg: String
        }
    }
  </script>
  
  <style>
    .main {
      max-width: 1200px;
      margin: 0 auto;
    }
  
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
  
    .text {
      font-size: 36px;
      font-weight: bold;
      margin-left: 20px;
    }
  
   
  
    .img_top,
    .img_peo{
      height: 80px;
    }
  </style>
  