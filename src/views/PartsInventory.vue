<template>
  <main class="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
    <nav class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
      <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
            <li class="text-sm leading-normal">
              <a class="text-slate-700 opacity-50 dark:text-white/70" href="#">Pages</a>
            </li>
            <li class="text-sm pl-2 capitalize leading-normal text-slate-700 dark:text-white before:float-left before:pr-2 before:content-['/']" aria-current="page">Parts Inventory</li>
          </ol>
          <h6 class="mb-0 font-bold text-xl dark:text-white">Parts Inventory</h6>
        </nav>
      </div>
    </nav>
    <div class="w-full p-6 mx-auto">
      <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3 shrink-0 lg:w-4/12">
          <div class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-6">
              <h5 class="font-bold dark:text-white">{{ isEditing ? 'Edit Part' : 'Add Part' }}</h5>
              <form @submit.prevent="savePart">
                <div class="mb-4">
                  <label class="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80">Part Name</label>
                  <input v-model="form.name" type="text" class="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" required />
                  <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
                </div>
                <div class="mb-4">
                  <label class="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80">Quantity</label>
                  <input v-model.number="form.quantity" type="number" class="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" required />
                  <p v-if="errors.quantity" class="text-red-500 text-xs mt-1">{{ errors.quantity }}</p>
                </div>
                <div class="mb-4">
                  <label class="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80">Low Stock Threshold</label>
                  <input v-model.number="form.lowStockThreshold" type="number" class="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" required />
                  <p v-if="errors.lowStockThreshold" class="text-red-500 text-xs mt-1">{{ errors.lowStockThreshold }}</p>
                </div>
                <div class="flex mt-6">
                  <button type="submit" class="inline-block px-8 py-2 mr-2 text-xs font-bold text-white bg-blue-500 rounded-lg hover:-translate-y-px active:opacity-85">
                    {{ isEditing ? 'Update Part' : 'Add Part' }}
                  </button>
                  <button @click="resetForm" class="inline-block px-8 py-2 text-xs font-bold text-slate-700 border border-slate-700 rounded-lg hover:-translate-y-px active:opacity-85">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="w-full max-w-full px-3 mt-6 shrink-0 lg:w-8/12 lg:mt-0">
          <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-6">
              <h5 class="mb-4 dark:text-white">Parts Inventory</h5>
              <div class="overflow-x-auto">
                <table class="w-full mb-4">
                  <thead class="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">Part Name</th>
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">Quantity</th>
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">Status</th>
                      <th class="px-6 py-3 text-xs font-bold uppercase text-slate-400 dark:text-white/70">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="part in parts" :key="part.id" class="border-t dark:border-slate-700">
                      <td class="px-6 py-4 text-sm dark:text-white/80">{{ part.name }}</td>
                      <td class="px-6 py-4 text-sm dark:text-white/80">{{ part.quantity }}</td>
                      <td class="px-6 py-4">
                        <span :class="['py-1 px-2 text-xs rounded inline-block font-bold uppercase', part.quantity <= part.lowStockThreshold ? 'text-red-700 bg-red-200' : 'text-emerald-600 bg-emerald-200']">
                          {{ part.quantity <= part.lowStockThreshold ? 'Low Stock' : 'In Stock' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-sm">
                        <a href="javascript:;" @click="editPart(part)" class="mx-2">
                          <i class="fas fa-user-edit text-slate-400 dark:text-white/70">Edit</i>
                        </a>
                        <a href="javascript:;" @click="deletePart(part.id)">
                          <i class="fas fa-trash text-slate-400 dark:text-white/70">Delete</i>
                        </a>
                      </td>
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
import { ref } from 'vue'
import { localStorageService } from '@/services/localStorageService'

interface PartForm {
  id?: string
  name: string
  quantity: number
  lowStockThreshold: number
}

const form = ref<PartForm>({
  name: '',
  quantity: 0,
  lowStockThreshold: 0
})
const errors = ref({})
const parts = ref<PartForm[]>([])
const isEditing = ref(false)

const fetchParts = () => {
  // Mock data for static design
  parts.value = [
    { id: '1', name: 'Oil Filter', quantity: 5, lowStockThreshold: 10 },
    { id: '2', name: 'Brake Pads', quantity: 15, lowStockThreshold: 10 },
    { id: '3', name: 'Air Filter', quantity: 8, lowStockThreshold: 10 }
  ]
}

fetchParts()

const validateForm = () => {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'Part name is required'
  if (form.value.quantity < 0) errors.value.quantity = 'Quantity cannot be negative'
  if (form.value.lowStockThreshold < 0) errors.value.lowStockThreshold = 'Low stock threshold cannot be negative'
  return Object.keys(errors.value).length === 0
}

const savePart = () => {
  if (validateForm()) {
    // Mock save for static design
    console.log('Part saved:', form.value)
    resetForm()
    fetchParts()
  }
}

const editPart = (part: PartForm) => {
  form.value = { ...part }
  isEditing.value = true
}

const deletePart = (id: string) => {
  if (confirm('Are you sure you want to delete this part?')) {
    // Mock delete for static design
    console.log('Deleted part:', id)
    fetchParts()
  }
}

const resetForm = () => {
  form.value = { name: '', quantity: 0, lowStockThreshold: 0 }
  errors.value = {}
  isEditing.value = false
}
</script>
