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
                    <InputText type="text" id="department" v-model="department" />
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
</template>
  
<script setup>
import { ref } from 'vue';
//primevue
import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';

const options = ref(['我是患者', '我是医生']);
const is_patient = ref('off');
const email = ref('');
const name = ref('');
const idCard = ref('');
const password = ref('');
const confirmPassword = ref('');
const verifyCode = ref('');
const emailError = ref('');
const passwordError = ref('');

const sendingVerifyCode = ref(false);
const countdown = ref(60);
let timer = null;
const department = ref('');

function sendtoback() {
    axios.post('/api/send-to-back', {
        email,
    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        })
}
const sendVerifyCode = () => {
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

function registerbt() {
    //首先验证验证码
    axios.post('/api/verify-code', {
        email,
        verifyCode,
    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        })
    if (is_patient == '我是医生') {
        axios.post('/docter/register', {
            password,
            emial,
            department,
            name,
            idcard,
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }
    else {
        axios.post('/patient/register', {
            password,
            emial,
            name,
            idcard,
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
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
</style>