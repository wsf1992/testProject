<template>
	<div class="login">
		<div class="login_box">
			<h2 style="padding-left:50px;">SPI后台管理系统</h2>
			<div class="from">
				<p><span>用户名:</span><input type="text" ref="username" /></p>
				<p><span>密码:</span><input type="text" ref="passwords" /></p>
				<p><span>验证码:</span><input type="text" ref="codenum" /><i style="border-radius:10px;overflow:hidden;height:40px;margin-top:2px;"><vercode ref="vscode"></vercode></i></p>
				<button @click="loginbtn" style="border-radius:5px;width:400px;">登陆</button>
			</div>			
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	import state from "../../vuex/state"
	import vercode from "./vercode"
	axios.defaults.withCredentials=true;
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			//点击登陆的函数
			loginbtn(){
				var that=this;			
				axios({
					url:state.url.baseurl+state.url.login,
					method:"get",
					params:{
						"account":that.$refs.username.value,
						"password":that.$refs.passwords.value,
						"verify":that.$refs.codenum.value,						
					}
				}).then(function(result){
					//校核失败后清空数据，重新获取验证码
					if(result.data.status>0){
						that.$refs.username.value="";
						that.$refs.passwords.value="";
						that.$refs.codenum.value="";						
						that.$refs.vscode.recanva()
						that.$message(result.data.info);
					}
					//校核成功后存header和token以及userinfo
					if(result.data.status=="0"){						
						var headers = JSON.stringify({'ClientID':result.data.data.client.client_id,'ClientSecret':result.data.data.client.client_secret});							
						localStorage.setItem("header",headers)
						localStorage.setItem("token",result.data.data.token.access_token)
						localStorage.setItem("nickname",result.data.data.userinfo.nickname)
						window.location.hash="/indexpage";						
					}
				})
			},
		},
		mounted(){
			document.getElementsByClassName("login")[0].style.height=document.body.scrollHeight +'px';
			document.getElementsByClassName("login")[0].style.width=document.body.scrollWidth +'px';
			console.log(this.$route)
		},
		components:{
			vercode
		}
	}
</script>

<style scoped>
	.login{background:black;overflow:hidden;}
	.login_box{width:400px;height:350px;padding:0 10px;color:aliceblue;position:absolute;left:50%;top:50%;margin-left:-200px;margin-top:-180px;}
	.login_box h2{text-align:center;}
	.login_box .from>p{position:relative;margin:16px 0;}
	.login_box .from>p>span{display:inline-block;width:65px;text-align:left;line-height:40px;margin-right:5px;}
	.login_box .from>p>input{height:38px;outline:none;border:1px solid rgb(190,200,220);width:310px;border-radius:5px;padding-left:15px;}
	.login_box .from>p:nth-of-type(3)>input{height:38px;outline:none;border:1px solid rgb(190,200,220);width:205px;border-radius:5px;}
	.login_box .from>p:nth-of-type(3)>i{position:absolute;right:0;height:42px;width:100px;background-color:red;}
	.login_box .from button{width:300px;height:35px;background-color:rgb(32,160,255);outline:none;border:none;margin:30px auto;display:block;color:rgb(255,255,255)}
</style>