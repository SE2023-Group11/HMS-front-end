<template>
    <div class="Hello">
        <p>欢迎来到{{ pid }}的个人空间！</p>
    </div>
    <div class="bg-image">
        <div class="leftpart">
            <div class="avatar">
                <img src="../../public/person.png" v-if="!imageUrl" />
                <img :src="imageUrl" v-if="imageUrl">
            </div>
            <div class="bt_changePic">
                <label for="file-input" class="custom-file-upload">
                    <i class="fa fa-cloud-upload"></i> 点击更换头像
                </label>
                <input id="file-input" type="file" @click="changePic" style="display:none;">
            </div>
        </div>

        <div class="message">
            <Card class="mycard">
                <template #title>医生{{ namecontent }}的个人信息</template>
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
                        <!-- 诊室 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">所在诊室&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!deptediting" @click="deptstartEditing">{{ deptcontent }}</div>
                                <InputText v-if="deptediting" type="text" v-model="depttempContent" @blur="deptstopEditing"
                                    @keyup.enter="deptstopEditing" />
                            </div>
                        </div>
                        <!-- 职务 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">职务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!titleediting" @click="titlestartEditing">{{ titlecontent }}</div>
                                <InputText v-if="titleediting" type="text" v-model="titletempContent"
                                    @blur="titlestopEditing" @keyup.enter="titlestopEditing" />
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
                        <!-- 手机号 -->
                        <div class="edit-item" style="word-break: break-all;">
                            <div style="float:left">手机号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div style="float:left">
                                <div v-if="!phoneediting" @click="phonestartEditing">{{ phonecontent }}</div>
                                <InputText v-if="phoneediting" type="text" v-model="phonetempContent"
                                    @blur="phonestopEditing" @keyup.enter="phonestopEditing" />
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
                        <div class="save_button">
                            <Button label="保存" @click="save" />
                        </div>
                    </div>

                </template>
            </Card>
            <div class="history">
                <Panel v-if="!historyediting" header="经历简介" class="panel">
                    {{ historycontent }}
                </Panel>
                <div>
                    <Textarea v-if="historyediting" v-model="historytempContent" rows="5" cols="30" />
                </div>
                <Button :label='bthis' @click="edithistory" class="edithistory" />
            </div>
        </div>
    </div>
    <!-- 消息通知的部分 -->
    <div class="tongzhi">
        <!-- 上传头像 -->
        <Message v-if="judpic == 1" severity="success">上传头像成功</Message>
        <Message v-if="judpic == -1" severity="error">上传头像失败</Message>

        <!-- 保存信息卡 -->
        <Message v-if="judmess == 1" severity="success">保存信息卡成功</Message>
        <Message v-if="judmess == -1" severity="error">保存信息卡失败</Message>

        <!-- 编辑病史 -->
        <Message v-if="judhis == 1" severity="success">编辑简历成功</Message>
        <Message v-if="judhis == -1" severity="error">编辑简历失败</Message>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';
//primevue
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Textarea from 'primevue/textarea';
import Message from 'primevue/message';
//进行数据传输的时候用的变量
const id = ref('123');

// onMounted(() => {
//     getinfo();
// })

// 在初始的时候对于当前的用户的个人信息进行获取，并且展示在面板上
function getinfo() {
    axios.get('http://localhost:8080//getDoctorInformation', {
        // params: {
        //     patient_id: id.value // 传递 ID 参数
        // }
    })
        .then(response => {
            // 成功获取数据后的处理逻辑
            console.log(response.data)
            const data = response.data;
            namecontent.value = data.doctorName;
            deptcontent.value = data.doctorSection;
            titlecontent.value = data.doctorTitle;
            emailcontent.value = data.doctorMail;
            idCardcontent.value = data.doctorNumber;
            phonecontent.value = data.doctorPhone;
        })
        .catch(error => {
            // 处理错误的逻辑
            console.error(error)
        })
}




// 对于个人的信息框的设置
const pid = ref('21371101');

//下面这些的逻辑是实现当点击对应的信息的时候弹出表框使得可以进行修改
// 姓名
const nameediting = ref(false)
const namecontent = ref('李四')
const nametempContent = ref('')
function namestartEditing() {
    nameediting.value = true
    nametempContent.value = namecontent.value
    judmess.value = 0
}
function namestopEditing() {
    nameediting.value = false
    namecontent.value = nametempContent.value
}
//诊室
const deptediting = ref(false)
const deptcontent = ref('外科')
const depttempContent = ref('')
function deptstartEditing() {
    deptediting.value = true
    depttempContent.value = deptcontent.value
    judmess.value = 0
}
function deptstopEditing() {
    deptediting.value = false
    deptcontent.value = depttempContent.value
}
// 职务
const titleediting = ref(false)
const titlecontent = ref('主治医师')
const titletempContent = ref('')
function titlestartEditing() {
    titleediting.value = true
    titletempContent.value = titlecontent.value
    judmess.value = 0
}
function titlestopEditing() {
    titleediting.value = false
    titlecontent.value = titletempContent.value
}

// 邮箱
const emailediting = ref(false)
const emailcontent = ref('133324432@qq.com')
const emailtempContent = ref('')
function emailstartEditing() {
    emailediting.value = true
    emailtempContent.value = emailcontent.value
    judmess.value = 0
}
function emailstopEditing() {
    emailediting.value = false
    emailcontent.value = emailtempContent.value
}
//手机号
const phoneediting = ref(false)
const phonecontent = ref('143439534345')
const phonetempContent = ref('')
function phonestartEditing() {
    phoneediting.value = true
    phonetempContent.value = phonecontent.value
    judmess.value = 0
}
function phonestopEditing() {
    phoneediting.value = false
    phonecontent.value = phonetempContent.value
}
// 身份证号
const idCardediting = ref(false)
const idCardcontent = ref('32445353453645564')
const idCardtempContent = ref('')
function idCardstartEditing() {
    idCardediting.value = true
    idCardtempContent.value = idCardcontent.value
    judmess.value = 0
}
function idCardstopEditing() {
    idCardediting.value = false
    idCardcontent.value = idCardtempContent.value
}

//这些是对于病史的框的代码，点击按钮可以进行修改内容
const historyediting = ref(false)
const historycontent = ref('这是我的简历')
const historytempContent = ref('')
const bthis = ref('编辑简历')
//判断传输的结果
const judhis = ref(0);
function edithistory() {
    if (bthis.value == '编辑简历') {
        historyediting.value = true;
        historytempContent.value = historycontent.value;
        bthis.value = '保存简历';

    }
    else {
        //这里首先要实现一个数据库对于病史的更新，向后端传输数据
        axios.post("http://localhost:8080/saveIntroduction", {
            phistory: historytempContent.value,
        }).then(res => {
            console.log(res);
            judhis.value = 1;
        }).catch(error => {
            console.error(error)
            judhis.value = -1;
        })

        historyediting.value = false;
        historycontent.value = historytempContent.value;
        bthis.value = '编辑简历';
    }

}

//修改的时候对新的信息进行封装
const doctor = {};
function setDoctor() {
    doctor.doctorMail = emailcontent.value;
    doctor.doctorPhone = phonecontent.value;
    doctor.doctorName = namecontent.value;
    doctor.doctorNumber = idCardcontent.value;
    doctor.doctorSection = deptcontent.value;
    doctor.doctorTitle = titlecontent.value;
}
//进行保存按钮的方法的编写,同时返回结果
const judmess = ref(0);
function save() {
    setDoctor();
    axios.post('http://localhost:8080/changeDoctor',
        doctor
    )
        .then(response => {
            console.log(response.data)
            judmess.value = 1;
        })
        .catch(error => {
            console.error(error)
            judmess.value = -1;
        })
}

//实现对于图片的更换和保存
const imageUrl = ref('');
//将文件转换为formdata形式
const formData = new FormData();
//判断传输的结果是否成功
const judpic = ref(0);
function changePic(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            imageUrl.value = reader.result;
        };
        reader.readAsDataURL(file);
    }
    //将上传的文件存到数据库
    if (file?.file) {
        const blob = new Blob([file], { type: file.type });
        formData.append('file', blob, { filename: 'image.jpg' });
        axios.post('http://localhost:8080/savePic', formData, {
            params: {
                pid: pid.value,
                image: formData.values,
            }
        }).then(response => {
            console.log('Upload successful!');
            judpic.value = 1;
        }).catch(error => {
            console.error('Upload failed: ', error);
            judpic.value = -1;
        });
    }
    else {
        console.error('文件不存在')
    }
}
</script>


<style>
.Hello {
    position: absolute;
    left: 250px;
    top: 10px;
    width: 800px;
    font-size: 30px;
}

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
    z-index: 9999;
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

.choosePic {
    color: blue;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.edithistory {
    position: relative;
    left: 150px;
}

.mycard {
    position: relative;
    left: 450px;
    bottom: 120px;
    width: 400px;
    height: 460px;
}

.history {
    position: relative;
    left: 450px;
    bottom: 50px;
    width: 400px;
    height: 300px;
}

.panel .p-panel-content {
    word-wrap: break-word;
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

.tongzhi {
    position: absolute;
    left: 600px;
    width: 400px;
    top: 20px;
}
</style>

  