<template>
  <div class="globalMenu">
            <span class="pi-map-marker"></span>
            &nbsp;
            <router-link :to="'/PatientRoot'" style="text-decoration: none;color:gray;">首页</router-link>
            &nbsp;>&nbsp;
            <router-link :to="'/TestPage'" style="text-decoration: none;color:gray;">医院历史</router-link>
    </div>
    <div class="card">
        <Timeline :value="events" class="customized-timeline">
            <template #marker="slotProps">
                <span class="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" :style="{ backgroundColor: slotProps.item.color }">
                    <i :class="slotProps.item.icon"></i>
                </span>
            </template>
            <template #content="slotProps">
                <Card>
                    <template #title>
                        {{ slotProps.item.status }}
                    </template>
                    <template #subtitle>
                        {{ slotProps.item.date }}
                    </template>
                    <template #content>
                        <img v-if="slotProps.item.image" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.item.image}`" :alt="slotProps.item.name" width="200" class="shadow-1" />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                            neque quas!
                        </p>
                        <Button label="Read more" text></Button>
                    </template>
                </Card>
            </template>
        </Timeline>
    </div>
</template>

<script>
export default {
    data(){
        return {
            events : [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
            ]
        }
    }

}
</script>

<style scoped>
.globalMenu{
    position: relative;
    width:600px;
    height: 40px;
    margin-bottom: 0px;
    margin-top: 50px;
    margin-left: 120px;
    text-align: left;

}
</style>