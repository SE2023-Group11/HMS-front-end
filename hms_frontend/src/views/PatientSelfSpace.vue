<template>
    <!-- 头部 -->
    <div class="header9">
        <div class="logo9">
            <i class="pi pi-hospital9"></i>
            <img class="img_top9" src="../Pic/img.jpeg" />
            <span display="flex9">医院信息管理系统</span>
        </div>
        <div class="user-info9">
            <img class="avatar9" src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="User Avatar" />
        </div>
    </div>

    <div class="jian">
        <div class="zi">
            {{ namecontent }}
        </div>
    </div>
    <div class="card">
        <TabView :activeIndex="activeTabIndex" @tab-change="handleTabChange">
            <TabPanel header="个人空间">

            </TabPanel>
            <TabPanel header="消息通知">

            </TabPanel>
            <TabPanel header="返回主页">

            </TabPanel>
        </TabView>
    </div>
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
    <div class="pp">
        <div class="message">
            <Card class="mycard">
                <!-- <template #title>用户{{ pid }}的个人信息</template> -->
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

        </div>
        <!-- 病史是拓展内容 -->
        <div class="history">
            <Panel v-if="!historyediting" header="病史" class="panel">
                {{ historycontent }}
            </Panel>
            <div>
                <Textarea v-if="historyediting" v-model="historytempContent" rows="5" cols="30" />
            </div>
            <Button :label='bthis' @click="edithistory" class="edithistory" />
        </div>
    </div>
    <div>
        <img class="img_foot9" src="../Pic/bottom.jpg" />
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
        <Message v-if="judhis == 1" severity="success">编辑病史成功</Message>
        <Message v-if="judhis == -1" severity="error">编辑病史失败</Message>
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
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
const activeTabIndex = ref(0)
import { useRouter } from 'vue-router'
const router = useRouter()
//进行数据传输的时候用的变量
const id = ref('123');
const token = sessionStorage.getItem('token');
// onMounted(() => {
//     getinfo();
// })
function handleTabChange(e) {
    const index = e.index;
    if (index === 0) {
        router.push('/doctorspace');
    } else if (index === 1) {
        router.push('/message');
    } else if (index === 2) {
        router.push('/page3');
    }
}
//通过患者的生日获得患者的年龄
function calculateAge(birthday) {
    const now = new Date();
    const birthDate = new Date(birthday);

    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}
// 在初始的时候对于当前的用户的个人信息进行获取，并且展示在面板上
function getinfo() {
    axios.get('http://localhost:8080/getPatientInformation', {
        params: {
            token: token.value, // 传递token
        }
    })
        .then(response => {
            // 成功获取数据后的处理逻辑
            console.log(response.data)
            const data = response.data;

            namecontent.value = data.patientName;
            sexcontent.value = data.patientSex;
            bircontent.value = data.patientBirthday;
            agecontent.value = calculateAge(data.patientBirthday);
            //regcontent.value = data.region;//这个暂时定为不返回
            emailcontent.value = data.patientMail;
            idCardcontent.value = data.patientNumber;
            phonecontent.value = data.patientPhone;
            historycontent.value = data.history;
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
const namecontent = ref('张三')
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
// 年龄
const ageediting = ref(false)
const agecontent = ref('20')
const agetempContent = ref('')
function agestartEditing() {
    ageediting.value = true
    agetempContent.value = agecontent.value
    judmess.value = 0
}
function agestopEditing() {
    ageediting.value = false
    agecontent.value = agetempContent.value
}
// 性别
const sexediting = ref(false)
const sexcontent = ref('男')
const sextempContent = ref('')
function sexstartEditing() {
    sexediting.value = true
    sextempContent.value = sexcontent.value
    judmess.value = 0
}
function sexstopEditing() {
    sexediting.value = false
    sexcontent.value = sextempContent.value
}
// 出生日期
const birediting = ref(false)
const bircontent = ref('2002-10-24')
const birtempContent = ref('')
function birstartEditing() {
    birediting.value = true
    birtempContent.value = bircontent.value
    judmess.value = 0
}
function birstopEditing() {
    birediting.value = false
    bircontent.value = birtempContent.value
}

// 邮箱
const emailediting = ref(false)
const emailcontent = ref('13303453453@qq.com')
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
const phonecontent = ref('18345664564')
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
const idCardcontent = ref('34243242354534')
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
const historycontent = ref('这是我的病史asdsadasdasdasdsad过敏原：')
const historytempContent = ref('')
const bthis = ref('编辑病史')
//判断传输的结果
const judhis = ref(0);
function edithistory() {
    if (bthis.value == '编辑病史') {
        historyediting.value = true;
        historytempContent.value = historycontent.value;
        bthis.value = '保存病史';

    }
    else {
        //这里首先要实现一个数据库对于病史的更新，向后端传输数据
        axios.post("http://localhost:8080/savehistory", {
            token: token.value, // 传递token
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
        bthis.value = '编辑病史';
    }

}

const patient = {};
function setpatinet() {
    patient.patient_id = pid.value,
        patient.patient_name = namecontent.value,
        patient.patient_idcard = idCardcontent.value,
        patient.patient_mail = emailcontent.value,
        patient.patient_phone = phonecontent.value,
        patient.patient_sex = sexcontent.value,
        patient.patient_birthday = bircontent.value
}
//进行保存按钮的方法的编写,同时返回结果
const judmess = ref(0);
function save() {
    setpatinet();
    axios.post('http://localhost:8080/changePatient', {
        token: token.value,
        patient
    })
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
.jian {
    position: absolute;
    top: 70px;
    width: 100%;
    height: 200px;
    background-image: url("../Pic/jianyue.jpg");
    z-index: 200;
}

.zi {
    font-size: 40px;
    z-index: 400;
    position: relative;
    left: 40%;
    top: 50%;
    z-index: 500;
    color: #fff;
}

.card {
    position: absolute;
    z-index: 60990;
    left: 710px;
    top: 280px;
}

.pp {
    position: absolute;
    left: 25%;
    width: 1000px;
    height: 900px;
    top: 150px;
    background-color: #ffffff;
}

.message {
    position: absolute;
    bottom: 70px;
    right: 500px;
    font-size: 20px;
}

.bt_changePic {
    position: relative;
    left: 50px;
    top: 20px;
    z-index: 9999;
}

.history {
    position: absolute;
    left: 50px;
    top: 350px;
    width: 400px;
    height: 300px;
}

.leftpart {
    position: relative;
    left: 100px;
    width: 250px;
    height: 600px;
    top: 100px;
    /* border-right: 2px solid rgb(11, 11, 18); */
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
    bottom: 220px;
    width: 400px;
    height: 460px;
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



/* 没什么用 */
.img_top9 {
    height: 80px;
}

.appointmentListHead9 {
    width: 2000px;
}

.header9 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    height: 60px;
    border-bottom: 1px solid #ccc;
}

.avatar9 {
    position: fixed;
    top: 10px;
    right: 50px;
}

.rowTitle9 {
    width: 100px;
    font-size: 10px;
}

.logo9 {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
}

.logo i {
    font-size: 32px;
    margin-right: 10px;
}

.user-info9 {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
}

.user-info9 img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 60px;
}

.user-menu9 ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.user-menu9 li {
    border-bottom: 1px solid #ccc;
}

.user-menu9 li:last-child {
    border-bottom: none;
}

.user-menu9 a {
    display: block;
    padding: 10px;
    color: #333;
}

.user-menu9 a:hover {
    background-color: rgb(255, 255, 255);
}

.img_foot9 {
    z-index: 999999999;
    position: absolute;
    bottom: 0px;
    left: 0px;
    border-top: 1px solid #ccc;
}
</style>

  