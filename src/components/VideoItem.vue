<template>
  <div
   
    class="flex flex-col justify-between border border-df rounded hover:shadow transition-shadow"
  >

    <div>
      <img
      @click="handleClick"
        :src="video.thumbnails[0].url"
        alt="Image"
        class="w-full h-48 object-cover rounded-t-sm cursor-pointer "
      />
      <div  @click="handleClick" class="p-4 cursor-pointer ">
        <h3 class="text-xl ellipsis-line">
          {{ video.title }}
        </h3>
        <div class="flex items-center mt-1">
          <h4 class="text-xs text-gray-500">{{ video.duration }}</h4>
          <div v-show="video.duration.length>0" class="mx-2 h-[4px] w-[4px] bg-gray-500 rounded-full"></div>
          <h4 class="text-xs text-gray-500">{{ video.publish_time }}</h4>

          <div v-show="video.publish_time.length>0" class="mx-2 h-[4px] w-[4px] bg-gray-500 rounded-full"></div>
          <h4 class="text-xs text-gray-500">{{ video.views }}</h4>
        </div>
        <h5
        ref="channelNameRef"
          v-if="video.channel_name && video.channel_name.length > 0"
          class="mt-3 text-sm inline-block border border-primary rounded text-primary px-4 py-1 hover:bg-primary hover:text-white"
        >
          {{ video.channel_name }}
        </h5>
      </div>
    </div>

    <div class="flex items-center justify-between p-4">
      <a ref="youtubeLinkRef" :href="`${YOUTUBE_LINK}${video.id}`" target="_blank">
        <img src="/src/assets/images/youtube.png" />
      </a>
      <img
        v-show="!isAdded"
        ref="plusVideoToStorageRef"
        src="/src/assets/images/plus.svg"
        width="24"
        height="24"
        class="border border-blue_739 rounded p-1 z-10"
      />
      <!-- <div v-if="showDownload" class="w-full">
        <p class="text-sm font-semibold text-slate-500">
          <span>{{ video.download_counter }}</span> lượt tải
        </p>
      </div> -->
    </div>
      
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import type { ISidebarVideoItem, IVideoItem } from '../types/index'
import { computed, ref } from 'vue'
import { useYoutubeStore } from '@/stores/youtube.store'
import { useNotification } from '@kyvg/vue3-notification'

const YOUTUBE_LINK = 'https://www.youtube.com/watch?v='
const router = useRouter()
const plusVideoToStorageRef = ref(null)
const youtubeLinkRef = ref(null)
const channelNameRef = ref(null)
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

const isAdded = computed(() => {
  return (
    youtubeStore.savedVideos.findIndex(
      (item: ISidebarVideoItem) => item.video.id === props.video.id
    ) > -1
  )
})

const handleClick = (event: MouseEvent) => {
  if (event.target === plusVideoToStorageRef.value) {
    handleAddToStorage()
  } 
  else if (event.target === channelNameRef.value) {
    router.push({ path: `/channel/${props.video.channel_id}` })
  }  
  else if (event.target === youtubeLinkRef.value) {
    return
  } else {
    router.push({ path: `/video/${props.video.id}` })
  }
}
const handleAddToStorage = () => {
  if (
    youtubeStore.savedVideos.findIndex(
      (item: ISidebarVideoItem) => item.video.id === props.video.id
    ) > -1
  ) return;

  notify({
    title: 'SUCCESS',
    text: 'Add video successfully',
    duration: 2000,
    type: 'success'
  })

  youtubeStore.savedVideos.push({ video: props.video })

  localStorage.setItem('savedVideos', JSON.stringify(youtubeStore.savedVideos))
}
</script>

<style scoped></style>
