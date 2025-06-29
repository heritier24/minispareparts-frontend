<template>
  <main class="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
    <nav class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
      <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
            <li class="text-sm leading-normal">
              <a class="text-slate-700 opacity-50 dark:text-white/70" href="javascript:;">
                <i class="ni ni-box-2"></i>
              </a>
            </li>
            <li class="text-sm pl-2 leading-normal text-slate-700 dark:text-white before:float-left before:pr-2 before:content-['/']">
              <a class="opacity-50" href="javascript:;">Pages</a>
            </li>
            <li class="text-sm pl-2 capitalize leading-normal text-slate-700 dark:text-white before:float-left before:pr-2 before:content-['/']" aria-current="page">Overview</li>
          </ol>
          <h6 class="mb-0 font-bold text-xl dark:text-white">Service Status Overview</h6>
        </nav>
        <div class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <div class="flex items-center md:ml-auto md:pr-4">
            <div class="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
              <span class="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                <i class="fas fa-search" aria-hidden="true"></i>
              </span>
              <input v-model="searchQuery" type="text" class="pl-9 text-sm focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow" placeholder="Search parts..." @input="handleSearch" />
            </div>
          </div>
          <ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
            <li class="flex items-center">
              <a href="/login" class="block px-0 py-2 text-sm font-semibold text-slate-700 dark:text-white transition-all ease-nav-brand" @click="handleLogout">
                <i class="fa fa-user sm:mr-1" aria-hidden="true"></i>
                <span class="hidden sm:inline">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="w-full p-6 mx-auto">
      <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
          <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-4">
              <div class="flex flex-row -mx-3">
                <div class="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">New Services</p>
                    <h5 class="mb-2 font-bold dark:text-white">{{ metrics.newServices }}</h5>
                    <p class="mb-0 dark:text-white dark:opacity-60">
                      <span class="text-sm font-bold leading-normal text-emerald-500">Awaiting Mechanic</span>
                    </p>
                  </div>
                </div>
                <div class="px-3 text-right basis-1/3">
                  <div class="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                    <i class="ni leading-none ni-delivery-fast text-lg relative top-3.5 text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
          <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-4">
              <div class="flex flex-row -mx-3">
                <div class="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">In Service</p>
                    <h5 class="mb-2 font-bold dark:text-white">{{ metrics.inService }}</h5>
                    <p class="mb-0 dark:text-white dark:opacity-60">
                      <span class="text-sm font-bold leading-normal text-emerald-500">Under Repair</span>
                    </p>
                  </div>
                </div>
                <div class="px-3 text-right basis-1/3">
                  <div class="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-emerald-500 to-teal-400">
                    <i class="ni leading-none ni-settings text-lg relative top-3.5 text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
          <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-4">
              <div class="flex flex-row -mx-3">
                <div class="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Completed Services</p>
                    <h5 class="mb-2 font-bold dark:text-white">{{ metrics.completedServices }}</h5>
                    <p class="mb-0 dark:text-white dark:opacity-60">
                      <span class="text-sm font-bold leading-normal text-blue-500">Finished</span>
                    </p>
                  </div>
                </div>
                <div class="px-3 text-right basis-1/3">
                  <div class="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-orange-500 to-yellow-500">
                    <i class="ni leading-none ni-check-bold text-lg relative top-3.5 text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap mt-6 -mx-3">
        <div class="w-full max-w-full px-3 flex-0">
          <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
              <h6 class="dark:text-white">Low Stock Parts</h6>
            </div>
            <div class="flex-auto p-0 pb-2">
              <div class="p-0 overflow-x-auto">
                <table class="items-center justify-center w-full mb-0 align-top border-collapse border-gray-200 dark:border-white/40 dark:text-white text-slate-500">
                  <thead class="align-bottom">
                    <tr>
                      <th class="px-6 py-3 font-bold uppercase align-middle border-b border-gray-200 border-solid text-xxs text-slate-400 opacity-70 whitespace-nowrap tracking-none">Part Name</th>
                      <th class="px-6 py-3 font-bold uppercase align-middle border-b border-gray-200 border-solid text-xxs text-slate-400 opacity-70 whitespace-nowrap tracking-none">Quantity</th>
                      <th class="px-6 py-3 font-bold uppercase align-middle border-b border-gray-200 border-solid text-xxs text-slate-400 opacity-70 whitespace-nowrap tracking-none">Status</th>
                    </tr>
                  </thead>
                  <tbody class="align-top">
                    <tr v-for="part in filteredLowStockParts" :key="part.id">
                      <td class="p-2 align-middle border-b border-solid dark:border-white/40 whitespace-nowrap border-inherit">
                        <div class="flex px-4 py-1">
                          <div class="flex flex-col justify-center">
                            <h6 class="mb-0 text-sm leading-normal dark:text-white">{{ part.name }}</h6>
                            <p class="mb-0 text-sm font-semibold leading-normal text-slate-400">Threshold: {{ part.lowStockThreshold }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="p-2 text-center align-middle border-b border-solid dark:border-white/40 whitespace-nowrap border-inherit">
                        <p class="mb-0 text-sm font-semibold leading-normal dark:text-white">{{ part.quantity }}</p>
                      </td>
                      <td class="p-2 text-center align-middle border-b border-solid dark:border-white/40 whitespace-nowrap border-inherit">
                        <span :class="['py-1 px-2 text-xs rounded inline-block font-bold uppercase', part.quantity <= part.lowStockThreshold ? 'text-red-700 bg-red-200' : 'text-orange-600 bg-orange-200']">
                          {{ part.quantity <= part.lowStockThreshold ? 'Low Stock' : 'In Stock' }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="filteredLowStockParts.length === 0">
                      <td colspan="3" class="p-4 text-center text-sm dark:text-white/80">No low stock parts found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="pt-4 mx-6">
        <div class="w-full px-6 mx-auto">
          <div class="flex flex-wrap items-center -mx-3 lg:justify-between">
            <div class="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
              <!-- <div class="text-sm leading-normal text-center text-slate-500 lg:text-left dark:text-white/70">
                © {{ new Date().getFullYear() }}, made with <i class="fa fa-heart"></i> by
                <a href="https://www.tambagroup.xyz" class="font-semibold dark:text-white" target="_blank">Tamba Group</a>
                for Auto Repair Shop.
              </div> -->
            </div>
          </div>
        </div>
      </footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { localStorageService } from '@/services/localStorageService'

interface Service {
  id: string
  status: 'new-service' | 'in-service' | 'completed'
}

interface Part {
  id: string
  name: string
  quantity: number
  lowStockThreshold: number
}

const searchQuery = ref('')
const services = ref<Service[]>([])
const parts = ref<Part[]>([])
const isManager = ref(localStorageService.getCurrentUser()?.role === 'manager')

const metrics = computed(() => ({
  newServices: services.value.filter(s => s.status === 'new-service').length,
  inService: services.value.filter(s => s.status === 'in-service').length,
  completedServices: services.value.filter(s => s.status === 'completed').length
}))

const filteredLowStockParts = computed(() => {
  const lowStock = parts.value.filter(p => p.quantity <= p.lowStockThreshold)
  if (!searchQuery.value) return lowStock
  return lowStock.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

onMounted(() => {
  services.value = localStorageService.getServices()
  parts.value = localStorageService.getParts()
})

const handleSearch = (): void => {
  // Filter applied via filteredLowStockParts
}

const handleLogout = (): void => {
  localStorageService.clearAll()
  window.location.href = '/login'
}
</script>
