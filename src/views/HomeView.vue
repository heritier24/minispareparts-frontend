<template>
  <body class="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
    <div class="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
    <!-- Sidenav -->
    <aside class="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0" aria-expanded="false">
      <div class="h-19">
        <i class="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden" sidenav-close></i>
        <a class="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700" href="/" target="_blank">
          <img src="/assets/img/logo-auto-repair.png" class="inline h-full max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-8" alt="main_logo" />
          <img src="/assets/img/logo-auto-repair-dark.png" class="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8" alt="main_logo" />
          <span class="ml-1 font-semibold transition-all duration-200 ease-nav-brand">Auto Repair Shop</span>
        </a>
      </div>
      <hr class="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
      <div class="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul class="flex flex-col pl-0 mb-0">
          <li class="mt-0.5 w-full" v-if="isManager">
            <router-link to="/" class="py-2.7 bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors">
              <div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <i class="relative top-0 text-sm leading-normal text-blue-500 ni ni-tv-2"></i>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Dashboard</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" v-if="isReceptionist">
            <router-link to="/vehicle-form" class="dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors">
              <div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <i class="relative top-0 text-sm leading-normal text-orange-500 ni ni-delivery-fast"></i>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Register Vehicle</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" v-if="isReceptionist">
            <router-link to="/services" class="dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors">
              <div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <i class="relative top-0 text-sm leading-normal text-cyan-500 ni ni-bullet-list-67"></i>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Service List</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" v-if="isMechanic">
            <router-link to="/service-queue" class="dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors">
              <div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <i class="relative top-0 text-sm leading-normal text-emerald-500 ni ni-settings"></i>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Service Queue</span>
            </router-link>
          </li>
          <li class="mt-0.5 w-full" v-if="isManager">
            <router-link to="/parts-inventory" class="dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors">
              <div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <i class="relative top-0 text-sm leading-normal text-red-500 ni ni-box-2"></i>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Parts Inventory</span>
            </router-link>
          </li>
          <li class="w-full mt-4">
            <h6 class="pl-6 ml-2 text-xs font-bold leading-tight uppercase dark:text-white opacity-60">Account</h6>
          </li>
          <li class="mt-0.5 w-full">
            <a class="dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="/login" @click="handleLogout">
              <div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <i class="relative top-0 text-sm leading-normal text-orange-500 ni ni-single-copy-04"></i>
              </div>
              <span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
    <router-view name="dashboard"></router-view>
  </body>
</template>

<script setup lang="ts">
import { apiService } from '@/services/apiService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Define User interface for type safety
interface User {
  id: number
  name: string
  email: string
  role: 'manager' | 'receptionist' | 'mechanic'
}

const currentUser = ref<User | null>(apiService.getCurrentUser())
const isManager = ref(currentUser.value?.role === 'manager')
const isReceptionist = ref(currentUser.value?.role === 'receptionist' || currentUser.value?.role === 'manager')
const isMechanic = ref(currentUser.value?.role === 'mechanic')
const isLoading = ref(false)
const router = useRouter()

// Check authentication on mount
if (!currentUser.value) {
  router.push({ name: 'Login' })
}

// Logout function with loading state and error handling
const handleLogout = async (event: Event): Promise<void> => {
  event.preventDefault() // Prevent default <a> navigation
  isLoading.value = true
  try {
    await apiService.logout()
    currentUser.value = null
    isManager.value = false
    isReceptionist.value = false
    isMechanic.value = false
    router.push({ name: 'Login' })
  } catch (error) {
    console.error('Logout failed:', error)
    // Optionally notify user of error (e.g., with toast)
  } finally {
    isLoading.value = false
  }
}
</script>
