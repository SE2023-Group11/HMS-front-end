<template>
    <br/>
    <div class="card flex justify-content-center">
        <div class="flex flex-wrap gap-1">
            <div class="flex align-items-center">
                <RadioButton v-model="notifyType" inputId="room" value="科室" />
                <label for="room" class="ml-2">&nbsp;科室</label>&nbsp;&nbsp;
                <RadioButton v-model="notifyType" inputId="doctor" value="医生" />
                <label for="doctor" class="ml-2">&nbsp;医生</label>
            </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <InputText type="text" v-model="name" class="p-inputtext-sm"/>&nbsp;
        <Button @click="getInfo" class="p-button-sm">查询</Button>
    </div>
    <br/>
    <div v-show="showAll">
        <div v-show="showRoom">
            <RoomInfo :name="name" :info="roomInfo"/>
        </div>
        <div v-show="showDoctor">
            <DoctorInfo :name="name" :info="doctorInfo"/>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import axios from 'axios'
import RoomInfo from './RoomInfo.vue'
import DoctorInfo from './DoctorInfo.vue'

import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';

let notifyType = ref('');
let name = ref('')
let roomInfo = ref('')
let doctorInfo = ref(new Object())
let showAll = ref(false)
let showRoom = ref(false)
let showDoctor = ref(false)
let token = "eyJhbGciOiJIUzI1NiJ9.eyJub3dMb2dnZWRJblR5cGUiOiJub3dMb2dnZWRJblR5cGVBZG1pbiIsIm5vd0xvZ2dlZEluSWQiOiIxIiwiaWF0IjoxNjg0NzQ2OTQxLCJleHAiOjE2ODY1NDY5NDF9.npgDMKJW-7zrsoAlBmdtuWbQNqzhi_0bBzjXieLqKu8"

watchEffect(()=>{
    name.value = ""
    showAll.value = false
    if(notifyType.value=="科室") {
        showRoom.value = true
        showDoctor.value = false
    }
    else if(notifyType.value=="医生") {
        showRoom.value = false
        showDoctor.value = true
    }
    else {
        showRoom.value = false
        showDoctor.value = false
    }
})

watchEffect(()=>{
    if(name.value!=null)
    {
        showAll.value = false
    }
})

function getRoomInfo()
{
    console.log(name.value)
    axios({
        method: 'post',
        url: 'http://121.199.161.134:8080/getRoomInfo',
        params:{
            roomName:name.value
            
        }
    }).then((s)=>{
        console.log(s)
        if(s.data.code==0)
        {
            window.alert("请求错误，原因为"+s.data.msg)
        }
        else
        {
            roomInfo.value = s.data.data
            showAll.value = true
        }
    }).catch((err)=>{
        window.alert("请求错误，原因为"+err)
    })
}

function getDoctorInfo()
{
    axios({
        method: 'post',
        url: 'http://121.199.161.134:8080/getDoctorInfo',
        params:{
            doctorName:name.value,
            token:token
        }
        }).then((s)=>{
            console.log(s)
            if(s.data.code==0)
        {
            window.alert("请求错误，原因为"+s.data.msg)
        }
        else if(s.data.data.length==0)
        {
            window.alert("医生不存在")
        }
        else
        {
            doctorInfo.value = s.data.data[0]
            console.log(doctorInfo.value)
            showAll.value = true
        }
    }).catch((err)=>{
        window.alert("请求错误，原因为"+err)
    })
}

function getInfo()
{
    if(notifyType.value=="科室")
    {
        console.log("科室")
        getRoomInfo()
    }
    else
    {
        console.log("医生")
        getDoctorInfo()
    }
}

</script>

<style>
.vert-middle {
    text-align: center;
}
</style>