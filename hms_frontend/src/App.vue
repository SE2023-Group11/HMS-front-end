import axios from 'axios';
<template>
    <div class="header">
      <div class="logo">
        <i class="pi pi-hospital"></i>
        <span> 医院信息管理系统</span>
      </div>
      <div class="user-info" @mouseover="showMenu = true" @mouseleave="showMenu = false">
        <img class="avatar" src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="User Avatar"/>
        <div v-if="showMenu" class="user-menu">
          <ul>
            <li><a href="#">消息通知</a></li>
            <li><a href="#">退出登录</a></li>
            <li><a href="#">个人信息</a></li>
          </ul>
        </div>
      </div>
    </div>
  <div>
    <button @click="showAppointmentList">今日候诊</button>
    <button @click="showSchedule">排班信息</button>
    <div v-if="showingAppointmentList" class ="appointmentLists">
      <table>
        <thead>
          <tr class ="appointmentListHead">
            <th width="200px">患者姓名</th>
            <th width="200px">预约时间</th>
            <th width="200px">患者信息</th>
            <th width="200px">预约状态</th>
          </tr>
        </thead>
        <tbody>    
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
            <th>    </th>
            <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
            <th>周六</th>
            <th>周日</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="100px">上午</td>
            <td width="200px" align="center">{{ schedule.monday.morning }}</td>
            <td width="200px" align="center">{{ schedule.tuesday.morning }}</td>
            <td width="200px" align="center">{{ schedule.wednesday.morning }}</td>
            <td width="200px" align="center">{{ schedule.thursday.morning }}</td>
            <td width="200px" align="center">{{ schedule.friday.morning }}</td>
            <td width="200px" align="center">{{ schedule.saturday.morning }}</td>
            <td width="200px" align="center">{{ schedule.sunday.morning }}</td>
          </tr>
          <tr>
            <td width="100px">下午</td>
            <td width="200px" align="center">{{ schedule.monday.afternoon }}</td>
            <td width="200px" align="center">{{ schedule.tuesday.afternoon }}</td>
            <td width="200px" align="center">{{ schedule.wednesday.afternoon }}</td>
            <td width="200px" align="center">{{ schedule.thursday.afternoon }}</td>
            <td width="200px" align="center">{{ schedule.friday.afternoon }}</td>
            <td width="200px" align="center">{{ schedule.saturday.afternoon }}</td>
            <td width="200px" align="center">{{ schedule.sunday.afternoon }}</td>
          </tr>
          <tr>
            <td width="100px">晚上</td>
            <td width="200px" align="center">{{ schedule.monday.evening }}</td>
            <td width="200px" align="center">{{ schedule.tuesday.evening }}</td>
            <td width="200px" align="center">{{ schedule.wednesday.evening }}</td>
            <td width="200px" align="center">{{ schedule.thursday.evening }}</td>
            <td width="200px" align="center">{{ schedule.friday.evening }}</td>
            <td width="200px" align="center">{{ schedule.saturday.evening }}</td>
            <td width="200px" align="center">{{ schedule.sunday.evening }}</td>
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
    <div class="right">
    <p>地址：北京市海淀区学院路37号<br> 
       邮编：100191<br>
       电话：82317114</p>
    </div>
    </div>
  </div>
</template>

<script> 
import { defineComponent, ref } from 'vue';
import { Button } from 'primevue/button';
import { Card } from 'primevue/card';
export default {
  setup() {
      const showMenu = ref(false);
      return { showMenu };},
  data() {
    return {
      showingAppointmentList: true,
      showingSchedule: false,
      appointmentList: [ ],
      schedule: {
        monday: {
          morning: '出勤',
          afternoon: '出勤',
          evening: '休假'
        },
        tuesday: {
          morning: '出勤',
          afternoon: '休假',
          evening: '出勤'
        },
        wednesday: {
          morning: '休假',
          afternoon: '出勤',
          evening: '出勤'
        },
        thursday: {
          morning: '出勤',
          afternoon: '出勤',
          evening: '出勤'
        },
        friday: {
          morning: '出勤',
          afternoon: '出勤',
          evening: '出勤'
        },
        saturday: {
          morning: '出勤',
          afternoon: '休假',
          evening: '休假'
        },
        sunday: {
          morning: '休假',
          afternoon: '休假',
          evening: '休假'
        }
      }
    };
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
  },
  methods: {
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
  },
  mounted() {
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
      
  }
};
</script>

<style scoped>
  .appointmentListHead{
    width: 4000px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f5f5f5;
  }
  .avatar{
    position: fixed;
    right: 50px;
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
    background-color: #f5f5f5;
  }
  .footer {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    font-size: 1.2px;
    background-color:grey;
  }

  .footer .left p {
    position: fixed;
    bottom: 50px;
    left: 50px;
    width: 300px;
    height: 50px;
    overflow: auto;
  }

  .footer .right p {
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 300px;
    height: 50px;
    overflow: auto;
  }
  </style>