<template>
    <div class="bg-image">
        <div class="leftpart">
            <div class="avatar">
                <img src="../../public/jay.jpg" />
            </div>
            <Button class="bt_changePic" label="更换头像" @click="save" />
        </div>

        <div class="message">
            <!-- <div class="name_and_id">
                <label class="nameid">name: {{ pname }}</label>
                &nbsp;&nbsp;
                <label class="nameid">pid: {{ pid }}</label>
            </div> -->

            <Card class="mycard">
                <template #title>用户{{ pid }}的个人信息</template>
                <template #content>
                    <div class="edit">
                        <!-- 姓名 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!nameediting" @click="namestartEditing">{{ namecontent }}</div>
                                <InputText v-if="nameediting" type="text" v-model="nametempContent" @blur="namestopEditing"
                                    @keyup.enter="namestopEditing" />
                            </div>
                        </div>
                        <!-- 年龄 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">年龄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!ageediting" @click="agestartEditing">{{ agecontent }}</div>
                                <InputText v-if="ageediting" type="text" v-model="agetempContent" @blur="agestopEditing"
                                    @keyup.enter="agestopEditing" />
                            </div>
                        </div>
                        <!-- // 性别 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!sexediting" @click="sexstartEditing">{{ sexcontent }}</div>
                                <InputText v-if="sexediting" type="text" v-model="sextempContent" @blur="sexstopEditing"
                                    @keyup.enter="sexstopEditing" />
                            </div>
                        </div>
                        <!-- // 出生日期 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">出生日期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!birediting" @click="birstartEditing">{{ bircontent }}</div>
                                <InputText v-if="birediting" type="text" v-model="birtempContent" @blur="birstopEditing"
                                    @keyup.enter="birstopEditing" />
                            </div>
                        </div>
                        <!-- //地区 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">地区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!regediting" @click="regstartEditing">{{ regcontent }}</div>
                                <InputText v-if="regediting" type="text" v-model="regtempContent" @blur="regstopEditing"
                                    @keyup.enter="regstopEditing" />
                            </div>
                        </div>
                        <!-- // 邮箱 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">邮箱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!emailediting" @click="emailstartEditing">{{ emailcontent }}</div>
                                <InputText v-if="emailediting" type="text" v-model="emailtempContent"
                                    @blur="emailstopEditing" @keyup.enter="emailstopEditing" />
                            </div>
                        </div>
                        <!-- // 身份证号 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">身份证号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!idCardediting" @click="idCardstartEditing">{{ idCardcontent }}</div>
                                <InputText v-if="idCardediting" type="text" v-model="idCardtempContent"
                                    @blur="idCardstopEditing" @keyup.enter="idCardstopEditing" />
                            </div>
                        </div>
                        <!-- // 病史 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">病史&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!historyediting" @click="historystartEditing">{{ historycontent }}</div>
                                <InputText v-if="historyediting" type="text" v-model="historytempContent"
                                    @blur="historystopEditing" @keyup.enter="historystopEditing" />
                            </div>
                        </div>
                        <div class="save_button">
                            <Button label="保存" @click="save" />
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';
//primevue
import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Panel from 'primevue/panel';

const id = ref('123');
const name = ref('');
const age = ref('');
const sex = ref('');
const birthday = ref('');
const region = ref('');
const email = ref('');
const idCard = ref('');
const history = ref('');

axios.get('/api/data', {
    params: {
        id: id.value // 传递 ID 参数
    }
})
    .then(response => {
        // 成功获取数据后的处理逻辑
        console.log(response.data)
        const data = response.data;

        name.value = data.name;
        age.value = data.age;
        sex.value = data.sex;
        birthday.value = data.birthday;
        region.value = data.region;
        email.value = data.email;
        idCard.value = data.idCard;
        history.value = data.history;
    })
    .catch(error => {
        // 处理错误的逻辑
        console.error(error)
    })


// 对于个人的信息框的设置
const pname = ref('张三');
const pid = ref('21371101');
// 姓名
const nameediting = ref(false)
const namecontent = ref('Hello, world!')
const nametempContent = ref('')
function namestartEditing() {
    nameediting.value = true
    nametempContent.value = namecontent.value
}
function namestopEditing() {
    ageediting.value = false
    namecontent.value = nametempContent.value
}
// 年龄
const ageediting = ref(false)
const agecontent = ref('Hello, world!')
const agetempContent = ref('')
function agestartEditing() {
    ageediting.value = true
    agetempContent.value = agecontent.value
}
function agestopEditing() {
    ageediting.value = false
    agecontent.value = agetempContent.value
}
// 性别
const sexediting = ref(false)
const sexcontent = ref('Hello, world!')
const sextempContent = ref('')
function sexstartEditing() {
    sexediting.value = true
    sextempContent.value = sexcontent.value
}
function sexstopEditing() {
    sexediting.value = false
    sexcontent.value = sextempContent.value
}
// 出生日期
const birediting = ref(false)
const bircontent = ref('Hello, worldasdasd!')
const birtempContent = ref('')
function birstartEditing() {
    birediting.value = true
    birtempContent.value = bircontent.value
}
function birstopEditing() {
    birediting.value = false
    bircontent.value = birtempContent.value
}
// 地区
const regediting = ref(false)
const regcontent = ref('Hello, world!')
const regtempContent = ref('')
function regstartEditing() {
    regediting.value = true
    regtempContent.value = regcontent.value
}
function regstopEditing() {
    regediting.value = false
    regcontent.value = regtempContent.value
}
// 邮箱
const emailediting = ref(false)
const emailcontent = ref('Hello, world!')
const emailtempContent = ref('')
function emailstartEditing() {
    emailediting.value = true
    emailtempContent.value = emailcontent.value
}
function emailstopEditing() {
    emailediting.value = false
    emailcontent.value = emailtempContent.value
}
// 身份证号
const idCardediting = ref(false)
const idCardcontent = ref('Hello, world!')
const idCardtempContent = ref('')
function idCardstartEditing() {
    idCardediting.value = true
    idCardtempContent.value = idCardcontent.value
}
function idCardstopEditing() {
    idCardediting.value = false
    idCardcontent.value = idCardtempContent.value
}
// 病史
const historyediting = ref(false)
const historycontent = ref('Hello, world!')
const historytempContent = ref('')
function historystartEditing() {
    historyediting.value = true
    historytempContent.value = historycontent.value
}
function historystopEditing() {
    historyediting.value = false
    historycontent.value = historytempContent.value
}


//仅仅进行保存按钮的方法的编写
function save() {
    axios.post('/api/user', {
        agecontent,
        sexcontent,
        bircontent,
        regcontent,
        emailcontent,
        idCardcontent,
        historycontent
    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        })
}

</script>


<style>
.bg-image {
    position: absolute;
    left: 250px;
    width: 1000px;
    height: 900px;
    top: 0px;
}

.message {
    position: absolute;
    top: 200px;
}

.bt_changePic {
    position: relative;
    left: 50px;
    top: 20px;
}

.leftpart {
    position: relative;
    left: 100px;
    width: 250px;
    height: 600px;
    top: 100px;
    border-right: 2px solid rgb(11, 11, 18);
}

.avatar {
    position: relative;
    /* left: 150px;*/
    width: 200px;
    height: 200px;
    top: 10px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.name_and_id {
    position: relative;
    bottom: 150px;
    left: 500px;
    width: 300px;
    height: 50px;
    border-radius: 3%;
    border: 2px solid rgb(11, 11, 18);
    color: black;
    background-color: rgb(108, 112, 112);
}

.nameid {
    position: relative;
    top: 10px;
    left: 10px;
    font-size: 20px;
    font-style: italic;
    text-decoration: none;
}

.mycard {
    position: relative;
    left: 450px;
    bottom: 100px;
    width: 400px;
}

.edit-item {
    position: relative;
    width: 300px;
    height: 50px;
    /* bottom: 10px; */
    left: 10px;
}

.save_button {
    position: relative;
    width: 70px;
    height: 50px;
    bottom: 10px;
    left: 160px;
}
</style>

  