<template>
	<div class="header">
		<div class="header_box">
			<div class="left el-icon-menu" @click="showhide"></div>
			<div class="right">
				今天是 {{this.year}}年{{this.month}}月{{this.day}}日 星期{{this.week}}
			</div>
			<div class="center">
				<i class="fa fa-user"></i>
				<span>您好！{{this.username}}</span>
				<div class="center_drop">
					<div class="img">
						<img src="../../../static/img/timg.jpg" alt="" style="width: 100%;height: 100%;"/>
					</div>
					<h6>{{this.username}}</h6>
					<p>登录时间:{{this.year}}-{{this.month}}-{{this.day}} {{this.hours}}:{{this.seconds}}</p>
					<div class="btnsbox">
						<button @click="showfixpass">账户管理</button>
						<button @click="exit">退出</button>
					</div>
				</div>
			</div>
			<div class="fixpassword">
				<el-dialog title="账户管理" :visible.sync="headerFormVisible"  size="tiny">
					<p class="myfrom"><span>用户名</span><input type="text" ref="account"/></p>
					<p class="myfrom"><span>原密码</span><input type="text" ref="oldpassword"/></p>
					<p class="myfrom"><span>新密码</span><input type="text"ref="newpassword" /></p>
					<p class="myfrom"><span>确认密码</span><input type="text" ref="newpasswordagain"/></p>
					<div slot="footer" class="dialog-footer">
						<el-button @click="cancelfixpassword">取 消</el-button>
						<el-button type="primary" @click="okfixpassword">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
	import state from "../../vuex/state"
	import axios from "axios"
	export default {
		data() {
			return {
				username: "", //请求过来的用户信息
				year: "",
				month: "",
				day: "",
				week: "",
				hours: "",
				seconds: "",
				headerFormVisible:false,
			}
		},
		methods: {
			//获取双数的函数
			toDuble(num) {
				if(num - 9 <= 0) {
					return "0" + num
				} else {
					return "" + num
				}
			},
			//将数字转换为中文的函数
			toChina(num) {
				if(num == "0") {
					return "日"
				} else if(num == "1") {
					return "一"
				} else if(num == "2") {
					return "二"
				} else if(num == "3") {
					return "三"
				} else if(num == "4") {
					return "四"
				} else if(num == "5") {
					return "五"
				} else if(num == "6") {
					return "六"
				}
			},
			//获取当前时间的函数
			getTime(){
				var that = this;
				var myDate = new Date();
				that.year = myDate.getFullYear();
				that.month = that.toDuble(myDate.getMonth() + 1);
				that.day = that.toDuble(myDate.getDate());
				that.week = that.toChina(myDate.getDay())
				that.hours = that.toDuble(myDate.getHours())
				that.seconds = that.toDuble(myDate.getSeconds())
			},
			//推出的函数
			exit() {
				window.location.hash = "/"
			},
			//显示隐藏菜单树的函数
			showhide() {
				state.hide.isCollapse = !state.hide.isCollapse
			},
			showfixpass(){
				var that=this;
				that.headerFormVisible=true;
			},
			cancelfixpassword(){
				var that=this;
				that.headerFormVisible=false;
			},
			okfixpassword(){
				var that=this;
				console.log(that.$refs.account.value)
				if(that.$refs.newpasswordagain.value != that.$refs.newpassword.value){
					that.$message("前后密码不一致");
					that.$refs.account.value="";
					that.$refs.oldpassword.value="";
					that.$refs.newpassword.value="";
					that.$refs.newpasswordagain.value="";
					return;
				}
				that.headerFormVisible=false;
				var sendHeader=JSON.parse(localStorage.getItem("header"));
				var sendToken=localStorage.getItem("token");
				this.$axios({
					url: state.url.baseurl + state.url.updateAccount,
					headers:sendHeader,
					method: "post",
					data:{
							"access_token":sendToken,
							"oldaccount":that.$refs.account.value,
							"oldpassword":that.$refs.oldpassword.value,
							"newpassword":that.$refs.newpassword.value
					}
				}).then(function(retJson) {
					console.log(retJson)
					if(retJson.data.status > 0){
						if(retJson.data.status == '2001'){
							window.location.hash="/";	
							return;
						}
						that.$message(retJson.data.info);					
					}
					that.$refs.account.value="";
					that.$refs.oldpassword.value="";
					that.$refs.newpassword.value="";
					that.$refs.newpasswordagain.value="";
					window.location.hash="/";
				})
			}
		},
		mounted() {
			this.username=localStorage.getItem("nickname");
			this.getTime();
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
	}
	
	.header_box {
		padding: 0 15px;
		height: 60px;
		background: rgb(25, 140, 195);
		line-height: 60px;
		color: #fff;
		font-size: 15px;
	}
	
	.header_box .left {
		float: left;
		line-height: 60px;
		cursor: pointer;
		padding-left:20px;
	}
	
	.header_box .center {
		float: right;
		padding: 0 20px;
		position: relative;
	}
	
	.header_box .center:hover{
		background-color:rgb(22,126,175);
	}
	.header_box .center:hover .center_drop {
		display: block;
	}
	
	.header_box .center .center_drop {
		position: absolute;
		background: rgb(60, 144, 188);
		width: 280px;
		height: 180px;
		top: 60px;
		left: -55px;
		display: none;
		z-index:999999;
	}
	
	.header_box .center .center_drop .img {
		width: 90px;
		height: 90px;
		margin: 10px auto;
		background: blue;
	}
	.header_box .center .center_drop h6 {
		text-align: center;
		line-height: 20px;
	}
	
	.header_box .center .center_drop p {
		text-align: center;
		line-height: 20px;
	}
	
	.header_box .center .center_drop .btnsbox {
		height: 45px;
		background-color: rgb(60,144,150);
		padding-top: 10px;
		margin-top: 10px;
	}
	
	.header_box .center .center_drop .btnsbox button {
		width: 85px;
		height: 25px;
		outline: none;
		border: 1px solid #2C3E50;
		line-height: 35px;
		color: black;
		text-align: center;
		height: 35px;
		cursor: pointer;
	}
	
	.header_box .center .center_drop .btnsbox button:nth-of-type(1) {
		float: left;
		margin-left: 15px;
	}
	
	.header_box .center .center_drop .btnsbox button:nth-of-type(2) {
		float: right;
		margin-right: 15px;
	}
	
	.header_box .right {
		float: right;
	}
	.header_box .fixpassword p.myfrom:nth-of-type(1){margin-top:0;}
	.header_box .fixpassword p.myfrom{line-height:30px;margin-top:15px;height:30px;padding-left:40px;}
	.header_box .fixpassword p.myfrom span{float:left;width:70px;text-align:right;}
	.header_box .fixpassword p.myfrom input{height:28px;float:left;margin-left:10px;border:1px solid #000000;width:285px;outline:none;padding-left:15px;}
</style>