<template>
  <LayoutDefault>
    <div
      class="mt-8 mx-auto max-w-4xl w-full flex items-start flex-wrap md:flex-nowrap px-4 md:px-0"
    >
      <VideoItemSkeleton v-show="youtubeStore.searchVideoLoading"/>
      <VideoItem  v-if="youtubeStore.searchVideos[0]" class="w-full md:max-w-xs" :video="youtubeStore.searchVideos[0]" :show-download="true"></VideoItem>
      <DownloadList class="md:ml-6 flex-grow"/>
    </div>
  </LayoutDefault>
</template>

<script setup lang="ts">
import DownloadList from '@/components/DownloadList.vue'
import VideoItem from '@/components/VideoItem.vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import type { IParams } from '@/types'
import { useRoute } from 'vue-router'
import {  watch } from 'vue'
import { useYoutubeStore } from '@/stores/youtube.store'
import  VideoItemSkeleton from '@/components/Loading/VideoItemSkeleton.vue'

const route = useRoute()
const youtubeStore = useYoutubeStore()
watch(
  () => route.params,
  async (routeParams) => {
    if (routeParams?.id && typeof routeParams?.id === 'string') {
      youtubeStore.getListDownload(
        routeParams.id
      )

      const searchParams: IParams = {
        keyword: `https://www.youtube.com/watch?v=${routeParams.id}`,
        size: '1'
      }
  youtubeStore.searchByKeyword(searchParams)
  
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
