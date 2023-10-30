import RepositoryFactory from '@/repositories/factory'
import type { IAuthor, IBook, ICategory, IParams, IPodcastItem } from '@/types'
import { logError } from '@/utils/logError'
import type { AxiosProgressEvent } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IBookList {
  loading: boolean
  data: IBook[]
}

interface IAuthorList {
  loading: boolean
  data: IAuthor[]
}

interface ICategoryList {
  loading: boolean
  data: ICategory[]
}


const bookRepository = RepositoryFactory.book
const uploadPdfFileLoading = ref(false)
const bookDetailLoading = ref(false)



const selectedCountry = ref('vi')

const allBook = ref<IBookList>({
  loading: false,
  data: []
})


const listBookFinding = ref<IBookList>({
  loading: false,
  data: []
})

const listBookSearching = ref<IBookList>({
  loading: false,
  data: []
})

const authorList = ref<IAuthorList>({
  data: [],
  loading:false
})

const categoryList = ref<ICategoryList>({
  data: [],
  loading:false
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

  const findAllBook = async () => {
    allBook.value.loading = true
    try {
      const response = await bookRepository?.findByCountryCode(selectedCountry.value)
      if(response?.data){
        allBook.value.data = response.data
        return response.data
      }
      
    } catch (error) {
      logError(error, '[STORE] useBookStore/findAll')
    } finally {
      allBook.value.loading = false
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

  const findAllAuthor = async () =>{
    authorList.value.loading = true
    try {
     
      const response = await bookRepository?.findAllAuthors()
      if(response?.data){
        authorList.value.data = response.data
        return response.data
      }
    } catch (error) {
      logError(error, '[STORE] useBookStore/findAllAuthor')
    } finally {
      authorList.value.loading = false
    }
  }

  const findAllCategory = async () =>{
    categoryList.value.loading = true
    try {
     
      const response = await bookRepository?.findAllCategories()
      if(response?.data){
        categoryList.value.data = response.data
        return response.data
      }
    } catch (error) {
      logError(error, '[STORE] useBookStore/findAllCategory')
    } finally {
      categoryList.value.loading = false
    }
  }

  return {
    uploadPdfFileLoading,
    allBook,
    bookDetailLoading,
    listBookFinding,
    listBookSearching,
    selectedCountry,
    authorList,
    categoryList,
    uploadPdfFile,
    findByCountryCode,
    findById,
    findByNamesContaining,
    findByAuthorId,
    findByCategoryId,
    findAllAuthor,
    findAllCategory,
    findAllBook
  }
})
