const appClass = 'movie-streaming' // should be same as $app in quasar.variables.scss

const appMeta = {
  loginRequired: {
    appClass: appClass,
    auth: {
      loginRequired: true,
      redirect: { name: 'login' }
    }
  },
  loginNotRequired: {
    appClass: appClass,
    auth: {
      loginRequired: false,
      redirect: null
    }
  },
  loggedOutOnly: {
    appClass: appClass,
    auth: {
      loginRequired: false,
      loggedOutOnly: true,
      redirect: { name: 'index' }
    }
  }
}

const appRoutes = [
  {
    path: '/',
    component: () => import('src/layouts/app/login/Main.vue'),
    redirect: { name: 'login' },
    meta: appMeta.loggedOutOnly,
    children: [
      {
        path: '', // inherit parent path
        name: 'login',
        component: () => import('src/pages/app/login/Main.vue')
      }
    ]
  },
  {
    path: '/index',
    name: 'app-root',
    redirect: { name: 'index' },
    component: () => import('src/layouts/app/main/Main.vue'),
    meta: appMeta.loginRequired,
    children: [
      {
        path: '', // inherit parent path
        name: 'index',
        component: () => import('src/pages/app/index/Main.vue')
      },
      {
        path: 'popular',
        name: 'popular',
        component: () => import('src/pages/app/popular/Main.vue')
      },
      {
        path: 'top-250-movies',
        name: 'top-250-movies',
        component: () => import('src/pages/app/top250Movies/Main.vue')
      },
      {
        path: 'top-250-tvs',
        name: 'top-250-tvs',
        component: () => import('src/pages/app/top250TVs/Main.vue')
      },
      {
        path: 'discover',
        name: 'discover',
        component: () => import('src/pages/app/discover/Main.vue')
      },
      {
        path: ':id',
        name: 'detail',
        component: () => import('src/pages/app/detail/Main.vue')
      }
    ]
  }
]

export default appRoutes
