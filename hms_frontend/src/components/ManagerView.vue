<template>
    <TabMenu :model="items"/>
    <router-view/>
</template>

<script>
    import TabMenu from 'primevue/tabmenu'
    export default {
        setup(){
            let items = ['home', 'calendar']

            return items
        }
        
    }
</script>