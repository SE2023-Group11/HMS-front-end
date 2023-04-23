<template>
    <div class="bg-image">
        <div class="avatar">
            <img src="../../public/jay.jpg" />
        </div>
        <div class="message">
            <div class="name_and_id">
                <label class="nameid">name: {{ pname }}</label>
                &nbsp;&nbsp;
                <label class="nameid">pid: {{ pid }}</label>
            </div>

            <div class="edit">
                <!-- // 年龄 -->
                <div class="edit-item" style="word-break: break-all;">
                    <div style="float:left">年龄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div style="float:left">
                        <div v-if="!ageediting" @click="agestartEditing">{{ agecontent }}</div>
                        <input v-if="ageediting" type="text" v-model="agetempContent" @blur="agestopEditing"
                            @keyup.enter="agestopEditing">
                    </div>
                </div>
                <!-- // 性别 -->
                <div class="edit-item" style="word-break: break-all;">
                    <div style="float:left">性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div style="float:left">
                        <div v-if="!sexediting" @click="sexstartEditing">{{ sexcontent }}</div>
                        <input v-if="sexediting" type="text" v-model="sextempContent" @blur="sexstopEditing"
                            @keyup.enter="sexstopEditing">
                    </div>
                </div>
                <!-- // 出生日期 -->
                <div class="edit-item" style="word-break: break-all;">
                    <div style="float:left">出生日期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div style="float:left">
                        <div v-if="!birediting" @click="birstartEditing">{{ bircontent }}</div>
                        <input v-if="birediting" type="text" v-model="birtempContent" @blur="birstopEditing"
                            @keyup.enter="birstopEditing">
                    </div>
                </div>
                <!-- //地区 -->
                <div class="edit-item" style="word-break: break-all;">
                    <div style="float:left">地区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div style="float:left">
                        <div v-if="!regediting" @click="regstartEditing">{{ regcontent }}</div>
                        <input v-if="regediting" type="text" v-model="regtempContent" @blur="regstopEditing"
                            @keyup.enter="regstopEditing">
                    </div>
                </div>
                <!-- // 邮箱 -->
                <div class="edit-item" style="word-break: break-all;">
                    <div style="float:left">邮箱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div style="float:left">
                        <div v-if="!emailediting" @click="emailstartEditing">{{ emailcontent }}</div>
                        <input v-if="emailediting" type="text" v-model="emailtempContent" @blur="emailstopEditing"
                            @keyup.enter="emailstopEditing">
                    </div>
                </div>
                <!-- // 身份证号 -->
                <div class="edit-item" style="word-break: break-all;">
                    <div style="float:left">身份证号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div style="float:left">
                        <div v-if="!idCardediting" @click="idCardstartEditing">{{ idCardcontent }}</div>
                        <input v-if="idCardediting" type="text" v-model="idCardtempContent" @blur="idCardstopEditing"
                            @keyup.enter="idCardstopEditing">
                    </div>
                </div>
                <!-- // 病史 -->
                <div class="edit-item" style="word-break: break-all;">
                    <div style="float:left">病史&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div style="float:left">
                        <div v-if="!historyediting" @click="historystartEditing">{{ historycontent }}</div>
                        <input v-if="historyediting" type="text" v-model="historytempContent" @blur="historystopEditing"
                            @keyup.enter="historystopEditing">
                    </div>
                </div>
                <div class="save_button">
                    <el-button class="send" type="primary" size="medium" @click="save">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios'
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
const bircontent = ref('Hello, world!')
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
    background-image: url('../Pic/selfbgp.jpg');
}

.message {
    position: relative;
    top: 80px;
}

.avatar {
    position: relative;
    left: 150px;
    width: 200px;
    height: 200px;
    top: 100px;
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

.edit {
    position: relative;
    bottom: 100px;
    left: 450px;
    width: 400px;
    border: 2px solid blue;
    background-image: url('../Pic/mess.png');
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

  