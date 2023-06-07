<template>
  <div class="background"></div>
  <div class="container" id="container">
    <div class="container" id="container">
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
    </div>

    <div class="main">
      <div class="globalMenu">
            <img alt="user header" src="../Pic/navigation.png" style="width: 20px;height:30px;" />
            &nbsp;
            <router-link :to="'/PatientRoot'" style="text-decoration: none;color:gray;">首页</router-link>
            &nbsp;>&nbsp;
            <router-link :to="'/ConfirmAppointment'" style="text-decoration: none;color:gray;">确认预约</router-link>
      </div>
      <div class="appointment-info">
        <Card style="width: 25em;box-shadow: 0 8px 16px rgba(0,0,0,0.18);height: 600px;">
          <template #header>
              <img alt="user header" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.tkxaiHkikUQf2ZsE6AvrLAHaFj?w=196&h=147&c=7&r=0&o=5&pid=1.7" style="width:100%" />
          </template>
          <template #title> <div style="text-align: center;">确认预约信息</div> </template>
          <template #content>
            <p>日期:&nbsp; {{ date }}</p>
            <p>时间段: &nbsp; {{ indexToTime(time) }}</p>
            <p>医生ID: &nbsp; {{ doctorId }}</p>
            <p>医生名字:&nbsp; {{ doctorName }}</p>
            <p>医生职称:&nbsp; {{ doctorTitle }}</p>
          </template>
          <template #footer>
            <div class="buttons">
              <div v-if="appointable===true">
                <Button label="确定预约" severity="Primary" size="small" @click="confirmAppointment"/>
              </div>
              <div v-else>
                <Button label="时间已过" severity="danger" disabled size="small"/>
              </div>
              <Button label="取消预约" severity="Primary" size="small" @click="cancelAppointment"/>
            </div>
              
          </template>
      </Card>
      </div>
    </div>
      <!-- 这里写网页主要内容 -->
      

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
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name:"ConfirmAppointment",
  data(){
    return{
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
      doctorId: this.$route.query.doctorId,
      doctorName: this.$route.query.doctorName,
      doctorTitle: this.$route.query.doctorTitle,
      date: this.$route.query.date,
      time: this.$route.query.time,
      token: sessionStorage.getItem('token'),
      role: sessionStorage.getItem('role'),
      login: false,
      patientName: null,
      appointable:true,
    }
  },
  methods: {
    goToPatientSpace() {
    this.$router.push('/patientSpace')
    },
    goToDelete() {
            if (confirm("您确定吗？")) {
        axios.post('http://121.199.161.134:8080/zhuxiaoPatient',null,{
        params:{
            token: this.token
        }
    })
        .then(response => {
            console.log(response.data)
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('token');
            this.$router.push('/login')
        })
        .catch(error => {
            console.error(error)
        })
    }
        },
        goToLogin() {
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('token');
        this.$router.push('/login')
        },
    goToMessage() {
    this.$router.push('/message')
    },
    confirmAppointment() {
      const params = new URLSearchParams();
      params.append('token', this.token);
      params.append('doctorId', this.doctorId);
      params.append('day', this.date);
      params.append('time', this.time);
      axios.post('http://121.199.161.134:8080/addAppointment', params.toString())
        .then(response => {
          console.log(response.data);
          if(response.data.code === 0){
            alert("预约失败，请检查您的预约信息后再试");
          }else{
            alert("成功预约，请在‘我的预约’中查询");
            this.$router.go(-1); // 返回上一页
          }
          
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteAppointment(orderId) {
      alert("delete");
      const params = new URLSearchParams();
      params.append('token',this.token);
      params.append('orderid',orderId);
      axios.delete(`http://121.199.161.134:8080/deleteAppointment`,params.toString())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      })
    },
    isTimeBeforeProvidedTime(providedTime) {
      var currentTime = new Date();
      var providedTimeParts = providedTime.split(' ');

      var providedDate = providedTimeParts[0];
      var providedTimeRange = providedTimeParts[1];

      var providedHour = Number(providedTimeRange.split(':')[0]);
      var providedMinute = Number(providedTimeRange.split(':')[1]);

      var providedDateTime = new Date(providedDate);
      providedDateTime.setHours(providedHour, providedMinute, 0, 0);
      return currentTime < providedDateTime;
    },
    cancelAppointment() {
      alert("取消预约");
      this.$router.go(-1); // 返回上一页
    },
    indexToTime(index){
      if(index >= 0 && index <= 6){
        return this.morningTimes[index]; 
      }else{
        return this.afternoonTimes[index-7];
      }
    },
    judgeLogin(){
                if(this.token === null)
                {
                    return false;
                }   
                else 
                    return true;
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
    showList() {
      var list = this.$refs.headerList;
      list.style.display = "block";
    },
    unShowList() {
      var list = this.$refs.headerList;
      list.style.display = "none";
    },
  },
  mounted(){
    this.appointable = this.isTimeBeforeProvidedTime(this.date+' '+this.indexToTime(this.time).split('-')[0]);
    this.login = this.judgeLogin();
        if(this.login === false){
            alert("请先登录");
            this.$router.go(-1);
    }
    this.getPatientInfo();
  }
}
</script>




<style scoped>
* {
    margin: 0;
    padding: 0;
}
html {
    height: 100%;
}
body {
    height: 100%;
}
.container {
    height: 100%;
    padding-top: 0.1px;
}
.background{
    width: 100%;
    height: 100%;
    background-size: cover;
    position: fixed;
    z-index: -999;
}
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
.main{
    border-radius: 5px;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 70px;
    width: 70%;
    min-height: 600px;
    /* background-color: rgba(255, 255, 255, 0.6); */
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
.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.globalMenu{
    position: relative;
    width:300px;
    height: 40px;
    margin-bottom: 50px;
    margin-top: 50px;
    text-align: left;
}
.appointment-info{
  margin-left: 30%;
  margin-right: 30%;
}

</style>