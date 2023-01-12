const appClass = 'movie-streaming' // should be same as $app in quasar.variables.scss

const appRoutes = [
  {
    path: '/login',
    component: () => import('src/layouts/login/Main.vue'),
    meta: appClass,
    children: [
      {
        path: '', // inherit parent path
        name: 'login',
        component: () => import('src/pages/app/login/Main.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'app-root',
    redirect: { name: 'index' },
    component: () => import('src/layouts/app/Main.vue'),
    meta: appClass,
    children: [
      {
        path: 'index', // inherit parent path
        name: 'index',
        component: () => import('src/pages/app/index/Main.vue')
      }
    ]
  }
]

export default appRoutes
