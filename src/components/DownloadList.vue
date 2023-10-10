<template>
  <div >
    <h3 class="border border-df  border-b-0 inline-block px-2 py-1 font-medium text-slate-600 mt-8 md:mt-0">Download Video</h3>
    <div class="border border-df  flex flex-wrap">
      <DownloadItem v-for="item in getVideos" :key="item.k" :download="item" />
    </div>
    <div  v-if="getAudios.success" class="mt-8">
      <h3 class="border border-df  border-b-0 inline-block px-2 py-1 font-medium text-slate-600">Download Audio</h3>
      <div class="border border-df  flex flex-wrap">
        <DownloadItem v-if="getAudios.data" :download="getAudios.data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import DownloadItem from './DownloadItem.vue'
import type { IDownloadItem } from '../types/index'
import { useYoutubeStore } from '@/stores/youtube.store';

const youtubeStore= useYoutubeStore();
interface IAudio {
    success: boolean
    data?: IDownloadItem
}


const getAudios = computed(() => {
  const audio : IAudio = {
    success: false,
  }
  const audioResponse =youtubeStore.listDownloadFromY2Mates?.links?.mp3
  if (audioResponse?.mp3128) {
    
    audio.success = true
    audio.data = audioResponse?.mp3128
  } else {
    audio.success = false
  }
  return audio
})

const getVideos = computed(() => {
  const qualities = ['1440p','1080p', '720p', '480p', '360p']
  const videos = []
  const videoResponse = youtubeStore.listDownloadFromY2Mates?.links?.mp4
  if(videoResponse){
    for (const key in videoResponse) {
    const value =videoResponse[key]
    if (value.f === 'mp4' && qualities.includes(value.q)) {
      videos.push(value)
    }
  }
  }
  
  return videos
})

// const getVideos = () => {
//     const qualities = ["1080p", "720p", "480p", "360p"];
//     // qualities.forEach((quality,index) => {

//     // });
//     for(const key in response.links.mp4){
//         const value = response.links.mp4[key as keyof typeof response.links.mp4];
//         if(value.f === "mp4" && qualities.includes(value.q)){
//             console.log(value);
//         }
//     }
//     return response.links.mp4
// }

onMounted(() => {})
</script>

<style scoped></style>
