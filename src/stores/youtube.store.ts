import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IParams, IVideoItem,IListDownloadY2MateResponse } from '@/types'
import RepositoryFactory from '@/repositories/factory'
import { logError } from '@/utils/logError'


const youtubeRepository = RepositoryFactory.get('youtube')
export const useYoutubeStore = defineStore('youtube', () => {
  
  const searchVideoLoading = ref(false)
  const getListDownloadFromY2MateLoading = ref(false)
  const searchVideos = ref<IVideoItem[]>([])
  const listDownloadFromY2Mates = ref<IListDownloadY2MateResponse | null>(null)
 
  const searchByKeyword = async (payload : IParams) => {
    if(searchVideos.value.length>0){
      searchVideos.value = []
    }
    searchVideoLoading.value = true
    try {
      const response = await youtubeRepository?.searchByKeyWord(payload)
      if(response?.data && response?.data.length>0) searchVideos.value = response?.data
      return response?.data
    } catch (error) {
      logError(error,'[STORE] useYoutubeStore/searchByKeyword')
    } finally {
      searchVideoLoading.value = false
    }
  }

  const getListDownloadFromY2Mate = async (id : string) => {
    getListDownloadFromY2MateLoading.value = true
    try {
      const response = await youtubeRepository?.getListDownloadFromY2Mate(id)
      if(response?.data) listDownloadFromY2Mates.value = response?.data
      return response?.data
    } catch (error) {
      logError(error,'[STORE] useYoutubeStore/getListDownloadFromY2Mate')
    } finally {
      getListDownloadFromY2MateLoading.value = false
    }
  }

  return { searchVideoLoading,getListDownloadFromY2MateLoading,searchVideos,listDownloadFromY2Mates,searchByKeyword,getListDownloadFromY2Mate }
})
