<template>
  <LayoutDefault>
    <VideoChannelInfo
      :channel="youtubeStore.channelInfo"
      :loading="youtubeStore.channelInfoLoading"
      :error-message="youtubeStore.channelInfoErrorMessage"
    ></VideoChannelInfo>
    <VideoList
      
      :loading="youtubeStore.searchVideoLoading"
      title="VIDEO FROM CHANNEL"
      icon="star.svg"
      :videos="youtubeStore.searchVideos"
      :error-message="youtubeStore.listVideoErrorMessage"
    ></VideoList>
  </LayoutDefault>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useYoutubeStore } from '@/stores/youtube.store'
import VideoList from '@/components/Video/VideoList.vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import VideoChannelInfo from '@/components/Video/VideoChannelInfo.vue'

const route = useRoute()
const youtubeStore = useYoutubeStore()
watch(
  () => route.params,
  async (routeParams) => {
    if (routeParams?.id && typeof routeParams?.id === 'string') {
      youtubeStore.listVideoByChannelId(routeParams.id)
      youtubeStore.getChannelInfoByChannelId(routeParams.id)
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
