import { createRouter, createWebHistory } from 'vue-router'
import { localStorageService } from '../services/localStorageService'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          components: {
            dashboard: () => import('@/views/StatusBoard.vue')
          },
          meta: { requiresManager: true }
        },
        {
          path: 'vehicle-form',
          name: 'VehicleForm',
          components: {
            dashboard: () => import('@/views/VehicleForm.vue')
          },
          meta: { requiresReceptionist: true }
        },
        {
          path: 'services',
          name: 'ServiceList',
          components: {
            dashboard: () => import('@/views/ServiceList.vue')
          },
          meta: { requiresReceptionist: true }
        },
        {
          path: 'service-queue',
          name: 'ServiceQueue',
          components: {
            dashboard: () => import('@/views/ServiceQueue.vue')
          },
          meta: { requiresMechanic: true }
        },
        {
          path: 'parts-inventory',
          name: 'PartsInventory',
          components: {
            dashboard: () => import('@/views/PartsInventory.vue')
          },
          meta: { requiresManager: true }
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const currentUser = localStorageService.getCurrentUser()

//   if (to.meta.requiresAuth && !currentUser) {
//     next({ name: 'Login' })
//   } else if (to.meta.requiresManager && currentUser?.role !== 'manager') {
//     next({ name: 'Dashboard' })
//   } else if (to.meta.requiresReceptionist && currentUser?.role !== 'receptionist') {
//     next({ name: 'Dashboard' })
//   } else if (to.meta.requiresMechanic && currentUser?.role !== 'mechanic') {
//     next({ name: 'Dashboard' })
//   } else if (to.name === 'Login' && currentUser) {
//     next({ name: 'Dashboard' })
//   } else {
//     next()
//   }
// })

export default router
