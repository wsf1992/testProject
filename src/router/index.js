import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Showpage from '@/components/showpage'
import Listpage from '@/components/sms/listPage'
import Register from '@/components/login/register'
import Indexpage from '@/components/common/indexpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
    	path:'/indexpage',
    	component:Indexpage,
    	children:[
    		{
    			path:"/",
    			name:"Showpage",
    			component:Showpage
    		},{
    			path:"/indexpage/listpage",
    			name:"Listpage",
    			component:Listpage
    		}]
  },{
			path:'/register',
		  name:"Register",
		  component:Register
		}]
})
