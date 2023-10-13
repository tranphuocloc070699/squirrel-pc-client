<template>
    <LayoutDefault>
        
        <ChannelInfo :channel="youtubeStore.channelInfo" :loading="youtubeStore.searchVideoLoading"></ChannelInfo>
        <VideoList v-show="youtubeStore.searchVideoLoading || youtubeStore.searchVideos.length>0" :loading="youtubeStore.searchVideoLoading" title="VIDEO FROM CHANNEL" icon="/star.svg" :videos="youtubeStore.searchVideos"></VideoList>
    </LayoutDefault>
</template>

<script setup lang="ts">
import {watch} from 'vue'
import {useRoute} from 'vue-router'
import { useYoutubeStore } from '@/stores/youtube.store';
import VideoList from '@/components/VideoList.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import ChannelInfo from '@/components/ChannelInfo.vue';

const route = useRoute();
const youtubeStore = useYoutubeStore();
watch(
  () => route.params,
  async (routeParams) => {
    if (routeParams?.id && typeof routeParams?.id === 'string') {
     youtubeStore.listVideoByChannelId(
        routeParams.id
      )

      
    }
  },
  { immediate: true }
)
</script>

<style scoped>

</style>