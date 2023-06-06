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

    <div class="register">
        <Button @click="fanhui" label="返回登录" />
        <h1>忘记密码</h1>
        <form @submit.prevent="submitForm">

            <div>
                <div>
                    <SelectButton v-model="is_patient" :options="options" aria-labelledby="basic" />
                </div>
            </div>

            <div class="form-group">
                <label for="email">邮箱</label>
                <InputText :placeholder="'请输入您的邮箱号'" type="text" id="email" v-model="email" />
            </div>

            <div class="form-group">
                <label for="verifyCode">验证码</label>
                <div class="verify-code">
                    <InputText :placeholder="'请输入验证码'" type="text" id="verifyCode" v-model="verifyCode" />
                    <Button type="button" @click="sendVerifyCode" :disabled="sendingVerifyCode">{{ sendingVerifyCode ?
                        `${countdown}s` : '发送验证码' }}</Button>
                </div>
            </div>

            <div class="form-group">
                <label for="password">密码</label>
                <Password :placeholder="'请输入您的新密码'" type="password" id="password" v-model="password" />
            </div>
            <div class="form-group">
                <label for="confirmPassword">确认密码</label>
                <Password :placeholder="'请再次输入密码'" type="password" id="confirmPassword" v-model="confirmPassword"
                    @blur="checkPassword" />
                <div class="error-message" v-if="passwordError">{{ passwordError }}</div>
            </div>

            <Button class="xiugai" label="修改密码" @click="registerbt" />
        </form>
    </div>
    <!-- 用于错误的消息的通知 -->
    <div class="tongzhi">
        <!-- 用户注册 -->
        <Message v-if="judchange == 1" severity="success">修改密码成功！</Message>
        <Message v-if="judchange == -1" severity="error">修改密码失败</Message>
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
import Message from 'primevue/message';
import { useRouter } from 'vue-router'

const router = useRouter()
const options = ref(['我是患者', '我是医生']);
const is_patient = ref('off');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const verifyCode = ref('');
const passwordError = ref('');

const sendingVerifyCode = ref(false);
const countdown = ref(20);
let timer = null;
const name = ref('尊敬的用户');
const type = ref(2);
function fanhui(){
    router.push('/login');
}
function sendtoback() {
    if (is_patient.value == '我是医生') type.value = 2;
    else type.value = 4;
    console.log(type.value);
    console.log(typeof(type.value));
    axios.post('http://121.199.161.134:8080/sendToEmail',null,{
        params:{
            type:type.value,
            name:name.value,
            email:email.value
        }
    }
    )
    .then(response => {
        console.log('adddddddddddddddd');
        console.log(response.data)
    })
    .catch(error => {
        console.log('dasdasd');
        console.error(error)
    })
}
const sendVerifyCode = () => {
    //首先改一下消息的通知
    judchange.value = 0;
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

//判断传输是否成功的变量
const judchange = ref(0);
function registerbt() {
    //验证码和个人的信息一起上传
    if (is_patient.value == '我是医生') {
        axios.post('http://121.199.161.134:8080/docterChangepwd',null, {
            params: {
                code: verifyCode.value,
                email: email.value,
                doctor_pwd: password.value,
            }

        })
            .then(response => {
                console.log(response.data)
                const jud =response.data.code;
                console.log(typeof(jud));
                if(jud == 1){
                    judchange.value = 1;
                    // window.location.href="/login";
                    router.push('/login');
                }
                else{
                    judchange.value = -1;
                    console.log('登录失败');                    
                } 
            })
            .catch(error => {
                console.error(error)
                judchange.value = -1;
            })
    }
    else {
        axios.post('http://121.199.161.134:8080/patientChangepwd', null,{
            params: {
                code: verifyCode.value,
                email: email.value,
                patient_pwd: password.value,
            }
        })
            .then(response => {
                console.log(response.data)
                const jud =response.data.code;
                console.log(typeof(jud));
                if(jud == 1){
                    judchange.value = 1;
                    // window.location.href="/login";
                    router.push('/login');
                }
                else{
                    judchange.value = -1;
                    console.log('登录失败');                    
                } 
            })
            .catch(error => {
                console.error(error)
                judchange.value = -1;
            })
    }
}

</script>
  
<style scoped>
.register {
    position: absolute;
    left: 38%;
    top: 150px;
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
}

.head1 {
    position: absolute;
    top: 0%;
    width: 100%;
    height: 100%;
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
    height: 100%;
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
    z-index: 9999999;
}

.xiugai {
    position: relative;
    left: 50%;
    width: 200px;
    height: 50px;
    transform: translateX(-50%);
}
</style>