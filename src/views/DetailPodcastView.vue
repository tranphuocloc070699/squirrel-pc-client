<template>
  <LayoutDefault type="podcast">

    <div
      v-show="!podcastDetailLoading && podcastDetail.id.length > 0"
      class="mt-8 mx-auto max-w-2xl w-full px-4 md:px-0"
    >
      <div class="flex items-start flex-wrap md:flex-nowrap">
        <img :src="thumbnail" class="rounded-lg my-2 md:max-w-[40%] w-full h-auto shadow-xl" />
      <div class="md:ml-4">
        <h2 class="uppercase text-lg font-semibold font-noto">{{ podcastDetail.name }}</h2>
      <h3 class="text-slate-700 mt-4 text-sm ellipsis-line-3">{{ podcastDetail.description }}</h3>
      <div class="mt-2  text-sm font-medium" >
        Publish at: <span class=" ml-1">{{ publishAt }}</span>
      
     </div>
      <div class="mt-2" >
      <RouterLink v-if="podcastDetail.show" :to="`/show/${podcastDetail.show?.id}`" class=" text-sm font-medium">
        By: <span class="text-blue-700 hover:underline ml-1">{{ podcastDetail.show?.name }}</span>
      </RouterLink>
     </div>
      <div class="mt-2  text-sm font-medium" >
        Duration: <span class=" ml-1">{{ duration }}</span>
     
     </div>
      <div class="flex items-center mt-2">
        <p class="text-slate-700 text-sm font-medium">Preview: 
          <span @click="toggleListen" :class="['w-20 rounded-full px-3 py-1 border border-[#dadce0] ml-2 cursor-pointer text-blue-700',isListening && 'border-none text-white bg-red-600 select-none']">
          {{ isListening ? 'STOP' : 'LISTEN' }}
          </span>
                    
        </p>
        <audio
        ref="audioRef" 
          :src="podcastDetail.audio_preview_url"
        ></audio>
        <!-- <p v-else class="text-red-500 text-sm font-semibold">Audio not found for this podcast.</p> -->
      </div>
     
     <div class="mt-6">
      <button
      
          class="px-3 py-2 md:w-40 text-sx font-semibold text-white bg-blue-600 flex items-center rounded-sm"
        >
          <svg
            class="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span v-show="podcastDetail.audio_url.length>0" class="text-sm" @click="handleDownload">Download Audio</span>
        </button>
     </div>
      </div>
    </div>
      <p v-show="progress.showProgressBar" class="mt-4 mb-1 text-sm font-noto">{{ podcastDetail.name  }} is downloading...</p>
      <div class="w-full bg-gray-200 rounded-full mr-4 " v-show="progress.showProgressBar">
      <div
        class="bg-blue_739 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full whitespace-nowrap"
        :style="{ width: `${progress.downloadProgress}%` }"
      >
        {{ progress.loaded }} / {{ progress.total }}
      </div>
    </div>
      
      <div class="flex justify-end mt-10 items-center">
        <a ref="spotifyLinkRef" :href="`${SPOTIFY_LINK}/${podcastDetail.id}`" target="_blank">
          <img src="/src/assets/images/spotify.png" class="mr-4"  />
          
        </a>
        <a ref="spotifyLinkRef" :href="`${LISTENNOTES_LINK}`" target="_blank">
          <img src="/src/assets/images/listennotes.png" class="w-40 h-auto object-contain" />
          
        </a>
        
      </div>
     
    </div>
    

    <DetailPodcastLoading v-show="podcastDetailLoading && podcastDetail.id.length === 0"></DetailPodcastLoading>
  </LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePodcastStore } from '@/stores/podcast.store'
import { useYoutubeStore } from '@/stores/youtube.store'
import type { IParams, IPodcastItem } from '@/types'
import DetailPodcastLoading from '@/components/Loading/DetailPodcastLoading.vue'
import { logError } from '@/utils/logError'
import type { AxiosProgressEvent } from 'axios'
import { formatBytes } from '@/utils/formatBtyes'
import { msToTime,dateConvertToYMD } from '@/utils/converter'
const SPOTIFY_LINK = 'https://open.spotify.com/episode'
const LISTENNOTES_LINK = 'https://www.listennotes.com/'
const podcastStore = usePodcastStore()
const youtubeStore = useYoutubeStore()
const route = useRoute()
const podcastDetailLoading = ref(false)
const isListening =  ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)

const podcastDetail = ref<IPodcastItem>({
  id: '',
  name: '',
  thumbnails: [],
  description: '',
  release_date: '',
  audio_url: '',
  duration: 0,
  audio_preview_url: '',
  keywords: ''
})
const progress = reactive({
  showProgressBar: false,
  downloadProgress: 0,
  total:'',
    loaded:''
})

const duration =computed(() =>{
  return msToTime(podcastDetail.value.duration)
})

const thumbnail = computed(() => {
  if (podcastDetail.value.thumbnails.length > 0) {
    if (podcastDetail.value.thumbnails[1]) {
      return podcastDetail.value.thumbnails[1].url
    } else if (podcastDetail.value.thumbnails[0]) {
      return podcastDetail.value.thumbnails[0].url
    } else {
      return podcastDetail.value.thumbnails[2].url
    }
  } else {
    return ''
  }
})

const publishAt = computed(() =>{
  return dateConvertToYMD(podcastDetail.value.release_date)
})


watch(
  () => route.params,
  async (routeParams) => {
    if (
      routeParams?.id &&
      typeof routeParams?.id === 'string' &&
      route.query.name &&
      typeof route.query.name === 'string'
    ) {
      const searchParams: IParams = {
        keyword: route.query.name,
        id: routeParams.id
      }
      podcastDetailLoading.value = true
      console.log('123')
      await podcastStore
        .getPodcastDetail(searchParams)
        .then((data) => {
          if (data) {
            podcastDetail.value = data
          }
        })
        .catch((error) => {
          console.log({ error })
        })
        .finally(() => {
          podcastDetailLoading.value = false
        })
    }
  },

  { immediate: true }
)


const toggleListen =  () =>{
  isListening.value ? audioRef.value?.pause() : audioRef.value?.play()

  isListening.value = !isListening.value

 
}

const handleDownload = () =>{
  const url = podcastDetail.value.audio_url
  const title = `${podcastDetail.value.name}`
  const params: IParams = {
    url

  }
//   if (props.isAudio) params.type = 'audio'

  progress.showProgressBar = true

  youtubeStore
    .downloadFile(params, handleProgress)
    .then((response) => {
      if (response) {
        progress.downloadProgress = 0
        progress.showProgressBar = false

        const blob = new Blob([response])
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = title + `.mp3` // Replace with the desired file name
        a.style.display = 'none'
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      }
    })
    .catch((error) => {
      logError(error, '[Browser DetailPodcastView/downloadFile]')
    })
}

const handleProgress = (progressEvent: AxiosProgressEvent) => {
  progress.downloadProgress = Math.round((progressEvent.loaded / progressEvent.total!) * 100)
  progress.total = formatBytes(progressEvent.total!)
    progress.loaded = formatBytes(progressEvent.loaded)
}

// const showThumbnail = computed(() => {
//   if (podcastDetail.value.show) {
//     if (podcastDetail.value.show.thumbnails[2]) {
//       return podcastDetail.value.show.thumbnails[2].url
//     } else if (podcastDetail.value.show.thumbnails[1]) {
//       return podcastDetail.value.show.thumbnails[1].url
//     } else {
//       return podcastDetail.value.show.thumbnails[0].url
//     }
//   } else {
//     return ''
//   }
// })


</script>

<style scoped></style>
