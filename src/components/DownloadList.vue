<template>
  <div >
    <h3 class="border border-df  border-b-0 inline-block px-2 py-1 font-medium text-slate-600 mt-8 md:mt-0">Download Video</h3>
    <div class="border border-df  flex flex-wrap">
      <DownloadItem v-for="item in getVideos" :key="item.format_id" :download="item" />
    </div>
    <div  v-if="getAudios.length>0" class="mt-8">
      <h3 class="border border-df  border-b-0 inline-block px-2 py-1 font-medium text-slate-600">Download Audio</h3>
      <div class="border border-df  flex flex-wrap">
        <DownloadItem v-for="item in getAudios"  :key="item.format_id" :download="item" />
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
  
  const audios :IDownloadItem[] = []
  const audioResponse = youtubeStore.listDownload?.formats
  if(audioResponse){
    for (const key in audioResponse) {
    const value =audioResponse[key]
    if (value.video_ext === 'none') {
      audios.push(value)
    }
  }
  }
  return audios
})

const getVideos = computed(() => {
  const qualities = ['1440p','1080p', '720p', '480p', '360p']
  const videos :IDownloadItem[] = []
  const videoResponse = youtubeStore.listDownload?.formats
  if(videoResponse){
    for (const key in videoResponse) {
    const value =videoResponse[key]
    if (value.video_ext === 'mp4') {
      videos.push(value)
    }
  }
  }
  
  return videos
})


onMounted(() => {})
</script>

<style scoped></style>
