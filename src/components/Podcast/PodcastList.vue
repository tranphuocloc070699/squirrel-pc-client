<template>
    <div class="mt-8">
    <div class="mx-auto max-w-7xl w-full flex items-center justify-between px-4">
      <h3 class="flex items-center">
        <img :src="`/${icon}`" />
        <span class="ml-2 mt-1 font-noto text-xl"
          >{{ title }}</span
        >
      </h3>
      <!-- <div v-show="countrySelect">
        <slot></slot>
      </div> -->
    </div>

    <div
      class="w-full max-w-7xl mt-8 mx-auto "
      v-show="!loading && podcasts.length === 0 && errorMessage.length > 0"
    >
      <span class="font-semibold text-base text-slate-500 shadow rounded-lg p-4 mx-4">{{ errorMessage }}</span>
    </div>

    <div class="mt-8 mx-auto max-w-7xl w-full grid gap-8 px-4 grid-auto-fill">
       
        <PodcastItem
        v-for="podcast in podcasts"
        :key="podcast.id"
        v-show="!loading && podcasts.length > 0"
        :podcast="podcast"
      />
   
      <div v-for="n in 6" :key="n">
        <VideoItemSkeleton v-show="loading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPodcastItem } from '@/types'
import PodcastItem from './PodcastItem.vue'
import VideoItemSkeleton from '../Loading/VideoItemSkeleton.vue'



const props = defineProps({
  podcasts: {
    type: Array<IPodcastItem>,
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
  errorMessage: {
    type: String,
    default: ''
  },
  countrySelect: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

</style>