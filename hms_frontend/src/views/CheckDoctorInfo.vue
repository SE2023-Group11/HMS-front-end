<template>
   
    <div class="header">
      <img src="https://f.pz.al/pzal/2023/05/19/d218206d1e4dd.png" alt="" class="header_img" />
      <h1 class="header_tag" style="font-family:Arial, Helvetica, sans-serif;font-size: 20px;">HMS医院门诊预约系统</h1>
      <div class="header_user" @mouseenter="showList" @mouseleave="unShowList">
        <!-- 显示头像 -->
        <img src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="" class="header_user_img" />
        <!-- 未登录时显示登录/注册 -->
        <!-- 登录后显示用户名 -->
        <h1 class="header_user_word">登录/注册</h1>
        <div id="triangle-down"></div>
        <div id="header_list" ref="headerList">
          <div class="header_list_item">个人主页</div>
          <div class="header_list_item">消息通知</div>
          <div class="header_list_item">账号注销</div>
          <div class="header_list_item">退出登录</div>
        </div>
      </div>
    </div>
    <div class="globalMenu">
            <span class="pi-map-marker"></span>
            &nbsp;
            <router-link :to="'/PatientRoot'" style="text-decoration: none;color:gray;">首页</router-link>
            &nbsp;>&nbsp;
            <router-link :to="'/CheckDoctorInfo'" style="text-decoration: none;color:gray;">医生信息</router-link>
            &nbsp;>&nbsp;
            <router-link :to="'/CheckDoctorInfo'" style="text-decoration: none;color:gray;">{{ this.selectedSectionName }}</router-link>    
            <span class="p-input-icon-left" style="left: 700px;">
                <i class="pi pi-search" />
                <InputText v-model="searchSectionName" placeholder="搜索科室名" @keyup.enter="searchSection"/>
            </span>
    </div>
    <div class="banner">
      <div class="wrap">
          <div class="introduction">
              <div v-if="selectedSection">
                  <h3 style="text-align: left;margin-bottom: 40px;margin-top: 20px;">当前科室：{{ selectedSectionName }}</h3>
                  <div v-if="selectedSection.sectionIntroduction.length>0">
                      <div v-if="selectedSection.sectionIntroduction.length>800">
                          {{ selectedSection.sectionIntroduction .substring(0, 800)}}......
                      </div>
                      <div v-else>
                          {{ selectedSection.sectionIntroduction }}
                      </div>
                  </div>
                  <div v-else>暂无介绍信息</div>
              </div>
              <div v-else><h3 style="text-align: left;margin-bottom: 40px;margin-top: 20px;">暂无信息</h3></div>
          </div>
          <div class="slide">
              <ul>
                  <li>
                      <a href="#">内科系统<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('呼吸与危重症医学科')">
                                      <span>呼吸与危重症医学科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('呼吸睡眠医学科')">
                                      <span>呼吸睡眠医学科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('消化内科')">
                                      <span>消化内科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('心血管内科')">
                                      <span>心血管内科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('高血压科')">
                                      <span>高血压科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('肾内科')">
                                      <span>肾内科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('内分泌科')">
                                      <span>内分泌科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('风湿免疫科')">
                                      <span>风湿免疫科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('感染科')">
                                      <span>感染科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('老年科')">
                                      <span>老年科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('神经内科')">
                                      <span>神经内科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('全科医学科（综合内科）')">
                                      <span>全科医学科（综合内科）</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('急诊内科')">
                                      <span>急诊内科</span>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </li>
                  <li>
                      <a href="#">外科系统<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('肝胆外科')">
                                      <span>肝胆外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('胃肠外科')">
                                      <span>胃肠外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('疝和腹壁外科')">
                                      <span>疝和腹壁外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('乳腺外科')">
                                      <span>乳腺外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('泌尿外科')">
                                      <span>泌尿外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('心外科')">
                                      <span>心外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('血管外科')">
                                      <span>血管外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('胸外科')">
                                      <span>胸外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('神经外科')">
                                      <span>神经外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('骨肿瘤科')">
                                      <span>骨肿瘤科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('骨关节科')">
                                      <span>骨关节科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('创伤骨科（综合内科）')">
                                      <span>创伤骨科（综合内科）</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('脊柱外科')">
                                      <span>脊柱外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('医疗美容科')">
                                      <span>医疗美容科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('整形外科')">
                                      <span>整形外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('创伤救治中心')">
                                      <span>创伤救治中心</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('急诊外科')">
                                      <span>急诊外科</span>
                                  </a>
                              </li>
  
  
                          </ul>
                      </div>
                  </li>
                  <li>
                      <a href="#">妇产科儿科<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('妇产科')">
                                      <span>妇产科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('儿科')">
                                      <span>儿科</span>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </li>
                  <li>
                      <a href="#">五官科<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('眼科')">
                                      <span>眼科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('耳鼻咽喉头颈外科')">
                                      <span>耳鼻咽喉头颈外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('口腔科')">
                                      <span>口腔科</span>
                                  </a>
                              </li>
  
                          </ul>
                      </div>
                  </li>
                  <li>
                      <a href="#">其他科室<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('皮科')">
                                      <span>皮科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('中医科')">
                                      <span>中医科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('医学心理科')">
                                      <span>医学心理科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('麻醉科')">
                                      <span>麻醉科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('疼痛医学科')">
                                      <span>疼痛医学科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('重症医学科')">
                                      <span>重症医学科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('放疗科')">
                                      <span>放疗科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('介入诊疗中心')">
                                      <span>介入诊疗中心</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('临床营养科')">
                                      <span>临床营养科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('输血科')">
                                      <span>输血科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('药学部')">
                                      <span>药学部</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('中心实验室')">
                                      <span>中心实验室</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('动物实验室')">
                                      <span>动物实验室</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('图书馆')">
                                      <span>图书馆</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('病案统计室')">
                                      <span>病案统计室</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('电子显微镜实验室')">
                                      <span>电子显微镜实验室</span>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </li>
                  <li>
                      <a href="#">诊断相关科室<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('内镜中心')">
                                      <span>内镜中心</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('放射科')">
                                      <span>放射科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('超声诊断科')">
                                      <span>超声诊断科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('核医学科')">
                                      <span>核医学科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('检验科')">
                                      <span>检验科</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" style="text-decoration: none;" @click="getDoctorsByRoom('病理科')">
                                      <span>病理科</span>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
    </div>
    <div class="showInfo">
          <div v-if="doctors && doctors.length > 0">
              <h3 style="margin-top: 20px;margin-bottom: 20px;">所选科室医生列表：</h3>
              <div class="cardContainer">
                  <Card v-for="doctor in doctors" :key="doctor.doctorId" class="cardItem">
                      <template #header>
                          <img :src="doctor.doctorImg" alt="user header" style="width: 350px;"/>
                      </template>
                      <template #title>姓名：{{ doctor.doctorName }}</template>
                      <template #content>
                          <div v-if="hoveredDoctor === doctor.doctorId">
                                  <div style="text-align: left;margin-bottom: 10px;">

                                      介绍：<br>
                                        <div v-if="doctor.doctorIntroduction.length>300">
                                            {{ doctor.doctorIntroduction .substring(0, 300)}}......
                                        </div>
                                        <div v-else>
                                            {{ doctor.doctorIntroduction }}
                                        </div>
                                    </div>
                          </div>
                          
                          <div v-else>
                              <p>职称：{{ doctor.doctorTitle }}</p>
                              <p>科室：{{ getSectionNameById(doctor.doctorSection) }}</p>
                              <p>电话：{{ doctor.doctorPhone }}</p>
  
                          </div>
                          
                              
                      </template>
                      <template #footer>
                        <div v-if="hoveredDoctor != doctor.doctorId">
                          <input type="button" value="查看详细信息" @click="hoveredDoctor=doctor.doctorId">
                        </div>
                      </template>
                  </Card>
              </div>
          </div>
    </div>
    <div class="footer">
      <div class="footer_box">
        <ul class="footer_list_box">
          <li>
            <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_1.png" alt="" />
            <span>电话：010-82317114</span>
          </li>
          <li>
            <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_2.png" alt="" />
            <span>传真：010-82328136</span>
          </li>
          <li>
            <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_3.png" alt="" />
            <span>邮编：100191</span>
          </li>
          <li>
            <img src="https://spoc.buaa.edu.cn/spocResourcebase//rdFileBase/images/af_4.png" alt="" />
            <span>地址：北京市海淀区学院路37号</span>
          </li>
        </ul>
      </div>
      <div class="footer_item">Copyright ©️ 2023-2033</div>
      <div class="footer_item">HMS Powered by SEGroup11</div>
      <div class="footer_item">HMS Designed by AlpaCa</div>
    </div>
  </template>
  
  <script> 
  import axios from 'axios';

  export default {

    data() {
          return {
              selectedSectionName: "胃肠外科",
              selectedSection: null,
              doctors: [],
              hoveredDoctor: null,
              sections:[],
              searchSectionName:null,
          };
    },
    methods:{
        showList() {
            var list = this.$refs.headerList;
            list.style.display = "block";
        },
        unShowList() {
            var list = this.$refs.headerList;
            list.style.display = "none";
        },
        searchSection() {
            this.searchSectionName;
            var flag = false;//没找到
            for (let i = 0; i < this.sections.length; i++) {
                  const section = this.sections[i];
                  if (section.sectionSecname === this.searchSectionName) {
                      this.selectedSection = section;
                      this.selectedSectionName = this.searchSectionName;
                      flag= true;
                      this.getDoctorsByRoom(this.selectedSectionName);
                      alert("成功搜索到到科室信息");
                      break; 
                  }
            }
            if(flag == false){
                alert("未查询到对应科室信息");
            }
        },
          getDoctorsByRoom(roomName) {
              this.selectedSectionName = roomName;
              axios.get('http://121.199.161.134:8080/getDoctorsByRoom', {
                  params: {
                      roomName: this.selectedSectionName
                  }
              })
              .then(response => {
                  this.doctors = response.data.data;
              })
              .catch(error => {
                  console.log(error);
              })       
              this.getSectionByName(); 
          },
          getSectionInfo(){
              axios.get('http://121.199.161.134:8080/getRoomName')
              .then(response => {
                  this.sections = response.data.data;
                  this.getSectionByName();
              })
              .catch(error => {
                  console.error(error);
              });
              
          },
          getSectionByName() {
              for (let i = 0; i < this.sections.length; i++) {
                  const section = this.sections[i];
                  if (section.sectionSecname === this.selectedSectionName) {
                      this.selectedSection = section;
                      break; 
                  }
              }
          },
          getSectionNameById(id) {
              const section = this.sections.find(section => section.sectionId === id);
              if (section) {
                  return section.sectionFirname + '-' + section.sectionSecname;
              } else {
                  console.log('cannot find Id');
                  return '';
              }
          }
    },
    mounted(){
            this.getSectionInfo();
            this.getSectionByName();
            this.getDoctorsByRoom(this.selectedSectionName);
    }
  }
  </script>
  
  <style scoped>
  .banner{
      width:100%;
      height:400px;
  }
  .banner-img{
      width: 100%;
  
  }
  .slide{
      width: 234px;
      height: 400px;
      padding: 10px 0;
      background-color: rgba(105,101,101,0.6);
      position: absolute;
      left: 20px;
      top: 0;
  }
  .banner>.wrap>.introduction{
      position: absolute;
      left:254px;
      top:0;
      text-align: left;
      border: 1px solid #e0e0e0;
      border-left: none;
      width: 932px;
      height: 400px;
      padding-left: 20px;
      background-color:rgb(83, 143, 234);
  }
  .banner>.wrap{
      position: relative;
      width: 1226px;
      margin: 0 auto;
  }
  
  .slide>ul>li{
      height:60px;
      line-height: 60px;
      text-align: left;
      padding-left: 20px;
      font-size: 22px;
  }
  .slide>ul>li>a{
      color: #fff;
      text-decoration: none;
  }
  .slide i{
      float: right;
      padding-right: 20px;
  }
  .slide>ul>li:hover{
      background-color:blue;
  }
  .slide>ul{
      list-style-type: none;
  
  }
  .slide-list{
      height:400px;
      width:932px;/*1226-234px*/
      background-color: #fff;
      border: 1px solid #e0e0e0;
      border-left: none;
      box-sizing: border-box;
      box-shadow: 0 8px 16px rgba(0,0,0,0.18);
      position:absolute;
      left:234px;
      top:0px;
      display: none;
  }
  .slide-list>ul{
      width:100%;
      
  }
  .slide-list>ul>li{
      width:430px;
      height:40px;
      float: left;
      padding: 0px 0 8px 20px;
      box-sizing: border-box;
      line-height: 76px;
  }
  
  .slide-list>ul>li>a>span{
      color:rgb(83, 143, 234);
      font-size: 20px;
  }
  .slide li:hover .slide-list{
      display: block;
  }
  .slide-list>li:hover span{
      color: aqua;
  }
  .showInfo{
     position: relative;
     left:140px;
     width:1165px;
     margin-bottom: 50px;
     padding-left:20px;
     padding-bottom:20px;
  }
  .cardContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 20px; 
  }
  
  .cardItem {
    width: 350px; 
    box-shadow: black;
  }

  .globalMenu{
    position: relative;
    width:500px;
    height: 40px;
    margin-bottom: 10px;
    margin-top: 50px;
    margin-left: 140px;
    text-align: left;

}
  </style>