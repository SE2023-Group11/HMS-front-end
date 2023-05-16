<template>
  <DemoTitle>

  </DemoTitle>
  <input type="button" value="gsdk" @click="sendtoback">
  <input type="button" value="医生信息" class="niceButton btn1" @click="goToCheckDoctorInfo"> 
  <input type="button" value="预约挂号" class="niceButton btn2" @click="goToAddAppointment"> 
  <input type="button" value="我的预约" class="niceButton btn3" @click="goToMyAppointment"> 
   <div class="btns">
 <router-link to="/checkDoctorInfo">
 <input type=p value="医生信息1" class="niceButton btn1" @click="goToCheckDoctorInfo"> 
 </router-link> 
 <router-link to="/addAppointment">
 <input type="button" value="预约挂号1" class="niceButton btn2" @click="goToAddAppointment"> 
 </router-link>
 <router-link to="/checkMyAppointment">
 <input type="button" value="我的预约1" class="niceButton btn3" @click="goToMyAppointment"> 
 </router-link> 
</div>
  

    
  
  <div class="demo-bottom-container">
      <DemoBottom/>
  </div>

</template>


<script>
import { useRoute,useRouter } from 'vue-router';
import DemoBottom from './components/DemoBottom.vue';
import DemoTitle from './components/DemoTitle.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    DemoTitle,
    DemoBottom
  },
  setup() {
  const route = useRoute();
  const router = useRouter();
  return { route, router };
  },

  methods:{
    goToMyAppointment(){
      this.$router.push({name:'CheckMyAppointment'})
    },
    goToAddAppointment(){
      this.$router.push({name:'AddAppointment'})
    },
    goToCheckDoctorInfo(){
      this.$router.push({name:'CheckDoctorInfo'})
    },
     sendtoback() {

 console.log("fdfsdfsdfsdfsdfsdfsd");
axios.post('http://121.199.161.134:8080/sendToEmail',
"type=1&name='wesda'&email='1340585346@qq.com'"
)
.then(response => {
 console.log(response.data)
})
.catch(error => {
 console.error(error) })
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
.demo-bottom-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
