import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as string | null,
  }),
  actions: {
    login(username: string, password: string) {
      // In a real app, you would validate credentials against a backend
      if (username === 'admin' && password === 'password') {
        this.isLoggedIn = true
        this.user = username
        return true
      }
      return false
    },
    logout() {
      this.isLoggedIn = false
      this.user = null
    },
  },
})