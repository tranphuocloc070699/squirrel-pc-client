<template>
  <LayoutDefault>
    <div
      class="mt-8 mx-auto max-w-4xl w-full flex items-start flex-wrap md:flex-nowrap px-4 md:px-0"
    >
      <VideoItemSkeleton v-show="youtubeStore.searchVideoLoading"/>
      <VideoItem  v-if="youtubeStore.detailVideo.id.length>0" class="w-full md:max-w-xs" :video="youtubeStore.detailVideo" :show-download="true"></VideoItem>
      <DownloadList v-show="!youtubeStore.getListDownloadLoading && youtubeStore.listDownload" class="md:ml-6 flex-grow"/>
      <DownloadItemSkeleton v-show="youtubeStore.getListDownloadLoading && !youtubeStore.listDownload" class="md:ml-6 flex-grow"/>
    </div>
  </LayoutDefault>
</template>

<script setup lang="ts">
import DownloadList from '@/components/Video/DownloadList.vue'
import VideoItem from '@/components/Video/VideoItem.vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import type { IParams } from '@/types'
import { useRoute } from 'vue-router'
import {  watch } from 'vue'
import { useYoutubeStore } from '@/stores/youtube.store'
import  VideoItemSkeleton from '@/components/Loading/VideoItemSkeleton.vue'
import DownloadItemSkeleton from '@/components/Loading/DownloadItemSkeleton.vue'
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
