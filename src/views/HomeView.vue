<template>
  <LayoutDefault>
    
    <VideoList v-show="youtubeStore.searchVideoLoading || youtubeStore.searchVideos.length>0" :loading="youtubeStore.searchVideoLoading" title="SEARCH" icon="/search.svg" :videos="youtubeStore.searchVideos"></VideoList>
    <TrendingVideo></TrendingVideo>
  </LayoutDefault>
</template>

<script setup lang="ts">
import  TrendingVideo from '@/components/TrendingVideo.vue';
import VideoList from '@/components/VideoList.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import { useYoutubeStore } from '@/stores/youtube.store';

const youtubeStore = useYoutubeStore()


</script>

<style scoped>

</style>