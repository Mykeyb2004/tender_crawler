import { ref } from 'vue'

export interface Tender {
  id: number
  href: string
  title: string
  area: string
  post_date: string
  has_crawled: number
  html: string | null
  created_at: string
  updated_at: string
  weight: number | null
  title_weight: number | null
}

const mockTenders = ref<Tender[]>([
  {
    id: 1,
    href: 'https://example.com/tender1',
    title: 'Construction Project A',
    area: 'New York',
    post_date: '2023-05-01',
    has_crawled: 1,
    html: null,
    created_at: '2023-05-01T10:00:00Z',
    updated_at: '2023-05-01T10:00:00Z',
    weight: 0.75,
    title_weight: 0.8
  },
  {
    id: 2,
    href: 'https://example.com/tender2',
    title: 'IT Services Contract',
    area: 'San Francisco',
    post_date: '2023-05-02',
    has_crawled: 1,
    html: null,
    created_at: '2023-05-02T09:30:00Z',
    updated_at: '2023-05-02T09:30:00Z',
    weight: 0.65,
    title_weight: 0.7
  }
])

export const useMockTenders = () => {
  const getTenders = () => mockTenders.value

  const getTenderById = (id: number) => mockTenders.value.find(tender => tender.id === id)

  const addTender = (tender: Omit<Tender, 'id' | 'created_at' | 'updated_at'>) => {
    const newTender: Tender = {
      ...tender,
      id: Math.max(0, ...mockTenders.value.map(t => t.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      has_crawled: 0,
      html: null,
      weight: null,
      title_weight: null
    }
    mockTenders.value.push(newTender)
    return newTender
  }

  const updateTender = (id: number, updatedTender: Partial<Tender>) => {
    const index = mockTenders.value.findIndex(tender => tender.id === id)
    if (index !== -1) {
      mockTenders.value[index] = {
        ...mockTenders.value[index],
        ...updatedTender,
        updated_at: new Date().toISOString()
      }
      return mockTenders.value[index]
    }
    return null
  }

  const deleteTender = (id: number) => {
    const index = mockTenders.value.findIndex(tender => tender.id === id)
    if (index !== -1) {
      mockTenders.value.splice(index, 1)
      return true
    }
    return false
  }

  return {
    getTenders,
    getTenderById,
    addTender,
    updateTender,
    deleteTender
  }
}