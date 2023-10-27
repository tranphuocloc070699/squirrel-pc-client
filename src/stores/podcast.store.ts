import RepositoryFactory from '@/repositories/factory'
import type { IParams, IPodcastItem } from '@/types'
import { logError } from '@/utils/logError'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const podcastRepository = RepositoryFactory.podcast

interface IPodcastTrendingList {
  news:{
    loading:boolean,
    data:IPodcastItem[]
  },
  economy:{
    loading:boolean,
    data:IPodcastItem[]
  },
  technology:{
    loading:boolean,
    data:IPodcastItem[]
  }
}

interface ISearchPodcasts{
  loading:boolean,
  data:IPodcastItem[]
}


export const usePodcastStore = defineStore('podcast', () => {
  const podcastTrendingLists = ref<IPodcastTrendingList>({
    news:{
      loading:false,
      data:[]
    },
    economy:{
      loading:false,
      data:[]
    },
    technology:{
      loading:false,
      data:[]
    }
  })
 
  const selectedCountry = ref('VN');

  const searchPodcasts = ref<ISearchPodcasts>({
    loading:false,
    data:[]
  })

  const searchByKeyword = async (payload: IParams) => {
 
    searchPodcasts.value.loading = true
    try {
      const response = await podcastRepository?.searchByKeyWord(payload)
      if (response?.data && response?.data.length > 0) {
        searchPodcasts.value.data = response?.data

      }
      return response?.data
    } catch (error) {
      logError(error, '[STORE] usePodcastStore/searchByKeyword')
    } finally {
      searchPodcasts.value.loading = false
    }
  }

  const getPodcastDetail = async (payload: IParams) => {
    try {
      const response = await podcastRepository?.getPodcastDetail(payload)
      
      return response?.data
    } catch (error) {
      logError(error, '[STORE] usePodcastStore/getPodcastDetail')
    }
    
  }
  const getShowInfoAndEpisodes = async (payload: string) => {
    try {
      const response = await podcastRepository?.getShowInfoAndEpisodes(payload)
      return response?.data
    } catch (error) {
      logError(error, '[STORE] usePodcastStore/getShowInfoAndEpisodes')
    }
  }



  const getPodcastTrendingList = async () => {
    podcastTrendingLists.value.news.loading = true
    podcastTrendingLists.value.economy.loading = true
    podcastTrendingLists.value.technology.loading = true

    const newsPayload : IParams = {
      countryCode:selectedCountry.value,
      keyword:selectedCountry.value ==='VN' ? 'tin tức' : 'news',
      size:10
    }
    const technologyPayload : IParams = {
      countryCode:selectedCountry.value,
      keyword:selectedCountry.value ==='VN' ? 'công nghệ' : 'technology',
      size:10
    }
    const economyPayload : IParams = {
      countryCode:selectedCountry.value,
      keyword:selectedCountry.value ==='VN' ? 'kinh tế' : 'economic',
      size:10
    }

    try {
    podcastRepository?.searchByKeyWord(newsPayload).then(res=>{
        if (res?.data && res?.data.length > 0) {
          podcastTrendingLists.value.news.data = res?.data 
        }
      }).finally(()=>{
        podcastTrendingLists.value.news.loading = false
      })
      podcastRepository?.searchByKeyWord(technologyPayload).then(res=>{
        if (res?.data && res?.data.length > 0) {
          podcastTrendingLists.value.technology.data = res?.data 
        }
      }).finally(()=>{
        podcastTrendingLists.value.technology.loading = false
      })
      podcastRepository?.searchByKeyWord(economyPayload).then(res=>{
        if (res?.data && res?.data.length > 0) {
          podcastTrendingLists.value.economy.data = res?.data 
        }
      }).finally(()=>{
        podcastTrendingLists.value.economy.loading = false
      })
   
 
    } catch (error) {
      logError(error, '[STORE] usePodcastStore/listTrendingPodcast')
    } finally {
      podcastTrendingLists.value.news.loading = false
      podcastTrendingLists.value.economy.loading = false
      podcastTrendingLists.value.technology.loading = false
    }
  }

  return {
    searchPodcasts,
    searchByKeyword,
    selectedCountry,
    podcastTrendingLists,
    getPodcastTrendingList,
    getPodcastDetail,
    getShowInfoAndEpisodes
  }

})

