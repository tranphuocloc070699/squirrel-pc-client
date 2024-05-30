<template>
    <div>
      
        <PodcastList
        v-show="podcastStore.podcastTrendingLists.news.loading || podcastStore.podcastTrendingLists.news.data.length > 0"
      :loading="podcastStore.podcastTrendingLists.news.loading"
      title="NEWS"
      icon="star.svg"
      :podcasts="podcastStore.podcastTrendingLists.news.data"
      :country-select="false"
        >
        </PodcastList>
        <PodcastList
        v-show="podcastStore.podcastTrendingLists.technology.loading || podcastStore.podcastTrendingLists.technology.data.length > 0"
      :loading="podcastStore.podcastTrendingLists.technology.loading"
      title="TECHNOLOGY"
      icon="star.svg"
      :podcasts="podcastStore.podcastTrendingLists.technology.data"
      :country-select="false"
        >
        </PodcastList>
        <PodcastList
        v-show="podcastStore.podcastTrendingLists.economy.loading || podcastStore.podcastTrendingLists.economy.data.length > 0"
      :loading="podcastStore.podcastTrendingLists.economy.loading"
      title="ECONOMIC"
      icon="star.svg"
      :podcasts="podcastStore.podcastTrendingLists.economy.data"
      :country-select="false"
        >
        </PodcastList>
    </div>
</template>

<script setup lang="ts">
import { usePodcastStore } from '@/stores/podcast.store';
import type { IParams } from '@/types';
import { watch } from 'vue';
import PodcastList from './PodcastList.vue';
const podcastStore = usePodcastStore()

watch(
  () => podcastStore.selectedCountry,
  async () => {
    podcastStore.getPodcastTrendingList()
  },
  { immediate: true }
)
</script>

<style scoped>

</style>