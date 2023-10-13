import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IParams, IVideoItem, ILinkDownloadResponse, IChannelInfo, ISidebarVideoItem } from '@/types'
import RepositoryFactory from '@/repositories/factory'
import { logError } from '@/utils/logError'
import type { AxiosProgressEvent } from 'axios'

const youtubeRepository = RepositoryFactory.get('youtube')

export const useYoutubeStore = defineStore('youtube', () => {
  const searchVideoLoading = ref(false)
  const getListDownloadLoading = ref(false)
  const downloadMediaLoading = ref(false)


  const searchVideos = ref<IVideoItem[]>([])
  const detailVideo = ref<IVideoItem>({
    id: '',
    thumbnails: [],
    title: '',
    channel_name: '',
    channel_id: '',
    duration: '',
    views: '',
    publish_time: ''
  })
  const savedVideos = ref<ISidebarVideoItem[]>([])
  const channelInfo = ref<IChannelInfo>({
    channelId: '',
    title: '',
    thumbnails: [],
    description: '',
    subscribers: '',
    url: ''
  })
  const listDownload = ref<ILinkDownloadResponse | null>(null)

  const searchByKeyword = async (payload: IParams) => {
    // if (searchVideos.value.length > 0) {
    //   searchVideos.value = []
    // }
    if(detailVideo.value.id.length > 0){
      detailVideo.value = {
        id: '',
        thumbnails: [],
        title: '',
        channel_name: '',
        channel_id: '',
        duration: '',
        views: '',
        publish_time: ''
      }
    }
    searchVideoLoading.value = true
    try {
      const response = await youtubeRepository?.searchByKeyWord(payload)
      if (response?.data && response?.data.length > 0) {
        if(payload.size=='1'){
          detailVideo.value = response?.data[0]
        }else{
          searchVideos.value = response?.data
        }
      }
      return response?.data
    } catch (error) {
      logError(error, '[STORE] useYoutubeStore/searchByKeyword')
    } finally {
      searchVideoLoading.value = false
    }
  }

  const listVideoByChannelId = async (id: string) => {
    if (searchVideos.value.length > 0) {
      searchVideos.value = []
    }
    
    searchVideoLoading.value = true
    try {
      const response = await youtubeRepository?.listVideoByChannelId(id)
      if (response?.data) {
        searchVideos.value = response?.data?.videos.map(item => {
          item.channel_id = response?.data?.channel?.channelId
          item.channel_name = response?.data?.channel?.title
          return item
        })
        channelInfo.value = response?.data?.channel
      }
      return response?.data
    } catch (error) {
      logError(error, '[STORE] useYoutubeStore/getListVideoFromChannel')
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

  const downloadMediaFile = async (payload: IParams,onDownloadProgress : (progressEvent: AxiosProgressEvent) => void) => {
    downloadMediaLoading.value= true
    try {
      const response = await youtubeRepository?.downloadMediaFile(payload,onDownloadProgress)
      return response?.data
    } catch (error) {
      logError(error, '[STORE] downloadMediaFile/getListDownload')
    } finally {
      downloadMediaLoading.value = false
    }
  }

  return {
    searchVideoLoading,
    getListDownloadLoading,
    downloadMediaLoading,
    searchVideos,
    listDownload,
    savedVideos,
    channelInfo,
    detailVideo,
    listVideoByChannelId,
    searchByKeyword,
    getListDownload,
    downloadMediaFile
  }
})
