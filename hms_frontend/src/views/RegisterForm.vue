<template>
    <div class="register">
        <h1>用户注册</h1>
        <form @submit.prevent="submitForm">
            <div>
                <div>
                    <SelectButton v-model="is_patient" :options="options" aria-labelledby="basic" />
                </div>
                <div class="form-group" v-if="is_patient === '我是医生'">

                    <label for="department">所在科室</label>
                    <!-- <InputText type="text" id="department" v-model="department" /> -->
                    <Dropdown v-model="department" :options="alldepartment" optionLabel="name" placeholder="选择您所在的诊室"
                        class="w-full md:w-14rem" />
                </div>
            </div>


            <div class="form-group">
                <label for="email">邮箱</label>
                <InputText type="email" id="email" v-model="email" />
            </div>

            <div class="form-group">
                <label for="name">姓名</label>
                <InputText type="text" id="name" v-model="name" />
            </div>
            <div class="form-group">
                <label for="idCard">身份证号</label>
                <InputText type="idCard" id="idCard" v-model="idCard" />
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <Password type="password" id="password" v-model="password" />
            </div>
            <div class="form-group">
                <label for="confirmPassword">确认密码</label>
                <Password type="password" id="confirmPassword" v-model="confirmPassword" @blur="checkPassword" />
                <div class="error-message" v-if="passwordError">{{ passwordError }}</div>
            </div>
            <div class="form-group">
                <label for="verifyCode">验证码</label>
                <div class="verify-code">
                    <Input type="text" id="verifyCode" v-model="verifyCode" />
                    <button type="button" @click="sendVerifyCode" :disabled="sendingVerifyCode">{{ sendingVerifyCode ?
                        `${countdown}s` : '发送验证码' }}</button>
                </div>
            </div>
            <!-- <button type="submit">注册</button> -->
            <Button label="注册" @click="registerbt" />
        </form>
    </div>
    <!-- 用于错误的消息的通知 -->
    <div class="tongzhi">
        <!-- 用户注册 -->
        <Message v-if="judreg == 1" severity="success">注册成功！</Message>
        <Message v-if="judreg == -1" severity="error">注册失败</Message>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
//primevue
import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';
import Message from 'primevue/message';

const alldepartment = ref([
    { name: '心脏科', code: 'NY' },
    { name: '外科', code: 'RM' },
    { name: '泌尿科', code: 'LDN' },
    { name: '心脑血管科', code: 'IST' },
]);
const options = ref(['我是患者', '我是医生']);
const is_patient = ref('off');
const email = ref('');
const name = ref('');
const idCard = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const verifyCode = ref('');
const emailError = ref('');
const passwordError = ref('');

const sendingVerifyCode = ref(false);
const countdown = ref(60);
let timer = null;
const department = ref('');

//把邮箱给后端，后端发送验证码
function sendtoback() {
    axios.post('http://localhost:8080/sendToEmail', {
        email: email.value,
    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        })
}
const sendVerifyCode = () => {
    //首先改一下消息的通知
    judreg.value = 0;
    // 发送验证码的逻辑
    sendingVerifyCode.value = true;
    timer = setInterval(() => {
        if (countdown.value > 1) {
            countdown.value--;
        } else {
            sendtoback();
            clearInterval(timer);
            timer = null;
            countdown.value = 60;
            sendingVerifyCode.value = false;
        }
    }, 1000);
};

const checkPassword = () => {
    if (password.value !== confirmPassword.value) {
        passwordError.value = '两次密码输入不一致';
    } else {
        passwordError.value = '';
    }
};

//首先通过身份证号获取一些知识
const birthday = ref()//生日
const isMale = ref(true)//性别
function getinfo() {
    let idnum = idCard.values
    let year = idnum.substring(6, 10);
    let month = idnum.substring(10, 12);
    let day = idnum.substring(12, 14);
    let genderCode = idnum.substring(16, 17);
    isMale.value = genderCode % 2 === 1;
    birthday.value = LocalDateTime.of(parseInt(year), parseInt(month), parseInt(day));
}
//对于患者和医生的类进行封装
const doctor = {};
const patient = {};
function setDoctor() {
    doctor.doctor_password = password.value;
    doctor.doctor_email = email.value;
    doctor.doctor_phone = phone.value;
    doctor.doctor_name = name.value;
    doctor.doctor_idcard = idCard.value;
    doctor.doctor_birthday = birthday.value;
    doctor.doctor_isMale = isMale.value;
    doctor.doctor_department = department.value;
}
function setPatient() {
    patient.doctor_password = password.value;
    patient.doctor_email = email.value;
    patient.doctor_phone = phone.value;
    patient.doctor_name = name.value;
    patient.doctor_idcard = idCard.value;
    patient.doctor_birthday = birthday.value;
    patient.doctor_isMale = isMale.value;
}
//判断传输是否成功的变量
const judreg = ref(0);
function registerbt() {
    //首先验证验证码
    axios.post('http://localhost:8080/verifyCode', {
        email: email.value,
        verifyCode: verifyCode.value,
    })
        .then(response => {
            console.log(response.data)
            judreg.value = 1;
        })
        .catch(error => {
            console.error(error)
            judreg.value = -1;
        })
    if (is_patient == '我是医生') {
        setDoctor();
        axios.post('http://localhost:8080//docter_register', {
            patient
        })
            .then(response => {
                console.log(response.data)
                judreg.value = 1;
            })
            .catch(error => {
                console.error(error)
                judreg.value = -1;
            })
    }
    else {
        setPatient();
        axios.post('http://localhost:8080//patientRegister', {
            doctor
        })
            .then(response => {
                console.log(response.data)
                judreg.value = 1;
            })
            .catch(error => {
                console.error(error)
                judreg.value = -1;
            })
    }
}

</script>
  
<style scoped>
.register {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.error-message {
    color: red;
}

label {
    font-weight: bold;
    margin-bottom: 10px;
}

input[type='email'],
input[type='password'],
input[type='text'] {
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
}

.verify-code {
    display: flex;
    align-items: center;
}

.verify-code input {
    margin-right: 10px;
}

.verify-code button {
    padding: 8px 10px;
    border-radius: 3px;
    border: none;
    color: #fff;
    background-color: #007bff;
    cursor: pointer;
}

.verify-code button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}

.tongzhi {
    position: absolute;
    left: 600px;
    width: 400px;
    top: 20px;
}
</style>