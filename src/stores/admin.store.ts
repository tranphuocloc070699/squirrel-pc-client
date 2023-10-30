import RepositoryFactory from '@/repositories/factory'
import type { IUploadFile, IUpsertBookRequest } from '@/types'
import { logError } from '@/utils/logError'

import { defineStore } from 'pinia'
import { ref } from 'vue'

const adminRepository = RepositoryFactory.admin

const loading = ref(false)
const uploadFiles = ref<IUploadFile[]>([])


export const useAdminStore = defineStore('admin', () => {
    const saveBook = async (payload: IUpsertBookRequest) => {
        loading.value = true
        try {
          const response = await adminRepository?.saveBook(payload)
          return response?.data
        } catch (error) {
          logError(error, '[STORE] useAdminStore/saveBook')
        } finally {
          loading.value = false
        }
      }

      const deleteBook = async (payload: number) => {
        loading.value = true
        try {
          const response = await adminRepository?.deleteBook(payload)
          return response?.data
        } catch (error) {
          logError(error, '[STORE] useAdminStore/deleteBook')
        } finally {
          loading.value = false
        }
      }

      const findAllUploadFile = async () => {
        loading.value = true
        try {
          const response = await adminRepository?.findAllUploadFile()
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
          const response = await adminRepository?.findUploadFileById(fileId);
   
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
          const response = await adminRepository?.deleteUploadFileById(fileId);
   
          return response?.data
        } catch (error) {
          logError(error, '[STORE] useAdminStore/findUploadFileById')
        } finally {
          loading.value = false
        }
      }

  

  return {
    loading,
    uploadFiles,
    saveBook,
    deleteBook,
    findAllUploadFile,
    findUploadFileById,
    deleteUploadFileById
  }

})

