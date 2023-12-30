import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IParams, IVideoItem, ILinkDownloadResponse, IChannelInfo, ISidebarVideoItem } from '@/types'
import RepositoryFactory from '@/repositories/factory'
import { logError } from '@/utils/logError'
import type { AxiosProgressEvent } from 'axios'

const youtubeRepository = RepositoryFactory.youtube

export const useYoutubeStore = defineStore('youtube', () => {
  const searchVideoLoading = ref(false)
  const getListDownloadLoading = ref(false)
  const downloadMediaLoading = ref(false)
  const listTrendingVideoLoading = ref(false)
  const channelInfoLoading = ref(false)

  const selectedCountry = ref('US');
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
  const trendingVideos = ref<IVideoItem[]>([])
  const listDownload = ref<ILinkDownloadResponse | null>(null)

  const listVideoErrorMessage = ref('')
  const videoDetailErrorMessage = ref('')
  const channelInfoErrorMessage = ref('')
  const listDownloadErrorMessage = ref('')

  const searchByKeyword = async (payload: IParams) => {
    // if (searchVideos.value.length > 0) {
    //   searchVideos.value = []
    // }
    if(payload.size=='1'){
      listVideoErrorMessage.value.length>0 && (listVideoErrorMessage.value = '')
    }else{
      videoDetailErrorMessage.value.length>0 && (videoDetailErrorMessage.value = '')
    }

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
    if(listVideoErrorMessage.value.length > 0){
      listVideoErrorMessage.value = ''
    }
    
    searchVideoLoading.value = true
    try {
      const response = await youtubeRepository?.listVideoByChannelId(id)
      if (response?.data && response?.data.videos) {
        searchVideos.value = response?.data.videos.map(item => {
          item.channel_id = response?.data?.channel?.channelId
          item.channel_name = response?.data?.channel?.title
          return item
        })
      }
      return response?.data
    } catch (error) {
      logError(error, '[STORE] useYoutubeStore/getListVideoFromChannel')
      listVideoErrorMessage.value = 'Something went wrong, please try again later.'
    } finally {
      searchVideoLoading.value = false
    }
  }
  const getChannelInfoByChannelId = async (id: string) => {
    if(channelInfoErrorMessage.value.length > 0){
      channelInfoErrorMessage.value = ''
    }
  
    channelInfoLoading.value = true
    try {
      const response = await youtubeRepository?.getChannelInfoByChannelId(id)
      if (response?.data && response?.data.channel) {

        channelInfo.value = response?.data?.channel
      }
      return response?.data
    } catch (error) {
      logError(error, '[STORE] useYoutubeStore/getChannelInfoByChannelId')
      channelInfoErrorMessage.value = 'Something went wrong, please try again later.'
    } finally {
      channelInfoLoading.value = false
    }
  }

  const getListDownload = async (id: string) => {
    if(listDownloadErrorMessage.value.length > 0){
      listDownloadErrorMessage.value = ''
    }

    getListDownloadLoading.value = true
    try {
      const response = await youtubeRepository?.getListDownload(id)
      if (response?.data) listDownload.value = response?.data
      return response?.data
    } catch (error) {
      logError(error, '[STORE] useYoutubeStore/getListDownload')
      listDownloadErrorMessage.value = 'Something went wrong, please try again later.'
    } finally {
      getListDownloadLoading.value = false
    }
  }

  const downloadFile = async (payload: IParams,onDownloadProgress : (progressEvent: AxiosProgressEvent) => void) => {
    downloadMediaLoading.value= true
    try {
      const response = await youtubeRepository?.downloadFile(payload,onDownloadProgress)
      return response?.data
    } catch (error) {
      logError(error, '[STORE] useYoutubeStore/downloadFile')
    } finally {
      downloadMediaLoading.value = false
    }
  }
  
  const listTrendingVideo = async (payload: IParams) => {
    if(listVideoErrorMessage.value.length > 0){
      listVideoErrorMessage.value = ''
    }

    listTrendingVideoLoading.value= true
    try {
      const response = await youtubeRepository?.listTrendingVideo(payload)
      if (response?.data) trendingVideos.value = response?.data
      return response?.data
    } catch (error) {
      logError(error, '[STORE] useYoutubeStore/listTrendingVideo')
      listVideoErrorMessage.value = 'Something went wrong, please try again later.'
    } finally {
      listTrendingVideoLoading.value = false
    }
  }

  return {
    searchVideoLoading,
    getListDownloadLoading,
    downloadMediaLoading,
    listTrendingVideoLoading,
    channelInfoLoading,
    selectedCountry,
    searchVideos,
    listDownload,
    savedVideos,
    channelInfo,
    detailVideo,
    trendingVideos,
    listVideoByChannelId,
    searchByKeyword,
    getListDownload,
    downloadFile,
    listTrendingVideo,
    getChannelInfoByChannelId,
    listVideoErrorMessage,
    videoDetailErrorMessage,
    channelInfoErrorMessage,
    listDownloadErrorMessage
  }
})
