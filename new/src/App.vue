<template>
  <DemoTitle>
  </DemoTitle>
<router-view></router-view>
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
.demo-bottom-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
