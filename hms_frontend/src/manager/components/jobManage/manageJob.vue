<template>
    <div class="chart_" style="position:absolute; left: 5%; width: 80%;">
        <workTable :doctorID=doctorID />
    </div>
    <div class="check_" style="position:absolute; left: 70%; width: 20%;">
        <scheduleAdder :doctorID=doctorID />
    </div>
</template>

<script setup>
import workTable from './workTable.vue';
import scheduleAdder from './scheduleAdder.vue';
import { defineProps, onMounted, ref } from 'vue';
let props = defineProps({doctorID: String})
let doctorID = ref(props.doctorID)
</script>