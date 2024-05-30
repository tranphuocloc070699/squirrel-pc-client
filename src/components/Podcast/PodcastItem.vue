<template>
    <div
      class="flex flex-col justify-between border border-df rounded hover:shadow transition-shadow"
    >
  
      <div>
        <img
        @click="handleClick"
          :src="podcast.thumbnails[0].url"
          alt="Image"
          class="w-full h-48 object-cover rounded-t-sm cursor-pointer "
        />
        <div  @click="handleClick" class="p-4 cursor-pointer ">
          <h3 class="text-base font-semibold ellipsis-line-2">
            {{ podcast.name }}
          </h3>
          <h4 class="ellipsis-line-3 text-sm leading-5 mt-1 text-slate-600">{{ podcast.description }}</h4>
          <div class="flex items-center mt-2">
            <h5 class="text-sm font-medium text-blue_739">{{ dateConverter }}</h5>
            <div  class="mx-2 h-[4px] w-[4px] bg-gray-500 rounded-full"></div>
            <h5 class="text-sm font-medium text-blue_739">{{ durationConverter }}</h5>
          </div>
       
        </div>
      </div>
  
      <div class="flex gap-3 items-center justify-between p-4">
        <a ref="spotifyLinkRef" :href="`${SPOTIFY_LINK}/${podcast.id}`" target="_blank">
          <img src="/spotify.png" class="w-8 h-8" />
          
        </a>
        <RouterLink  :to="`/podcast/${podcast.id}?name=${podcast.name}`" class="text-sm text-blue-700 font-semibold">LISTEN FULL</RouterLink>
        <!-- <img
        @click="handleClick"
          v-show="!isAdded"
          ref="plusVideoToStorageRef"
          src="/plus.svg"
          width="24"
          height="24"
          class="border border-blue_739 rounded p-1 z-10 cursor-pointer"
        /> -->
      </div>
        
    </div>
  </template>
  
  <script setup lang="ts">
  import {  useRouter,RouterLink} from 'vue-router'
  import type { IPodcastItem, ISidebarVideoItem } from '../../types/index'
  import { computed, ref } from 'vue'
  import { useYoutubeStore } from '@/stores/youtube.store'
  import { useNotification } from '@kyvg/vue3-notification'
  
  const SPOTIFY_LINK = 'https://open.spotify.com/episode'
  const router = useRouter()
  const plusVideoToStorageRef = ref(null)
  const spotifyLinkRef = ref(null)
  const channelNameRef = ref(null)
  const youtubeStore = useYoutubeStore()
  const { notify } = useNotification()
  import { msToTime,dateConvertToYMD } from '@/utils/converter'
  const props = defineProps({
    podcast: {
      type: Object as () => IPodcastItem,
      required: true
    }
  })
  
//   const isAdded = computed(() => {
//     return (
//       youtubeStore.savedVideos.findIndex(
//         (item: ISidebarVideoItem) => item.video.id === props.video.id
//       ) > -1
//     )
//   })
const durationConverter = computed(() =>{
  return(
    msToTime(props.podcast.duration)
  )
})

const dateConverter = computed(() =>{

  return(
     dateConvertToYMD(props.podcast.release_date)
  )
})
  
  const handleClick = (event: MouseEvent) => {
    // console.log(event.target)
    // console.log(plusVideoToStorageRef.value)
    // if (event.target === plusVideoToStorageRef.value) {
  
    //   handleAddToStorage()
    // } 
    // else if (event.target === channelNameRef.value) {
    //   router.push({ path: `/channel/${props.video.channel_id}` })
    // }  
    // else if (event.target === youtubeLinkRef.value) {
    //   return
    // } else {
    //   router.push({ path: `/video/${props.video.id}` })
    // }
  }
  const handleAddToStorage = () => {
    // if (
    //   youtubeStore.savedVideos.findIndex(
    //     (item: ISidebarVideoItem) => item.video.id === props.video.id
    //   ) > -1
    // ) return;
  
    // notify({
    //   title: 'SUCCESS',
    //   text: 'Add video successfully',
    //   duration: 2000,
    //   type: 'success'
    // })
  
    // youtubeStore.savedVideos.push({ video: props.video })
  
    // localStorage.setItem('savedVideos', JSON.stringify(youtubeStore.savedVideos))
  }
  </script>
  
  <style scoped></style>
  