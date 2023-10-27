<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <AppHeader />
    </header>
    <main class="flex-grow max-w-full">
       <VideoSearching v-if="type==='youtube'"/>
       <PodcastSearching v-if="type==='podcast'"/>
      <slot></slot>
        
    </main>
    <footer>
        <AppFooter/>
    </footer>
  </div>
  </template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import VideoSearching from '@/components/VideoSearching.vue';
import PodcastSearching from '@/components/PodcastSearching.vue';


defineProps({
  type: {
    type: String,
    default: 'youtube',
  },
})

</script>

<style scoped>

</style>