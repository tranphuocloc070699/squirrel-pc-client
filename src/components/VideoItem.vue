<template>
  <div
    @click="handleClick"
    class="flex flex-col justify-between border border-df rounded cursor-pointer hover:shadow transition-shadow"
  >
    <div>
      <img
        :src="video.thumbnails[0].url"
        alt="Image"
        class="w-full h-48 object-cover rounded-t-sm"
      />
      <div class="p-4">
        <h3 class="text-xl mb-1">
          {{ video.title }} <span class="text-sm">({{ video.duration }})</span>
        </h3>
        <RouterLink
        v-if="video.channel_name && video.channel_name.length>0"
        :to="`/channel/${props.video.channel_id}`"
          class="mt-2 text-sm inline-block border border-primary rounded text-primary px-4 py-1 hover:bg-primary hover:text-white"
         
        >
          {{ video.channel_name }}
        </RouterLink>
      </div>
    </div>

    <div class="flex items-end justify-between p-4">
      <div>
        <h5 v-if="!showDownload" class="text-sm text-gray-500">{{ video.views }}</h5>
      <h5 v-if="!showDownload" class="text-sm text-gray-500">{{ video.publish_time }}</h5>
      </div>
      <img ref="plusVideoToStorage"  src="/src/assets/images/plus.svg" width="24" height="24" class="border border-blue_739 rounded p-1 z-10" />
      <!-- <div v-if="showDownload" class="w-full">
        <p class="text-sm font-semibold text-slate-500">
          <span>{{ video.download_counter }}</span> lượt tải
        </p>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink,useRouter} from 'vue-router'
import type { IVideoItem } from '../types/index'
import {ref} from 'vue'
import { useYoutubeStore } from '@/stores/youtube.store';
import { useNotification } from '@kyvg/vue3-notification'

const router = useRouter();
const plusVideoToStorage = ref(null)
const youtubeStore = useYoutubeStore()
const { notify } = useNotification()

const props = defineProps({
  video: {
    type: Object as () => IVideoItem,
    required: true
  },
  showDownload: {
    type: Boolean,
    default: false
  }
})

const handleClick = (event : MouseEvent) => {
  if(event.target === plusVideoToStorage.value){
    handleAddToStorage();
  }else{
    router.push({ path: `/video/${props.video.id}` })
  }

}
const handleAddToStorage = () => {
  const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]') as IVideoItem[]
  if(savedVideos.findIndex((video : IVideoItem) => video.id === props.video.id) > -1){
    return
  }
  if(youtubeStore.savedVideos.findIndex((video : IVideoItem) => video.id === props.video.id) > -1){
    notify({
      title: 'WARNING',
      text: 'This video is already in your storage',
      duration: 3000,
      type: 'warn'
    })
    return
  }
  notify({
      title: 'SUCCESS',
      text: 'Add video successfully',
      duration: 2000,
      type: 'success'
    })
 
  youtubeStore.savedVideos.push(props.video);
  savedVideos.push(props.video);
  localStorage.setItem('savedVideos', JSON.stringify(savedVideos))
}


</script>

<style scoped></style>
