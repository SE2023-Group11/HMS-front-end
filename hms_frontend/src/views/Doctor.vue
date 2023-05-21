<template>
<div>
  <button @click="test">asaf</button>
  <div class="Nav">
    <p v-if="showingSchedule" class="navigate-black" @click="showAppointmentList" style="margin-left: 150px">  今日候诊  </p>
    <p v-else class="navigate-white" @click="showAppointmentList" style="margin-left: 150px">  今日候诊  </p>
    <p v-if="showingAppointmentList" class="navigate-black" @click="showSchedule" style="margin-left: 80px" >  排班信息  </p>
    <p v-else class="navigate-white" @click="showSchedule" style="margin-left: 80px" >  排班信息  </p>
    <p v-if="showingSchedule" class="red" style="margin-left: 150px;border-radius: 5px;">预约</p>
    <p v-if="showingSchedule" class="orange" style="margin-left: 40px;border-radius: 5px;">门诊</p>
    <p v-if="showingSchedule" class="green" style="margin-left: 40px;border-radius: 5px;">休息</p> 
  </div>
    <div v-if="showingAppointmentList" class ="appointmentLists" ref="listContainer">
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
          border-radius: 10px;" v-for="(appointment, index) in appointmentList" :key="index">
            <td align="center">{{ appointment.patientName }}</td>
            <td align="center">{{ appointment.time_start.substr(-8)+"-"+appointment.time_end.substr(-8) }}</td>
            <td align="center">
              <div class="patient-label" @click="navigateToPatient">
                <button>患者信息</button>
              </div>
              </td>
            <td align="center">
              <button  class="blueBtn" v-if="appointment.status ===FALSE" @click="openNewWindow">待完成</button>
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
            <td v-if="rowIndex===0" height="20px">8:00-8:30</td>
            <td v-if="rowIndex===1" height="20px">8:30-9:00</td>
            <td v-if="rowIndex===2" height="20px">9:00-9:30</td>
            <td v-if="rowIndex===3" height="20px">9:30-10:00</td>
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
              red: cell=== 3,
              orange: cell === 2,
              green: cell ===1
           }"> </td>
          </tr>
        </tbody>
      </table>
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
  name:'Doctor',
  setup() {
      const showMenu = ref(false);
      return { showMenu};},
  data() {
    return {
      showingAppointmentList: true,
      showingSchedule: false,
      appointmentList: [{
  "patientName": "张三",
  "patientId":100001,
  "time_end": "2023-05-11T09:30:00",
  "time_start": "2023-05-11T09:00:00"
},{
  "patientName": "李四",
  "patientId":100001,
  "time_end": "2023-05-11T09:30:00",
  "time_start": "2023-05-11T09:00:00"
} ],
      schedule: {   data:[[1, 2, 3, 1, 2, 3, 1],
        [2, 3, 1, 2, 3, 1, 2],
        [3, 1, 2, 3, 1, 2, 3],
        [1, 2, 3, 1, 2, 3, 1],
        [2, 3, 1, 2, 3, 1, 2],
        [3, 1, 2, 3, 1, 2, 3],
        [1, 2, 3, 1, 2, 3, 1],
        [2, 3, 1, 2, 3, 1, 2],
        [3, 1, 2, 3, 1, 2, 3],
        [1, 2, 3, 1, 2, 3, 1],
        [2, 3, 1, 2, 3, 1, 2],
        [3, 1, 2, 3, 1, 2, 3],
        [1, 2, 3, 1, 2, 3, 1]]}
    };
  },
  computed: {
    showScrollbar() {
      return this.appointmentList.length > 5
    }
  },
  props: {
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
    openNewWindow() {
      window.open('/clickAgain', '_blank', 'width=300,height=200');
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
      this.appointmentList[index].status =true;
    },
    navigateToPatient() {
      window.open('/selfSpace', '_blank', 'width=800,height=400');
    },
    sendMessage() {
      axios.post('http://121.199.161.134:8080/ChangeAppointmentStatus',null,{
        params: {
          token:"sad"
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
          token:"sad",
          patientId:id
        }})
      .then(response => {
        console.log("as");
        this.appointmentList[index].patientName=response.patientName;
      })
      .catch(error => {
        console.log(error);
      });
    },
    test(){
      axios.post('http://121.199.161.134:8080/getAppointmentList',null,{
        params: {
          token:'sad'
        }})
      .then(response => {
        console.log("asad");
        console.log(response);
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
    axios.post('http://121.199.161.134:8080/getAppointmentList',null,{
        params: {
          token:'sad'
        }})
      .then(response => {
        this.appointmentList = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    axios.post('http://121.199.161.134:8080/getSchedule',null,{
        params: {
        }})
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
  position: absolute;
  display: flex;
  top: 80px;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff00;
  color: rgb(255, 255, 255);
  width: 900px; /* 将导航栏的宽度设置为1000px */
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
 }
  .appointmentListHead{
    width: 2000px;
   
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
    left:150px;
    top:150px; /* 设置最大高度 */
    overflow-y: auto; /* 允许垂直滚动 */
  }
  .appointmentLists {
    border: 1px solid rgb(0, 105, 128);
  border-radius: 10px;
    position: relative; /* 相对定位，为表头设置绝对定位 */
    top:150px;
    left:150px;
    max-height: 400px; /* 设置最大高度 */
    overflow-y: auto; /* 允许垂直滚动 */
  }
  .deepGreen{
    border: 0.1px solid rgb(0, 105, 128);
   border-radius: 10px;
   text-align:center;
  }
  .blueBtn{
    border-radius: 10px;
    background-color: #02afff8f;
  }
  .greenBtn{
    border-radius: 10px;
    background-color: #02ff0a4e;
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
    padding: 1px; /* 设置单元格的内边距为 10px */
    border: 0.1px solid #e7e5e554; /* 设置单元格的边框为 1px 实线灰色 */
    text-align: left; /* 将单元格中的文本左对齐 */
  }
  </style>