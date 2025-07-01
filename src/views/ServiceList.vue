<template>
  <main class="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
    <nav class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
      <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
            <li class="text-sm leading-normal">
              <a class="text-slate-700 opacity-50 dark:text-white/70" href="#">Pages</a>
            </li>
            <li class="text-sm pl-2 capitalize leading-normal text-slate-700 dark:text-white before:float-left before:pr-2 before:content-['/']" aria-current="page">Service List</li>
          </ol>
          <h6 class="mb-0 font-bold text-xl dark:text-white">Service List</h6>
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
                  <h5 class="mb-0 dark:text-white">All Services</h5>
                  <p class="mb-0 text-sm leading-normal">View all registered vehicle services</p>
                </div>
                <div class="my-auto mt-6 lg:mt-0 flex gap-2">
                  <router-link to="/vehicle-form" class="inline-block px-8 py-2 text-xs font-bold text-white bg-gradient-to-tl from-blue-500 to-violet-500 rounded-lg hover:-translate-y-px active:opacity-85">
                    + New Service
                  </router-link>
                </div>
              </div>
              <div class="mt-4 flex flex-wrap gap-4">
                <select v-model="filters.status" @change="fetchServices" class="text-sm border border-gray-300 rounded-lg p-2 focus:border-blue-500 dark:bg-slate-850 dark:text-white">
                  <option value="">All Statuses</option>
                  <option value="new-service">New Service</option>
                  <option value="in-service">In Service</option>
                  <option value="completed">Completed</option>
                </select>
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
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">Status</th>
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">Assigned Mechanic</th>
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="service in filteredServices" :key="service.id" class="border-t dark:border-slate-700">
                      <td class="px-6 py-4 text-sm dark:text-white/80">{{ service.vehicle.make }} {{ service.vehicle.model }} ({{ service.vehicle.year }})</td>
                      <td class="px-6 py-4 text-sm dark:text-white/80">{{ service.vehicle.licensePlate }}</td>
                      <td class="px-6 py-4">
                        <span :class="['py-1 px-2 text-xs rounded inline-block font-bold uppercase', service.status === 'new-service' ? 'text-blue-600 bg-blue-200' : service.status === 'in-service' ? 'text-orange-600 bg-orange-200' : 'text-emerald-600 bg-emerald-200']">
                          {{ service.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-sm dark:text-white/80">{{ service.assignedMechanic || 'Unassigned' }}</td>
                      <td class="px-6 py-4 text-sm dark:text-white/80">{{ new Date(service.createdAt).toLocaleDateString() }}</td>
                    </tr>
                    <tr v-if="!filteredServices.length && !isLoading">
                      <td colspan="5" class="px-6 py-4 text-sm text-center dark:text-white/80">No services found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex justify-between items-center mt-4 px-6">
                <button :disabled="currentPage === 1 || isLoading" @click="currentPage--" class="px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded-lg disabled:opacity-50">
                  Previous
                </button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button :disabled="currentPage === totalPages || isLoading" @click="currentPage++" class="px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded-lg disabled:opacity-50">
                  Next
                </button>
              </div>
              <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
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
import { ref, computed, watch } from 'vue'
import { apiService } from '@/services/apiService'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  licensePlate: string
}

interface Service {
  id: number
  vehicleId: number
  status: 'new-service' | 'in-service' | 'completed'
  assignedMechanic: string | null
  createdAt: string
  vehicle: Vehicle
}

const searchQuery = ref('')
const filters = ref({ status: '' })
const currentPage = ref(1)
const itemsPerPage = 10
const services = ref<Service[]>([])
const isLoading = ref(false)
const error = ref<string>('')

const filteredServices = computed(() => {
  let result = services.value
  if (filters.value.status) {
    result = result.filter(s => s.status === filters.value.status)
  }
  if (searchQuery.value) {
    result = result.filter(s =>
      s.vehicle.make.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.vehicle.model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.vehicle.licensePlate.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return result.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
})

const totalPages = computed(() => Math.ceil(services.value.length / itemsPerPage))

const fetchServices = async (): Promise<void> => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await apiService.getServices()
    services.value = response
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Failed to fetch services'
    console.error('Fetch services error:', err)
  } finally {
    isLoading.value = false
  }
}

watch([currentPage, filters], fetchServices, { immediate: true })
</script>
