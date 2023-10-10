<template>
     <RouterLink :to="`/video/${video.id}`"
    class="flex flex-col justify-between border border-df rounded cursor-pointer hover:shadow transition-shadow"
  >
    <div>
      <img
        :src="video.thumbnails[0]"
        alt="Image"
        class="w-full h-48 object-cover rounded-t-sm"
      />
      <div class="p-4">
        <h3 class="text-xl mb-1">{{ video.title }} <span class="text-sm">({{ video.duration }})</span></h3>
        <h4 class="mt-2 text-sm inline-block border border-primary rounded text-primary px-4 py-1   hover:bg-primary hover:text-white">
          {{ video.channel }}
        </h4>
      </div>
    </div>

    <div  class="flex items-center justify-between p-4">
      <h5 v-if="!showDownload" class="text-sm text-gray-500">{{ video.views }}</h5>
      <h5 v-if="!showDownload" class="text-sm text-gray-500">{{ video.publish_time }}</h5>
      <div v-if="showDownload" class="w-full ">
        <p  class="text-sm font-semibold text-slate-500"><span>{{ video.download_counter }}</span> lượt tải </p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type {IVideoItem} from '../types/index'



defineProps({
    video: {
      type: Object as () => IVideoItem,
      required: true
    },
    showDownload: {
      type: Boolean,
      default: false
    }
})
</script>

<style scoped>

</style>