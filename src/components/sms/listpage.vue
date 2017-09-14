<template>
		<div class="listpage_box">
			<div class="content">
				<!--标题和面包屑-->
				<el-row style="line-height:50px;border-bottom:1px solid #000000;" type="flex" justify="space-between">
					<el-col :span="4" >
						<h2>免打扰短信审核</h2>
					</el-col>
					<el-col :span="4" style="padding-top:25px;">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>首页</el-breadcrumb-item>
							<el-breadcrumb-item>用户管理</el-breadcrumb-item>
							<el-breadcrumb-item>短信模板审核</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
				</el-row>
				<!--搜索-->
				<div class="searchbox" style="padding:20px 0;">
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item>
							<el-input placeholder="请输入回复内容" v-model="keywords"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="searchlist">查询</el-button>
						</el-form-item>
					</el-form>
				</div>
				<!--列表-->
				<div class="list">
					<el-table :data="tableData" border>
						<el-table-column prop="spi_epcode" label="企业编号" width="auto" align="center"></el-table-column>
						<el-table-column prop="epname" label="企业名称" width="auto" align="center"></el-table-column>
						<el-table-column prop="create_time" label="创建时间" width="auto" align="center"></el-table-column>
						<el-table-column prop="auditTemplates" label="模板状态" width="auto" align="center">
							<template scope="scope">
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status=='1'">{{'未审核'}}</el-button>														
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status=='2'">{{'初审通过'}}</el-button>														
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status=='3'">{{'初审驳回'}}</el-button>														
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status=='4'">{{'终审通过'}}</el-button>														
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status=='5'">{{'终审驳回'}}</el-button>														
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status == null && scope.row.enableTemplates.sms_status =='6'" >{{'使用中'}}</el-button>
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status == null && scope.row.enableTemplates.sms_status =='7'" >{{'已启用'}}</el-button>
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status == null && scope.row.enableTemplates.sms_status == null" >{{'无'}}</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="auditTemplates" label="模板批次" width="auto" align="center">
							<template scope="scope">
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status != null">{{scope.row.auditTemplates.sms_batch_number}}</el-button>																											
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status == null && scope.row.enableTemplates.sms_status != null" >{{scope.row.enableTemplates.sms_batch_number}}</el-button>
								<el-button type="text" v-if="scope.row.auditTemplates.sms_status == null && scope.row.enableTemplates.sms_status == null" >{{'无'}}</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="profiles" label="免打扰状态" width="auto" align="center">
							<template scope="scope">
								<el-button type="text" v-if="scope.row.profiles.allow_no_disturb=='1'" >{{'开启'}}</el-button>
								<el-button type="text" v-if="scope.row.profiles.allow_no_disturb=='0'">{{'关闭'}}</el-button>													
							</template>
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="auto" align="center">
							<template scope="scope">
								<el-button type="text" size="small" @click="checkinfomation(scope)" v-if="scope.row.auditTemplates.sms_status != null">审核</el-button>
								<el-button type="text" size="small" @click="setsmsinformation(scope)">设置</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<!--分页-->
				<div class="paging" style="text-align:end;padding-top:30px;">
					<el-pagination layout="total, sizes, prev, pager, next" :total="totals" @size-change="changeSize" @current-change="changeCurrent" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :current-page="nowPage">
					</el-pagination>
				</div>
			</div>
		<checkMsgPage ref="checkmsgpage" style="display:none;" v-on:childMethod="getInformation"></checkMsgPage>
		<configAccount ref="configaccount" v-on:childMethods="getInformation"></configAccount>		
		</div>
</template>

<script>
	import Vue from "vue"
	import elementui from "element-ui"
	import state from "../../vuex/state"
	import checkMsgPage from "./msgcheckpage"
	import configAccount from "./configaccount"
	Vue.use(elementui)

	export default {
		data() {
			return {
				//tableData后台传过来开的列表接受容器
				tableData: [],
				pageSize:10,//每页显示的条数
				totals:0,//总条目数
				nowPage:1,//当前页数
				keywords:""
			}
		},
		methods: {
			//获取待审核企业列表
			getInformation(){
				var that=this;
				var sendHeader=JSON.parse(localStorage.getItem("header"));
				var sendToken=localStorage.getItem("token");
				this.$axios({
					url:state.url.baseurl+state.url.getSmsSteList,
					headers:sendHeader,
					params:{
						"access_token":sendToken,
						"keywords":that.keywords,
						"page":that.nowPage,
						"limit":that.pageSize,
					}
				}).then(function(result){
					if(result.data.status > 0){
						if(result.data.status == '2001'){
							window.location.hash="/";	
							return;
						}
						that.$message(result.data.info);					
					}
					that.totals=result.data.data.dataCount;
					that.tableData=result.data.data.list;
				})
			},
			//审核按钮执行的函数
			checkinfomation(scope) {
				console.log(scope)
				this.$refs.checkmsgpage.$el.style.display="block";
				this.getmsgchecks(scope);
				
			},
			//获取短信模板的函数
			getmsgchecks(scope) {
				console.log(scope)
				var that=this;
				var sendHeader=JSON.parse(localStorage.getItem("header"));
				var sendToken=localStorage.getItem("token");
				this.$axios({
					url: state.url.baseurl + state.url.gettemplateschecks,
					headers:sendHeader,
					method: "post",
					data:{
						"access_token":sendToken,
						'spi_epcode':scope.row.spi_epcode,
					}
				}).then(function(retJson) {
					var templates=retJson.data.data.templates;
					for(var i=0;i<templates.length;i++){
						switch (templates[i].sms_type){
							case 1:
								that.$refs.checkmsgpage.$refs.nosmscontent.value=templates[0].sms_content;
								that.$refs.checkmsgpage.$refs.nosmskyeword.value=templates[0].sms_keyword;
								that.$refs.checkmsgpage.$refs.spi_epcode.value=templates[0].spi_epcode;
								that.$refs.checkmsgpage.$refs.sms_batch_number.value=templates[0].sms_batch_number;
								that.$refs.checkmsgpage._data.sms_status=templates[0].sms_status;
								if(templates[0].sms_keyword_match_type == '1'){
									that.$refs.checkmsgpage.$refs.nomach1.checked='true';																			
								}else{
									that.$refs.checkmsgpage.$refs.nomach2.checked='true';												
								}
								break;
							case 2:
								that.$refs.checkmsgpage.$refs.successcheck.checked='true';			
								that.$refs.checkmsgpage.$refs.retsucccheck.checked='true';			
								that.$refs.checkmsgpage.$refs.successsmscontent.value=templates[1].sms_content;
								that.$refs.checkmsgpage.$refs.retsucckeyword.value=templates[1].sms_keyword;
								if(templates[1].sms_keyword_match_type == '1'){
									that.$refs.checkmsgpage.$refs.retsucc1.checked='true';																			
								}else{
									that.$refs.checkmsgpage.$refs.retsucc2.checked='true';												
								}
								break;
							case 3:								
								that.$refs.checkmsgpage.$refs.uncheck.checked='true';
								that.$refs.checkmsgpage.$refs.unsmscontent.value=templates[2].sms_content;
								break;
							case 4:
								that.$refs.checkmsgpage.$refs.returncheck.checked='true';
								that.$refs.checkmsgpage.$refs.returnsmscontent.value=templates[3].sms_content;
								break;
							
						}						
					}
				})
			},

			//每页显示条数改变时出发的函数			
			changeSize(val){
				this.pageSize=val;
				this.getInformation();
			},			
			//当前页改变时出发的函数
			changeCurrent(val){
				this.nowPage=val;
				this.getInformation();
			},
			//设置按钮执行的函数
			setsmsinformation(scope) {
				this.$refs.configaccount._data.hideShow=true;
				this.getaccountmsg(scope);
				
			},
			//获取短信账户信息
			getaccountmsg(scope) {
				var that=this;
				var sendHeader=JSON.parse(localStorage.getItem("header"));
				var sendToken=localStorage.getItem("token");
				this.$axios({
					url: state.url.baseurl + state.url.getAccountMsg,
					headers:sendHeader,
					method: "post",
					data:{
						"access_token":sendToken,
						"spi_epcode":scope.row.spi_epcode,							
					}
				}).then(function(retJson) {
					if(retJson.data.status > 0){
						if(result.data.status == '2001'){
							window.location.hash="/";	
							return;
						}
						that.$message(result.data.info);					
					}
					//自主申请
					if(retJson.data.data.type == '1'){
						that.$refs.configaccount._data.radio = "1";
						that.$refs.configaccount._data.sm=retJson.data.data.sn;
						that.$refs.configaccount._data.specilcode=retJson.data.data.specificCode;
						that.$refs.configaccount._data.pass=retJson.data.data.password;
						that.$refs.configaccount._data.companycode=retJson.data.data.companyCode;
						that.$refs.configaccount._data.ext=retJson.data.data.ext;
						that.$refs.configaccount._data.ext=retJson.data.data.ext;
						that.$refs.configaccount._data.epcode=scope.row.spi_epcode;
		
						
					//平台预设
					}else if(retJson.data.data.type == '0'){
						that.$refs.configaccount._data.radio = "2";
						that.$refs.configaccount._data.sm='';
						that.$refs.configaccount._data.specilcode='';
						that.$refs.configaccount._data.pass='';
						that.$refs.configaccount._data.companycode='';
						that.$refs.configaccount._data.ext='';
						that.$refs.configaccount._data.ext='';
						that.$refs.configaccount._data.epcode=scope.row.spi_epcode;
					}else{
						that.$refs.configaccount._data.radio = "1";
						that.$refs.configaccount._data.sm='';
						that.$refs.configaccount._data.specilcode='';
						that.$refs.configaccount._data.pass='';
						that.$refs.configaccount._data.companycode='';
						that.$refs.configaccount._data.ext='';
						that.$refs.configaccount._data.ext='';
						that.$refs.configaccount._data.epcode=scope.row.spi_epcode;
					}
				})
			},
			searchlist(){
				this.getInformation();
			}
		},
		mounted(){
			this.getInformation();
		},
		components: {
			checkMsgPage,
			configAccount
		}
	}
</script>

<style>
	.content {
		margin:15px;
	}
	.listpage_box{
				position: relative;
	}
</style>

