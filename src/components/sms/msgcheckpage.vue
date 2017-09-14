<template>
	<div class="msgcheck">
		<div class="msgcheck_box">
			<input type="text" ref="spi_epcode" style="display:none"/>
			<input type="text" ref="sms_batch_number" style="display:none"/>
			<h2>免打扰短信内容:</h2>
			<textarea name="" rows="4" cols="" ref="nosmscontent" disabled="true"></textarea>
			<p class="tdkeywords">退订关键字：<input type="text" placeholder="请输入设置免打扰的关键字" ref="nosmskyeword"  disabled="true"/></p>
			<p>关键字匹配原则：
				<input type="checkbox" ref="nomach1"  disabled="true"/><span>全字匹配</span>
				<input type="checkbox" ref="nomach2"  disabled="true"/><span>包含</span>
			</p>
			<div class="h3">
				<p><input type="checkbox" ref="successcheck" disabled="true"/><span>免打扰成功回复信息</span></p>
				<textarea name="" rows="4" cols="" ref="successsmscontent" disabled="true"></textarea>
			</div>
			<div class="h4">
				<p><input type="checkbox" ref="uncheck" disabled="true"/><span>非法输入回复短信</span></p>
				<textarea name="" rows="4" cols="" ref="unsmscontent" disabled="true"></textarea>
			</div>
			<div class="h5">
				<p class="hfkeyword"><input type="checkbox" ref="retsucccheck" disabled="true"/><span>恢复关键字：</span><input type="text" ref="retsucckeyword" disabled="true"/></p>
				<p>关键字匹配原则：
					<input type="checkbox"  ref="retsucc1"  disabled="true"/><span>全字匹配</span>
					<input type="checkbox"  ref="retsucc2"  disabled="true"/><span>包含</span>
				</p>
			</div>
			<div class="h6">
				<p><input type="checkbox" ref="returncheck" disabled="true"/><span>恢复成功短信</span></p>
				<textarea name="" rows="4" cols="" ref="returnsmscontent" disabled="true"></textarea>
			</div>
			<div class="btns">
				<button @click="gocheck" v-if="this.sms_status == 1">初审通过</button>
				<button @click="gocheck" v-if="this.sms_status == 2">终审通过</button>
				<button @click="gocheck" v-if="this.sms_status == 3">初审通过</button>
				<button @click="gocheck" v-if="this.sms_status == 5">终审通过</button>
				<button @click="backcheck" v-if="this.sms_status == 1">初审驳回</button>
				<button @click="backcheck" v-if="this.sms_status == 2">终审驳回</button>
				<button @click="backcheck" v-if="this.sms_status == 3">初审驳回</button>
				<button @click="backcheck" v-if="this.sms_status == 5">终审驳回</button>
			</div>
			<div style="clear:both"></div>
		</div>
		<div class="tips">
			<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
				<span>确认通过审核？</span>
				<span slot="footer" class="dialog-footer">
    				<el-button @click="firstcheckok">是</el-button>
    				<el-button type="primary" @click="firstcheckno">否</el-button>
  				</span>
			</el-dialog>
		</div>
		<div class="tips">
			<el-dialog title="提示" :visible.sync="dialogVisibles" size="tiny" :before-close="handleClose">
				<span>确认驳回？</span>
				<span slot="footer" class="dialog-footer">
    				<el-button @click="backfirstcheckoks">是</el-button>
    				<el-button type="primary" @click="backfirstchecknos">否</el-button>
  				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
//	import axios from "axios"
	import state from "../../vuex/state"
	export default {
		data() {
			return {
				//dialogVisible初审通过的弹框隐藏
				dialogVisible: false,
				//dialogVisibles初审驳回的弹框隐藏			
				dialogVisibles: false,
				sms_status:"",//存放模板状态
			}
		},
		methods: {		
			//弹框的关闭函数，elemnt自带
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//初审通过执行的函数
			gocheck() {
				var that = this;
				that.dialogVisible = true;
			},
			//初审驳回执行的函数
			backcheck() {
				var that = this;
				that.dialogVisibles = true;
			},
			//初审/终审通过弹框ok，执行的函数
			firstcheckok() {
				var that = this;
				that.dialogVisible = false;
				document.getElementsByClassName("msgcheck")[0].style.display="none";
				var sendHeader=JSON.parse(localStorage.getItem("header"));
				var sendToken=localStorage.getItem("token");
				var sendStatus=2;
				if(that.sms_status == "2" || that.sms_status == "5" || that.sms_status == "5"){
					sendStatus = '4'
				}else{
					sendStatus = '2'					
				};
				this.$axios({
					url:state.url.baseurl+state.url.audiuTemplateState,
					headers:sendHeader,
					params:{
						"access_token":sendToken,
						'spi_epcode':that.$refs.spi_epcode.value,
						"sms_batch_number":that.$refs.sms_batch_number.value,
						'sms_status':sendStatus
					}
				}).then(function(result){
					if(result.data.status > 0){
						if(result.data.status == '2001'){
							window.location.hash="/";	
							return;
						}
						that.$message(result.data.info);
					}
						that.$emit('childMethod')
				})
			},
			//初审通过弹框no，执行的函数			
			firstcheckno() {
				var that = this;
				that.dialogVisible = false;
				document.getElementsByClassName("msgcheck")[0].style.display="none";
				
			},
			//初审驳回弹框ok，执行的函数						
			backfirstcheckoks() {
				var that = this;
				that.dialogVisibles = false;
				document.getElementsByClassName("msgcheck")[0].style.display="none";
				var sendHeader=JSON.parse(localStorage.getItem("header"));
				var sendToken=localStorage.getItem("token");
				var sendStatus=3;
				if(that.sms_status == "2" || that.sms_status == "4" || that.sms_status == "5"){
					sendStatus = '5'
				}else{
					sendStatus = '3'					
				};
				this.$axios({
					url:state.url.baseurl+state.url.audiuTemplateState,
					headers:sendHeader,
					params:{
						"access_token":sendToken,
						'spi_epcode':that.$refs.spi_epcode.value,
						"sms_batch_number":that.$refs.sms_batch_number.value,
						'sms_status':sendStatus,
					}
				}).then(function(result){
					if(result.data.status > 0){
						if(result.data.status == '2001'){
							window.location.hash="/";	
							return;
						}
						that.$message(result.data.info);						
					}
					that.$emit('childMethod')					
				})
				
			},
			//初审驳回弹框no，执行的函数						
			backfirstchecknos() {
				var that = this;
				that.dialogVisibles = false;
				document.getElementsByClassName("msgcheck")[0].style.display="none";
				
			},
		},
		mounted() {
		},
		components: {

		}
	}
</script>

<style>
	.msgcheck{
		position:fixed;
		width: 100%;
		height:100%;
		top:0;
		left:0;
		background:rgba(255,255,255,1);
		z-index:99999999;
	}
	.msgcheck_box {
		border: 1px solid #2C3E50;
		border-radius:10px;
		box-shadow: 7px 7px 5px #2C3E50;
		/*padding: 5px 20px 0;*/
		padding: 30px 30px 15px;
		width: 800px;
		margin: 50px auto 0;
		font-size: 15px;
	}
	
	.msgcheck_box>h2 {
		font-size: 15px;
		margin:20px 0;
	}
	
	.msgcheck_box p {
		line-height: 25px;
		margin:15px 0;
	}
	
	.msgcheck_box input {
		vertical-align: middle;
	}
	.msgcheck_box input[type=text] {
		padding-left:15px;
	}
	
	.msgcheck_box p.tdkeywords input,
	.msgcheck_box .h5 .hfkeyword input:nth-of-type(2) {
		width: 180px;
		height: 26px;
	}
	
	.msgcheck_box p .checktwo {
		margin-left: 55px;
	}
	
	.msgcheck_box textarea {
		width: 100%;
		padding-left:15px;
		font-size:15px;
		padding-top:5px;
	}
	
	.msgcheck_box .btns {
		float: right;
		padding: 35px 0;
	}
	
	.msgcheck_box .btns button {
		width: 100px;
		height: 25px;
		border: 1px solid #2C3E50;
		border-radius: 5px;
		outline: none;
		margin-left: 10px;
	}
	
	#checkresult {
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -180px;
		margin-top: -90px;
	}
</style>