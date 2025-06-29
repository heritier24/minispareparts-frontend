<template>
  <main class="relative h-full max-h-screen transition-all duration-200 ease-in-out">
    <div class="w-full p-6 mx-auto">
      <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3 mx-auto shrink-0 lg:w-5/12">
          <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div class="flex-auto p-6">
              <h5 class="mb-6 font-bold dark:text-white">Login</h5>
              <div class="mb-4">
                <label class="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80">Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  class="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <p v-if="error" class="text-red-500 text-xs mb-4">{{ error }}</p>
              <div class="flex mt-6">
                <button
                  @click="handleLogin"
                  class="inline-block px-8 py-2 text-xs font-bold text-white bg-blue-500 rounded-lg hover:-translate-y-px active:opacity-85"
                >
                  Login
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
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/apiService'

interface LoginForm {
  email: string
  password: string
}

const form = ref<LoginForm>({
  email: '',
  password: ''
})
const error = ref<string>('')

onMounted((): void => {
  if (apiService.getCurrentUser()) {
    window.location.href = '/'
  }
})

const handleLogin = async (): Promise<void> => {
  error.value = ''
  const result = await apiService.login(form.value.email, form.value.password)
  if (result) {
    apiService.setCurrentUser(result.user, result.token)
    window.location.href = '/'
  } else {
    error.value = 'Invalid email or password'
  }
}
</script>
