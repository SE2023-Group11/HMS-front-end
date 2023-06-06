<template>
  <div>
  <div class='body'>
          <div class="container" id="container">
            <div class="header">
              <img src="https://f.pz.al/pzal/2023/05/19/d218206d1e4dd.png" alt="" class="header_img"/>
              <h1 class="header_tag">HMS医院门诊预约系统</h1>
              <div class="header_user" @mouseenter="showList()" @mouseleave="unShowList()">
                <img v-bind:src="picture" alt="" class="header_user_img"/>
                <h1 class="header_user_word">{{ this.doctorName }}</h1>
               
                  <div id="triangle-down"></div>
                  <div id="header_list">
                    <div class="header_list_item" @click="goToDoctorSpace">个人主页</div>
                    <div class="header_list_item" @click="goToMessage">消息通知</div>
                    <div class="header_list_item" @click="goToDelete">账号注销</div>
                    <div class="header_list_item" @click="goToLogin">退出登录</div>
                  </div>
              </div>
          </div> 
              <div class="main">
                  <div class="Nav">
                    <p v-if="showingSchedule" class="navigate-black" @click="showAppointmentList" style="margin-left: 150px">  今日候诊  </p>
                    <p v-else class="navigate-white" @click="showAppointmentList" style="margin-left: 150px">  今日候诊  </p>
                    <p v-if="showingAppointmentList" class="navigate-black" @click="showSchedule" style="margin-left: 80px" >  排班信息  </p>
                    <p v-else class="navigate-white" @click="showSchedule" style="margin-left: 80px" >  排班信息  </p>
                    <p v-if="showingSchedule" class="red" style="margin-left: 150px;border-radius: 5px;">预约</p>
                    <p v-if="showingSchedule" class="orange" style="margin-left: 40px;border-radius: 5px;">门诊</p>
                    <p v-if="showingSchedule" class="green" style="margin-left: 40px;border-radius: 5px;">休息</p> 
                  </div>
                  <div v-if="showingAppointmentList" class ="appointmentLists" >
                    <table>
                      <thead>
                        <tr class ="appointmentListHead">
                          <th class ="deepGreen" width="200px">患者姓名</th>
                          <th class ="deepGreen" width="200px">预约时间</th>
                          <th class ="deepGreen" width="200px">患者信息</th>
                          <th class ="deepGreen" width="200px">预约状态</th>
                        </tr>
                      </thead>
                      <tbody ref="listWrapper">    
                        <tr style="border: 0.1px solid rgb(0, 105, 128);
                        border-radius: 10px;" v-for="(appointment, index) in appointmentList.data" :key="index">
                          <td align="center">{{ appointment.patientName }}</td>
                          <td align="center">{{ appointment.time_start.substr(-8)+"-"+appointment.time_end.substr(-8) }}</td>
                          <td align="center">
                            <div class="patient-label" @click="navigateToPatient(index)">
                              <button class="blueBtn">患者信息</button>
                            </div>  
                            </td>
                          <td align="center" style=" flex-direction: column">
                            <button  class="blueBtn"  v-if="appointment.status ===FALSE" @click="openNewWindow(index)">待完成</button>
                            <button  class="greenBtn" v-else>已完成</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-if="showingSchedule" class ="Schedule">
                    <table>
                      <thead>
                        <tr>
                          <th width="100px" ></th>
                          <th width="100px" >周一</th>
                          <th width="100px" >周二</th>
                          <th width="100px" >周三</th>
                          <th width="100px" >周四</th>
                          <th width="100px" >周五</th>
                          <th width="100px" >周六</th>
                          <th width="100px" >周日</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, rowIndex) in schedule.data" :key="rowIndex">
                          <td v-if="rowIndex===0" height="20px">08:00-08:30</td>
                          <td v-if="rowIndex===1" height="20px">08:30-09:00</td>
                          <td v-if="rowIndex===2" height="20px">09:00-09:30</td>
                          <td v-if="rowIndex===3" height="20px">09:30-10:00</td>
                          <td v-if="rowIndex===4" height="20px">10:00-10:30</td>
                          <td v-if="rowIndex===5" height="20px">10:30-11:00</td>
                          <td v-if="rowIndex===6" height="20px">11:00-11:30</td>
                          <td v-if="rowIndex===7" height="20px">14:00-14:30</td>
                          <td v-if="rowIndex===8" height="20px">14:30-15:00</td>
                          <td v-if="rowIndex===9" height="20px">15:00-15:30</td>
                          <td v-if="rowIndex===10" height="20px">15:30-16:00</td>
                          <td v-if="rowIndex===11" height="20px">16:00-16:30</td>
                          <td v-if="rowIndex===12" height="20px">16:30-17:00</td>
                          <td v-for="(cell, cellIndex) in row" :key="cellIndex" width="100px" height="20px" align="center" :class="{
                            red: cell=== '3',
                            orange: cell === '2',
                            green: cell ==='1'
                         }"> </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- <h2 style="text-align: left;padding-bottom:50px">新闻动态</h2> -->
                  <div v-if="showingAppointmentList" class="news-container">
                    <div class="carouselNewsImage">
                      <Carousel :value="news" :numVisible="1" :numScroll="1" circular :autoplayInterval="2000" >
                        <template #item="slotProps">
                          <div class="carousel-item">
                            <img :src="slotProps.data.img" alt="Image" style="width:400px;height: 350px;margin-top: 70px;"/>
                          </div>
                          <div style="text-align: center;">
                            {{ slotProps.data.body.slice(0,20) }}
                          </div>
                        </template>
                      </Carousel>
                    </div>
                    <div class="newsTitle">
                      <div v-for="item in news.slice(0, 4)" :key="item.id" class="news">
                        <div class="date">
                          <h1 style="font-size: 36px;"> {{item.date}}</h1>
                          <div style="font-size: 16px;">{{item.date}}</div>
                        </div>
                        <div class="title">
                          {{ item.body.slice(0,70) }}
                        </div>
                      </div>
                    </div>
                  </div>
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
  <script scoped>
    import axios from 'axios';
  import { defineComponent, ref } from 'vue';
  import { Button } from 'primevue/button';
  import { Card } from 'primevue/card';
  import { Listbox } from 'primevue/listbox';
  import { useRoute, useRouter } from 'vue-router';
  import Vue from 'vue';
 
       

  export default {
    name:'DoctorRoot',
    data() {
      return {
        token:sessionStorage.getItem('token'),
        picture: 'https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png',
        news:[],
        doctorName:null, 
        showingAppointmentList: true,
        showingSchedule: false,
        appointmentList: [
   ],
        schedule: {
   data:[[0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0],]
         }
      };
    },
    methods: {
      goToDelete() {
        
        if (confirm("您确定吗？")) {
          axios.post('http://121.199.161.134:8080/doctorDelete',null,{
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
  } },
    goToDoctorSpace() {
    this.$router.push('/doctorSpace')
    },
    goToLogin() {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
    this.$router.push('/login')
    },
    goToMessage() {
    this.$router.push('/message')
    },
    
     showList(){
         var list = document.getElementById("header_list");
         console.log("in");
         list.style.display = "block";
      },
       unShowList(){
          var list = document.getElementById("header_list");
          console.log("out");
          list.style.display = "none";
      },
      openNewWindow(index) {
        if (confirm("您确定吗？")) {
this.appointmentList.data[index].status=true;
this.sendMessage(index);
} else {
console.log("no")
}
      },
      showAppointmentList() {
        this.showingAppointmentList = true;
        this.showingSchedule = false;
        console.log(this.showingSchedule);
        console.log(this.showingAppointmentList);
      },
      showSchedule() {
        this.showingAppointmentList = false;
        this.showingSchedule = true;
        console.log(this.showingSchedule);
      },
      completeAppointment(index) {
        this.appointmentList[index].status =true;
      },
      navigateToPatient(index) {
        sessionStorage.setItem('patientId',this.appointmentList.data[index].patientId);
        console.log(this.token);

        window.open('http://localhost:8080/#/dPInfo', '_blank', 'width=1440px,height=960px');
      },
      sendMessage(index) {
        axios.post('http://121.199.161.134:8080/ChangeAppointmentStatus',null,{
          params: {
token:this.token,
orderId:this.appointmentList.data[index].orderId,
          }})
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      },
      getPatientName(index,id){
        axios.post('http://121.199.161.134:8080/getPatientName',null,{
          params: {
            token:this.token,
            patientId:id
          }})
        .then(response => {
          this.appointmentList[index].patientName=response.patientName;
        })
        .catch(error => {
          console.log(error);
        });
      },
    },
    mounted() {
        axios.post('http://121.199.161.134:8080/getAllNews')
            .then(response => {
                this.news = response.data.data;
            })
            .catch(error => {
                console.error(error);
            })
        axios.get('http://121.199.161.134:8080/getDoctorImg',{
            params: {
                token:this.token
            }
        })
            .then(response => {
                this.picture=response.data.data
                console.log(this.picture)
            })
            .catch(error => {
                // 处理错误的逻辑
                console.log("ass")
                console.error(error)
            })
      axios.get('http://121.199.161.134:8080/getDoctorInformation', {
            params: {
                token:this.token
            }
        })
            .then(response => {
                // 成功获取数据后的处理逻辑
                console.log(response.data)
                const info = response.data.data;
                this.doctorName = info.doctorName;
                console.log(this.doctorName)
            })
            .catch(error => {
                // 处理错误的逻辑
                console.error(error)
            })
      axios.post('http://121.199.161.134:8080/getAppointmentList',null,{
          params: {
            token:this.token,

          }})
        .then(response => {
          this.appointmentList = response.data;
       
        })
        .catch(error => {
          console.log(error);
        }),
      axios.post('http://121.199.161.134:8080/getSchedule',null,{
          params: {
           token:this.token,
           }})
        .then(response => {
        for(let i=0;i<13;i++){
  this.schedule.data[i][0]=response.data.data.mon1[i*2+1];
        }
        for(let i=0;i<13;i++){
  this.schedule.data[i][1]=response.data.data.tue1[i*2+1];
        }
        for(let i=0;i<13;i++){
  this.schedule.data[i][2]=response.data.data.wed1[i*2+1];
        }
        for(let i=0;i<13;i++){
  this.schedule.data[i][3]=response.data.data.thu1[i*2+1];
        }
        for(let i=0;i<13;i++){
  this.schedule.data[i][4]=response.data.data.fri1[i*2+1];
        }
        for(let i=0;i<13;i++){
  this.schedule.data[i][5]=response.data.data.sat1[i*2+1];
        }
        for(let i=0;i<13;i++){
  this.schedule.data[i][6]=response.data.data.sun1[i*2+1];
        }
        
        })
        .catch(error => {
          console.log(error);
        });
    },
  };
  
  
  
  </script>
  <style scoped>
  * {
      margin: 0;
      padding: 0;
  }
  .body {
      height: 100%;
  }
  .container {

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
      min-height: 600px;
      background-color: rgb(255, 255, 255);
  }
  .footer{
      height: 220px;
      width: 100%;
      margin-top: 160px;
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

      margin-top: 80px;
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
  .news-container{
    width:100%;
    height: 500px;
    position: relative;
    margin-top: 100px;
   display: flex; /* 将容器设置为flexbox布局 */
  flex-direction: row; /* 设置主轴方向为水平方向 */
 
  }
  .carouselNewsImage{
      width: 50%;
      height: 500px;
      position: relative;
      border: 1px solid #e0e0e0;
      box-shadow: 0 8px 16px rgba(0,0,0,0.18);
  
  }
  .newsTitle{
    position: relative;
    text-align: left;
    border: 1px solid #e0e0e0;
    width: 60%;
    height: 500px;
    background-color:rgba(78, 113, 229, 0);
      box-shadow: 0 8px 16px rgba(0,0,0,0.18);

}
.news{
  width: 100%;
  position: relative;
  height:20%;
  background-color: rgba(150, 223, 199, 0.435);
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: #2c3e50;

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
  .Nav {
      position: relative;
      display: flex;
      top: 20px;
      justify-content: flex-start;
      align-items: center;
      background-color: #ffffff00;
      color: rgb(255, 255, 255);
      width: 900px; /* 将导航栏的宽度设置为1000px */
      z-index: 100;
    }
      .navigate-black{
        padding: 0.5rem 0.5rem;
        border-radius: 9999px;
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: 0.025rem;
        text-transform: uppercase;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* 将边框半径设置为50%以创建椭圆形 */
     background: #ffffff;
     color: #333;
    z-index: 100;
    cursor: pointer;
    }
     .navigate-white{
      padding: 0.5rem 0.5rem;
      border-radius: 9999px;
      font-size: 1.2rem;
      font-weight: 500;
      letter-spacing: 0.025rem;
      text-transform: uppercase;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      background: #007bff;
      color: #ffffff;
      z-index: 100;
     
     }
      .appointmentListHead{
        width: 100%;
       
      }
      .rowTitle{
        width: 100px;
        font-size: 2px;
      }
      
      .green {
        background-color: #bff2ffaa;
        color: #ffffff;
      }
      
      .red {
        background-color: #0048fd4b;
        color: #ffffff;
        
      }
      
      .orange {
        background-color: #b0aeab4e;
        color: #ffffff;
      }
      .Schedule{
        border: 1px solid rgb(0, 98, 128);
      border-radius: 10px;
        position: relative; /* 相对定位，为表头设置绝对定位 */
        margin-top:50px; /* 设置最大高度 */
        overflow-y: auto; /* 允许垂直滚动 */
        z-index: 100;
      }
      .appointmentLists {
        border: 1px solid rgb(0, 105, 128);
      border-radius: 10px;
      display: flex;
        position: relative; /* 相对定位，为表头设置绝对定位 */
        margin-top:50px;
        max-height: 400px; /* 设置最大高度 */
        overflow-y: auto; /* 允许垂直滚动 */
        z-index: 100;
      }
      .deepGreen{
        border: 0.1px solid rgb(0, 105, 128);
       border-radius: 10px;
       text-align:center;
      }
      .blueBtn{
        background-color: #02afff8f;
        color: #fff;
        border: none;
        padding: 10px;
        width:80px;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .greenBtn{
        background-color: #02ff0a4e;
          color: #fff;
        border: none;
        width:80px;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;
        margin-bottom: 10px;
      }
      table {
        width: 100%; /* 将表格的宽度设置为 100% */
        border-collapse: collapse; /* 合并表格边框 */
      }
      
      thead {
        position: sticky; /* 设置表头为粘性定位 */
        top: 0; /* 将表头固定在顶部 */
        background-color: #fff; /* 设置表头的背景色为白色 */
      }
      th,
      tr {
        padding: 10px; /* 设置单元格的内边距为 10px */
        border: 0.1px solid #e7e5e554; /* 设置单元格的边框为 1px 实线灰色 */
      }
  </style>