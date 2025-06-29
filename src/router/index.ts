import { createRouter, createWebHistory } from 'vue-router'
import { apiService } from '@/services/apiService'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import VehicleForm from '@/views/VehicleForm.vue'
import ServiceList from '@/views/ServiceList.vue'
import ServiceQueue from '@/views/ServiceQueue.vue'
import StatusBoard from '@/views/StatusBoard.vue'
import PartsInventory from '@/views/PartsInventory.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          components: {
            dashboard: StatusBoard
          },
          meta: { requiresManager: true }
        },
        {
          path: 'vehicle-form',
          name: 'VehicleForm',
          components: {
            dashboard: VehicleForm
          },
          meta: { requiresReceptionist: true }
        },
        {
          path: 'services',
          name: 'ServiceList',
          components: {
            dashboard: ServiceList
          },
          meta: { requiresReceptionist: true }
        },
        {
          path: 'service-queue',
          name: 'ServiceQueue',
          components: {
            dashboard: ServiceQueue
          },
          meta: { requiresMechanic: true }
        },
        {
          path: 'parts-inventory',
          name: 'PartsInventory',
          components: {
            dashboard: PartsInventory
          },
          meta: { requiresManager: true }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'Home' }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const currentUser = apiService.getCurrentUser()

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
