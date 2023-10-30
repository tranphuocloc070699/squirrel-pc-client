import RepositoryFactory from '@/repositories/factory'
import type { IBook, IParams, IPodcastItem } from '@/types'
import { logError } from '@/utils/logError'
import type { AxiosProgressEvent } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IListBook {
  loading: boolean
  data: IBook[]
}

const bookRepository = RepositoryFactory.book
const uploadPdfFileLoading = ref(false)
const bookDetailLoading = ref(false)

const selectedCountry = ref('vi')

const listBookFinding = ref<IListBook>({
  loading: false,
  data: []
})

const listBookSearching = ref<IListBook>({
  loading: false,
  data: []
})
export const useBookStore = defineStore('book', () => {
  const uploadPdfFile = async (
    payload: IParams,
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => void
  ) => {
    uploadPdfFileLoading.value = true
    try {
      const response = await bookRepository?.uploadPdfFile(payload, onDownloadProgress)
      return response?.data
    } catch (error) {
      logError(error, '[STORE] useBookStore/uploadPdfFile')
    } finally {
      uploadPdfFileLoading.value = false
    }
  }

  const findByCountryCode = async () => {
    listBookFinding.value.loading = true
    try {
      const response = await bookRepository?.findByCountryCode(selectedCountry.value)
      if(response?.data){
        listBookFinding.value.data = response.data
        return response.data
      }
      
    } catch (error) {
      logError(error, '[STORE] useBookStore/findByCountryCode')
    } finally {
      listBookFinding.value.loading = false
    }
  }

  const findById = async (id : number) => {
    bookDetailLoading.value = true
    try {
      const response = await bookRepository?.findById(id)
      if(response?.data){

        return response.data
      }
      
    } catch (error) {
      logError(error, '[STORE] useBookStore/findById')
    } finally {
      bookDetailLoading.value = false
    }
  }

  const findByNamesContaining = async (keyword: string) => {
    listBookSearching.value.loading = true
    try {
      const payload : IParams = {
        queryOrId:keyword,
        countryCode:selectedCountry.value
      }
      const response = await bookRepository?.findByNamesContaining(payload)
      if(response?.data){
        listBookSearching.value.data = response.data
        return response.data
      }
    } catch (error) {
      logError(error, '[STORE] useBookStore/findByNamesContaining')
    } finally {
      listBookSearching.value.loading = false
    }
  }
  const findByCategoryId = async (id: number) => {
    listBookFinding.value.loading = true
    try {
      const payload : IParams = {
        id,
        country_code:selectedCountry.value
      }
      const response = await bookRepository?.findByCategoryId(payload)
      if(response?.data){
        listBookFinding.value.data = response.data
        return response.data
      }
    } catch (error) {
      logError(error, '[STORE] useBookStore/findByCategoryId')
    } finally {
      listBookFinding.value.loading = false
    }
  }

  const findByAuthorId = async (id: number) => {
    listBookFinding.value.loading = true
    try {
      const payload : IParams = {
        id,
        country_code:selectedCountry.value
      }
      const response = await bookRepository?.findByAuthorId(payload)
      if(response?.data){
        listBookFinding.value.data = response.data
        return response.data
      }
    } catch (error) {
      logError(error, '[STORE] useBookStore/findByAuthorId')
    } finally {
      listBookFinding.value.loading = false
    }
  }

  return {
    uploadPdfFileLoading,
    bookDetailLoading,
    listBookFinding,
    listBookSearching,
    selectedCountry,
    uploadPdfFile,
    findByCountryCode,
    findById,
    findByNamesContaining,
    findByAuthorId,
    findByCategoryId
  }
})
