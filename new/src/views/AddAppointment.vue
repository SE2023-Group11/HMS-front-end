<template>
    <DemoTitle></DemoTitle>


    <div>
        <label for="department-select">选择科室：</label>
        <select id="department-select" v-model="selectedDepartment" @change="getDoctorAvailability(selectedDate,selectedDepartment)">
            <option v-for="section in sections" :key="section.sectionId">{{ section.sectionFirName }}</option>
        </select>

    </div>

    <div>
        <label for="date-select">选择日期：</label>
        <select id="date-select" v-model="selectedDate" @change="getDoctorAvailability(selectedDate,selectedDepartment)">
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
                        @mouseover="hoveredDoctor = doctor"
                        @mouseout="hoveredDoctor = null">
                        <td>{{ doctor.name }}</td>
                        <td>{{ doctor.section }}</td>
                        <td>{{ doctor.title}}</td>
                        <td>{{ doctor.phone }}</td>
                        <td>
                            <div @mouseover="hoveredDoctor = doctor" @mouseout="hoveredDoctor = null">
                                <img :src="doctor.doctorImg" style="max-height: 100px;">
                                <div v-if="hoveredDoctor === doctor">
                                    <h4>{{ doctor.doctorName }}</h4>
                                    <h4>
                                        医生预约情况：
                                    </h4>
                                    <h5>上午：</h5>
                                    <div v-for="(time,index) in morningTimes" :key="index">
                                        <p>{{ time }}</p>
                                        <input v-if="selectedDoctorSchedule[index]=1" text="预约挂号" @click="addAppointment(time)" />
                                        <input v-else type="text" value="无法预约" />
                                    </div>
                                    <h5>下午：</h5>
                                    <div v-for="(time,index) in afternoonTimes" :key="index">
                                        <p>{{ time }}</p>
                                        <cinput v-if="selectedDoctorSchedule[index+7]=1" text="预约挂号" @click="addAppointment(time)" />
                                        <input v-else type="text" value="无法预约" />
                                    </div>

                                </div>
                            </div>
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
import axios from 'axios';

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
            selectEndTime:"",
            sections:[],
            selectedDoctorSchedule:[],
            morningTimes: [
                '8:00-8:30',
                '8:30-9:00',
                '9:00-9:30',
                '9:30-10:00',
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
        };
    },
    methods: {
        getSectionName(){
            axios.get('{{$baseURL}}/getRoomName')
            .then(response => {
            this.sections = response.data.data;
            })
            .catch(error => {
            console.error(error);
            });
        },
        getDoctorAvailability(date, roomName) {
            axios.get('{{$baseURL}}/getDoctorsBySchedule', {
            params: {
                date: date,
                roomName: roomName
            }
            })
            .then(response => {
            this.availableDoctors = response.data.data;
            })
            .catch(error => {
            console.error(error);
            });
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
        this.getSectionName();
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