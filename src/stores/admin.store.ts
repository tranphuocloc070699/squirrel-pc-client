import RepositoryFactory from '@/repositories/factory'
import type { IAuthor, ICategory, IParams, IUploadFile, IUpsertBookRequest } from '@/types'
import { logError } from '@/utils/logError'

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useBookStore } from './book.store'

const adminRepository = RepositoryFactory.admin
const bookStore = useBookStore();
const loading = ref(false)
const uploadFiles = ref<IUploadFile[]>([])
const accessToken = ref('')

export const useAdminStore = defineStore('admin', () => {
  const login = async (payload: IParams) => {
    loading.value = true
    try {
      const response = await adminRepository?.login(payload)
   if(response?.data){
        accessToken.value = response.data.access_token
      
        return response?.data

      }
    } catch (error) {
      logError(error, '[STORE] useAdminStore/login')
    } finally {
      loading.value = false
    }
  }

    const saveBook = async (payload: IUpsertBookRequest) => {
        loading.value = true
        try {
          const response = await adminRepository?.saveBook(payload,accessToken.value)

       if(response?.data){
            const index = bookStore.allBook.data.findIndex((item) => item.id === response?.data.id)
            if(index!== -1){
              bookStore.allBook.data[index] = response?.data

            }else{
              bookStore.allBook.data.push(response?.data)
            }
          
            return response?.data

          }
        } catch (error) {
          logError(error, '[STORE] useAdminStore/saveBook')
        } finally {
          loading.value = false
        }
      }
      const saveAuthor = async (payload: IAuthor) => {
        loading.value = true
        try {
          const response = await adminRepository?.saveAuthor(payload,accessToken.value)
          if(response?.data){
            const index = bookStore.authorList.data.findIndex((item) => item.id === response?.data.id)
            if(index!== -1){
              bookStore.authorList.data[index] = response?.data

            }else{
              bookStore.authorList.data.push(response?.data)
            }
          
            return response?.data

          }
        } catch (error) {
          logError(error, '[STORE] useAdminStore/saveAuthor')
        } finally {
          loading.value = false
        }
      }
      const saveCategory = async (payload: ICategory) => {
        loading.value = true
        try {
          const response = await adminRepository?.saveCategory(payload,accessToken.value)
          if(response?.data){
            const index = bookStore.categoryList.data.findIndex((item) => item.id === response?.data.id)
            if(index!== -1){
              bookStore.categoryList.data[index] = response?.data

            }else{
              bookStore.categoryList.data.push(response?.data)
            }
          
            return response?.data

          }
        } catch (error) {
          logError(error, '[STORE] useAdminStore/saveCategory')
        } finally {
          loading.value = false
        }
      }

      const deleteBook = async (payload: number) => {
        loading.value = true
        try {
          const response = await adminRepository?.deleteBook(payload,accessToken.value)
          if(response?.data){
            const index = bookStore.allBook.data.findIndex((item) => item.id === payload)
            if(index!== -1){
              bookStore.allBook.data.splice(index,1)

            }
          
            return response?.data

          }
        } catch (error) {
          logError(error, '[STORE] useAdminStore/deleteBook')
        } finally {
          loading.value = false
        }
      }

      const findAllUploadFile = async () => {
        loading.value = true
        try {
          const response = await adminRepository?.findAllUploadFile(accessToken.value)
          uploadFiles.value = response?.data
          return response?.data
        } catch (error) {
          logError(error, '[STORE] useAdminStore/deleteBook')
        } finally {
          loading.value = false
        }
      }

      const findUploadFileById = async (fileId : number) => {
        loading.value = true
        try {
          const response = await adminRepository?.findUploadFileById(fileId,accessToken.value);
   
          return response?.data
        } catch (error) {
          logError(error, '[STORE] useAdminStore/findUploadFileById')
        } finally {
          loading.value = false
        }
      }

      const deleteUploadFileById = async (fileId : number) => {
        loading.value = true
        try {
          const response = await adminRepository?.deleteUploadFileById(fileId,accessToken.value);
   
          return response?.data
        } catch (error) {
          logError(error, '[STORE] useAdminStore/findUploadFileById')
        } finally {
          loading.value = false
        }
      }

      const uploadFileToS3 = async (payload : IParams) => {
        loading.value = true
        try {
          const response = await adminRepository?.uploadFileToS3(payload,accessToken.value);
   
          return response?.data
        } catch (error) {
          logError(error, '[STORE] useAdminStore/uploadFileToS3')
        } finally {
          loading.value = false
        }
      }

  

  return {
    loading,
    uploadFiles,
    accessToken,
    ref,
    saveBook,
    saveAuthor,
    saveCategory,
    deleteBook,
    findAllUploadFile,
    findUploadFileById,
    deleteUploadFileById,
    uploadFileToS3,
    login
  }

})

