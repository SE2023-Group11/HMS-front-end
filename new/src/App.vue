<template>
  <DemoTitle/>
  <div class="btns">
    <router-link to="/checkDoctorInfo">
      <input type="button" value="医生信息" class="niceButton btn1"> 
    </router-link> 
    <router-link to="/addAppointment">
      <input type="button" value="预约挂号" class="niceButton btn2"> 
    </router-link>
    <router-link to="/checkMyAppointment">
      <input type="button" value="我的预约" class="niceButton btn3" @click="goToMyAppointment"> 
    </router-link> 

  </div>
  <DemoBottom/>
  
</template>

<script>
import DemoBottom from './components/DemoBottom.vue';
import DemoTitle from './components/DemoTitle.vue';

export default {
  name: 'App',
  components: {
    DemoTitle,
    DemoBottom
  },
  methods:{
    goToMyAppointment(){
      this.$router.push({name:'CheckMyAppointment'})
    }
    
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btns {
            display: flex; /* 将三个按钮放在同一行 */
            justify-content: space-evenly; /* 让三个按钮均匀分布 */
}

.niceButton {
        background-color: #1795bb;
        border-radius: 12px;
        border: none;
        color: white;
        padding: 16px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 32px;
        margin: 4px 2px;
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
        cursor: pointer;
      }
      .niceButton:hover {
        background-color:blue;
        color: #1795bb;
        border: 1px solid #ccc;
      }


.btn1 {
  background-color: aqua;
  border-radius: 24px;
}
.btn2 {
  background-color: orange;
  border-radius: 24px;
}
.btn3 {
  background-color: purple;
  border-radius: 24px;
}
</style>
