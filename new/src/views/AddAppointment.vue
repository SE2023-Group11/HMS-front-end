<template>
    <DemoTitle></DemoTitle>


    <div>
        <label for="department-select">选择科室：</label>
        <select id="department-select" v-model="selectedDepartment" @change="getDoctorAvailability">
            <option value="internal-medicine" selected>内科系统</option>
            <option value="surgery">外科系统</option>
            <option value="obstetrics-gynecology">妇产科儿科</option>
            <option value="otolaryngology">五官科</option>
            <option value="other">其他科室</option>
            <option value="diagnosis-related">诊断相关科室</option>
        </select>
    </div>

    <div>
        <label for="date-select">选择日期：</label>
        <select id="date-select" v-model="selectedDate" @change="getDoctorAvailability">
            <option value="Today" selected>今天（{{today}}）</option>
            <option value="Tomorrow">明天（{{tomorrow}}）</option>
            <option value="Day After Tomorrow">后天（{{dayAfterTomorrow}}）</option>
        </select>
    </div>

    <hr>

    <div>
        <div v-if="availableDoctors.length > 0">
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
                    <tr v-for="doctor in availableDoctors" :key="doctor.id"
                        @mouseover="hoveredDoctor = doctor; hoveredDoctorPhoto = doctor.photo"
                        @mouseout="hoveredDoctor = null; hoveredDoctorPhoto = null">
                        <td>{{ doctor.name }}</td>
                        <td>{{ doctor.section }}</td>
                        <td>{{ doctor.title}}</td>
                        <td>{{ doctor.phone }}</td>
                        <td>
                            <img v-if="hoveredDoctor === doctor" :src="hoveredDoctorPhoto" style="max-height: 100px;">
                        </td>
                        <td>
                            <input type="button" value="预约挂号" @click="addAppointment">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p>该科室当日暂无可预约医生</p>
        </div>
    </div>


    <DemoBottom></DemoBottom>
</template>

<script>
import DemoBottom from '../components/DemoBottom.vue';
import DemoTitle from '../components/DemoTitle.vue';
//import axios from 'axios';

export default {
    name:"AddAppointment",
    components:{
        DemoBottom,
        DemoTitle
    },
    data() {
        return {
            selectedDepartment: "internal-medicine",
            selectedDate: "Today",
            today: "",
            tomorrow: "",
            dayAfterTomorrow: "",
            availableDoctors: [],
            selectStartTime:"",
            selectEndTime:""
        };
    },
    methods: {
        getDoctorAvailability() {
            let availableDoctors = [];
            //// unfinished
            this.availableDoctors = availableDoctors;
        },
        formatDate(date) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            return `${year}年${month}月${day}日`;
        },
        addAppointment() {
            const doctor = this.hoveredDoctor;
            const date = this.selectedDate;
            const appointment = {
                patient_id: 1, // 假设当前患者的id为1
                doctor_id: doctor.id,
                date: date,
                time_start: this.selectStartTime,
                time_end: this.selectEndTime
            };

            // 跳转到确认预约界面，并将预约信息作为参数传递
            this.$router.push({
                name: 'ConfirmAppointment',
                params: {
                    appointment: appointment
                }
            });
            }

    },
    mounted() {
        this.getDoctorAvailability();

        let today = new Date();
        this.today = this.formatDate(today);

        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        this.tomorrow = this.formatDate(tomorrow);

        let dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(today.getDate() + 2);
        this.dayAfterTomorrow = this.formatDate(dayAfterTomorrow);
    },
}
</script>

<style>

</style>