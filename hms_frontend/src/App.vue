<template>
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
        <router-link to="/space">Space</router-link>
      </p>
      <p>
        <router-link to="/selfmessage">Selfmessage</router-link>
      </p>
      <p>
        <router-link to="/changemessage">Changemessage</router-link>
      </p>
      <p>
        <router-link to="/message">Message</router-link>
      </p>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'App',

  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  }
}
</script>

<style></style>
