<template>
	<div class="login">
		<div class="login_box">
			<h2 style="padding-left:50px;">SPI用户注册</h2>
			<div class="from">
				<p><span>用户名:</span><input type="text" ref="account" /></p>
				<p><span>密码:</span><input type="text" ref="password" /></p>
				<p><span>验证码:</span><input type="text" ref="verify" /><i style="border-radius:10px;overflow:hidden;height:40px;margin-top:2px;"><vercode></vercode></i></p>
				<button @click="submitBtn">提交</button>
			</div>			
		</div>
	</div>
</template>

<script>
	import state from "../../vuex/state"
	import vercode from "./vercode"
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			//截取地址栏的函数
			getUrlParams(name) {
	    		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    		var r = window.location.hash.substr(1).match(reg);
				    if (r != null)
				        return r[2];
				    else
				        return "";
			},
			//点击登陆的函数
			submitBtn(){
				var that=this;
				var submitData={
					'account':that.$refs.account.value,
					'password':that.$refs.password.value,
					'verify':that.$refs.verify.value,
					'grant_type':that.$route.query.grant_type,
					'redirect_uri':that.$route.query.redirect_uri,
					'state':that.$route.query.state
				};
				this.$axios({
					url:state.url.baseurl+state.url.register,
					method:"get",
					params:submitData,
				}).then(function(retJson){
					if(retJson.status > 0){
						that.$message(retJson.info);						
					}else{
						window.location.href = retJson.data.redirect_uri;
					}
				})
			},
		},
		mounted(){
			document.getElementsByClassName("login")[0].style.height=document.body.scrollHeight +'px';
			document.getElementsByClassName("login")[0].style.width=document.body.scrollWidth +'px';
			console.log(this.$route.query.grant_type)
			console.log(this.$route.query.redirect_uri)
			console.log(this.$route.query.state)
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