<template>
  <div >
    <h3 class="border border-df  border-b-0 inline-block px-2 py-1 font-medium text-slate-600 mt-8 md:mt-0">Download Video</h3>
    <div class="border border-df">
      <DownloadItem v-for="item in getVideos" :key="item.format_id" :download="item" />
    </div>
    <div  v-if="getAudios.length>0" class="mt-8">
      <h3 class="border border-df  border-b-0 inline-block px-2 py-1 font-medium text-slate-600">Download Audio</h3>
      <div class="border border-df ">
        <DownloadItem v-for="item in getAudios" :is-audio="true"   :key="item.format_id" :download="item" />
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


const getAudios = computed(() => {
  
  const audios :IDownloadItem[] = []
  const mediaResponse = youtubeStore.listDownload?.formats
  if(mediaResponse){
    // const sortedMedias = Object.values(mediaResponse).sort(
    //   (a, b) => (a.filesize || 0) -( b.filesize || 0)
    // )
    // let minFileSizeMedia =sortedMedias.find((video) => video.video_ext === 'mp4')
    // if(minFileSizeMedia){
      
    //   audios.push(minFileSizeMedia)
    // }
    for (const key in mediaResponse) {
    const value =mediaResponse[key]
    if (value.video_ext === 'mp4') {
      audios.push(value)
      break;
    }
  }
  }
  return audios
})

const getVideos = computed(() => {
  const videos :IDownloadItem[] = []
  const mediaResponse = youtubeStore.listDownload?.formats
  if(mediaResponse){
    for (const key in mediaResponse) {
    const value =mediaResponse[key]
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
