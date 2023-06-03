<template>
    <Button label="添加新闻" @click="visible=true" style="position: absolute; margin: 20px; left: 15%;" />
    <Dialog v-model:visible="visible" header="添加新闻" style="width:60%; position: absolute;">
        <table style="left: 5%; position: relative;">
            <tr>
                <td style="width: 30%;">上传图片：</td>
                <td style="width: 60%;">
                    <div>
                        <div>
                            <input @click="getFiles($event)" name="files" type="file" /><br />
                        </div>
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

let visible = ref(false)
let introText = ref("")
let itemsToBeDeleted = ref([])

let files = []

function getFiles(event)
{
    let files_t = event.target.files
    console.log(files_t)
    for(var i=0; i<files_t.length; i++)
    {
        files.push(files_t[i])
    }
}

function upload()
{
    let formData = new FormData();
    formData.append('files', files[0])
    console.log(formData)
    console.log(introText)
}

function getSelectedItems(params)
{
    console.log(params)
    itemsToBeDeleted = params
}

const confirm = useConfirm();
const toast = useToast();

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
                toast.add({ severity: 'info', summary: '删除新闻', detail: '已删除全部选中新闻！', life: 3000 });
            }
        });
    }
};


</script>