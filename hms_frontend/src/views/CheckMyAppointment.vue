<template>
    <div class="container" id="container">
        <div class="header">
      <img src="https://f.pz.al/pzal/2023/05/19/d218206d1e4dd.png" alt="" class="header_img" />
      <h1 class="header_tag" style="font-family:Arial, Helvetica, sans-serif;font-size: 20px;">HMS医院门诊预约系统</h1>
      <div class="header_user" @mouseenter="showList" @mouseleave="unShowList">
        <!-- 显示头像 -->
        <img src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="" class="header_user_img" />
        <!-- 未登录时显示登录/注册 -->
        <!-- 登录后显示用户名 -->
        <h1 class="header_user_word">
          <div v-if="login === false">
            <router-link :to="'/login'" style="text-decoration: none;color:gray;">登录/注册</router-link>
          </div>
          <div v-else style="font-size: 18px;">
            {{ this.patientName }}
          </div>
        </h1>
        <div id="triangle-down"></div>
        <div id="header_list" ref="headerList">
          <div v-if="login===true">
            <div class="header_list_item" @click="goToPatientSpace">个人主页</div>
            <div class="header_list_item" @click="goToMessage">消息通知</div>
            <div class="header_list_item" @click="goToDelete">账号注销</div>
            <div class="header_list_item" @click="goToLogin">退出登录</div>
          </div>
          <div v-else>
            <div class="header_list_item" @click="alertLogin">个人主页</div>
            <div class="header_list_item" @click="alertLogin">消息通知</div>
            <div class="header_list_item" @click="alertLogin">账号注销</div>
            <div class="header_list_item" @click="alertLogin">退出登录</div>
          </div>
          
        </div>
      </div>
    </div>
      <div class="main">
        <div class="globalMenu">
            <img alt="user header" src="../Pic/导航图标.png" style="width: 20px;height:30px;" />
            &nbsp;
            <router-link :to="'/PatientRoot'" style="text-decoration: none;color:gray;">首页</router-link>
            &nbsp;>&nbsp;
            <router-link :to="'/CheckMyAppointment'" style="text-decoration: none;color:gray;">我的预约</router-link>
        </div>

        <div class="table">
            <DataTable :value="appointments" v-model:filters="filters">
                <template #header>
                    <div class="search-container">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-tooltip.top="'输入关键词'" v-model="filters['global'].value" placeholder="全表搜索" />
                        </span>
                    </div>
                </template>

                <template #empty> 暂无符合条件的预约记录 </template>
                <template #loading> 正在加载，请稍后 </template>
                <div class="content-container">
                    <Column field="orderId" header="预约id" sortable filterBy="orderId" :globalFilter="filters['global'].value"></Column>
                    <Column field="patientId" header="患者id" sortable filterBy="patientId" :globalFilter="filters['global'].value"></Column>
                    <Column field="doctorId" header="医生id" sortable filterBy="doctorId" :globalFilter="filters['global'].value"></Column>
                    <Column field="day" header="日期" sortable filterBy="day" :globalFilter="filters['global'].value"></Column>
                    <Column field="time_start" header="开始时间" filterBy="time_start" :globalFilter="filters['global'].value">
                        <template #body="slotProps">
                            {{ removeTAndBefore(slotProps.data.time_start) }}
                        </template>
                    </Column>
                    <Column field="time_end" header="结束时间" filterBy="time_end" :globalFilter="filters['global'].value">
                        <template #body="slotProps">
                            {{ removeTAndBefore(slotProps.data.time_end) }}
                        </template>
                    </Column>
                    <Column field="orderStatus" header="预约状态" filterBy="orderStatus" :globalFilter="filters['global'].value">
                        <template #body="slotProps">
                            <Tag :value="getStatusValue(slotProps.data.orderStatus)" :severity="getSeverity(slotProps.data.orderStatus)" />
                        </template>
                    </Column>
                    <Column header="取消预约">
                        <template #body="data">
                            <div v-if="data.data.orderStatus === 3">
                                <Button icon="pi pi-times" label="取消预约" severity="warning" size="small" v-tooltip="'点击取消该预约'" @click="deleteAppointment(data.data.orderId)" />
                            </div>
                            <div v-if="data.data.orderStatus === 1">
                                <Button icon="pi pi-times" label="无法取消" severity="success" size="small" v-tooltip="'点击取消该预约'" disabled @click="deleteAppointment(data.data.orderId)" />
                            </div>
                            
                            <div v-else>
                                <Button icon="pi pi-times" label="无法取消" severity="danger" size="small" v-tooltip="'无法取消该预约'" disabled/>
                            </div>
                        </template>
                    </Column>       
                </div>
            </DataTable>
        </div>
        <!-- 这里写网页主要内容 -->
            
        <div class="tips">
            <Tag value="医生手动确认后就诊即完成" severity="success"></Tag>
            <Tag value="必须在约定时间一天前取消预约" severity="warning"></Tag>
            <Tag value="每月失约两次以上会被限制" severity="danger"></Tag>
        </div> 
            
      </div>
      <div class="footer">
        <div class="footer_box">
          <ul class="footer_list_box">
            <li>
              <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_1.png" alt="" />
              <span>电话：010-82317114</span>
            </li>
            <li>
              <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_2.png" alt="" />
              <span>传真：010-82328136</span>
            </li>
            <li>
              <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_3.png" alt="" />
              <span>邮编：100191</span>
            </li>
            <li>
              <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_4.png" alt="" />
              <span>地址：北京市海淀区学院路37号</span>
            </li>
          </ul>
        </div>
        <!-- <img src="./logo.png" alt="" class="footer_img"> -->
        <div class="footer_item">Copyright ©️ 2023-2033</div>
        <div class="footer_item">HMS Powered by SEGroup11</div>
        <div class="footer_item">HMS Designed by AlpaCa</div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
      name:'CheckMyAppointment',
      data() {
          return {
                appointments: [],
                filters: {
                    global: { value: "" }
                },
                token: sessionStorage.getItem('token'),
                role: sessionStorage.getItem('role'),
                login: false,
                patientName: null
          }
      },
      methods: {
        goToPatientSpace() {
            this.$router.push('/patientSpace')
        },
        goToDelete() {
            if (confirm("您确定吗？")) {
        axios.post('http://121.199.161.134:8080/zhuxiaoPatient',null,{
        params:{
            token: this.token
        }
    })
        .then(response => {
            console.log(response.data)
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('token');
            this.$router.push('/login')
        })
        .catch(error => {
            console.error(error)
        })
    }
        },
        goToLogin() {
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('token');
        this.$router.push('/login')
        },
        goToMessage() {
            this.$router.push('/message')
        },
          removeTAndBefore(str) {
              const index = str.indexOf('T');
              return str.substring(index + 1);
          },
          deleteAppointment(orderId) {
              axios.delete(`http://121.199.161.134:8080/deleteAppointment`,{
                  params:{
                      token:this.token,
                      orderId:orderId
                  }
              })
              .then(response => {
                  if(response.data.code == 0)
                  {
                      alert(response.data.msg+"，取消失败");
                  }else{
                      alert("成功取消预约");
                      this.getPatientAppointment();
                  }       
              })
              .catch(error => {
                  console.error(error);
              })
          },
          getPatientAppointment(){
              axios.get('http://121.199.161.134:8080/getPatientAppointment',{
                  params:{
                      token: this.token
                  }
              })
              .then(response => {
                  this.appointments = response.data.data;
              })
              .catch(error => {
                  console.log(error);
              });
          },
          getSeverity(orderStatus){
            if (orderStatus === 1) {
                return "success";
            } else if (orderStatus === 2) {
                return "danger";
            } else if (orderStatus === 3) {
                return "warning";
            } else {
                return "";
            }
          },
          getStatusValue(orderStatus) {
            if (orderStatus === 1) {
                return "已完成";
            } else if (orderStatus === 2) {
                return "已失约";
            } else if (orderStatus === 3) {
                return "待就诊";
            } else {
                return "";
            }
        },
        judgeLogin(){
            if(this.token === null)
            {
                return false;
            }   
            else 
                return true;
        },
        getPatientInfo(){
            axios.get('http://121.199.161.134:8080/getPatientInformation',{
                params:{
                token:this.token
                }
            })
            .then(response => {
                this.patientName = response.data.data.patientName;
            })
            .catch(error => {
                console.log(error);
            })  
        },
          showList() {
            var list = this.$refs.headerList;
            list.style.display = "block";
          },
          unShowList() {
            var list = this.$refs.headerList;
            list.style.display = "none";
          },
      },
      mounted() {
        this.login = this.judgeLogin();
        if(this.login === false){
            alert("请先登录");
            this.$router.go(-1);
        }
        this.getPatientInfo();
        this.getPatientAppointment();
      }
  }
  
  </script>
  
  
  
  <style scoped>
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
  .header{
    height: 80px;
    width: 100%;
    padding-top: 15px;
    /*background-color: whitesmoke;*/
    /* background-color: #ECEBEB; */
    background-color: white;
    /*position: fixed;*/
    z-index: 10;
    position:relative;
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
    background-color: #c0c0c1;
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
.search-container {
  position: relative;
  top: 0px;
  left: 760px;
  margin: 10px;
}
.tips {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.tips Tag {
  flex: 1;
  margin-right: 10px;
}
.globalMenu{
    position: relative;
    width:300px;
    height: 40px;
    margin-bottom: 10px;
    margin-left: 10px;
    text-align: left;
}

  </style>