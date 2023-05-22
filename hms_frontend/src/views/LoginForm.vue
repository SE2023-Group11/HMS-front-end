<template>
    <div class="Pic">
        <!-- <img src="../Pic/yiyuan.jpg" v-if="!imageUrl" /> -->
    </div>
    <div class="Pic1">
        <img src="../Pic/OIP.jpg" v-if="!imageUrl" />
    </div>
    <div class="login">

        <h1>医院信息管理系统</h1>
        <h2>用户登录</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="uid">用户id</label>
                <InputText :placeholder="'请输入您的id号或身份证号'" type="text" id="uid" v-model="uid" class="inp"/>
            </div>

            <div class="form-group">
                <label for="password">密码</label>
                <Password :placeholder="'请输入您的密码'" id="password" v-model="password"  />
            </div>
            <br>
            <SelectButton v-model="is_patient" :options="options" aria-labelledby="basic" />
            <br>
            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <router-link to="/register">用户注册</router-link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <router-link to="/ForgetPwd">忘记密码</router-link>
            </div>
            <br>
            <Button class="bttt" label="登录" @click="loginbt" />
        </form>
    </div>
    <!-- 消息的通知 -->
    <div class="tongzhi">
        <!-- 用户登录 -->
        <Message v-if="judlog == 1" severity="success">登录成功！</Message>
        <Message v-if="judlog == -1" severity="error">登录失败</Message>
    </div>

    <div class="xia">
        <pre>
            版权所有 2014-2022 北京航空航天大学
        京ICP备05004617-3
        文保网安备案号1101080018
        <br>
        地址：北京市海淀区学院路37号
        邮编：100191
        电话：82317114
        </pre>
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

const uid = ref('D00000000001');
const password = ref('p100000006939210');
const options = ref(['患者身份进入', '非患者身份进入']);
const is_patient = ref('off');
const role = ref('y')//判断是不是患者
//用于判断登录是否成功的变量
const juglog = ref(0);
function loginbt() {
    //首先判断是不是患者
    if (is_patient.value === '患者身份进入') role.value = 'y';
    else role.value = 'n';
    console.log(role.value);
    if (role.value == 'y') {
        axios.post('http://121.199.161.134:8080/loginPatient',null, {
            params: {
                uid: uid.value,
                password: password.value,
            }}
        )
            .then(response => {
                console.log('dasdasdas');
                console.log(response);
                console.log(response.data.data);
                //将将返回的token存到session中
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('role', role.value);//y是患者，n是医生
                juglog.value = 1;
            })
            .catch(error => {
                console.error(error)
                //judlog.value = -1;
            })
    }
    if (role.value == 'n') {
        axios.post('http://121.199.161.134:8080/loginDoctor',null,{params: {
                uid: uid.value,
                password: password.value,
            }}
        )
            .then(response => {
                console.log(response.data.value);
                //将将返回的token存到session中
                // sessionStorage.setItem('token', response.data.token);
                // sessionStorage.setItem('role', role.value);//y是患者，n是医生
                // juglog.value = 1;
            })
            .catch(error => {
                console.error(error)
                // judlog.value = -1;

            })
    }

}

</script>
  
<style scoped>
.Pic1 img {
    position: absolute;
    width: 100px;
    top:0px;
    right: 285px;
}

.Pic {
    position: absolute;
    background-image: url("../Pic/yiyuan.jpg");
    background-size: cover;
    top: 0px;
    width: 74%;
    height: 100%;
}
.inp{
    width: 300px;
}
.l1 {
    position: absolute;
    top: 10px;
    right: 0;
}

.bttt {
    position: relative;
    width: 200px;
    left: 60px;
}

.Pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.login {
    position: absolute;
    left: 75%;
    top: 90px;
    width: 350px;
    margin: 0 auto;
    padding: 20px;
    /* border: 1px solid #ccc;
    border-radius: 5px; */
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

.xia {
    position: absolute;
    bottom: 0%;
    font: 5px;
    left: 1180px;
    width: 300px;
    
}

input[type='uid'],
input[type='password'],
input[type='text'] {
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
}
</style>
