const state = {
  	url:{
			baseurl:'',//服务器IP和端口
//			baseurl:'/rootApi',//服务器IP和端口
			login:"/auth/local/login",//管理员登陆接口
			getcode:"/auth/third/getVerify",//获取验证码接口
			gettemplateschecks:"/sms/templates/get",//获取模板接口
			gettemplatesread:"/sms/templates/read",//获取待审核企业列表
			updateAccount:"/auth/api/updateAccount",//修改用户信息
			register:'/auth/third/register',//用户注册
			getSmsSteList:'/sys/ep/list',//短信账号设置企业列表
			getAccountMsg:'/sms/account/get',//获取短信账户信息
			setAccountMsg:'/sms/account/set',//设置短信账户信息
			audiuTemplateState:'/sms/templates/audit',//审核模板状态
		},
		hide:{
			isCollapse:false,
//			goString:false,
		},
}

export default state
