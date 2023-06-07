<template>
    <div style="margin-left: 20px; margin-top: 50px;">
        <div class="flex align-items-center" style="margin-bottom: 15px; margin-top: 10px;">
            <Checkbox v-model="pizza" inputId="1" name="pizza" value="1" />
            <label for="1" class="ml-2"> 星期一 </label>
        </div>
        <div class="flex align-items-center" style="margin-bottom: 15px;">
            <Checkbox v-model="pizza" inputId="2" name="pizza" value="2" />
            <label for="2" class="ml-2"> 星期二 </label>
        </div>
        <div class="flex align-items-center" style="margin-bottom: 15px;">
            <Checkbox v-model="pizza" inputId="3" name="pizza" value="3" />
            <label for="3" class="ml-2"> 星期三 </label>
        </div>
        <div class="flex align-items-center" style="margin-bottom: 15px;">
            <Checkbox v-model="pizza" inputId="4" name="pizza" value="4" />
            <label for="4" class="ml-2"> 星期四 </label>
        </div>
        <div class="flex align-items-center" style="margin-bottom: 15px;">
            <Checkbox v-model="pizza" inputId="5" name="pizza" value="5" />
            <label for="5" class="ml-2"> 星期五 </label>
        </div>
        <div class="flex align-items-center" style="margin-bottom: 15px;">
            <Checkbox v-model="pizza" inputId="6" name="pizza" value="6" />
            <label for="6" class="ml-2"> 星期六 </label>
        </div>
        <div class="flex align-items-center" style="margin-bottom: 15px;">
            <Checkbox v-model="pizza" inputId="7" name="pizza" value="7" />
            <label for="7" class="ml-2"> 星期日 </label>
        </div>

        <div class="flex align-items-center" style="margin-bottom: 15px; margin-top: 40px;">
            <Checkbox v-model="halfDay" inputId="5" name="halfDay" value="0" />
            <label for="5" class="ml-2"> 上午 </label>
        </div>
        <div class="flex align-items-center" style="margin-bottom: 15px;">
            <Checkbox v-model="halfDay" inputId="6" name="halfDay" value="1" />
            <label for="6" class="ml-2"> 下午 </label>
        </div>
    </div>
    <div>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="card flex flex-wrap gap-2 justify-content-center" style="margin-top: 50px;">
            <Button @click="confirm1()" label="提交"></Button>
            <Button @click="confirm2()" label="清空"></Button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import axios from "axios";
import { defineProps } from "vue";
import emitter from "./bus";

const pizza = ref();
const halfDay = ref();

const confirm = useConfirm();
const toast = useToast();

let token = sessionStorage.getItem("token")

let props = defineProps({doctorID: String})

let doctorID = ref(props.doctorID)

emitter.on("doctorID", (res)=>{
    doctorID.value = res
})

const confirm1 = () => {
    confirm.require({
        message: '确定提交本次排班信息吗？',
        header: '提交确认',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log(doctorID)
            console.log(pizza.value)
            console.log(halfDay.value)
            axios({
                method: 'post',
                url: 'http://121.199.161.134:8080/submitJob',
                params: {
                    token: token
                },
                data: {
                    doctorID: doctorID.value,
                    weekDay: pizza.value,
                    halfDay: halfDay.value
                }
            });
            toast.add({ severity: 'info', summary: '提交成功', detail: '本次设置已提交！', life: 3000 });
        }
    });
};

const confirm2 = () => {
    confirm.require({
        message: '确定清空该医生全部排班信息吗？',
        header: '删除确认',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
            axios({
                method: 'post',
                url: 'http://121.199.161.134:8080/clearJob',
                params: {
                    doctorID: props.doctorID,
                    token: token
                }
            });
            toast.add({ severity: 'info', summary: '提交成功', detail: '已将排班信息清空！', life: 3000 });
        }
    });
};
</script>