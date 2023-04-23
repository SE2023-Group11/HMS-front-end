<template>
    <div class="login">
        <h1>用户注册</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="uid">用户id</label>
                <InputText type="text" id="uid" v-model="uid" />
            </div>

            <div class="form-group">
                <label for="password">密码</label>
                <Password id="password" v-model="password" toggleMask />
            </div>

            <Button label="用户注册" link />
            <Button label="忘记密码" link />

            <SelectButton v-model="is_patient" :options="options" aria-labelledby="basic" />

            <Button label="登录" @click="loginbt" />
        </form>
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

const uid = ref('');
const password = ref('');
const options = ref(['患者身份进入', '非患者身份进入']);
const is_patient = ref('off');

function loginbt() {
    axios.post('/api/login', {
        uid,
        password,
    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        })
}

</script>
  
<style scoped>
.login {
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





















<!-- <template>
    <div class="login-page">
        <form class="login-form" @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <button type="submit">Log in</button>
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        onSubmit() {
            // 在这里添加登录逻辑
        },
    },
};
</script>
  
<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 10px;
}

input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 100%;
}
</style> -->