<template>
  <div class="flex p-4 last:mb-0 border-b border-slate-400 ">
   
    <img
   
      class="rounded-md w-24 h-24 object-cover"
      :src="video.thumbnails[0].url || '/src/assets/images/placeholder.svg'"
      alt="image sidebar"
      width="100"
      height="140"
    />
    <div class="flex flex-col justify-between">
      <h3 class="ellipsis-line ml-2 leading-4">
        {{ video.title }}
      </h3>
      <div class="w-full bg-gray-200 rounded-full mx-2 mb-1 " v-show="progress.showProgressBar">
      <div
        class="bg-blue_739 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full whitespace-nowrap"
        :style="{ width: `${progress.downloadProgress}%` }"
      >
        {{ progress.loaded }} / {{ progress.total }}
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IVideoItem } from '@/types';
import { reactive } from 'vue';
import { useYoutubeStore } from '@/stores/youtube.store';
const youtubeStore = useYoutubeStore();
const props = defineProps({
  video: {
    type: Object as () => IVideoItem,
    required: true
  }
})

const removeVideoFromStorage = () =>{
  youtubeStore.savedVideos = youtubeStore.savedVideos.filter(item => item.id !== props.video.id),
  localStorage.setItem('savedVideos', JSON.stringify(youtubeStore.savedVideos))
}

const progress = reactive({
  showProgressBar: false,
  downloadProgress: 0,
  total:'',
    loaded:''
})



</script>

<style scoped>
.ellipsis-line {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
