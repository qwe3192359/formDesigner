import Vue from 'vue'
import Router from 'vue-router'

import MakingForm from '../pages/MakingForm.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: MakingForm
    }
  ]
})