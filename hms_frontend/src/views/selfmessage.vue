<template>
    <div class="bg-image">
        <div class="avatar">
            <img src="../../public/jay.jpg" />
        </div>
        <div class="message">
            <DataTable :value="persons" width="60px">
                <Column field="信息" header="信息"></Column>
                <Column field="详情" header="详情"></Column>
            </DataTable>
        </div>
    </div>
</template>


<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import { ref } from 'vue';
// import axios from 'axios'
// const id = ref('123');
// const name = ref('');
// const age = ref('');
// const sex = ref('');
// const birthday = ref('');
// const region = ref('');
// const email = ref('');
// const idCard = ref('');
// const history = ref('');

// axios.get('/api/data', {
//     params: {
//         id: id.value // 传递 ID 参数
//     }
// })
//     .then(response => {
//         // 成功获取数据后的处理逻辑
//         console.log(response.data)
//         const data = response.data;

//         name.value = data.name;
//         age.value = data.age;
//         sex.value = data.sex;
//         birthday.value = data.birthday;
//         region.value = data.region;
//         email.value = data.email;
//         idCard.value = data.idCard;
//         history.value = data.history;
//     })
//     .catch(error => {
//         // 处理错误的逻辑
//         console.error(error)
//     })
// const persons = [
//     { name: 'Alice', age: 25, gender: 'Female', email: 'alice@example.com' },
//     { name: 'Bob', age: 30, gender: 'Male', email: 'bob@example.com' },
//     { name: 'Charlie', age: 40, gender: 'Male', email: 'charlie@example.com' },
// ];

</script>


