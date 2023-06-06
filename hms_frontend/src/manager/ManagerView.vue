<template>
    <div class="card">
        <TabMenu :model="items" />
        <div class="scroll">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TabMenu from 'primevue/tabmenu'
const items = ref([
    {
        label: '信息管理',
        to: '/managerInfo'
    },
    {
        label: '消息处理',
        to: '/notifications'
    },
    {
        label: '医生排班',
        to: '/jobManage'
    },
    {
        label: '新闻管理',
        to: '/newsManage'
    }
]);
</script>

<style>
.scroll {
    height: 540px;
    overflow: auto;
}
</style>