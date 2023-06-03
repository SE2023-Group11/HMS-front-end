<template>
    <div>
    <div class='body'>
    
            <div class="container" id="container">
              <div class="header">
                <img src="https://f.pz.al/pzal/2023/05/19/d218206d1e4dd.png" alt="" class="header_img"/>
                <h1 class="header_tag">HMS医院门诊预约系统</h1>
                <div class="header_user">
                    <img src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="" class="header_user_img"/>
                    <h1 class="header_user_word">登录/注册</h1>
                    <div id="triangle-down"></div>
                
            </div> 
        </div>
                <div class="main">   
    
                      <Card class="mycard">
                          <template #content>
                                  <div class="edit-item" style="word-break: break-all;">
                                      <div style="float:left">姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                      <div style="float:left">
                                          <div >{{ namecontent }}</div>
                                      </div>
                                  </div>
                                  <!-- 年龄 -->
                                  <div class="edit-item" style="word-break: break-all;">
                                      <div style="float:left">年龄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                      <div style="float:left">
                                          <div >{{ agecontent }}</div>       
                                      </div>
                                  </div>
                                  <!-- // 性别 -->
                                  <div class="edit-item" style="word-break: break-all;">
                                      <div style="float:left">性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                      <div style="float:left">
                                          <div >{{ sexcontent }}</div>
                                      </div>
                                  </div>
                                  <!-- // 出生日期 -->
                                  <div class="edit-item" style="word-break: break-all;">
                                      <div style="float:left">出生日期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                      <div style="float:left">
                                          <div >{{ bircontent }}</div>
                                      </div>
                                  </div>
                                  <!-- // 邮箱 -->
                                  <div class="edit-item" style="word-break: break-all;">
                                      <div style="float:left">邮箱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                      <div style="float:left">
                                          <div >{{ emailcontent }}</div>
                                      </div>
                                  </div>
                                  <!-- 手机号 -->
                                  <div class="edit-item" style="word-break: break-all;">
                                      <div style="float:left">手机号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                      <div style="float:left">
                                          <div >{{ phonecontent }}</div>
                                      </div>
                                  </div>
                          </template>
                      </Card>
                      <Panel  header="病史" class="panel">
                        <p class="pp" >{{historycontent}}</p>
                    </Panel>
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
    </template>
    
<script setup>
import { ref ,onMounted} from 'vue';
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
const id = ref('patientId');
const role = sessionStorage.getItem("role");
onMounted(() => {
    getinfo();
    console.log(sessionStorage.getItem("role"));
})
function handleTabChange(e) {
    const index = e.index;
    if (index === 0) {
        if (role.value === 'patient') router.push('/patientSpace');
        else router.push('/doctorSpace');
    } else if (index === 1) {
        router.push('/message');
    } else if (index === 2) {
        if (role.value === 'patient') router.push('/patientRoot');
        else router.push('/doctorRoot');
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
// 对于个人的信息框的设置
const pid = ref('21371101');
// 在初始的时候对于当前的用户的个人信息进行获取，并且展示在面板上
function getinfo(token,id) {
    axios.get('http://121.199.161.134:8080/getPatientInformation',{
        params: {
            // token: token.value, 
        token:token.value,
        id :id.value
        }
    })
        .then(response => {
            // 成功获取数据后的处理逻辑
            console.log(response.data)
            const data = response.data.data;    
            namecontent.value = data.patientName;
            sexcontent.value = data.patientSex==true?'男':'女';
            bircontent.value = data.patientBirthday;
            agecontent.value = calculateAge(data.patientBirthday);
            emailcontent.value = data.patientMail;
            phonecontent.value = data.patientPhone;
        })
        .catch(error => {
            // 处理错误的逻辑
            console.error(error)
        })
}
const patient = {};
function setpatient() {
        patient.patientName = namecontent.value,
        patient.patientNumber = idCardcontent.value,
        patient.patientMail = emailcontent.value,
        patient.patientPhone = phonecontent.value,
        patient.patientSex = sexcontent.value=='男'?true:false,
        patient.patientBirthday = bircontent.value
}
//进行保存按钮的方法的编写,同时返回结果

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
  

  .mycard{
    margin-top :150px;
    width: 400px;
    margin-left: 0px;
    position: absolute;
  }
  .panel {
    border-radius: 5px; /* 添加5像素圆角 */
    margin-top :150px;
    width: 300px;
    height:363px;
    margin-left: 500px;
    position: absolute;
    border: 0.1px solid #cccccc58; /* 添加1像素宽的灰色实线边框 */
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3); /* 添加2像素偏移的黑色阴影 */
  }
  .pp{
    height:280px;
  }
  .edit-item {
    position: relative;
    width: 300px;
    height: 50px;
    /* bottom: 10px; */
    left: 10px;
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
        z-index: 99;
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
        margin-top: 0px;
        width: 70%;
        min-height: 600px;
        background-color: rgb(255, 255, 255);
    }
    .footer{
        height: 220px;
        width: 100%;
        margin-top: 20px;
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