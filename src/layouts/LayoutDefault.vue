<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <AppHeader />
    </header>
    <main class="flex-grow max-w-full">
       <VideoSearching v-if="type==='youtube'"/>
       <PodcastSearching v-if="type==='podcast'"/>
       <BookSearching v-if="type==='book'"/>
      <slot></slot>
        
    </main>
    <footer>
        <AppFooter/>
    </footer>
  </div>
  </template>

<script setup lang="ts">
import AppHeader from '../components/App/AppHeader.vue'
import AppFooter from '../components/App/AppFooter.vue'
import VideoSearching from '@/components/Video/VideoSearching.vue';
import PodcastSearching from '@/components/Podcast/PodcastSearching.vue';
import  BookSearching from '@/components/Book/BookSearching.vue';


defineProps({
  type: {
    type: String,
    default: 'youtube',
  },
})

</script>

<style scoped>

</style>