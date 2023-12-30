<template>
  <LayoutDefault type="podcast">
    <PodcastList
      v-show="podcastStore.searchPodcasts.loading || podcastStore.searchPodcasts.data.length > 0"
      :loading="podcastStore.searchPodcasts.loading"
      title="SEARCH"
      icon="search.svg"
      :podcasts="podcastStore.searchPodcasts.data"
    ></PodcastList>
    <PodcastTrending></PodcastTrending>
  </LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import PodcastTrending from '@/components/Podcast/PodcastTrending.vue'
import PodcastList from '@/components/Podcast/PodcastList.vue'
import { usePodcastStore } from '@/stores/podcast.store'

const podcastStore = usePodcastStore()
</script>

<style scoped></style>
