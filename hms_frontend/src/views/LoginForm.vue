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
                <Password :placeholder="'请输入您的密码'" id="password" v-model="password" style="width: 400px; height: 40px" />
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
        <Message z-index=9999999999999 v-if="judlog == 1" severity="success">登录成功！</Message>
        <Message z-index=9999999999999 v-if="judlog == -1" severity="error">登录失败</Message>
    </div>

    <!-- <div class="xia">
        
        <pre>


        版权所有 2014-2022 北京航空航天大学
        京ICP备05004617-3文保网安备案号1101080018
        <br>
        地址：北京市海淀区学院路37号
        邮编：100191
        电话：82317114
        </pre>
    </div> -->
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
import { useRouter } from 'vue-router'

const router = useRouter()
const uid = ref('');
const password = ref('');
const options = ref(['患者身份进入', '非患者身份进入']);
const is_patient = ref('off');
const role = ref('patient')//判断是不是患者
//用于判断登录是否成功的变量
const judlog = ref(0);
function loginbt() {
    //首先判断是不是患者
    if (is_patient.value === '患者身份进入') role.value = 'patient';
    else role.value = 'doctor';
    console.log(role.value);
    if (role.value == 'patient') {
        axios.post('http://121.199.161.134:8080/loginPatient',null, {
            params: {
                uid: uid.value,
                password: password.value,
            }}
        )
            .then(response => {
                console.log(response.data.code);
                //传送成功的情况下，判断信息是否正确
                const jud =response.data.code;
                console.log(response.data.data);
                if(jud == 1){
                    console.log(response.data);
                    sessionStorage.setItem('token', response.data.data);
                    sessionStorage.setItem('role', role.value);//y是患者，n是医生
                    judlog.value = 1;
                    // window.location.href="/patientRoot";
                    router.push('/patientRoot');
                }
                //将将返回的token存到session中
                else if(jud == 2){

                    sessionStorage.setItem('token', response.data.data);
                    sessionStorage.setItem('role', role.value);//y是患者，n是医生
                    judlog.value = 1;
                    // window.location.href="/managerEnter";
                    router.push('/managerEnter');
                }
                else{
                    console.log('登录失败');
                    judlog.value = -1;
                }
            })
            .catch(error => {
                console.error(error)
                judlog.value = -1;
            })
    }
    if (role.value == 'doctor') {
        axios.post('http://121.199.161.134:8080/loginDoctor',null,{params: {
                uid: uid.value,
                password: password.value,
            }}
        )
            .then(response => {
                console.log(response.data.code);
                //传送成功的情况下，判断信息是否正确
                const jud =response.data.code;
                console.log(typeof(jud));
                if(jud == 1){
                    sessionStorage.setItem('token', response.data.data);
                    sessionStorage.setItem('role', role.value);//y是患者，n是医生
                    judlog.value = 1;
                    // window.location.href="/doctorRoot";
                    router.push('/doctorRoot');
                }
                //将将返回的token存到session中
                else if(jud == 2){
                    sessionStorage.setItem('token', response.data.data);
                    sessionStorage.setItem('role', role.value);//y是患者，n是医生
                    judlog.value = 1;
                    console.log(sessionStorage.getItem('token'));
                    // window.location.href="/defaultView";
                    router.push('/defaultView');
                }
                else{
                    console.log('登录失败');
                    judlog.value = -1;
                }
            })
            .catch(error => {
                console.error(error)
                judlog.value = -1;
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
    width: 200px;
}
.l1 {
    position: absolute;
    top: 10px;
    right: 0;
}

.bttt {
    position: relative;
    width: 200px;
    left: 35px;
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
    z-index: 999999999999999999999999;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

.xia {
    position: absolute;
    bottom: 0;
    font: 5px;
    left: 1140px;
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