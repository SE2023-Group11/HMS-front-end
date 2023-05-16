<template>
  <input type="button" value="gsdk" @click="sendtoback">
  <div id="app">
    <header>
      <p>
        <router-link to="/temp">Temp</router-link>
      </p>
      <p>
        <router-link to="/login">Login</router-link>
      </p>
      <p>
        <router-link to="/register">Register</router-link>
      </p>
      <p>
        <router-link to="/patientspace">PatientSpace</router-link>
      </p>
      <p>
        <router-link to="/doctorspace">DoctorSpace</router-link>
      </p>
      <p>
        <router-link to="/message">Message</router-link>
      </p>
      <p>
        <router-link to="/ForgetPwd">ForgetPwd</router-link>
      </p>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
export default {
  name: 'App',

  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },

  methods: {

    sendtoback() {
      console.log("fdfsdfsdfsdfsdfsdfsd");
      axios.post('http://121.199.161.134:8080/sendToEmail',
        "type=1&name='wesda'&email='1340585346@qq.com'"
      )
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style></style>


