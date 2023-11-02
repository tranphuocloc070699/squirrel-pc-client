import RepositoryFactory from '@/repositories/factory'
import type { IAuthor, IBook, IBookCountry, ICategory, IParams, IPodcastItem } from '@/types'
import { logError } from '@/utils/logError'
import type { AxiosProgressEvent } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { number } from 'yup'

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


const searchBook = ref({
  keyword:'',
  country_code:'all'
})

const selectedCountry = ref<IBookCountry>({
  name:'All',
  code:'all'
})

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
      const response = await bookRepository?.findByCountryCode(selectedCountry.value.code)
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
      if(listBookFinding.value.data.length>0){listBookFinding.value.data = []}
      const response = await bookRepository?.findByCountryCode(selectedCountry.value.code)
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

  const findById = async (id : number,category_id : number) => {
    bookDetailLoading.value = true
  
    try {
      const response = await bookRepository?.findById(id,category_id)
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
        keyword
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

  const findByNamesContainingAndCountryCode = async (payload :IParams) => {
    listBookSearching.value.loading = true
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
   
      const response = await bookRepository?.findByNamesContainingAndCountryCode(payload)
      if(response?.data){
        listBookSearching.value.data = response.data
        return response.data
      }
    } catch (error) {
      logError(error, '[STORE] useBookStore/findByNamesContainingAndCountryCode')
    } finally {
      listBookSearching.value.loading = false
    }
  }
  const findByCategory = async (payload : IParams) => {
    listBookFinding.value.loading = true
    try {
     
      const response = await bookRepository?.findByCategory(payload)
      if(response?.data){
        // listBookFinding.value.data = response.data
        return response.data
      }
    } catch (error) {
      logError(error, '[STORE] useBookStore/findByCategory')
    } finally {
      listBookFinding.value.loading = false
    }
  }
  
  const findAuthorDetail = async (id: number) => {
    listBookFinding.value.loading = true
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const payload : IParams = {
        id
      }
      const response = await bookRepository?.findAuthorDetail(payload)
      if(response?.data){
        listBookFinding.value.data = response.data.bookList
        return response.data
      }
    } catch (error) {
      logError(error, '[STORE] useBookStore/findAuthorDetail')
    } finally {
      listBookFinding.value.loading = false
    }
  }

  const findByAuthorAndCountryCode = async (payload : IParams) => {
    try {
     
      const response = await bookRepository?.findByAuthorAndCountryCode(payload)
      if(response?.data){
   
        return response.data
      }
    } catch (error) {
      logError(error, '[STORE] useBookStore/findByAuthorAndCountryCode')
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
    searchBook,
    uploadPdfFile,
    findByCountryCode,
    findById,
    findByNamesContaining,
    findByNamesContainingAndCountryCode,
    findAuthorDetail,
    findByCategory,
    findAllAuthor,
    findAllCategory,
    findAllBook,
    findByAuthorAndCountryCode,
    
  }
})
