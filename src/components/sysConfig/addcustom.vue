<template>
		<div class="addcustom_box">
			<div class="content">
				<!--标题和面包屑-->
				<el-row style="line-height:50px;border-bottom:1px solid #000000;" type="flex" justify="space-between">
					<el-col :span="4">
						<h2>用户信息添加</h2>
					</el-col>
					<el-col :span="4" style="padding-top:25px;">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>首页</el-breadcrumb-item>
							<el-breadcrumb-item>用户管理</el-breadcrumb-item>
							<el-breadcrumb-item>添加用户</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
				</el-row>
				<!--用户信息的from-->
				<div class="from" style="padding:30px 0;">
					<el-row>
						<el-col :span="24" :offset="0">
							<el-form label-width="100px">
								<el-form-item label="用户名">
									<el-input style="width:300px;"></el-input>
								</el-form-item>
								<el-form-item label="密码">
									<el-input style="width:300px;"></el-input>
								</el-form-item>
								<el-form-item label="确认密码">
									<el-input style="width:300px;"></el-input>
								</el-form-item>
								<el-form-item style="float:right">
									<el-button type="primary">提交</el-button>
									<el-button>取消</el-button>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
				</div>
			</div>

		</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style>
	
</style>