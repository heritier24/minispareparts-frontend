<template>
  <main class="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
    <nav class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
      <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
            <li class="text-sm leading-normal">
              <a class="text-slate-700 opacity-50 dark:text-white/70" href="#">Pages</a>
            </li>
            <li class="text-sm pl-2 capitalize leading-normal text-slate-700 dark:text-white before:float-left before:pr-2 before:content-['/']" aria-current="page">Service Queue</li>
          </ol>
          <h6 class="mb-0 font-bold text-xl dark:text-white">Service Queue</h6>
        </nav>
      </div>
    </nav>
    <div class="w-full p-6 mx-auto">
      <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3">
          <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
              <div class="lg:flex justify-between">
                <div>
                  <h5 class="mb-0 dark:text-white">New Services</h5>
                  <p class="mb-0 text-sm leading-normal">Accept or request parts for new services</p>
                </div>
              </div>
              <div class="mt-4 flex flex-wrap gap-4">
                <input v-model="searchQuery" placeholder="Search services..." class="text-sm border border-gray-300 rounded-lg p-2 focus:border-blue-500 dark:bg-slate-850 dark:text-white" @input="fetchServices" />
              </div>
            </div>
            <div class="flex-auto p-6 px-0 pb-0">
              <div class="overflow-x-auto">
                <table class="w-full mb-4">
                  <thead class="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">Vehicle</th>
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">License Plate</th>
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">Created At</th>
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="service in filteredServices" :key="service.id" class="border-t dark:border-slate-700">
                      <td class="px-6 py-4 text-sm dark:text-white/80">{{ service.vehicle.make }} {{ service.vehicle.model }} ({{ service.vehicle.year }})</td>
                      <td class="px-6 py-4 text-sm dark:text-white/80">{{ service.vehicle.licensePlate }}</td>
                      <td class="px-6 py-4 text-sm dark:text-white/80">{{ new Date(service.createdAt).toLocaleDateString() }}</td>
                      <td class="px-6 py-4 text-sm">
                        <button @click="acceptService(service.id)" class="mr-2 text-blue-500 hover:underline">
                          <i class="fas fa-check-circle"></i> Accept
                        </button>
                        <button @click="requestParts(service.id)" class="text-orange-500 hover:underline">
                          <i class="fas fa-box"></i> Request Parts
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex justify-between items-center mt-4 px-6">
                <button :disabled="currentPage === 1" @click="currentPage--" class="px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded-lg disabled:opacity-50">
                  Previous
                </button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button :disabled="currentPage === totalPages" @click="currentPage++" class="px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded-lg disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="pt-4 mx-6">
        <div class="w-full px-6 mx-auto">
          <div class="flex flex-wrap items-center -mx-3 lg:justify-between">
            <div class="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
              <div class="text-sm leading-normal text-center text-slate-500 lg:text-left dark:text-white/70">
                © {{ new Date().getFullYear() }}, made with <i class="fa fa-heart"></i> by
                <a href="https://www.tambagroup.xyz" class="font-semibold dark:text-white" target="_blank">Tamba Group</a>
                for Auto Repair Shop.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { localStorageService } from '@/services/localStorageService'

interface Vehicle {
  make: string
  model: string
  year: number
  licensePlate: string
}

interface Service {
  id: string
  vehicle: Vehicle
  status: 'new-service' | 'in-service' | 'completed'
  createdAt: string
}

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const services = ref<Service[]>([])

const filteredServices = computed(() => {
  let result = services.value.filter(s => s.status === 'new-service')
  if (searchQuery.value) {
    result = result.filter(s =>
      s.vehicle.make.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.vehicle.model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.vehicle.licensePlate.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return result.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
})

const totalPages = computed(() => Math.ceil(services.value.filter(s => s.status === 'new-service').length / itemsPerPage))

const fetchServices = (): void => {
  services.value = localStorageService.getServices().filter(s => s.status === 'new-service')
}

watch([searchQuery, currentPage], fetchServices, { immediate: true })

const acceptService = (id: string): void => {
  const service = services.value.find(s => s.id === id)
  if (service) {
    service.status = 'in-service'
    service.assignedMechanic = localStorageService.getCurrentUser()?.name || 'Mechanic'
    localStorageService.updateService(service)
    fetchServices()
  }
}

const requestParts = (id: string): void => {
  console.log(`Requested parts for service ${id}`)
}

const handleLogout = (): void => {
  localStorageService.clearAll()
  window.location.href = '/login'
}
</script>
