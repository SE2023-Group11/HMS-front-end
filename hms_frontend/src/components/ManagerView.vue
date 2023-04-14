
<template>
    <input type="radio" id="room" value="科室" v-model="notifyType">科室
    <input type="radio" id="doctor" value="医生" v-model="notifyType">医生
    <input type="text" v-model="name">&nbsp;
    <button on-click="getInfo(notifyType, name)">查询</button>
    <h1>选择是 {{ notifyType }}</h1>
    <h1>输入信息为 {{ name }}</h1>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'

const notifyType = ref('');
const name = ref('')

function getRoomInfo(name)
{
    axios.post(
        'http://localhost:8080/getRoomInfo', 
        {roomName:name}
        ).then((s)=>{
            console.log(s)
        })
}

function getDoctorInfo(name)
{
    axios.post(
        'http://localhost:8080/getDoctorInfo', 
        {doctorName:name}
        ).then((s)=>{
            console.log(s)
        })

}

function getInfo(notifyType, name)
{
    if(notifyType=="科室")
    {
        console.log("科室")
        getRoomInfo(name)
    }
    else
    {
        console.log("医生")
        getDoctorInfo(name)
    }
}


</script>