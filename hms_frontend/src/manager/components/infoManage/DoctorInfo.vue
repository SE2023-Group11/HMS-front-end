<template>
    <div style="display:flex; justify-content:center; align-items:center;">
        <div class="card">
            <div v-if="show0">
                <Card style="width: 50em" header="医生信息">
                    <template #content>
                        <table>
                            <tr>
                                <td style="width:120px">医生姓名：</td>
                                <td style="width:650px; text-align: center;">{{ props.info.doctorName }}</td>
                            </tr>
                            <tr>
                                <td>所属科室：</td>
                                <td style="text-align: center;">{{ props.info.doctorSection }}</td>
                            </tr>
                            <tr>
                                <td>医生职称：</td>
                                <td style="text-align: center;">{{ props.info.doctorTitle }}</td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;">个人简介：</td>
                                <td style="text-align: center;">{{ infoNew }}</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align: center;">
                                    <Button @click="exchangeBack">修改</Button>&nbsp;
                                    <Button disabled="true">提交</Button>
                                </td>
                            </tr>
                        </table>
                    </template>
                    
                </Card>
            </div>
            <div v-if="!show0">
                <Card style="width: 50em" header="医生信息">
                    <template #content>
                        <table>
                            <tr>
                                <td style="width:120px">医生姓名：</td>
                                <td style="text-align: center;">{{ props.info.doctorName }}</td>
                            </tr>
                            <tr>
                                <td>所属科室：</td>
                                <td style="text-align: center;">{{ props.info.doctorSection }}</td>
                            </tr>
                            <tr>
                                <td>医生职称：</td>
                                <td style="text-align: center;">{{ props.info.doctorTitle }}</td>
                            </tr>
                            <tr>
                                <td>个人简介：</td>
                                <td><InputText type="text" v-model="infoNew" style="width: 650px; word-break:break-all;" /></td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align: center;">
                                    <Button disabled="true">修改</Button>&nbsp;
                                    <Button @click="submitChange">提交</Button>
                                </td>
                            </tr>
                        </table>
                    </template>
                    
                </Card>   
            </div>
        </div>
    </div>
    <Dialog v-model:visible="visible" modal header="提示" :style="{ width: '50vw' }">
        {{ notice }}
    </Dialog>
</template>

<script setup>
    import { defineProps, ref, watchEffect } from 'vue';
    import axios from 'axios';
    import Card from 'primevue/card';
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import Dialog from 'primevue/dialog';
    let infoNew = ref(props.info.doctorIntroduction)
    watchEffect(()=>{
        infoNew.value = props.info.doctorIntroduction
    })
    let props = defineProps({name: String, info: Object})
    let id = ref(props.info.doctorId)
    let show0 = ref(true)
    let token = sessionStorage.getItem("token")
    let visible = ref(false)
    let notice = ref("")

    function exchangeBack() {
        show0.value = !show0.value
    }
    function submitChange() {
        console.log(id.value)
        console.log(infoNew)
        axios({
            method:'post',
            url:'http://121.199.161.134:8080/changeDoctorInfo',
            params:{id:id.value, info:infoNew.value, token:token}
        }).then((res)=>{
            console.log(res)
            notice.value = "信息修改成功！"
            visible.value = true
        }).catch((err)=>{
            notice.value = "信息修改失败！失败原因："+err.value
            visible.value = true
        })
        exchangeBack()
    }
</script>