<template>
  <LayoutDefault>
    
    <VideoList v-show="youtubeStore.searchVideoLoading || youtubeStore.searchVideos.length>0" :loading="youtubeStore.searchVideoLoading" title="SEARCH" icon="/search.svg" :videos="youtubeStore.searchVideos"></VideoList>
  </LayoutDefault>
</template>

<script setup lang="ts">
import Searcher from '@/components/Searcher.vue';
import VideoList from '@/components/VideoList.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import { useYoutubeStore } from '@/stores/youtube.store';
import { onMounted } from 'vue';

const youtubeStore = useYoutubeStore()

onMounted(() =>{
 
})  

</script>

<style scoped>

</style>