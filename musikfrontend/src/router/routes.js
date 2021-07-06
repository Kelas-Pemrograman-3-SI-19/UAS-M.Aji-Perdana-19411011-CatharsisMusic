
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('pages/admin/index.vue') },
      { path: 'inputmusik', name: 'inputMusik', component: () => import('pages/admin/inputMusik.vue') },
      { path: 'datauser', name: 'dataUser', component: () => import('pages/admin/DataUser.vue') },
      { path: 'datamusik', name: 'dataMusik', component: () => import('pages/admin/DataMusik.vue') },
      { path: 'editmusik/:id', name: 'editMusik', component: () => import('pages/admin/FormEdit.vue') },
      { path: 'edituser/:id', name: 'editUser', component: () => import('pages/admin/FormEditUser.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/LayoutUser.vue'),
    meta: {
      authUser: true
    },
    children: [
      { path: '', name: 'homeUser', component: () => import('pages/user/index.vue') },
      { path: '/myorder', name: 'myOrder', component: () => import('pages/user/MyOrder.vue') },
      { path: '/profile', name: 'Profile', component: () => import('pages/user/profile.vue') },
      { path: 'edituser/:id', name: 'editUseR', component: () => import('pages/user/editUser.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/guest/login.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/guest/register.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
