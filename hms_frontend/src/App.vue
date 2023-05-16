<template>
    <div class="header">
      <div class="logo">
        <i class="pi pi-hospital"></i>
        <img class="img_top" src="./Pic/img.jpeg" />
        <span display="flex" >医院信息管理系统</span>
      </div>
      <div class="user-info" @mouseover="showMenu = true" @mouseleave="showMenu = false">
        <img class="avatar" src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="User Avatar"/>
        <div v-if="showMenu" class="user-menu">
          <ul>
            <li> <router-link to="/message">消息通知</router-link></li>
            <li><a href="#">退出登录</a></li>
            <li><a href="#">个人信息</a></li>
          </ul>
        </div>
      </div> 
    </div>
  <div>
   <form class="Nav">
    <p></p>
    <p v-if="showingSchedule" class="navigate-black" @click="showAppointmentList" >  今日候诊  </p>
    <p v-else class="navigate-white" @click="showAppointmentList">  今日候诊  </p>
    <p v-if="showingAppointmentList" class="navigate-black" @click="showSchedule"  >  排班信息  </p>
    <p v-else class="navigate-white" @click="showSchedule" >  排班信息  </p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
   </form>
    <div v-if="showingAppointmentList" class ="appointmentLists" ref="listContainer">
      <table>
        <thead>
          <tr class ="appointmentListHead">
            <th width="200px">患者姓名</th>
            <th width="200px">预约时间</th>
            <th width="200px">患者信息</th>
            <th width="200px">预约状态</th>
          </tr>
        </thead>
        <tbody ref="listWrapper">    
          <tr v-for="(appointment, index) in appointmentList" :key="index">
            <td align="center">{{ appointment.patientName }}</td>
            <td align="center">{{ appointment.appointmentTime }}</td>
            <td align="center">
              <div class="patient-label" @click="navigateToPatient">
                {{ labelText }}
              </div>
              </td>
            <td align="center">
              <button v-if="appointment.status === '待完成'" @click="completeAppointment(index)">待完成</button>
              <button v-else>已完成</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showingSchedule" class ="Schedule">
      <table>
        <thead>
          <tr>
            <th class="rowTitle">    </th>
            <th class="rowTitle">8:00-8:30</th>
            <th class="rowTitle">8:30-9:00</th>
            <th class="rowTitle">9:00-9:30</th>
            <th class="rowTitle">9:30-10:00</th>
            <th class="rowTitle">10:00-10:30</th>
            <th class="rowTitle">10:30-11:00</th>
            <th class="rowTitle">11:00-11:30</th>
            <th class="rowTitle">14:00-14:30</th>
            <th class="rowTitle">14:30-15:00</th>
            <th class="rowTitle">15:00-15:30</th>
            <th class="rowTitle">15:30-16:00</th>
            <th class="rowTitle">16:00-16:30</th>
            <th class="rowTitle">16:30-17:00</th> 
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="100px" >周一</td>
            <td v-for="i in 14" :key="i--" width="100px" align="center" :class="{
              orange: schedule.mon1[i]=== 3,
              green: schedule.mon1[i] === 2,
              white: schedule.mon1[i] ===1
           }" > </td>
          </tr>
          <tr>
            <td width="100px">周二</td>
            <td v-for="i in 14" :key="i--" width="100px" align="center" :class="{
              'orange': schedule.tue1[i] === 3,
              'green': schedule.tue1[i] === 2,
              'white': schedule.tue1[i] ===1
           }" > </td>
          </tr>
          <tr>
            <td width="100px">周三</td>
            <td v-for="i in 14" :key="i--" width="100px" align="center" :class="{
              'orange': schedule.wed1[i] === 3,
              'green': schedule.wed1[i] === 2,
              'white': schedule.wed1[i] ===1
           }" > </td>
          </tr>
            <tr>
            <td width="100px">周四</td>
            <td v-for="i in 14" :key="i--" width="100px" align="center" :class="{
              'orange': schedule.thu1[i] === 3,
              'green': schedule.thu1[i] === 2,
              'white': schedule.thu1[i] ===1
           }" > </td>
          </tr>
            <tr>
            <td width="100px">周五</td>
            <td v-for="i in 14" :key="i--" width="100px" align="center" :class="{
              'orange': schedule.fri1[i] === 3,
              'green': schedule.fri1[i] === 2,
              'white': schedule.fri1[i] ===1
           }" > </td>
          </tr>
            <tr>
            <td width="100px">周六</td>
            <td v-for="i in 14" :key="i--" width="100px" align="center" :class="{
              'orange': schedule.sat1[i] === 3,
              'green': schedule.sat1[i] === 2,
              'white': schedule.sat1[i] ===1
           }" > </td>
          </tr>
            <tr>
            <td width="100px">周日</td>
            <td v-for="i in 14" :key="i--" width="100px" align="center" :class="{
              'orange': schedule.sun1[i] === 3,
              'green': schedule.sun1[i] === 2,
              'white': schedule.sun1[i] ===1
           }" > </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="content">
    <div class="footer">
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
import { Button } from 'primevue/button';
import { Card } from 'primevue/card';
import { Listbox } from 'primevue/listbox';
import { useRoute, useRouter } from 'vue-router';
import Vue from 'vue';
export default {
  name:'App',
  setup() {
      const showMenu = ref(false);
      const route = useRoute();
    const router = useRouter();
      return { showMenu,route, router};},
  data() {
    return {
      showingAppointmentList: true,
      showingSchedule: false,
      appointmentList: [{
  "patientName": "张三",
  "patientId":100001,
  "time_end": "2023-05-11T09:30:00",
  "time_start": "2023-05-11T09:00:00"
} ],
      schedule: {mon1:[2,2,2,2,2,2,2,2,2,2,2,2,2],
tue1:[2,2,2,2,2,2,2,2,2,2,2,2,2],
wed1:[2,2,2,2,2,2,2,2,2,2,2,2,2],
thu1:[2,2,2,2,2,2,2,2,2,2,2,2,2],
fri1:[2,2,2,2,2,2,2,2,2,2,2,2,2],
sat1:[2,2,2,2,2,2,2,2,2,2,2,2,2],
sun1:[2,2,2,2,2,2,2,2,2,2,2,2,2] }
    };
  },
  computed: {
    showScrollbar() {
      return this.appointmentList.length > 5
    }
  },
  props: {
    patientId: {
      type: Number,
      required: true,
    },
    labelText: {
      type: String,
      default: '患者信息',
    },
  },
  components: {
    Button,
    Card,
    Listbox,
  },
  methods: {
    goToSendMessage() {
      this.$router.push('/message')
    },
    showAppointmentList() {
      this.showingAppointmentList = true;
      this.showingSchedule = false;
    },
    showSchedule() {
      this.showingAppointmentList = false;
      this.showingSchedule = true;
    },
    completeAppointment(index) {
      this.appointmentList[index].status = '已完成';
    },
    navigateToPatient() {
      console.log(`Navigating to patient ${this.patientId}`);
    },
    sendMessage() {
      axios.post('/ChangeAppointmentStatus', {
        OrderId: this.OrderId
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    },
    getPatientId(index,id){
      axios.post('/ChangeAppointmentStatus', {
        patientId: id
      })
      .then(response => {
        this.appointmentList[index].patientName=response.patientName;
      })
      .catch(error => {
        console.log(error);
      });
    },
    getPatientInfo(index,id){
      axios.post('/ChangeAppointmentStatus', {
        patientId: id
      })
      .then(response => {
        this.appointmentList[index].patientName=response.patientName;
      })
      .catch(error => {
        console.log(error);
      });
    },
    initListScroll() {
      const listWrapper = this.$refs.listWrapper
      const listContainer = this.$refs.listContainer
      listContainer.style.overflowY = 'scroll'
      listWrapper.style.paddingRight = `${listContainer.offsetWidth - listWrapper.offsetWidth}px`
    }
  },
  mounted() {
    if (this.showScrollbar) {
      this.initListScroll()
    }
    axios.post('/appointmentList')
      .then(response => {
        this.appointmentList = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    axios.post('/schedule')
      .then(response => {
        this.schedule = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.Nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff00;
  color: rgb(255, 255, 255);
}
  .navigate-black{
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.025rem;
    text-transform: uppercase;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* 将边框半径设置为50%以创建椭圆形 */
 background: #ffffff;
 color: #333;
}
 .navigate-white{
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  background: #007bff;
  color: #ffffff;
 }
  .img_top{
    height: 80px;
  }
  .appointmentListHead{
    width: 2000px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    height:60px;
  }
  .avatar{
    position: fixed;
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
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }
  
  .user-info img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 60px;
  }
  
  .user-menu {
    position: absolute;
    bottom:-155px;
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
  
  .user-menu a:hover {
    background-color:rgb(255, 255, 255);
  }
  .footer {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    font-size: 1.2px;
    background-color:rgb(255, 255, 255);
  }

  .footer .left p {
    position: fixed;
    bottom: 50px;
    left: 50px;
    width: 300px;
    height: 50px;
    overflow: auto;
  }
  .img_bottom {
    position: fixed;
    bottom: 50px;
    height: 100px;
    left:500px;
  }
  .footer .right p {
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 300px;
    height: 50px;
    overflow: auto;
  }
  .white {
    background-color: #fef2f2;
    color: #e53e3e;
  }
  
  .orange {
    background-color: #eff6ff;
    color: #3b82f6;
  }
  
  .green {
    background-color: #f0fdf4;
    color: #10b981;
  }
  </style>