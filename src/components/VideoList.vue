<template>
  <div class="mt-8">

    <div class="mx-auto max-w-7xl w-full flex items-center justify-between px-4">
      <h3 class=" flex items-center">
      <img :src="`/src/assets/images${icon}`" />
      <span class="ml-2 mt-1 font-semibold text-xl">{{ title }}<span class="ml-2">{{ videoCountingForSearch}}</span></span>
    </h3>  
    <div v-show="countrySelect">
      <slot ></slot>
    </div>
    </div>
  

    <div class="mt-8 mx-auto max-w-7xl w-full grid gap-8 px-4 grid-auto-fill">
      <VideoItem v-show="!loading && videos.length>0" v-for="video in videos" :key="video.id" :video="video" />

      <div v-for="n in 4" :key="n">
        <VideoItemSkeleton v-show="loading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IVideoItem } from '@/types'
import VideoItem from './VideoItem.vue'
import VideoItemSkeleton from './Loading/VideoItemSkeleton.vue'
import { computed } from 'vue'

const props = defineProps({
  videos: {
    type: Array<IVideoItem>,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  countrySelect:{
    type: Boolean,
    default: false
  }
})

const videoCountingForSearch = computed(() => {
  return props.videos.length > 0 && props.title.toUpperCase()==='SEARCH' ? `(${props.videos.length} result)` : ''
})
</script>

<style scoped></style>
