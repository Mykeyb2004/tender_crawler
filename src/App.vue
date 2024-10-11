<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Tender Management</h1>
        <router-link v-if="!isLoggedIn" to="/login" class="text-blue-500 hover:text-blue-700">Login</router-link>
        <button v-else @click="logout" class="text-blue-500 hover:text-blue-700">Logout</button>
      </div>
    </nav>
    <div class="container mx-auto mt-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>