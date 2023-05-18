<template>
    <div class="container">
        <div class="content" :style="{ height: containerHeight + 'px' }">
            <!-- 在循环中动态生成元素 -->
            <div v-for="item in items" :key="item.id" class="item">{{ item.text }}</div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            items: [ /* 待循环的数据 */],
            containerHeight: 0 /* 初始化容器高度为0 */
        };
    },
    mounted() {
        // 在组件挂载完成后计算容器高度
        this.containerHeight = this.computeContainerHeight();
    },
    methods: {
        computeContainerHeight() {
            let height = 0;
            const itemElements = document.querySelectorAll('.item');
            itemElements.forEach(item => {
                height += item.offsetHeight;
            });
            return height;
        }
    }
}
</script>
  
<style>
.container {
    /* 设置容器样式 */
}

.content {
    /* 设置内容样式 */
}
</style>