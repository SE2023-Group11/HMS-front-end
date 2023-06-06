<template>
    <div style="margin-top: 20px;">
        <div style="width: 20%; position: absolute; left: 12%;">
            <div class="card flex justify-content-center">
                <Listbox v-model="firstRoom" :options="firstRooms" optionLabel="name" class="w-full md:w-14rem" @change="func1"/>
            </div>
        </div>
        <div style="width: 30%; position: absolute; left: 21%;" v-show="showSecond">
            <div class="card flex justify-content-center">
                <Listbox v-model="secondRoom" :options="secondRooms" optionLabel="name" class="w-full md:w-14rem" @change="func2" style="z-index: 1;"/>
            </div>
        </div>
        <div style="position: absolute; left: 30%; height: 400px;" v-show="showDoctors">
            <DoctorChart :doctors="doctors" style="z-index: 0;"/> 
        </div>
    </div>
    
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import Listbox from 'primevue/listbox'
import axios from 'axios';
import emitter from './bus';
import DoctorChart from './doctorChart.vue';

let firstRoom = ref({})
let secondRoom = ref({})
let firstRooms = ref([])
let secondRooms = ref([])
let doctors = ref([])

let beforeFirst = ref({})

let showSecond = ref(false)
let showDoctors = ref(false)

function func1(){
    console.log(firstRoom)
    let id = ""
    if(firstRoom.value==undefined)
    {
        id = beforeFirst.value.id
    }
    else
    {
        id = firstRoom.value.id
    }
    axios({
        method: 'post',
        url: 'http://121.199.161.134:8080/getSecondRoomsByFID',
        params: {
            id: id
        }
    }).then((res)=>{
        console.log(res)
        secondRooms.value = res.data.data
        beforeFirst.value = firstRoom.value
    })
    showSecond.value = true
}

function func2(){
    showDoctors.value = true
    emitter.emit("roomName", secondRoom)
    showSecond.value = false
    axios({
        method: 'get',
        url: 'http://121.199.161.134:8080/getDoctorsByRoom',
        params: {
            roomName: secondRoom.value.name
        }
    }).then((res)=>{
        console.log(res)
        doctors.value = res.data.data
        emitter.emit("doctorsInfo", doctors)
    })
}

/*watchEffect(()=>{
    if(firstRoom.value.name==undefined)
    {
        showSecond.value = false
    }
    else if(firstRoom.value.name!=undefined&&secondRoom.value.name==undefined)
    {
        axios({
            method: 'post',
            url: 'http://121.199.161.134:8080/getSecondRoomsByFID',
            params: {
                id: firstRoom.value.id
            }
        }).then((res)=>{
            console.log(res)
            secondRooms.value = res.data.data
        })
        showSecond.value = true
    }
    else
    {
        showDoctors.value = true
        emitter.emit("roomName", secondRoom)
        showSecond.value = false
        axios({
            method: 'get',
            url: 'http://121.199.161.134:8080/getDoctorsByRoom',
            params: {
                roomName: secondRoom.value.name
            }
        }).then((res)=>{
            console.log(res)
            doctors.value = res.data.data
        })
    }
})*/

onMounted(()=>{
    axios({
        method: 'get',
        url: 'http://121.199.161.134:8080/getFirstRooms',
        params: {

        }
    }).then((res)=>{
        console.log(res)
        firstRooms.value = res.data.data
    })

    
})
</script>