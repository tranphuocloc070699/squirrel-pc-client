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

watch(
  () => youtubeStore.selectedCountry,
  async () => {
    console.log('watched')
    adminStore.hellUser();
  },
  { immediate: true }
)


onMounted( () =>{
  console.log('mounted')
  window.addEventListener('beforeunload',  function  (e) { 
            e.preventDefault(); 
            this.alert('hello')
            adminStore.hellUser();
        }); 
})

</script>

<style scoped>

</style>