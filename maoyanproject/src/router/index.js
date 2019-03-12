import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Being from 'pages/being/being'
import Soon from 'pages/soon/soon'
import Movie from 'pages/movie/movie'
import Cinema from 'pages/cinema/cinema'
import Moviemess from 'pages/moviemess/moviemess'
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
        component: Being
      },
      {
      path: 'soon',
      name: 'soon',
      component: Soon
     },
     {
      path: 'moviemess',
      name: 'moviemess',
      component: Moviemess
     }
     ]
     },
     {
        path: '/cinema',
        name: 'cinema',
        component: Cinema
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
