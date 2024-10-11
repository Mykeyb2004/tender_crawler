<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded shadow-md">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="username" class="block mb-2">Username</label>
        <input v-model="username" id="username" type="text" class="w-full px-3 py-2 border rounded" required>
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2">Password</label>
        <input v-model="password" id="password" type="password" class="w-full px-3 py-2 border rounded" required>
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  if (authStore.login(username.value, password.value)) {
    router.push('/tenders')
  } else {
    alert('Invalid credentials')
  }
}
</script>