<template>
    <input type="button" value="gsdk" @click="sendtoback">
</template>
    
    
<script>

import axios from 'axios';

export default {
    name: 'App',
    components: {

    },
    methods: {

        sendtoback() {
            console.log("fdfsdfsdfsdfsdfsdfsd");
            axios.post('http://121.199.161.134:8080/sendToEmail',
                "type=1&name='wesda'&email='1340585346@qq.com'"
            )
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }
}
</script>