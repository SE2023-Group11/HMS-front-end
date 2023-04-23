
<template>
    <div class="card">
        <DataTable :value="persons" @row-clicked="showDialog">
            <Column field="name" header="Name"></Column>
            <Column field="age" header="Age"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="email" header="Email"></Column>
        </DataTable>
    </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue';
// import { ProductService } from '@/service/ProductService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

// onMounted(() => {
//     ProductService.getProductsMini().then((data) => (products.value = data));
// });
data: {
    const persons = [
        { name: 'Alice', age: 25, gender: 'Female', email: 'alice@example.com' },
        { name: 'Bob', age: 30, gender: 'Male', email: 'bob@example.com' },
        { name: 'Charlie', age: 40, gender: 'Male', email: 'charlie@example.com' },
    ];
}

</script>
