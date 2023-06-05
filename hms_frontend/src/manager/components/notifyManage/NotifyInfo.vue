<template>
    <div>
        <div style="display:flex; justify-content:center; align-items:center;">
            <div class="card">
                <Card v-for="item in array" :key="array.indexOf(item)" style="width: 45em; margin: 10px">
                    <template #title>{{ item.infoType==1?string1:string2 }}</template>
                    <template #content>
                        <div  style="display: flex; justify-content: center;">
                            <table style="text-align: center;">
                                <tr>
                                    <td style="width: 120px;">发起人：</td>
                                    <td style="width: 300px;">{{ item.name }}</td>
                                </tr>
                                <tr>
                                    <td>所在科室：</td>
                                    <td>{{ item.sectionFirName+"-"+item.sectionSecName }}</td>
                                </tr>
                                <tr>
                                    <td>发起时间：</td>
                                    <td>{{ item.time.split("T")[0]+" "+item.time.split("T")[1] }}</td>
                                </tr>
                            </table>
                        </div>                        
                        <div class="card flex justify-content-center" style="margin-top: 20px;">
                            <ConfirmDialog></ConfirmDialog>
                            <Button @click="getDetailInfo(item)">详细信息</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button @click="acceptNotif(item.infoId)">同意</Button>&nbsp;&nbsp;&nbsp;
                            <Button @click="declineNotif(item.infoId)">拒绝</Button>
                            <Dialog v-model:visible="visibleList[array.indexOf(item)].value" modal header="详细信息" :style="{ width: '50vw' }">
                                <table>
                                    <tr>
                                        <td style="width: 100px;">姓名：</td>
                                        <td>{{ detailInfo.doctorName }}</td>
                                    </tr>
                                    <tr>
                                        <td>医生编号：</td>
                                        <td>{{ detailInfo.doctorId }}</td>
                                    </tr>
                                    <tr>
                                        <td>所在科室：</td>
                                        <td>{{ detailInfo.doctorSection }}</td>
                                    </tr>
                                    <tr>
                                        <td>身份证号：</td>
                                        <td>{{ detailInfo.doctorNumber }}</td>
                                    </tr>
                                    <tr>
                                        <td>手机号：</td>
                                        <td>{{ detailInfo.doctorPhone }}</td>
                                    </tr>
                                    <tr>
                                        <td>个人简介：</td>
                                        <td>{{ detailInfo.doctorIntroduction }}</td>
                                    </tr>
                                </table>
                            </Dialog>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup>
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import { onMounted, ref, watch, watchEffect } from 'vue'
import axios from 'axios'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
let string1 = "医生注册申请"
let string2 = "医生信息修改申请"
let array = ref([])
let visibleList = []
let detailInfo = ref({})
const confirm = useConfirm()
const toast = useToast();
let token = "eyJhbGciOiJIUzI1NiJ9.eyJub3dMb2dnZWRJblR5cGUiOiJub3dMb2dnZWRJblR5cGVBZG1pbiIsIm5vd0xvZ2dlZEluSWQiOiIxIiwiaWF0IjoxNjg0NzQ2OTQxLCJleHAiOjE2ODY1NDY5NDF9.npgDMKJW-7zrsoAlBmdtuWbQNqzhi_0bBzjXieLqKu8"
onMounted(()=>{
    axios({
        method: 'get',
        url: 'http://121.199.161.134:8080/getAllNotifications',
        params:{
            token:token
        }
    }).then((res)=>{
        console.log(res)
        array.value = res.data.data
        console.log(array)

        let i = 0
        visibleList = []
        for(i=0; i<array.value.length; i++)
        {
            visibleList.push(ref(false))
        }
    })    
})


function getDetailInfo(item)
{
    visibleList[array.value.indexOf(item)].value = true
    axios({
        method:'post',
        url:'http://121.199.161.134:8080/getNotifyInfoByID',
        params:{
            detailId: item.detailId,
            token:token
        }
    }).then((res)=>{
        console.log(res)
        detailInfo.value = res.data.data
    })
}
function _acceptNotif(id)
{
    axios({
        method: 'post',
        url: 'http://121.199.161.134:8080/acceptNotify',
        params: {
            infoId:id,
            token:token
        }
    }).then((res)=>{
        console.log(res)
        location.reload()
    })
}

const acceptNotif = (id) => {
    confirm.require({
        message: '确定要同意该请求吗？',
        header: '同意请求',
        accept: (id) => {
            toast.add({ severity: 'info', summary: '已确认', detail: '你已接受该申请', life: 3000 });
            _acceptNotif(id)
        }
    })
}

function _declineNotif(id)
{
    axios({
        method: 'post',
        url: 'http://121.199.161.134:8080/declineNotify',
        params: {
            infoId:id,
            token:token
        }
    }).then((res)=>{
        console.log(res)
        location.reload()
    })
}

const declineNotif = (id) => {
    confirm.require({
        message: '确定要拒绝该请求吗？',
        header: '拒绝请求',
        accept: (id) => {
            toast.add({ severity: 'info', summary: '已确认', detail: '你已拒绝该申请', life: 3000 });
            _declineNotif(id)
        }
    })
}

/*function generateList(res)
{
    let i = 0
    let array_t = res.data.data
    console.log(array_t)
    for(i=0; i<array_t.length; i++)
    {
        // console.log(array_t[i])
        array.value[i] = array_t[i]
    }
    console.log(array.value.length)
}*/
</script>