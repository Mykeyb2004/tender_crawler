<template>
  <div class="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
    <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Edit' : 'Add' }} Tender</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="title" class="block mb-2">Title</label>
        <input v-model="tender.title" id="title" type="text" class="w-full px-3 py-2 border rounded" required>
      </div>
      <div class="mb-4">
        <label for="area" class="block mb-2">Area</label>
        <input v-model="tender.area" id="area" type="text" class="w-full px-3 py-2 border rounded" required>
      </div>
      <div class="mb-4">
        <label for="post_date" class="block mb-2">Post Date</label>
        <input v-model="tender.post_date" id="post_date" type="date" class="w-full px-3 py-2 border rounded" required>
      </div>
      <div class="mb-4">
        <label for="href" class="block mb-2">URL</label>
        <input v-model="tender.href" id="href" type="url" class="w-full px-3 py-2 border rounded" required>
      </div>
      <div class="flex justify-between">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{{ isEditing ? 'Update' : 'Create' }} Tender</button>
        <button type="button" @click="cancel" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Tender } from '../mock/tenders'
import { useTenderDataSource } from '../data/tenderDataSource'

const route = useRoute()
const router = useRouter()
const { getTenderById, addTender, updateTender } = useTenderDataSource()

const tender = ref<Partial<Tender>>({
  title: '',
  area: '',
  post_date: '',
  href: '',
})

const isEditing = computed(() => !!route.params.id)

onMounted(async () => {
  if (isEditing.value) {
    const id = Number(route.params.id)
    const existingTender = await getTenderById(id)
    if (existingTender) {
      tender.value = { ...existingTender }
    } else {
      console.error('Tender not found')
      router.push('/tenders')
    }
  }
})

const handleSubmit = async () => {
  if (isEditing.value) {
    const id = Number(route.params.id)
    const updatedTender = await updateTender(id, tender.value)
    if (updatedTender) {
      router.push('/tenders')
    } else {
      console.error('Error updating tender')
    }
  } else {
    const newTender = await addTender(tender.value as Omit<Tender, 'id' | 'created_at' | 'updated_at'>)
    if (newTender) {
      router.push('/tenders')
    } else {
      console.error('Error adding tender')
    }
  }
}

const cancel = () => {
  router.push('/tenders')
}
</script>