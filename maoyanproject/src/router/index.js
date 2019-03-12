import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Being from 'pages/being/being'
import Soon from 'pages/soon/soon'
import Movie from 'pages/movie/movie'
import Cinema from 'pages/cinema/cinema'

import Moviedetail from 'pages/moviedetail/moviedetail'

import CinemaDetail from "pages/cinemadetail/cinemadetail"

import My from 'pages/my/my'
export default new Router({
  routes: [
     {
      path: '/movie',
      name: 'movie',
      component: Movie,
      children:[{
        path: 'being',
        name: 'being',
        component: Being,
        children:[{
          path:'moviedetail',
          name:'moviedetail',
          component:Moviedetail
        }]
      },
      {
      path: 'soon',
      name: 'soon',
      component: Soon
     }]
     },
     {
        path: '/cinema',
        name: 'cinema',
        component: Cinema,
        children:[
          {
            path: 'cinemadetail',
            name: 'cinemadetail',
            component: CinemaDetail
           }
        ]
      },
      {
        path: '/my',
        name: 'my',
        component: My
      },
     {
      path: '/',
      redirect:'/movie/being'
    }
  ]
})
