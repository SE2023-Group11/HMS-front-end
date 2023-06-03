<template>
    <div style="display:flex; justify-content:center; align-items:center;">
        <div class="card">
            <Card style="width: 50em">
                <template #title> {{ props.name }} </template>
                <template #content>
                    <table>
                        <tr>
                            <td style="width: 120px; vertical-align: top;">科室介绍：</td>
                            <td style="text-align: left;">{{ props.info }}</td>
                        </tr>
                        <tr>
                            <td style="vertical-align: middle;">修改内容：</td>
                            <td style="vertical-align: bottom;">
                                <br/>
                                <InputText type="text" v-model="newInfo" placeholder="请输入修改后信息" style="width:100%; word-break:break-all;"/><br/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><Button @click="sendChange" >提交</Button></td>
                        </tr>
                    </table>
                </template>
            </Card>
        </div>
    </div>
    <Dialog v-model:visible="visible" modal header="提示" :style="{ width: '50vw' }">
        {{ notice }}
    </Dialog>
    
</template>
<script setup>
import {ref} from 'vue'
import { defineProps } from 'vue';
import axios from 'axios';

import Card from 'primevue/card'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

let props = defineProps({name: String, info: String})
let newInfo = ref('')
let visible = ref(false)
let notice = ref("")
let token = "eyJhbGciOiJIUzI1NiJ9.eyJub3dMb2dnZWRJblR5cGUiOiJub3dMb2dnZWRJblR5cGVBZG1pbiIsIm5vd0xvZ2dlZEluSWQiOiIxIiwiaWF0IjoxNjg0NzQ2OTQxLCJleHAiOjE2ODY1NDY5NDF9.npgDMKJW-7zrsoAlBmdtuWbQNqzhi_0bBzjXieLqKu8"

function sendChange() {
    console.log(newInfo.value)
    axios({
        method: 'post',
        url: 'http://121.199.161.134:8080/changeRoomInfo',
        params: {
            roomName:props.name,
            roomInfo:newInfo.value,
            token:token
        }
    }).then((res)=>{
        console.log(res)
        notice.value = "信息修改成功！"
        visible.value = true
        newInfo.value = ""
    }).catch((err)=>{
        notice.value = "信息修改失败！失败原因："+err.value
        visible.value = true
    })
}

</script>