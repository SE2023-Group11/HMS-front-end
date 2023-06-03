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
          <div class="header_list_item" @click="goToPatientSpace">个人主页</div>
          <div class="header_list_item" @click="goToMessage">消息通知</div>
          <div class="header_list_item" @click="goToDelete">账号注销</div>
          <div class="header_list_item" @click="goToLogin">退出登录</div>
        </div>
      </div>
    </div>
  <div class="carouselImage">
    <Carousel :value="carouselItems" :numVisible="1" :numScroll="1" circular :autoplayInterval="5000">
      <template #item="slotProps">
        <div class="carousel-item">
          <img :src="slotProps.data.image" alt="Image" style="width:100%"/>
        </div>
      </template>
    </Carousel>

  </div> 
  <div class="textContainer">
    <h2 style="text-align: left;margin-left: 20px;margin-top: 50px;margin-bottom: 20px;">功能列表</h2>
    <div class="buttons">
      <Card class="buttonItem">
        <template #header>
          <img alt="user header" src="../Pic/医生介绍.png" style="width: 330px;height:190px" />
        </template>
        <template #content>
            <h3 style="text-align: left;">医生信息</h3>
            <p style="font-size: 12px;text-align: left;">
              认识我们的专家团队，了解他们的业务领域和临床经验。
            </p>
        </template>
        <template #footer>
          <p @click="goToCheckDoctorInfo" style="text-decoration: none;color:rgb(17, 229, 229);text-align: left;">查看详情</p>
        </template>
      </Card>
      <Card class="buttonItem">
        <template #header>
          <img alt="user header" src="../Pic/预约挂号.png" style="width: 330px;height:190px" />
        </template>
        <template #content>
            <h3 style="text-align: left;">预约挂号</h3>
            <p style="font-size: 10px;text-align: left;">
              在线预约门诊，快速便捷，避免等待排队。
            </p>
        </template>
        <template #footer>
          <p @click="goToAddAppointment" style="text-decoration: none;color:rgb(17, 229, 229);text-align: left;">查看详情</p>
        </template>
      </Card>
      <Card class="buttonItem">
        <template #header>
          <img alt="user header" src="../Pic/我的预约.png" style="width: 335px;height:190px" />
        </template>
        <template #content>
            <h3 style="text-align: left;">我的预约</h3>
            <p style="font-size: 12px;text-align: left;">
              查看历史预约记录，关注预约状态，及时就诊。
            </p>
        </template>
        <template #footer>
          <p @click="goToCheckMyAppointment"  style="text-decoration: none;color:rgb(17, 229, 229);text-align: left;">查看详情</p>
        </template>
      </Card>
      <Card class="buttonItem">
        <template #header>
          <img alt="user header" src="../Pic/个人主页.png" style="width: 330px;height:190px" />
        </template>
        <template #content>
            <h3 style="text-align: left;">个人主页</h3>
            <p style="font-size: 12px;text-align: left;">
              查改个人信息，展示真实美好自我，方便诊断。
            </p>
        </template>
        <template #footer>
          <p @click="goToPatientSpace" style="text-decoration: none;color:rgb(17, 229, 229);text-align: left;">查看详情</p>
        </template>
      </Card>
    </div>
  </div>
    <h2 style="text-align: left;margin-left: 20px;margin-bottom: 20px;">新闻动态</h2>
    <div class="news-container">
      <div class="carouselNewsImage">
        <Carousel :value="newsImages" :numVisible="1" :numScroll="1" circular :autoplayInterval="5000">
          <template #item="slotProps">
            <div class="carousel-item">
              <img :src="slotProps.data.image" alt="Image" style="width: 400px;height: 400px;margin-top: 20px;"/>
            </div>
          </template>
        </Carousel>
      </div>
      <div class="newsTitle">
        <div class="news">
          <div class="date">
            <h1 style="font-size: 36px;">01</h1>
            <div style="font-size: 16px;">2023.06</div>
          </div>
          <div class="title">
            庆祝六一儿童节 | 为了守护孩子的欢颜
          </div>
        </div>
        <div class="news">
          <div class="date">
            <h1 style="font-size: 36px;">29</h1>
            <div style="font-size: 16px;">2023.05</div>
          </div>
          <div class="title">
            人民”专家团甘孜医疗公益行 守护高原脊柱健康
          </div>
        </div>
        <div class="news">
          <div class="date">
            <h1 style="font-size: 36px;">22</h1>
            <div style="font-size: 16px;">2023.05</div>
          </div>
          <div class="title">
            掌握“7+5”，痛风诊疗不落伍
          </div>
        </div>
        <div class="news">
          <div class="date">
            <h1 style="font-size: 36px;">12</h1>
            <div style="font-size: 16px;">2023.05</div>
          </div>
          <div class="title">
            5.12国际护士节 | 守护生命的“芳华
          </div>
        </div>
      </div>
    </div>

    <h2 style="text-align: left;margin-left: 20px;margin-top: 100px;margin-bottom: 20px;">医院介绍</h2>
    <div class="introduction-container">
      <h3 style="text-align: left;">医院概况</h3>
      <p style="font-size: 16px;text-align: left;margin-top: 20px;margin-bottom: 50px;">
        本院是一家现代化综合性医疗机构，位于北京市中心地带，拥有先进的医疗设备和专业的医疗团队。我们致力于为患者提供高品质的医疗服务，包括诊断、治疗、康复和健康管理等方面的综合医疗服务。
      </p>
      <h3 style="text-align: left;">历史沿革</h3>
      <p style="font-size: 16px;text-align: left;margin-top: 20px;margin-bottom:50px;">
        本院创立于1989年，起初是一家小型社区诊所。随着医院的不断发展和壮大，我们逐渐扩大了医疗团队和诊疗范围，并引进了先进的医疗技术和设备。经过多年的努力和发展，我们已成为该地区备受信赖的医疗机构之一。
      </p>
      <h3 style="text-align: left;">所获荣誉</h3>
      <p style="font-size: 16px;text-align: left;margin-top: 20px;margin-bottom:10px;">
        1. 北京市医疗卓越奖：多次荣获该奖项，表彰我们在医疗技术、服务质量和患者满意度方面的卓越表现。
      </p>
      <p style="font-size: 16px;text-align: left;margin-top: 20px;margin-bottom:10px;">
        2. 国家医院文明单位：被评为国家级医院文明单位，表彰我们在医德医风、服务态度和社会责任方面的杰出表现。
      </p>
      <p style="font-size: 16px;text-align: left;margin-top: 20px;margin-bottom:10px;">
        3. 医院管理质量认证：通过了ISO质量管理体系认证，证明我们的管理水平和服务质量达到了国际标准。
      </p>
      <p style="font-size: 16px;text-align: left;margin-top: 20px;margin-bottom: 50px;">
        4. 授牌成为北京2022年冬奥会和冬残奥会定点医院
      </p>
      <img alt="user header" src="../Pic/医院介绍.jpg" style="width: 100%;" />
      <h1 style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color: crimson;font-size: 50px;text-align: center;">以心相伴，关怀健康</h1>
    </div>
    <h2 style="text-align: left;margin-left: 20px;margin-top: 30px;">友情链接</h2>
    <div class="linkContainer">
      <div class="hospital">
        <img alt="user header" src="../Pic/医院图标.png" style="width: 25px;height:25px" />
        <a href="https://www.pumch.cn/learning.html" style="text-decoration: none;font-size: 20px;color:darkgreen;">北京协和医院</a>
      </div>
      <div class="hospital">
        <img alt="user header" src="../Pic/医院图标.png" style="width: 25px;height:25px" />
        <a href="https://www.pkuph.cn/" style="text-decoration: none;font-size: 20px;color:darkgreen;">北京大学人民医院</a>
      </div>
      <div class="hospital">
        <img alt="user header" src="../Pic/医院图标.png" style="width: 25px;height:25px" />
        <a href="https://www.puh3.net.cn/" style="text-decoration: none;font-size: 20px;color:darkgreen;">北京大学第三医院</a>
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
      <!-- <img src="./logo.png" alt="" class="footer_img"> -->
      <div class="footer_item">Copyright ©️ 2023-2033</div>
      <div class="footer_item">HMS Powered by SEGroup11</div>
      <div class="footer_item">HMS Designed by AlpaCa</div>
    </div>
  

</template>


<script>
import { useRoute,useRouter } from 'vue-router';

import axios from 'axios'

export default {
  name: 'PatientRoot',
  data() {
    return {
      carouselItems: [
        { image: 'https://www.pkuph.cn/Uploads/Picture/2023/05/15/s6461edd31e238.png' },
        { image: 'https://www.pkuph.cn/Uploads/Picture/2023/05/15/s6461ee04ee5ef.png' },
        { image: 'https://www.pkuph.cn/Uploads/Picture/2023/04/28/s644b197a0d424.png'}
      ],
      newsImages:[
        {image: 'https://cdn.pixabay.com/photo/2017/09/06/20/36/doctor-2722941_640.jpg'},
        {image: 'https://cdn.pixabay.com/photo/2013/02/09/04/19/surgery-79584_640.jpg'},
        {image: 'https://www.bing.com/th?id=OIP.BSQ-jWvxVCdh-flFS-vMIAHaHY&w=179&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'},
        {image: 'https://th.bing.com/th/id/OIP.-bxXqMAlLciKCUCrPeqfLwHaFj?w=243&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7'}
      ]
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },

  methods:{
    goToTestPage(){
      this.$router.push({name:'TestPage'})
    },
    goToDelete() {
    this.$router.push('/login')
    },
    goToLogin() {
    this.$router.push('/login')
    },
    goToCheckDoctorInfo(){
      this.$router.push('/checkDoctorInfo')
    },
    goToMessage() {
    this.$router.push('/message')
    },
    goToPatientSpace() {
    this.$router.push('/patientSpace')
    },
    goToAddAppointment(){
      this.$router.push('/addAppointment')
    },
    goToCheckMyAppointment(){
      this.$router.push('/checkMyAppointment')
    },
    getNews(){
      axios.post('http://121.199.161.134:8080/getAllNews')
            .then(response => {
                this.news = response.data.data;
            })
            .catch(error => {
                console.error(error);
            });
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
    this.getNews();
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
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
.header{
    height: 80px;
    width: 100%;
    padding-top: 15px;
    margin-bottom: 10px;
    /*background-color: whitesmoke;*/
    /* background-color: #ECEBEB; */
    border: none;
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
.footer{
    height: 220px;
    width: 100%;
    margin-top: 0px;
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
.textContainer{
  width:100%;
  margin-top: 50px;
  padding-top: 10px;
  padding-bottom: 20px;
  position: relative;
  border: 1px solid rgb(25, 103, 182);
  border-left: none;
  border-right: none;
  border-bottom: none;
}

.demo-bottom-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.carouselImage {
  position: relative;
  width: 100%;
  margin-bottom: 50px;
}
.news-container{
  width:100%;
  height: 500px;
  position: relative;
  padding-top: 100px;
}
.carouselNewsImage{
    width: 500px;
    height: 500px;
    padding: 10px 0;
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid #e0e0e0;
    box-shadow: 0 8px 16px rgba(0,0,0,0.18);

}
.newsTitle{
      position: absolute;
      left:510px;
      top:0;
      text-align: left;
      border: 1px solid #e0e0e0;
      width: 900px;
      height: 500px;
      padding-left: 20px;
      padding-bottom: 10px;
      background-color:rgba(78, 113, 229, 0.929);
      box-shadow: 0 8px 16px rgba(0,0,0,0.18);

}
.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 20px; 
    margin-bottom: 100px;
  }
  
.buttonItem {
    width: 100%; 
    height: 360px;
    /*border: 0.5px solid rgb(38, 21, 226); */
}
.introduction-container{
    width: 100%;
    box-shadow: #2c3e50;
    background-color:beige;
    margin-bottom: 100px;
    margin-top: 10px;
    padding-top: 30px;
    padding-left: 40px;
    padding-bottom: 50px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.18);
}
.linkContainer{
  width:100%;
  height:100px;
  padding-top: 40px;
  padding-left: 100px;
  padding-right: 100px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  
}
.hospital {
  display: flex;
  align-items: center;
}
.news{
  width: 100%;
  position: relative;
  height:20%;
  background-color: aquamarine;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: #2c3e50;

}
.date{
  position: absolute;
  width:100px;
  height:100%;
  padding-top:20px;
  padding-left: 40px;
  text-align: center;


}
.title{
  position: absolute;
  width:700px;
  left:150px;
  height:100%;
  margin-top: 40px;
}
</style>
