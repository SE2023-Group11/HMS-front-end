<template>
    <DemoTitle></DemoTitle>

    <div>
        <label for="department-select">选择科室：</label>
        <select id="department-select" v-model="selectedDepartment" @change="getDoctorAvailability">
            <option v-for="section in sections" :key="section.sectionId">{{ section.sectionFirName }}</option>
        </select>
    </div>
    
    <hr>
    <div>
        <h3>科室介绍：</h3>
        {{ selectedDepartment.sectionIntroduction }}
    </div>
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
                            <div @mouseover="hoveredDoctor = doctor" @mouseout="hoveredDoctor = null">
                                <img :src="doctor.doctorImg" style="max-height: 100px;">
                                <div v-if="hoveredDoctor === doctor">
                                    <h4>{{ doctor.doctorName }}</h4>
                                    <p>介绍：{{ doctor.doctorIntroduction }}</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
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
            sections:[]
        };
    },
    methods: {
        getDoctors() {
        axios.get('{{$baseURL}}/getDoctorsByRoom', {
            params: {
                roomName: this.selectedDepartment
            }
        })
        .then(response => {
            this.Doctors = response.data;
        })
        .catch(error => {
            console.log(error);
        })        
        },
        getSectionName(){
            axios.get('{{$baseURL}}/getRoomName')
            .then(response => {
            this.sections = response.data.data;
            })
            .catch(error => {
            console.error(error);
            });
            },

    },
    mounted() {
        this.getSectionName();
        this.getDoctors();
    },
}
</script>

<style>

</style>