<template>
    <div class="P1">
        <img src="../Pic/b1.jpg" v-if="!imageUrl" />
    </div> 
    <div class="kuang">
            <div class="logal">
                <img src="../Pic/OIP.jpg" v-if="!imageUrl" />
            </div>
            <div class="titl">
                医疗预约系统
            </div>
    </div>
    <!-- <div class="Picdoc" v-if="is_patient === '我是医生'">
        <img src="../Pic/doctor.jpg" v-if="!imageUrl" />
    </div>

    <div class="Picpat" v-if="is_patient === '我是患者'">
        <img src="../Pic/patient.jpg" v-if="!imageUrl" />
    </div>  -->
    <div class="register">
        <h1>用户注册</h1>
        <form @submit.prevent="submitForm">
            <div>
                <div>
                    <SelectButton v-model="is_patient" :options="options" aria-labelledby="basic" />
                </div>
                <div class="form-group" v-if="is_patient === '我是医生'">

                    <label for="department">所在科室</label>
                    <Dropdown v-model="department" :options="alldepartment" optionLabel="name" placeholder="选择您所在的诊室"
                        class="w-full md:w-14rem" />
                    <!-- <InputText v-model="department" placeholder="填写您所在的诊室" /> -->
                </div>

            </div>
            <div class="form-group">
                <label for="email">邮箱</label>
                <InputText type="email" id="email" v-model="email" :placeholder="'请输入您的邮箱'" />
            </div>
            <div class="form-group">
                <label for="name">姓名</label>
                <InputText type="text" id="name" v-model="name" :placeholder="'请输入您的姓名'" />
            </div>
            <div class="form-group">
                <label for="idCard">身份证号</label>
                <InputText type="idCard" id="idCard" v-model="idCard" :placeholder="'请输入您的身份证号'" />
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <Password type="password" id="password" v-model="password" :placeholder="'请输入您的密码'" />
            </div>
            <div class="form-group">
                <label for="confirmPassword">确认密码</label>
                <Password class="pwd" type="password" id="confirmPassword" v-model="confirmPassword" @blur="checkPassword"
                    :placeholder="'请输入您的密码'" />
                <div class="error-message" v-if="passwordError">{{ passwordError }}</div>
            </div>
            <div class="form-group">
                <label for="verifyCode">验证码</label>
                <div class="verify-code">
                    <InputText type="text" id="verifyCode" v-model="verifyCode" :placeholder="'请输入验证码'" />
                    <button type="button" @click="sendVerifyCode" :disabled="sendingVerifyCode">{{ sendingVerifyCode ?
                        `${countdown}s` : '发送验证码' }}</button>
                </div>
            </div>
            <Button label="注册" @click="registerbt" class="zhuce" />
        </form>
    </div>
    <!-- 用于错误的消息的通知  -->
     <div class="tongzhi">
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
const is_patient = ref('我是患者');
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
const countdown = ref(0);
let timer = null;
const department = ref('');
const type = ref();
//把邮箱给后端，后端发送验证码
function sendtoback() {
    if (is_patient.value === '我是患者') {
        type.value = 3;
    }    
    else type.value = 1;
    axios.post('http://121.199.161.134:8080/sendToEmail',null,{
        params:{
            type:type.value,
            name:name.value,
            email:email.value
        }
    }

    )
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('dasdasd');image.png
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
            countdown.value = 2;
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
    doctor.doctorPassword = password.value;
    doctor.doctorMail = email.value;
    doctor.doctorPhone = phone.value;
    doctor.doctorName = name.value;
    doctor.doctorNumber = idCard.value;
}
function setPatient() {
    patient.patientPassword = password.value;
    patient.patientMail = email.value;
    patient.patientPhone = phone.value;
    patient.patientName = name.value;
    patient.patientNumber = idCard.value;
    patient.patientBirthday = birthday.value;
    patient.patientSex = isMale.value;
}
//判断传输是否成功的变量
const judreg = ref(0);
function registerbt() {
    //验证码和个人信息一起传入后端
    if (is_patient.value == '我是医生') {
        console.log('da333333333333333');
        setDoctor();
        axios.post('http://121.199.161.134:8080/doctorRegister', doctor,{
            params:{
            code: verifyCode.value,
            confirmPW: confirmPassword.value
        }}
        )
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
        console.log(verifyCode.value);
        axios.post('http://121.199.161.134:8080/patientRegister', patient, {
            params: {
                code: verifyCode.value,
                confirmPW: confirmPassword.value,
            }
        },
  )
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
    position: absolute;
    top: 150px;
    left: 35%;
    right:35%;
    height: 790px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 1;
    background-color: #fff;
}

.titl {
    position: absolute;
    font-size: 30px;
    color: #fff;
    bottom: 30px;
    left: 150px;
}

.pwd {
    width: 40px;
}

.P1 img{
    position: absolute;
    width: 100%;
    height: 130%;
    top: 110px;
    background-image: url("../Pic/b1.jpg");
    filter: blur(5px);
    /* background-size: cover; */
    z-index: -1;
}

.logal img {
    position: relative;
    width: 110px;
    height: 110px;
    left: 0px;
    z-index: 99;
}

.kuang {
    position: absolute;
    height: 110px;
    width: 100%;
    background-color: #007bff;
    z-index: 10;
}
.bigest{
    width: 80%;
    height: 80%;
}
/* .Picpat img {
    position: absolute;
    top: 130px;
    left: 53%;
    width: 550px;
    height: 735px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
}

.Picdoc img {
    position: absolute;
    top: 130px;
    left: 53%;
    width: 550px;
    height: 815px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
} */

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
    left: 300px;
    width: 300px;
    top: 20px;
    z-index: 999999999;
}

.zhuce {
    position: relative;
    left: 40%;
}
</style>