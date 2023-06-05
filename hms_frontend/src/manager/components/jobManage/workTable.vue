<template>
    <table border="1" width="80%" cellspacing="1px" cellpadding="6px" align="center" style="text-align: center; height: 450px; margin-top: 15px;">
        <tr>
            <td></td>
            <td>星期一</td>
            <td>星期二</td>
            <td>星期三</td>
            <td>星期四</td>
            <td>星期五</td>
            <td>星期六</td>
            <td>星期日</td>
        </tr>
        <tr v-for="(row, rowIndex) in newClrs" :key="rowIndex">
            <td v-if="rowIndex===0">8:00-8:30</td>
            <td v-if="rowIndex===1" >8:30-9:00</td>
            <td v-if="rowIndex===2" >9:00-9:30</td>
            <td v-if="rowIndex===3" >9:30-10:00</td>
            <td v-if="rowIndex===4" >10:00-10:30</td>
            <td v-if="rowIndex===5" >10:30-11:00</td>
            <td v-if="rowIndex===6" >11:00-11:30</td>
            <td v-if="rowIndex===7" >14:00-14:30</td>
            <td v-if="rowIndex===8" >14:30-15:00</td>
            <td v-if="rowIndex===9" >15:00-15:30</td>
            <td v-if="rowIndex===10">15:30-16:00</td>
            <td v-if="rowIndex===11">16:00-16:30</td>
            <td v-if="rowIndex===12">16:30-17:00</td>
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" align="center" :class="{
            red: cell=== '3',
            orange: cell === '2',
            green: cell ==='1'
            }"> </td>
        </tr>
    </table>
    <div style="margin-top: 15px;">
        <Button class="red" style="margin-left: 150px;border-radius: 5px; background-color: #0048fd4b; color: #000000;" label="预约" disabled />
        <Button class="orange" style="margin-left: 100px;border-radius: 5px; background-color: #b0aeab4e; color: #000000;" label="门诊" disabled />
        <Button class="green" style="margin-left: 100px;border-radius: 5px; background-color: #bff2ffaa; color: #000000;" label="休息" disabled />
    </div>
</template>

<script setup>
import {defineProps, onMounted} from 'vue'
import {ref, reactive} from 'vue'
import axios from 'axios';
let workInfo = ref({})
let props = defineProps({doctorID: String})
let token = "eyJhbGciOiJIUzI1NiJ9.eyJub3dMb2dnZWRJblR5cGUiOiJub3dMb2dnZWRJblR5cGVBZG1pbiIsIm5vd0xvZ2dlZEluSWQiOiIxIiwiaWF0IjoxNjg0NzQ2OTQxLCJleHAiOjE2ODY1NDY5NDF9.npgDMKJW-7zrsoAlBmdtuWbQNqzhi_0bBzjXieLqKu8"
let clrs = reactive(Array.from(Array(7), () => new Array(13)))
let newClrs = reactive(Array.from(Array(13), () => new Array(7)))

onMounted(()=>{
    axios({
        method: 'post',
        url: 'http://121.199.161.134:8080/getJob',
        params: {
            token: token,
            doctorID: props.doctorID
        }
    }).then((res)=>{
        workInfo.value = res.data.data
        clrs[0] = str2Arr(workInfo.value.mon1)
        clrs[1] = str2Arr(workInfo.value.tue1)
        clrs[2] = str2Arr(workInfo.value.wed1)
        clrs[3] = str2Arr(workInfo.value.thu1)
        clrs[4] = str2Arr(workInfo.value.fri1)
        clrs[5] = str2Arr(workInfo.value.sat1)
        clrs[6] = str2Arr(workInfo.value.sun1)
        // console.log(clrs[0][0])
        for(let i=0; i<7; i++)
        {
            for(let j=0; j<13; j++)
            {
                newClrs[j][i] = clrs[i][j]
            }
        }
    })
    
    // newClrs[0][0] = 2
    console.log(newClrs)
})

function str2Arr(s)
{
    let temp_s = s.substring(1, 26)
    return temp_s.split(",")
}

</script>

<style>
.green {
background-color: #bff2ffaa;
color: #000000;
}

.red {
background-color: #0048fd4b;
color: #000000;
}

.orange {
background-color: #b0aeab4e;
color: #000000;
}
</style>