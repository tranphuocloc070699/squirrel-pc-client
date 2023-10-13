<template>
  <div class="flex p-4 last:mb-0 border-b border-slate-400 last:border-b-0">
   
    <img
   
      class="rounded-md w-24 h-24 object-cover"
      :src="data.video.thumbnails[0].url || '/src/assets/images/placeholder.svg'"
      alt="image sidebar"
      width="100"
      height="140"
    />
    <div class="flex flex-col justify-between flex-grow">
      <div class="flex items-start justify-between ">
        <h3 class="ellipsis-line ml-2 leading-4">
        {{ data.video.title }}
      </h3>
      <img @click="$emit('removeVideoFromStorage',props.data.video.id)" src="/src/assets/images/trash.svg" width="16" height="16" class="ml-2 cursor-pointer " />
      </div>
      <div v-if="data.progress">
        <div class="w-full bg-gray-200 rounded-full mx-2 mb-1 " v-show="data.progress.showProgressBar">
      <div
        class="bg-blue_739 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full whitespace-nowrap"
        :style="{ width: `${data.progress.downloadProgress}%` }"
      >
        {{ data.progress.loaded }} / {{ data.progress.total }}
      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISidebarVideoItem } from '@/types';

import { useYoutubeStore } from '@/stores/youtube.store';
const youtubeStore = useYoutubeStore();
const props = defineProps({
  data: {
    type: Object as () => ISidebarVideoItem,
    required: true
  }
})






</script>

<style scoped>

</style>
