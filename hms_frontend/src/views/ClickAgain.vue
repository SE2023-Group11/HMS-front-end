<template>
    <div>
      <p align="center">您确定吗</p>
    </div>
    <div align="center">
    <button>取消</button>
    <button @click="updateMessage">确认</button>
    </div>
  </template>
  
  <script >
  import { defineEmits, defineProps } from 'vue';
  
  export default {
    props: {
      message: {
  type: String,
        required: true
      }
    },
    emits: ['update-message'],
    setup(props, { emit }) {
      const updateMessage = () => {
        emit('update-message', 'true');
      };
  
      return {
        updateMessage
      };
    }
  };
  </script>