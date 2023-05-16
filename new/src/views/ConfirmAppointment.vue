<template>
  <DemoTitle/>

  <div class="appointment-info">
    <p>Patient ID: {{ patient_id }}</p>
    <p>Doctor ID: {{ doctor_id }}</p>
    <p>Date: {{ date }}</p>
    <p>Time Start: {{ time_start }}</p>
    <p>Time End: {{ time_end }}</p>
  </div>
  <div class="buttons">
    <button @click="confirmAppointment">确定预约</button>
    <button @click="cancelAppointment">取消预约</button>
  </div>

  <DemoBottom/>
</template>

<script>
import DemoBottom from '../components/DemoBottom.vue';
import DemoTitle from '../components/DemoTitle.vue';
import axios from 'axios';
export default {
  name:"ConfirmAppointment",
  components:{
    DemoBottom,
    DemoTitle
  },
  props: {
    patient_id: {
      type: String,
      required: true
    },
    doctor_id: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time_start: {
      type: String,
      required: true
    },
    time_end: {
      type: String,
      required: true
    }
  },
  methods: {
    confirmAppointment() {
      axios.post(`{{$baseURL}}/deleteAppointment`)////unfinished
      .then(response => {
          console.log(response);
      })
      .catch(error => {
          console.error(error);
      })
      this.$router.go(-1); // 返回上一页
    },
    cancelAppointment() {
      this.$router.go(-1); // 返回上一页
    }
  }
}
</script>

<style>
.appointment-info {
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.5;
}
.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0062cc;
}
</style>