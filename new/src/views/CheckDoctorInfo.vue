<template>
    <DemoTitle></DemoTitle>

    <div>
        <label for="department-select">选择科室：</label>
        <select id="department-select" v-model="selectedDepartment" @change="getDoctors">
            <option value="internal-medicine" selected>内科系统</option>
            <option value="surgery">外科系统</option>
            <option value="obstetrics-gynecology">妇产科儿科</option>
            <option value="otolaryngology">五官科</option>
            <option value="other">其他科室</option>
            <option value="diagnosis-related">诊断相关科室</option>
        </select>
    </div>

    <hr>

    <div>
        <div v-if="Doctors.length > 0">
            <h3>可预约医生：</h3>
            <table>
                <thead>
                    <tr>
                        <th>名字</th>
                        <th>科室</th>
                        <th>职称</th>
                        <th>电话</th>
                        <th>医生照片</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="doctor in Doctors" :key="doctor.id">
                        <td>{{ doctor.doctorName }}</td>
                        <td>{{ doctor.doctorSection }}</td>
                        <td>{{ doctor.doctorTitle}}</td>
                        <td>{{ doctor.doctorPhone }}</td>
                        <td>
                            <div @mouseover="hoveredDoctor = doctor">
                                <img :src="doctor.doctorImg" style="max-height: 100px;">
                                <div v-if="hoveredDoctor === doctor">
                                    <h4>{{ doctor.doctorName }}</h4>
                                    <p>科室：{{ doctor.doctorSection }}</p>
                                    <p>职称：{{ doctor.doctorTitle }}</p>
                                    <p>电话：{{ doctor.doctorPhone }}</p>
                                    <p>介绍：{{ doctor.doctorIntroduction }}</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p>该科室暂无医生</p>
        </div>
    </div>

    <DemoBottom></DemoBottom>
</template>

<script>
import DemoBottom from '../components/DemoBottom.vue';
import DemoTitle from '../components/DemoTitle.vue';
import axios from 'axios';

export default {
    name:"CheckDoctorInfo",
    components:{
        DemoBottom,
        DemoTitle
    },
    data() {
        return {
            selectedDepartment: "internal-medicine",
            Doctors: [],
            hoveredDoctor: null,
        };
    },
    methods: {
        getDoctors() {
        axios.get('http://121.199.161.134:8080/getDoctorsByRoom', {
            params: {
                roomName: this.selectedDepartment
            }
        })
        .then(response => {
            this.Doctors = response.data;
        })
        .catch(error => {
            console.log(error);
        });
},

    },
    mounted() {
        this.getDoctors();
    },
}
</script>

<style>

</style>