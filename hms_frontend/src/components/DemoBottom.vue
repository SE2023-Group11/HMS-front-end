<template>
    <div class="main">
      <div class="bottom">
        <div class="left">
          版权所有 2014-2022 北京航空航天大学<br />
          京ICP备05004617-3<br />
          文保网安备案号1101080018
        </div>
        <img class="img_bottom" src="../Pic/img.jpeg" />
        <div class="right">
          地址：北京市海淀区学院路37号<br />
          邮编：100191<br />
          电话：82317114
        </div>
      </div>
    </div>
  </template>
  <script>
    export default {
        name: 'DemoBottom',
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
  
  
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
      padding-top: 30px;
      border-top: 1px solid #ccc;
    }
  
    .left {
      font-size: 14px;
      line-height: 24px;
    }
  
    .right {
      font-size: 14px;
      line-height: 24px;
      text-align: right;
    }

    .img_bottom {
      height: 80px;
    }
  </style>
  