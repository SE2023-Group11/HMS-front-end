<template>
	<div>
		选择多个文件：<input @change="getFiles($event)" name="files" type="file" multiple="multiple" /><br />
		选择文件夹，遍历该文件夹下所有文件：<input @change="getFiles($event)" name="files" type="file" webkitdirectory mozdirectory /><br />
		<button @click="upload" type="submit">上传</button>
	</div>
</template>
<script>
	export default {
		name: 'UploadFileVue',
		data() {
			return {
				files: []
			}
		},
		methods: {
			getFiles: function(event) {
				var files = event.target.files;
				for (var i = 0; i < files.length; i++) {
					ths.files.push(files[i]);
				}
			},
			upload: function() {
				var formData = new FormData();
				for (var i = 0; i < this.files.length; i++) {
					formData.append('files', this.files[i]);
				}
				this.$axios.post("/upload", formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(function(response) {
					// 请求成功
				}, function(err) {

				})
			}
		}
	}
</script>
