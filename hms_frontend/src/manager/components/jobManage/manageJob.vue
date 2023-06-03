<template>
    <div class="chart_" style="position:relative; left: 0%; width: 80%;">
        <workTable />
    </div>
    <div class="check_" style="position:relative; left: 78%; width: 20%;">
        <scheduleAdder :doctorID=props.doctorID />
    </div>
</template>

<script setup>
import workTable from './workTable.vue';
import scheduleAdder from './scheduleAdder.vue';
import { defineProps } from 'vue';
let props = defineProps({doctorID: String})
</script>