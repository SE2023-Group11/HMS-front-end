<template>
    <demo-title/>

    <div id="app">
          <table>
            <thead>
              <tr>
                <th>预约id</th>
                <th>患者id</th>
                <th>医生id</th>
                <th>日期</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>预约状态</th>
              </tr>
            </thead>
            <h3>历史预约：</h3>
            <hr>
            <tbody>
              <tr v-for="appointment in appointments" :key="appointment.orderId">
                <td>{{ appointment.orderId }}</td>
                <td>{{ appointment.patientId }}</td>
                <td>{{ appointment.doctorId }}</td>
                <td>{{ appointment.date }}</td>
                <td>{{ appointment.time_start }}</td>
                <td>{{ appointment.time_end }}</td>
                <td>{{ appointment.orderStatus }}</td>
              </tr>
            </tbody>
          </table>
        </div>
    



    <demo-bottom/>
</template>

<script>
import DemoBottom from '../components/DemoBottom.vue';
import DemoTitle from '../components/DemoTitle.vue';
import axios from 'axios';

export default {
    name:'CheckMyAppointment',
    components: { 
        DemoBottom,
        DemoTitle 
    },
    data() {
        return {
            appointments: [],
        }
    },
    methods: {
        cancelAppointment(appointment) {
        if (appointment.orderStatus === '待就诊') {
            console.log("预约状态是待就诊，可以取消预约！");
        } else {
            alert("预约状态不是待就诊，无法取消预约！");
        }
        },
    },
    mounted() {
        axios.get('http://121.199.161.134:8080/getPatientAppointments')
        .then(response => {
            this.appointments = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    }
}


</script>

<style>

</style>