import { ref } from 'vue'
import { useMockTenders, Tender } from '../mock/tenders'
import axios from 'axios'

const API_BASE_URL = '/api'

const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true'

export const useTenderDataSource = () => {
  const { getTenders: getMockTenders, getTenderById: getMockTenderById, addTender: addMockTender, updateTender: updateMockTender, deleteTender: deleteMockTender } = useMockTenders()

  const getTenders = async (): Promise<Tender[]> => {
    if (useMockData) {
      return getMockTenders()
    } else {
      const response = await axios.get(`${API_BASE_URL}/tenders`)
      return response.data
    }
  }

  const getTenderById = async (id: number): Promise<Tender | null> => {
    if (useMockData) {
      return getMockTenderById(id) || null
    } else {
      try {
        const response = await axios.get(`${API_BASE_URL}/tenders/${id}`)
        return response.data
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return null
        }
        throw error
      }
    }
  }

  const addTender = async (tender: Omit<Tender, 'id' | 'created_at' | 'updated_at'>): Promise<Tender> => {
    if (useMockData) {
      return addMockTender(tender)
    } else {
      const response = await axios.post(`${API_BASE_URL}/tenders`, tender)
      return response.data
    }
  }

  const updateTender = async (id: number, tender: Partial<Tender>): Promise<Tender | null> => {
    if (useMockData) {
      return updateMockTender(id, tender)
    } else {
      try {
        const response = await axios.put(`${API_BASE_URL}/tenders/${id}`, tender)
        return response.data
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return null
        }
        throw error
      }
    }
  }

  const deleteTender = async (id: number): Promise<boolean> => {
    if (useMockData) {
      return deleteMockTender(id)
    } else {
      try {
        await axios.delete(`${API_BASE_URL}/tenders/${id}`)
        return true
      } catch (error) {
        return false
      }
    }
  }

  return {
    getTenders,
    getTenderById,
    addTender,
    updateTender,
    deleteTender
  }
}