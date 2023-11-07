<template>
  <LayoutDefault>
    
    <VideoList v-show="youtubeStore.searchVideoLoading || youtubeStore.searchVideos.length>0" :loading="youtubeStore.searchVideoLoading" title="SEARCH" icon="/search.svg" :videos="youtubeStore.searchVideos"></VideoList>
    <VideoTrending></VideoTrending>
  </LayoutDefault>
</template>

<script setup lang="ts">
import  VideoTrending from '@/components/Video/VideoTrending.vue';
import VideoList from '@/components/Video/VideoList.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import { useYoutubeStore } from '@/stores/youtube.store';
import {useAdminStore} from '@/stores/admin.store'
import { onMounted, watch } from 'vue';

const youtubeStore = useYoutubeStore()
const adminStore = useAdminStore();




onMounted( () =>{
  console.log('mounted on homeview')
})

</script>

<style scoped>

</style>