<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Tender List</h2>
    <router-link to="/tenders/new" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block">Add New Tender</router-link>
    <table class="w-full bg-white shadow-md rounded">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-2 text-left">ID</th>
          <th class="p-2 text-left">Title</th>
          <th class="p-2 text-left">Area</th>
          <th class="p-2 text-left">Post Date</th>
          <th class="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tender in tenders" :key="tender.id" class="border-b">
          <td class="p-2">{{ tender.id }}</td>
          <td class="p-2">
            <a :href="tender.href" target="_blank" class="text-blue-500 hover:text-blue-700">{{ tender.title }}</a>
          </td>
          <td class="p-2">{{ tender.area }}</td>
          <td class="p-2">{{ tender.post_date }}</td>
          <td class="p-2">
            <router-link :to="`/tenders/${tender.id}`" class="text-blue-500 hover:text-blue-700 mr-2">Edit</router-link>
            <button @click="confirmDelete(tender.id)" class="text-red-500 hover:text-red-700">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showConfirmDialog" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-white p-5 rounded-lg shadow-xl">
        <h3 class="text-lg font-bold mb-2">Confirm Delete</h3>
        <p class="mb-4">Are you sure you want to delete this tender?</p>
        <div class="flex justify-end">
          <button @click="deleteTender" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2">Delete</button>
          <button @click="cancelDelete" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMockTenders, Tender } from '../mock/tenders'

const { getTenders, deleteTender: mockDeleteTender } = useMockTenders()

const tenders = ref<Tender[]>([])
const showConfirmDialog = ref(false)
const tenderToDelete = ref<number | null>(null)

const fetchTenders = () => {
  tenders.value = getTenders()
}

const confirmDelete = (id: number) => {
  tenderToDelete.value = id
  showConfirmDialog.value = true
}

const deleteTender = () => {
  if (tenderToDelete.value) {
    const success = mockDeleteTender(tenderToDelete.value)
    if (success) {
      fetchTenders()
    } else {
      console.error('Error deleting tender')
    }
  }
  showConfirmDialog.value = false
  tenderToDelete.value = null
}

const cancelDelete = () => {
  showConfirmDialog.value = false
  tenderToDelete.value = null
}

onMounted(fetchTenders)
</script>