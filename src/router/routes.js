export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../pages/Home.vue')
  },
  {
    path: '/profile/:login',
    name: 'Profile',
    component: () =>
      import(/* webpackChunkName: "Profile" */ '../pages/Profile.vue')
  }
]
