<template>
    <div class="login">
        <h1>用户登录</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="uid">用户id</label>
                <InputText :placeholder="'请输入您的id号或身份证号'" type="text" id="uid" v-model="uid" />
            </div>

            <div class="form-group">
                <label for="password">密码</label>
                <Password :placeholder="'请输入您的密码'" id="password" v-model="password" toggleMask />
            </div>
            <br>
            <SelectButton v-model="is_patient" :options="options" aria-labelledby="basic" />
            <br>
            <div>
                <router-link to="/register">用户注册</router-link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <router-link to="/ForgetPwd">忘记密码</router-link>
            </div>
            <br>
            <Button label="登录" @click="loginbt" />
        </form>
    </div>
    <!-- 消息的通知 -->
    <div class="tongzhi">
        <!-- 用户登录 -->
        <Message v-if="judlog == 1" severity="success">登录成功！</Message>
        <Message v-if="judlog == -1" severity="error">登录失败</Message>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios'
//primevue
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import SelectButton from 'primevue/selectbutton';
import Message from 'primevue/message';

const uid = ref('');
const password = ref('');
const options = ref(['患者身份进入', '非患者身份进入']);
const is_patient = ref('off');
const role = ref('y')//判断是不是患者
//用于判断登录是否成功的变量
const juglog = ref(0);
function loginbt() {
    //首先判断是不是患者
    if (options == '患者身份进入') role.value = 'y';
    else role.value = 'n';
    if (role.value == 'y') {
        axios.post('http://localhost:8080/loginPatient', {
            params: {
                uid: uid.value,
                password: password.value,
            }
        })
            .then(response => {
                console.log(response.data)
                juglog.value = 1;
            })
            .catch(error => {
                console.error(error)
                judlog.value = -1;
            })
    }
    if (role.value == 'n') {
        axios.post('http://localhost:8080/loginDoctor', {
            params: {
                uid: uid.value,
                password: password.value,
            }
        })
            .then(response => {
                console.log(response.data)
                juglog.value = 1;
            })
            .catch(error => {
                console.error(error)
                judlog.value = -1;
            })
    }

}

</script>
  
<style scoped>
.login {
    position: absolute;
    left: 30%;
    top: 100px;
    width: 500px;
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

.tongzhi {
    position: absolute;
    left: 600px;
    width: 400px;
    top: 20px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

input[type='uid'],
input[type='password'],
input[type='text'] {
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
}
</style>
