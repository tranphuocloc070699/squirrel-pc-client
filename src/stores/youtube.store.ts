import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IParams, IVideoItem, ILinkDownloadResponse } from '@/types'
import RepositoryFactory from '@/repositories/factory'
import { logError } from '@/utils/logError'

const youtubeRepository = RepositoryFactory.get('youtube')
export const useYoutubeStore = defineStore('youtube', () => {
  const searchVideoLoading = ref(false)
  const getListDownloadLoading = ref(false)
  const downloadMediaLoading = ref(false)
  const searchVideos = ref<IVideoItem[]>([])
  const listDownload = ref<ILinkDownloadResponse | null>(null)

  const searchByKeyword = async (payload: IParams) => {
    if (searchVideos.value.length > 0) {
      searchVideos.value = []
    }
    searchVideoLoading.value = true
    try {
      const response = await youtubeRepository?.searchByKeyWord(payload)
      if (response?.data && response?.data.length > 0) searchVideos.value = response?.data
      return response?.data
    } catch (error) {
      logError(error, '[STORE] useYoutubeStore/searchByKeyword')
    } finally {
      searchVideoLoading.value = false
    }
  }

  const getListDownload = async (id: string) => {
    getListDownloadLoading.value = true
    try {
      const response = await youtubeRepository?.getListDownload(id)
      if (response?.data) listDownload.value = response?.data
      return response?.data
    } catch (error) {
      logError(error, '[STORE] useYoutubeStore/getListDownload')
    } finally {
      getListDownloadLoading.value = false
    }
  }

 

  return {
    searchVideoLoading,
    getListDownloadLoading,
    downloadMediaLoading,
    searchVideos,
    listDownload,
    searchByKeyword,
    getListDownload,
  }
})
