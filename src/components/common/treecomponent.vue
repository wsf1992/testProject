<template>
	<div class="treenav">	
		<el-menu default-active="2" class="el-menu-vertical-demo" :collapse="$store.state.hide.isCollapse" router>
			<el-menu-item index="">
				<i style="font-style: normal;">spi</i>
				<span slot="title">SPI支撑系统</span>
			</el-menu-item>
			<el-menu-item index="/indexpage">
				<i class=""></i>
				<span slot="title">回到首页</span>				
			</el-menu-item>					
				<el-submenu :index="item.id"  v-for="item in json" :key="item.id">
					<template slot="title">
						<i class="el-icon-message"></i>
						<span slot="title">{{item.title}}</span>
					</template>
					<el-menu-item-group v-for="itemChild in item.list" :key="itemChild.id">					
						<el-menu-item :index="itemChild.target">
							<i class="el-icon-star-off"></i>
							<span slot="title">{{itemChild.subTitle}}</span>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>									
		</el-menu>
	</div>
</template>
<script>
	import Vue from "vue"
	import store from "../../vuex/store"
	import elementui from "element-ui"
	Vue.use(elementui)
	export default {
		store,
		data() {
			return {
				json:[{"id":"1","title":"短信","list":[{"id":"1.1","subTitle":"短信模板审核","target":"/indexpage/listpage"}]}]
				//左侧菜单树动态加载需要参数及格式
//				json:[{"id":"1","title":"用户管理","list":[{"id":"1.1","subTitle":"增加用户","target":"/indexpage/addcustom"},{"id":"1.2","subTitle":"注册","target":"/register"}]},
//				{"id":"2","title":"短信","list":[{"id":"2.2","subTitle":"短信模板审核","target":"/indexpage/listpage"},
//												{"id":"2.4","subTitle":"短信账号设置","target":"/indexpage/smslistpage"}]}]
			}
		},
		methods: {
		},
		mounted(){
			document.getElementsByClassName("treenav")[0].style.height=document.body.scrollHeight +'px';
		}
	}
</script>
<style>
	.treenav {width: 100%;height:100%;}
	.treenav>.el-menu>.el-menu-item:nth-of-type(1){background-color:rgb(50,126,171);height:60px;}
	.treenav .el-menu .el-menu-item:nth-of-type(2){width:210px;}
</style>