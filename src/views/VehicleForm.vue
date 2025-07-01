<template>
  <main class="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
    <nav class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
      <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
            <li class="text-sm leading-normal">
              <a class="text-slate-700 opacity-50 dark:text-white/70" href="#">Pages</a>
            </li>
            <li class="text-sm pl-2 capitalize leading-normal text-slate-700 dark:text-white before:float-left before:pr-2 before:content-['/']" aria-current="page">Register Vehicle</li>
          </ol>
          <h6 class="mb-0 font-bold text-xl dark:text-white">Register Vehicle</h6>
        </nav>
      </div>
    </nav>
    <div class="w-full p-6 mx-auto">
      <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3">
          <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-6">
              <h5 class="mb-6 dark:text-white">Register New Vehicle</h5>
              <div class="flex flex-wrap -mx-3">
                <div class="w-full max-w-full px-3 mx-auto shrink-0 lg:w-5/12">
                  <div class="mb-4">
                    <label class="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80">Make</label>
                    <input v-model="form.make" type="text" class="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" required />
                    <p v-if="errors.make" class="text-red-500 text-xs mt-1">{{ errors.make }}</p>
                  </div>
                  <div class="mb-4">
                    <label class="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80">Model</label>
                    <input v-model="form.model" type="text" class="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" required />
                    <p v-if="errors.model" class="text-red-500 text-xs mt-1">{{ errors.model }}</p>
                  </div>
                  <div class="mb-4">
                    <label class="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80">Year</label>
                    <input v-model.number="form.year" type="number" class="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" required />
                    <p v-if="errors.year" class="text-red-500 text-xs mt-1">{{ errors.year }}</p>
                  </div>
                  <div class="mb-4">
                    <label class="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80">License Plate</label>
                    <input v-model="form.licensePlate" type="text" class="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" required />
                    <p v-if="errors.licensePlate" class="text-red-500 text-xs mt-1">{{ errors.licensePlate }}</p>
                  </div>
                  <div class="flex mt-6">
                    <button @click="saveVehicle" class="inline-block px-8 py-2 text-xs font-bold text-white bg-blue-500 rounded-lg hover:-translate-y-px active:opacity-85" :disabled="isLoading">
                      Register Vehicle
                    </button>
                    <button @click="resetForm" class="inline-block px-8 py-2 ml-2 text-xs font-bold text-blue-500 border border-blue-500 rounded-lg hover:-translate-y-px active:opacity-85" :disabled="isLoading">
                      Reset
                    </button>
                  </div>
                </div>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '@/services/apiService'

interface VehicleForm {
  make: string
  model: string
  year: number
  licensePlate: string
}

interface ErrorResponse {
  make?: string
  model?: string
  year?: string
  licensePlate?: string
  vehicleId?: string
  status?: string
  assignedMechanic?: string
  createdAt?: string
  form?: string
}

const form = ref<VehicleForm>({
  make: '',
  model: '',
  year: 0,
  licensePlate: ''
})
const errors = ref<ErrorResponse>({})
const isLoading = ref(false)
const router = useRouter()

const validateForm = (): boolean => {
  errors.value = {}
  if (!form.value.make) errors.value.make = 'Make is required'
  if (!form.value.model) errors.value.model = 'Model is required'
  if (!form.value.year || form.value.year < 1900 || form.value.year > new Date().getFullYear()) {
    errors.value.year = 'Year must be between 1900 and ' + new Date().getFullYear()
  }
  if (!form.value.licensePlate) errors.value.licensePlate = 'License plate is required'
  return Object.keys(errors.value).length === 0
}

const saveVehicle = async (): Promise<void> => {
  if (!validateForm()) return

  isLoading.value = true
  try {
    const vehicle = await apiService.addVehicle(form.value)
    if (vehicle) {
      try {
        await apiService.addService({
          vehicle_id: vehicle.id,
          status: 'new-service',
          assignedMechanic: 'Mechanic User',
          createdAt: new Date().toISOString()
        })
        resetForm()
        router.push({ name: 'ServiceList' })
      } catch (serviceError: any) {
        errors.value.form = serviceError.response?.data?.message || 'Failed to create service'
        console.error('Service creation error:', serviceError)
      }
    } else {
      errors.value.form = 'Failed to register vehicle'
    }
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors || { form: 'Validation failed' }
    } else if (error.response?.status === 403) {
      errors.value.form = 'Unauthorized: Only receptionists can register vehicles'
    } else {
      errors.value.form = error.response?.data?.error || 'Failed to register vehicle'
    }
    console.error('Vehicle registration error:', error)
  } finally {
    isLoading.value = false
  }
}

const resetForm = (): void => {
  form.value = { make: '', model: '', year: 0, licensePlate: '' }
  errors.value = {}
}
</script>
