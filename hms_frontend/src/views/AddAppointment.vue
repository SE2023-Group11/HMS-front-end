<template>
    <div class="header">
      <img src="https://f.pz.al/pzal/2023/05/19/d218206d1e4dd.png" alt="" class="header_img" />
      <h1 class="header_tag" style="font-family:Arial, Helvetica, sans-serif;font-size: 20px;">HMS医院门诊预约系统</h1>
      <div class="header_user" @mouseenter="showList" @mouseleave="unShowList">
        <!-- 显示头像 -->
        <img src="https://f.pz.al/pzal/2023/05/03/5e6420e7ffe6f.png" alt="" class="header_user_img" />
        <!-- 未登录时显示登录/注册 -->
        <!-- 登录后显示用户名 -->
        <h1 class="header_user_word">
          <div v-if="login === false">
            <router-link :to="'/login'" style="text-decoration: none;color:gray;">登录/注册</router-link>
          </div>
          <div v-else style="font-size: 18px;">
            {{ this.patientName }}
          </div>
        </h1>
        <div id="triangle-down"></div>
        <div id="header_list" ref="headerList">
          <div v-if="login===true">
            <div class="header_list_item" @click="goToPatientSpace">个人主页</div>
            <div class="header_list_item" @click="goToMessage">消息通知</div>
            <div class="header_list_item" @click="goToDelete">账号注销</div>
            <div class="header_list_item" @click="goToLogin">退出登录</div>
          </div>
          <div v-else>
            <div class="header_list_item" @click="alertLogin">个人主页</div>
            <div class="header_list_item" @click="alertLogin">消息通知</div>
            <div class="header_list_item" @click="alertLogin">账号注销</div>
            <div class="header_list_item" @click="alertLogin">退出登录</div>
          </div>
          
        </div>
      </div>
    </div>
    <div class="globalMenu">
            <img alt="user header" src="../Pic/导航图标.png" style="width: 20px;height:30px;" />
            &nbsp;
            <router-link :to="'/PatientRoot'" style="text-decoration: none;color:gray;">首页</router-link>
            &nbsp;>&nbsp;
            <router-link :to="'/AddAppointment'" style="text-decoration: none;color:gray;">预约挂号</router-link>
            &nbsp;>&nbsp;
            <router-link :to="'/CheckDoctorInfo'" style="text-decoration: none;color:gray;">{{ this.selectedSectionName }}</router-link>
            <span class="p-input-icon-left" style="left: 680px;">
                <i class="pi pi-search" />
                <InputText v-model="searchSectionName" placeholder="搜索科室名" @keyup.enter="searchSection"/>
            </span>
    </div>
    <div class="banner">
      <div class="wrap">
        <div class="selectDate">
            <div class="flex flex-wrap gap-3" style="font-size: 20px;">
                <div class="flex align-items-center">
                    <RadioButton v-model="selectedDate" inputId="ingredient1" name="pizza" :value="formatDate('Today')" />
                    <label for="ingredient1" class="ml-2">今天（{{formatDate("Today")}}）</label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="selectedDate" inputId="ingredient2" name="pizza" :value="formatDate('Tomorrow')" />
                    <label for="ingredient2" class="ml-2">明天（{{formatDate("Tomorrow")}}）</label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="selectedDate" inputId="ingredient3" name="pizza" :value="formatDate('DayAfterTomorrow')" />
                    <label for="ingredient3" class="ml-2">后天（{{formatDate("DayAfterTomorrow")}}）</label>
                </div>
            </div>
        </div>
        <div class="introduction">
            <h3 style="margin-top: 40px;margin-bottom: 20px;">注意事项：</h3>
            <p style="margin-bottom: 10px;">
                1.提前预约：为了确保您能及时就诊，请尽量提前预约，特别是在繁忙的时间段或热门科室。
            </p>
            <p style="margin-bottom: 10px;">
                2.注意就诊时间：请按照预约的时间提前到达医院，并留出足够的时间等候就诊。提前咨询医院的就诊流程和时间安排。
            </p>
            <p style="margin-bottom: 10px;">
                3.遵循医嘱：在就诊过程中，请认真倾听医生的建议和治疗方案，并按照医嘱进行用药和治疗，以获得更好的疗效。
            </p>
            <p style="margin-bottom: 10px;">
                4.注意取消预约：如因故无法前往就诊，请提前通知医院取消预约，以免影响其他患者的就诊和医疗资源的浪费。
            </p>
            <p style="margin-bottom: 10px;">
                5.尊重医护人员：请与医护人员文明交流，尊重其工作和意见。遵守医院的规章制度，共同营造良好的医疗环境。
            </p>
        </div>
        <div class="slide">
              <ul>
                  <li>
                      <a >内科系统<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName='呼吸与危重症医学科';getDoctorsByRoomDate()">
                                      <span>呼吸与危重症医学科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName='呼吸睡眠医学科';getDoctorsByRoomDate()">
                                      <span>呼吸睡眠医学科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '消化内科';getDoctorsByRoomDate()">
                                      <span>消化内科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '心血管内科';getDoctorsByRoomDate()">
                                      <span>心血管内科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '高血压科';getDoctorsByRoomDate()">
                                      <span>高血压科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '肾内科';getDoctorsByRoomDate()">
                                      <span>肾内科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '内分泌科';getDoctorsByRoomDate()">
                                      <span>内分泌科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '风湿免疫科';getDoctorsByRoomDate()">
                                      <span>风湿免疫科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '感染科';getDoctorsByRoomDate()">
                                      <span>感染科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '老年科';getDoctorsByRoomDate()">
                                      <span>老年科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '神经内科';getDoctorsByRoomDate()">
                                      <span>神经内科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '全科医学科（综合内科）';getDoctorsByRoomDate()">
                                      <span>全科医学科（综合内科）</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '急诊内科';getDoctorsByRoomDate()">
                                      <span>急诊内科</span>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </li>
                  <li>
                      <a >外科系统<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '肝胆外科';getDoctorsByRoomDate()">
                                      <span>肝胆外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '胃肠外科';getDoctorsByRoomDate()">
                                      <span>胃肠外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '疝和腹壁外科';getDoctorsByRoomDate()">
                                      <span>疝和腹壁外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '乳腺外科';getDoctorsByRoomDate()">
                                      <span>乳腺外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '泌尿外科';getDoctorsByRoomDate()">
                                      <span>泌尿外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '心外科';getDoctorsByRoomDate()">
                                      <span>心外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '血管外科';getDoctorsByRoomDate()">
                                      <span>血管外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '胸外科';getDoctorsByRoomDate()">
                                      <span>胸外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '神经外科';getDoctorsByRoomDate()">
                                      <span>神经外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '骨肿瘤科';getDoctorsByRoomDate()">
                                      <span>骨肿瘤科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '骨关节科';getDoctorsByRoomDate()">
                                      <span>骨关节科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '创伤骨科（综合内科）';getDoctorsByRoomDate()">
                                      <span>创伤骨科（综合内科）</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '脊柱外科';getDoctorsByRoomDate()">
                                      <span>脊柱外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '医疗美容科';getDoctorsByRoomDate()">
                                      <span>医疗美容科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '整形外科';getDoctorsByRoomDate()">
                                      <span>整形外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '创伤救治中心';getDoctorsByRoomDate()">
                                      <span>创伤救治中心</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '急诊外科';getDoctorsByRoomDate()">
                                      <span>急诊外科</span>
                                  </a>
                              </li>
  
  
                          </ul>
                      </div>
                  </li>
                  <li>
                      <a >妇产科儿科<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '妇产科';getDoctorsByRoomDate()">
                                      <span>妇产科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '儿科';getDoctorsByRoomDate()">
                                      <span>儿科</span>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </li>
                  <li>
                      <a >五官科<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '眼科';getDoctorsByRoomDate()">
                                      <span>眼科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '耳鼻咽喉头颈外科';getDoctorsByRoomDate()">
                                      <span>耳鼻咽喉头颈外科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '口腔科';getDoctorsByRoomDate()">
                                      <span>口腔科</span>
                                  </a>
                              </li>
  
                          </ul>
                      </div>
                  </li>
                  <li>
                      <a >其他科室<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '皮科';getDoctorsByRoomDate()">
                                      <span>皮科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '中医科';getDoctorsByRoomDate()">
                                      <span>中医科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '医学心理科';getDoctorsByRoomDate()">
                                      <span>医学心理科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '麻醉科';getDoctorsByRoomDate()">
                                      <span>麻醉科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '疼痛医学科';getDoctorsByRoomDate()">
                                      <span>疼痛医学科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '重症医学科';getDoctorsByRoomDate()">
                                      <span>重症医学科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '放疗科';getDoctorsByRoomDate()">
                                      <span>放疗科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '介入诊疗中心';getDoctorsByRoomDate()">
                                      <span>介入诊疗中心</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '临床营养科';getDoctorsByRoomDate()">
                                      <span>临床营养科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '输血科';getDoctorsByRoomDate()">
                                      <span>输血科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '药学部';getDoctorsByRoomDate()">
                                      <span>药学部</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '中心实验室';getDoctorsByRoomDate()">
                                      <span>中心实验室</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '动物实验室';getDoctorsByRoomDate()">
                                      <span>动物实验室</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '图书馆';getDoctorsByRoomDate()">
                                      <span>图书馆</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '病案统计室';getDoctorsByRoomDate()">
                                      <span>病案统计室</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '电子显微镜实验室';getDoctorsByRoomDate()">
                                      <span>电子显微镜实验室</span>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </li>
                  <li>
                      <a >诊断相关科室<i class="iconfont">></i></a>
                      <div class="slide-list">
                          <ul style="list-style-type: none;">
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '内镜中心';getDoctorsByRoomDate()">
                                      <span>内镜中心</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '放射科';getDoctorsByRoomDate()">
                                      <span>放射科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '超声诊断科';getDoctorsByRoomDate()">
                                      <span>超声诊断科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '核医学科';getDoctorsByRoomDate()">
                                      <span>核医学科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '检验科';getDoctorsByRoomDate()">
                                      <span>检验科</span>
                                  </a>
                              </li>
                              <li>
                                  <a  style="text-decoration: none;" @click="this.selectedSectionName= '病理科';getDoctorsByRoomDate()">
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
    <div class="showInfo" v-if="availableDoctors && availableDoctors.length > 0">
            <h3 style="margin-top: 20px;margin-bottom: 20px;">可预约医生：</h3>
            <div class="cardContainer">
                <Card v-for="doctor in availableDoctors" :key="doctor.doctorId" class="cardItem">
                    <template #header>
                        <img :src="doctor.doctorImg" alt="user header" style="width: 350px;"/>
                    </template>
                    <template #title>姓名：{{ doctor.doctorName }}</template>
                    <template #content>
                        <div v-if="hoveredDoctor === doctor" style="display: flex;">
                                    <div class="morning"  style="width: 50%;">
                                        <h5 style="text-align: center;margin-bottom: 10px;">上午：</h5>
                                        <div v-for="(time,index) in morningTimes" :key="index">
                                            <div style="font-size: 20px;">{{ time }} <br></div>
                                            <div v-if="doctorSchedule[index] === '2'">
                                                <Button icon="pi pi-check" label="预约挂号" severity="Primary" size="small" @click="addAppointment(index)" />
                                            </div>
                                            <div v-else>
                                                <Button icon="pi pi-check" label="无法预约" severity="danger" size="small" @click="addAppointment(index)" disabled />
                                            </div>
                                            
                                        </div>

                                    </div>
                                    <div class="afternoon"  style="width: 50%;">
                                        <h5 style="text-align: center;margin-bottom: 10px;">下午：</h5>
                                        <div v-for="(time,index) in afternoonTimes" :key="index">
                                            <div style="font-size: 20px;">{{ time }} <br></div>
                                            <div v-if="doctorSchedule[index+7] === '2'">
                                                <Button icon="pi pi-check" label="预约挂号" severity="Primary" size="small" @click="addAppointment(index+7)" />
                                            </div>
                                            <div v-else>
                                                <Button icon="pi pi-check" label="无法预约" severity="danger" size="small" @click="addAppointment(index+7)" disabled />
                                            </div>
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
                        <div v-if="hoveredDoctor != doctor">
                            <Button icon="pi pi-search" label="查看预约信息" severity="Primary" size="small" @click="hoveredDoctor=doctor;getDoctorSchedule(doctor.doctorId,this.selectedDate)" style="left:25%"/>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
        <div v-else>
            <h3>当前科室当日没有医生可预约</h3>
        </div>
    <div>
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
      <!-- <img src="./logo.png" alt="" class="footer_img"> -->
      <div class="footer_item">Copyright ©️ 2023-2033</div>
      <div class="footer_item">HMS Powered by SEGroup11</div>
      <div class="footer_item">HMS Designed by AlpaCa</div>
</div>
</template>

<script>

import axios from 'axios';

export default {
    name:"AddAppointment",
    data() {
        return {
            selectedSectionName: "胃肠外科",
            selectedDate: "2023-05-01",
            selectedSection: null,
            hoveredDoctor: null,
            availableDoctors: [],
            selectedTime:0,//0-12分别表示8到17的时间段
            sections:[],
            doctorSchedule:"",
            morningTimes: [
                '08:00-08:30',
                '08:30-09:00',
                '09:00-09:30',
                '09:30-10:00',
                '10:00-10:30',
                '10:30-11:00',
                '11:00-11:30',
            ],
            afternoonTimes: [
                '14:00-14:30',
                '14:30-15:00',
                '15:00-15:30',
                '15:30-16:00',
                '16:00-16:30',
                '16:30-17:00',
            ],
            searchSectionName: null,
            token: sessionStorage.getItem('token'),
            role: sessionStorage.getItem('role'),
            login: false,
            patientName: null,
        };
    },
    methods: {
        goToPatientSpace() {
        this.$router.push('/patientSpace')
        },
        goToDelete() {
        this.$router.push('/login')
        },
        goToLogin() {
        this.$router.push('/login')
        },
        goToMessage() {
        this.$router.push('/message')
        },
        showList() {
            var list = this.$refs.headerList;
            list.style.display = "block";
        },
        unShowList() {
            var list = this.$refs.headerList;
            list.style.display = "none";
        },
        judgeLogin(){
            if(this.token === null)
            {
                return false;
            }   
            else 
                return true;
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
        getDoctorsByRoomDate() {
            axios.get('http://121.199.161.134:8080/getDoctorsBySchedule', {
            params: {
                date: this.selectedDate,
                roomName: this.selectedSectionName,  
            }
            })
            .then(response => {
                this.availableDoctors = response.data.data;
            })
            .catch(error => {
                console.error(error);
            });
            this.selectedSection = this.getSectionByName();
        },
        getDoctorSchedule(doctorId,date){
            axios.get('http://121.199.161.134:8080/getDoctorSchedule', {
            params: {
                doctorId: doctorId,
                date: date,
            }
            })
            .then(response => {
                this.doctorSchedule = response.data.data;
                this.doctorSchedule = this.removeNonNumericCharacters(this.doctorSchedule);
            })
            .catch(error => {
                console.error(error);
            });
        },
        formatDate(dateString) {
            if (dateString === 'Today') {
                const today = new Date();
                return this.formatDateObject(today);
            } else if (dateString === 'Tomorrow') {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                return this.formatDateObject(tomorrow);
            } else if (dateString === 'DayAfterTomorrow') {
                const dayAfterTomorrow = new Date();
                dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
                return this.formatDateObject(dayAfterTomorrow);
            } else {
                console.log('Wrong Date'+dateString);
                return null;
            }
        },
        formatDateObject(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            if(month < 10) 
                month = "0"+month;
            var day = date.getDate();
            if(day < 10)
                day = "0"+day;
            return `${year}-${month}-${day}`;
        },
        indexToTime(index){
            if(index >= 0 && index <= 6)
            {
                return this.morningTimes[index]; 
            }
            else
            {
                return this.afternoonTimes[index-7];
            }
        },
        addAppointment(index) {
            this.selectedTime = index;
            const doctor = this.hoveredDoctor;
            const date = this.selectedDate;
            const time = this.selectedTime;
            this.$router.push({
                path:'/ConfirmAppointment',
                query:{
                    doctorId: doctor.doctorId,
                    doctorName: doctor.doctorName,
                    doctorTitle: doctor.doctorTitle,
                    date: date,
                    time: time
                }
            })
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
        },
        removeNonNumericCharacters(str) {
            return str.replace(/\D/g, '');
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
                      this.getDoctorsByRoomDate();
                      alert("成功搜索到到科室信息");
                      break; 
                  }
            }
            if(flag == false){
                alert("未查询到对应科室信息");
            }
        },
        getPatientInfo(){
            axios.get('http://121.199.161.134:8080/getPatientInformation',{
                params:{
                token:this.token
                }
            })
            .then(response => {
                this.patientName = response.data.data.patientName;
            })
            .catch(error => {
                console.log(error);
            })  
        },
    },
    mounted() {
        this.selectedDate = this.formatDate("Today");
        this.login = this.judgeLogin();
        if(this.login === false){
            alert("请先登录");
            this.$router.go(-1);
        }
        this.getPatientInfo();
        this.getSectionInfo();
        this.getSectionByName();
        this.getDoctorsByRoomDate();
    },
}
</script>

<style scoped>
 .header{
    height: 80px;
    width: 100%;
    padding-top: 15px;
    margin-bottom: 10px;
    /*background-color: whitesmoke;*/
    /* background-color: #ECEBEB; */
    background-color: white;
    /*position: fixed;*/
    z-index: 10;
    position:relative;
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
    background-color: #c0c0c1;
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
.cardContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 20px; 
  }
  
  .cardItem {
    width: 350px; 
    box-shadow: black;
  }
.showInfo{
     position: relative;
     left:140px;
     width:1165px;
     margin-bottom: 50px;
     padding-left:20px;
     padding-bottom:20px;
  }

.globalMenu{
    position: relative;
    width:600px;
    height: 40px;
    margin-bottom: 10px;
    margin-top: 20px;
    margin-left: 140px;
    text-align: left;

}
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
  .selectDate{
    position: absolute;
    width: 932px;
    height: 50px;
    left:254px;
    top:0;
    border: 1px solid ;
    border-bottom: none;
    border-left: none;
    padding-top: 10px;
    padding-left: 100px;
    background-color:white;
  }
  .banner>.wrap>.introduction{
      position: absolute;
      left:254px;
      top:50px;
      text-align: left;
      border-left: none;
      width: 932px;
      height: 350px;
      padding-left: 20px;
      background-color:rgb(33, 164, 208);
      color: black;
      font-size: 18px;
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
      width:450px;
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
  .morning{
    width:50%;
  }
  .afternoon{
    width:50%;
   
  }
</style>