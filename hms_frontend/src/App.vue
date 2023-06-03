<template>
 <router-view></router-view>
</template>

<script> 
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Vue from 'vue';
export default {
  name:'App',
  setup() {
    const route = useRoute();
    const router = useRouter();
      return {route, router};},
}

</script>

<style >
.body{
background-color: #f2f2f2;
}
  </style>