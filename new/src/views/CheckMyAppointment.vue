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
                <th>取消预约</th>
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
                <td>
                    <input v-if = "appointment.orderStatus == 3" type="button" value="取消预约" @click="deleteAppointment(appointment.orderId)">
                    <input v-else type="text" value="无法取消">
                </td>
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
        deleteAppointment(orderId) {
        axios.delete(`{{$baseURL}}/deleteAppointment/${orderId}`)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        })
        },
    },
    mounted() {
        axios.get('{{$baseURL}}/getPatientAppointments')
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