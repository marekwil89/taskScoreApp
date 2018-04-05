import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import TaskList from '@/components/TaskList'
import TaskDetail from '@/components/TaskDetail'
import Total from '@/components/Total'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm
    },
    {
      path: '/register',
      name: 'RegisterForm',
      component: RegisterForm
    },
    {
      path: '/task-list',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/task/:id',
      name: 'TaskDetail',
      component: TaskDetail
      // beforeEnter: AuthGuard 
    },
    {
      path: '/total',
      name: 'Total',
      component: Total
    }
  ]
})
