<template>
		<div class="configaccount_box" v-if="hideShow">
			<div class="content" style="margin-top:0;">
				<!--标题和面包屑-->
				<el-row style="line-height:50px;border-bottom:1px solid #000000;" type="flex" justify="space-between">
					<el-col :span="24" style="text-align: center;">
						<h4>短信账号配置</h4>
					</el-col>
					<!--<el-col :span="4" style="padding-top:25px;">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>首页</el-breadcrumb-item>
							<el-breadcrumb-item>用户管理</el-breadcrumb-item>
							<el-breadcrumb-item>短信账号配置</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>-->
				</el-row>
				<!--form表单-->
				<div class="from">
					<el-row :gutter="20" style="padding:15px 0 50px 0">
						<el-col :span="3" :offset="9">
							<el-radio class="radio" v-model="radio" label="1">自主申请</el-radio>
						</el-col>
						<el-col :span="3">
							<el-radio class="radio" v-model="radio" label="2">平台预设</el-radio>
						</el-col>
					</el-row>
					<el-row v-show="radio=='1'">
						<el-col :span="15" :offset="6">
							<el-form label-width="100px">
								<el-form-item label="短信账号" style="display:none">
									<el-input style="width:400px;" v-model="epcode"></el-input>
								</el-form-item>
								<el-form-item label="短信账号">
									<el-input style="width:400px;" v-model="sm" :maxlength="64" @blur="checkImg(sm)"></el-input>
								</el-form-item>
								<el-form-item label="短信账号密码">
									<el-input style="width:400px;" v-model="pass" :maxlength="64" @blur="checkImg(pass)"></el-input>
								</el-form-item>
								<el-form-item label="特殊编号">
									<el-input style="width:400px;" v-model="specilcode" :maxlength="64" @blur="checkImg(specilcode)"></el-input>
								</el-form-item>
								<el-form-item label="企业编号">
									<el-input style="width:400px;" v-model="companycode" :maxlength="64" @blur="checkImg(companycode)"></el-input>
								</el-form-item>
								<!--<el-form-item label="账号回调地址">
									<el-input style="width:400px;" v-model="callbackurl"></el-input>
								</el-form-item>-->
								<!--<el-form-item label="扩展码">
									<el-input style="width:400px;" v-model="ext"></el-input>
								</el-form-item>-->
								<el-form-item style="float:right;padding-top:100px">
									<el-button type="primary" @click="commitcontent">提交</el-button>
									<el-button @click="exitnow">取消</el-button>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
					<el-row v-show="radio=='2'">
						<el-col :span="15" :offset="4">
							<el-form label-width="100px">
								<el-form-item>
									<el-alert title="请直接进行提交" type="success" :closable="false"></el-alert>										
								</el-form-item>
								<el-form-item style="float:right;padding-top:100px">
									<el-button type="primary" @click="commitcontent">提交</el-button>
									<el-button @click="exitnow">取消</el-button>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
</template>

<script>
	import state from "../../vuex/state"
	export default {
		data() {
			return {
				radio: "1",
				hideShow:false,
				sm:"",
				specilcode:"",
				pass:"",
				companycode:"",
				ext:"",
				callbackurl:"",
				epcode:"",
				goString:false,
			}
		},
		methods:{
			//对输入框进行限制
			checkImg(ele){
				var that = this ;			
				if(/^[a-zA-Z\d_]*$/.test(ele) == false){
					that.$message('输入格式错误');
					that.goString = true;
				}	
			},
			//取消按钮的方法
			exitnow(){
				var that=this;
				that.hideShow=false;
			},
			//提交按钮的方法
			commitcontent(){
				var that=this;
				that.checkImg();
				if(that.goString){
					that.goString =false;
					return;
				}
				that.hideShow=false;	
				var sendHeader=JSON.parse(localStorage.getItem("header"));
				var sendToken=localStorage.getItem("token");
				var postData={};
				//自主模式提交
				if(that.radio == "1"){
					postData={
						'access_token':sendToken,
						'spi_epcode':that.epcode,
						'type':'1',
						'sn':that.sm,
						'password':that.pass,
						'specificCode':that.specilcode,
						'companyCode':that.companycode,
					}
				//平台预设
				}else{
					postData={
						'access_token':sendToken,
						'spi_epcode':that.epcode,
						'type':0
					}
				}
				this.$axios({
					url: state.url.baseurl + state.url.setAccountMsg,
					headers:sendHeader,
					method: "post",
					data:postData,
				}).then(function(retJson) {
					if(retJson.data.status > 0){
						if(retJson.data.status == '2001'){
							window.location.hash="/";	
							return;
						}
						that.$message(retJson.data.info);					
					}
					that.$emit("childMethods");
				})
			}
		}
	}
</script>

<style>
	.configaccount_box{
		position:absolute;
		top:0;
		width: 100%;
		height:100%;		
		background:rgba(255,255,255,1);
		z-index:999;
	}
</style>