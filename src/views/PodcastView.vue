<template>
  <LayoutDefault type="podcast">
    <PodcastList
      v-show="podcastStore.searchPodcasts.loading || podcastStore.searchPodcasts.data.length > 0"
      :loading="podcastStore.searchPodcasts.loading"
      title="SEARCH"
      icon="/search.svg"
      :podcasts="podcastStore.searchPodcasts.data"
    ></PodcastList>
    <TrendingPodcast></TrendingPodcast>
  </LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import TrendingPodcast from '@/components/TrendingPodcast.vue'
import PodcastList from '@/components/PodcastList.vue'
import { usePodcastStore } from '@/stores/podcast.store'

const podcastStore = usePodcastStore()
</script>

<style scoped></style>
