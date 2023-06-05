<template>
    <h1 style="text-align: left;">{{ roomName.name }}</h1>
    <div class="card" style="width: 120%; ">
        <Card v-for="(item, index) in doctors" :key="index" style="margin: 10px;">
            <template #title><div style="text-align: left; margin: 10px;"> {{ item.doctorName }} </div></template>
            <template #content>
                <table style="align-self: center; align-items: center; text-align: center;">
                    <tr>
                        <td style="width: 30%;">身份证号：{{ item.doctorNumber }}</td>
                        <td style="width: 30%;">电话：{{ item.doctorPhone }}</td>
                        <td style="width: 30%;">科室：{{ item.doctorSection }}</td>
                        <td style="width: 30%;">
                            <Button label="排班" @click="boolArray[index].value=true" />
                            <Dialog v-model:visible="boolArray[index].value" modal header="医生排班" style="width: 70%; ">
                                <h2 style="text-align: center; margin: 5px;">{{ item.roomName }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</h2>
                                <ManageJob :doctorID=item.doctorID />
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </Dialog>
                        </td>
                    </tr>
                </table>
            </template>
            
        </Card>
    </div>
</template>

<script setup>
import emitter from './bus';
import { ref, watchEffect, watch } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ManageJob from './manageJob.vue';
import { defineProps } from 'vue';

let roomName = ref("")
let boolArray = [ref(false), ref(false), ref(false)]
let props = defineProps({doctors: Array})

emitter.on("roomName", (res)=>{
    roomName.value = res.value
    console.log(roomName.value)
})

let doctors = ref([])
emitter.on("doctorsInfo", (res)=>{
    doctors.value = res.value
    console.log(doctors.value)
})

watchEffect(()=>{
    let i = 0
    for(i=0; i<doctors.value.length; i++)
    {
        boolArray.push(ref(false))
    }
    console.log(boolArray)
})


</script>