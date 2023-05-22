<template>

  <div>
        <head>
            <meta charset="UTF-8">
            <title>HMS医院门诊预约系统</title>
        </head>
      <div class='body'>
            <div class="container" id="container">
                <div class="header">
                    <img src="https://f.pz.al/pzal/2023/05/19/d218206d1e4dd.png" alt="" class="header_img"/>
                    <h1 class="header_tag">HMS医院门诊预约系统</h1>
                    <div class="header_user" @mouseenter="showList()" @mouseleave="unShowList()">
                        <img src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="" class="header_user_img"/>
                        <h1 class="header_user_word">登录/注册</h1>
                        <div id="triangle-down"></div>
                        <div id="header_list">
                            <div class="header_list_item">个人主页</div>
                            <div class="header_list_item">消息通知</div>
                            <div class="header_list_item">账号注销</div>
                            <div class="header_list_item">退出登录</div>
                        </div>
                    </div>
                </div>
                <!-- <div class="main"></div> -->
            <div class="main1">
              <!-- 从这里开始是重要的 -->
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

        </div>
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
    
                <div class="footer">
                    <div class="footer_box">
                        <ul class="footer_list_box">
                            <li>
                                <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_1.png" alt="">
                                <span>电话：010-82317114</span>
                            </li>
                            <li>
                                <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_2.png" alt="">
                                <span>传真：010-82328136</span>
                            </li>
                            <li>
                                <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_3.png" alt="">
                                <span>邮编：100191</span>
                            </li>
                            <li>
                                <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_4.png" alt="">
                                <span>地址：北京市海淀区学院路37号</span>
                            </li>
                        </ul>
                    </div>
                    <div class="footer_item">Copyright ©️ 2023-2033</div>
                    <div class="footer_item">HMS Powered by SEGroup11</div>
                    <div class="footer_item">HMS Designed by AlpaCa</div>
                </div>
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
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { useRouter } from 'vue-router'
const activeTabIndex = ref(0)

const router = useRouter()
//进行数据传输的时候用的变量
const id = ref('123');
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
// onMounted(() => {
//     getinfo();
// })
//获取当前的用户的token
const token = sessionStorage.getItem('token');
// 在初始的时候对于当前的用户的个人信息进行获取，并且展示在面板上
function getinfo() {
    axios.get('http://localhost:8080//getDoctorInformation', {
        params: {
            token: token.value // 传递token
        }
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
const historycontent = ref('这是我的简历d')
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
    axios.post('http://localhost:8080/changeDoctor', {
        token: token.value, // 传递token
        doctor
    }
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
  //统一的函数
  function showList(){
        var list = document.getElementById("header_list");
        console.log("in");
        list.style.display = "block";
    };
    function unShowList(){
        var list = document.getElementById("header_list");
        console.log("out");
        list.style.display = "none";
    };
  </script>
  
<style scoped>
.jian {
  position: relative;
  top: 50px;
  width: 100%;
  height: 200px;
  background-image: url("../Pic/jianyue.jpg");
  z-index: 9999999;
}
.bttt{
  position: absolute;
  top:100px;
  z-index: 1000000000000;
}
.zi {
  font-size: 40px;
  z-index: 400;
  position: relative;
  left: 44%;
  top: 60%;
  z-index: 500;
  color: #fff;
}
.bt_changePic {
    position: relative;
    left: 50px;
    top: 20px;
    z-index: 9999;
}
.card {
  position: absolute;
  z-index: 60990;
  left: 710px;
  top: 280px;
}
.pp {
  position: absolute;
  left: 15%;
  right: 15%;
  /* width: 1000px; */
  height: 900px;
  top: 150px;
  background-color: #ffffff;
}

.message {
  position: absolute;
  bottom: 180px;
  right: 200px;
  font-size: 20px;
}

.history {
  position: absolute;
  left: 50px;
  top: 250px;
  width: 400px;
  height: 300px;
}
.edithistory {
  position: relative;
  left: 150px;
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

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.leftpart {
    position: relative;
    left: 430px;
    width: 250px;
    height: 600px;
    top: -80px;
    z-index: 9999999;
}


.avatar {
    position: relative;
    /* left: 150px;*/
    width: 200px;
    height: 200px;
    top: 10px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 999999;
}



.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}





/* 这是统一的css */
* {
      margin: 0;
      padding: 0;
  }
  html {
      height: 100%;
  }
  .body {
      height: 100%;
      min-height: 100vh;
      
  }
/* body{
  position: relative;
} */
  .container {
      position: relative;
      height: 100%;
      padding-top: 0.1px;
      /*background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);*/
      /*background-image: url("../img/back_img3.jpg");*/
      /*background-size: cover;*/
  }
  .background{
      width: 100%;
      height: 100%;
      background-size: cover;
      /*background-image: url("../img/back_img3.jpg");*/
      position: fixed;
      z-index: -999;
  }
  .header{
      top:0px;
      height: 60px;
      width: 100%;
      background-color: whitesmoke;
      border-bottom: rgba(0, 0, 0, 0.3) solid 1px;
      position: fixed;
      z-index: 99999999999;
  }
  .header_img{
      /* background-color: red; */
      width: 60px;
      height: 60px;
      float: left;
      margin-left: 8%;
  }
  .header_tag{
      /* background-color: blue; */
      margin-left: 1%;
      line-height: 60px;
      font-family: Arial;
      float: left;
      font-size: 18px;
  }
  .header_user{
      /* background-color: green; */
      float: right;
      margin-right: 8%;
      height: 60px;
      width: 150px;
  }
  #header_list{
      background-color: #c1c0c0;
      display: none;
      margin-top: 60px;
      width: 150px;
      height: 200px;
  }
  .header_list_item{
      width: 150px;
      height: 50px;
      line-height: 50px;
      text-align: center;
  }
  .header_list_item:hover{
      background-color: rgb(137, 132, 132);
      cursor: pointer;
  }
  .header_user:hover{
      background-color: #c1c0c0;
      /* cursor: pointer; */
  }
  .header_user_word{
      /* background-color: white; */
      margin-left: 10px;
      line-height: 60px;
      font-size: 13px;
      float: left;
  }
  .header_user_img{
      /* background-color: blue; */
      margin-top: 5px;
      margin-left: 5px;
      width: 50px;
      height: 50px;
      float: left;
      border-radius: 100%;
  }
  #triangle-down{
      float: left;
      margin-top: 25px;
      margin-left: 5px;
      width:0px;
      height:0px;
      border-left:6px solid transparent;
      border-right:6px solid transparent;
      border-top:10px black solid;
  }
  .main{
      border-radius: 5px;
      margin-left: 15%;
      margin-right: 15%;
      margin-top: 70px;
      width: 70%;
      min-height: 600px;
      background-color: rgb(255, 255, 255);
  }
  .footer{
      position: absolute;
      bottom: -400px;
      height: 220px;
      width: 100%;
      /* margin-top: 300px; */
      background-color: rgba(0, 0, 0, 0.85);
  }
  .footer_img{
      margin: auto;
      width: 400px;
  }
  .footer_item{
      width: 100%;
      text-align: center;
      color: rgba(255,255,255,0.7);
      font-size: 15px;
      line-height: 25px;
  }
  .footer_box{
      padding-top: 10px;
      margin-top: 20px;
      margin: auto;
      width: 100%;
      height: 120px;
  }
  .footer_list_box{
      margin: auto;
      list-style: none;
      width: 620px;
      height: 100%;
      /* float: left; */
  }
  .footer_list_box>li {
      padding: 15px 0 10px;
      width: 310px;
      height: 50px;
      color: rgba(255,255,255,0.7);
      box-sizing: border-box;
      float: left;
      position: relative;
  }
</style>