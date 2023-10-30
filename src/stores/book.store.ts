import RepositoryFactory from '@/repositories/factory'
import type { IParams, IPodcastItem } from '@/types'
import { logError } from '@/utils/logError'
import type { AxiosProgressEvent } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const bookRepository = RepositoryFactory.book




export const useBookStore = defineStore('book', () => {
    const uploadFile = async (payload: IParams,onDownloadProgress : (progressEvent: AxiosProgressEvent) => void) => {
        // downloadMediaLoading.value= true
        try {
          const response = await bookRepository?.uploadPdfFile(payload,onDownloadProgress)
          return response?.data
        } catch (error) {
          logError(error, '[STORE] downloadMediaFile/getListDownload')
        } finally {
        //   downloadMediaLoading.value = false
        }
      }

  return {
    uploadFile
  }

})

