<template>
    <Toast />
    <Button label="添加新闻" @click="visible=true" style="position: absolute; margin: 20px; left: 15%;" />
    <Dialog v-model:visible="visible" header="添加新闻" style="width:60%; position: absolute;">
        <table style="left: 5%; position: relative;">
            <tr>
                <td style="width: 30%;">上传图片：</td>
                <td style="width: 60%;">
                    <div>
                        <div>
                            <input @change="getFiles($event)" name="files" type="file" /><br />
                        </div>
                    </div>
                </td>
            </tr>
            <br/>
            <tr>
                <td>日期：</td>
                <td>
                    <div class="card flex justify-content-center" style="width: 250px;">
                        <Calendar v-model="date" showIcon />
                    </div>
                </td>
            </tr>
            <br/>
            <tr>
                <td>介绍文字：</td>
                <td>
                    <InputText type="text" v-model="introText" style="width: 100%;"/>
                </td>
            </tr>
        </table>
        <br/><br/>
        <Button @click="upload" type="submit" style="position: absolute; left: 50%; transform: translate(0, -50%);">上传</Button>
        <br/>
    </Dialog>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div>
        <Button @click="confirm2()" label="删除新闻" style="position: absolute; margin: 20px; left: 25%;"></Button>
    </div>
    <div style="position: relative; top: 90px;">
        <newsListShow @select-items="getSelectedItems"/>
    </div>
    
</template>

<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import newsListShow from './newsListShow.vue'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import Calendar from 'primevue/calendar';
import axios from 'axios';

let visible = ref(false)
let introText = ref("")
let itemsToBeDeleted = ref([])
let token = sessionStorage.getItem("token")
let files = []
let imageUrl = ref("")
const confirm = useConfirm();
const toast = useToast();
let date = ref()

function getFiles(event) {
    const file = event.target.files[0];
    
    console.log('bbbbbbbbbbb');
    console.log(file);
    // const formData = new FormData();
    // formData.append("name",token);
    // formData.append("file",file);
    
    //将上传的文件存到数据库
    if (file) {
        axios.post('https://pz.al/api/upload', {image:file}, {
            params:{

            },
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then(response => {
            console.log(response.data.data.url);
            imageUrl.value = response.data.data.url
        })
    }
    else {
        console.error('文件不存在')
    }
}

function upload()
{
    axios({
        method: 'post',
        url: 'http://121.199.161.134:8080/addNews',
        params: {
            token: token
        },
        data: {
            img: imageUrl.value,
            body: introText.value,
            date: date.value
        }
    }).then((res)=>{
        console.log(res)
        toast.add({ severity: 'info', summary: '添加新闻', detail: '已将新闻上传至列表！', life: 3000 });
    })
    window.location.reload()
}

function getSelectedItems(params)
{
    console.log(params)
    itemsToBeDeleted = params
}

const confirm2 = () => {
    console.log(itemsToBeDeleted)
    if(itemsToBeDeleted.value.length==0)
    {
        window.alert("未选择任何新闻！")
    }
    else
    {
        confirm.require({
            message: '确定删除选中的全部新闻吗？',
            header: '删除新闻',
            acceptClass: 'p-button-danger',
            accept: () => {
                console.log(itemsToBeDeleted.value)
                let array_ = itemsToBeDeleted.value
                let ret = []
                for(let i=0; i<array_.length; i++)
                {
                    ret.push(array_[i].id)
                }
                console.log(ret)
                axios({
                    method: 'delete',
                    url: 'http://121.199.161.134:8080/deleteNews',
                    params: {
                        token: token
                    },
                    data: {
                        id: ret
                    }
                }).then((res)=>{
                    console.log(res)
                })
                window.location.reload()
                toast.add({ severity: 'info', summary: '删除新闻', detail: '已删除全部选中新闻！', life: 3000 });
            }
        });
    }
};


</script>