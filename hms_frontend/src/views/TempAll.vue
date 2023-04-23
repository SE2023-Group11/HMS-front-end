<!-- <template>
    <div class="card flex justify-content-center">
        <div class="flex flex-column gap-3">
            <div v-for="category of categories" :key="category.key" class="flex align-items-center">
                <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.name" />
                <label :for="category.key">{{ category.name }}</label>
            </div>
        </div>
    </div>
</template>
<script >

import { ref } from "vue";
import Checkbox from 'primevue/checkbox';
</script>
<script >
export default {
    name: 'MyComponent',
    components: {
        Checkbox
    },
};
const categories = ref([
    { name: "Accounting", key: "A" },
    { name: "Marketing", key: "M" },
    { name: "Production", key: "P" },
    { name: "Research", key: "R" }
]);
const selectedCategories = ref(['Marketing']);
</script > -->

<template>
    <div class="card flex justify-content-center">
        <AutoComplete v-model="value" :suggestions="items" @complete="search" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import AutoComplete from 'primevue/autocomplete';
const value = ref("");
const items = ref([]);

const search = (event) => {
    items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}
</script>