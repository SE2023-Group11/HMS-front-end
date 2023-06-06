<template>
    <h1 style="text-align: left;">{{ roomName.name }}</h1>
    <div class="card" style="width: 100%; ">
        <h2 style="text-align: center; margin-top: 150px; margin-left: 90px;" v-show="notice_show">{{ notice }}</h2>
        <Card v-for="(item, index) in doctors" :key="index" style="margin: 10px;">
            <template #title><div style="text-align: left; margin: 10px;"> {{ item.doctorName }} </div></template>
            <template #content>
                <table style="align-self: center; align-items: center; text-align: center;">
                    <tr>
                        <td style="width: 30%;">职称：{{ item.doctorTitle }}</td>
                        <td style="width: 30%;">身份证号：{{ item.doctorNumber }}</td>
                        <td style="width: 30%;">电话：{{ item.doctorPhone }}</td>
                        <td style="width: 30%;">
                            <Button label="排班" @click="func3(index)" />
                            <Dialog v-model:visible="boolArray[index].value" modal header="医生排班" style="width: 70%; ">
                                <h2 style="text-align: center; margin: 5px;">您现在在为 {{ item.doctorName }} 排班</h2>
                                <ManageJob :doctorID=item.doctorId />
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
import axios from 'axios';
import { notificationEmits } from 'element-plus';

let roomName = ref("")
let boolArray = [ref(false), ref(false), ref(false)]
let props = defineProps({doctors: Array})
let workInfo = ref({})

let notice = ref("")

let notice_show = ref(false)
watchEffect(()=>{
    if(notice.value=="")
    {
        notice_show.value = false
    }
    else
    {
        notice_show.value = true
    }
})

let token = "eyJhbGciOiJIUzI1NiJ9.eyJub3dMb2dnZWRJblR5cGUiOiJub3dMb2dnZWRJblR5cGVBZG1pbiIsIm5vd0xvZ2dlZEluSWQiOiIxIiwiaWF0IjoxNjg0NzQ2OTQxLCJleHAiOjE2ODY1NDY5NDF9.npgDMKJW-7zrsoAlBmdtuWbQNqzhi_0bBzjXieLqKu8"

emitter.on("roomName", (res)=>{
    roomName.value = res.value
    console.log(roomName.value)
})


let doctors = ref([])
emitter.on("doctorsInfo", (res)=>{
    doctors.value = res.value
    console.log(doctors.value)
    if(doctors.value.length>0)
    {
        notice.value = ""
    }
    else
    {
        notice.value = "该科室暂无医生信息，去其它科室看看吧！"
    }
})

watchEffect(()=>{
    let i = 0
    for(i=0; i<doctors.value.length; i++)
    {
        boolArray.push(ref(false))
    }
    console.log(boolArray)
})

function func3(index)
{
    boolArray[index].value=true
    console.log(doctors.value[index].doctorId)
    emitter.emit("doctorID", doctors.value[index].doctorId)
    // axios({
    //     method: 'post',
    //     url: 'http://121.199.161.134:8080/getJob',
    //     params: {
    //         token: token,
    //         doctorID: doctors.value[index].doctorId
    //     }
    // }).then((res)=>{
    //     workInfo.value = res.data.data
    //     emitter.emit("workInfo", workInfo)
    //     console.log(workInfo)
    // })
}

</script>