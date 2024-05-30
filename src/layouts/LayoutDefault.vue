<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <AppHeader />
    </header>
    <main class="flex-grow max-w-full">
       <AppSearchData :type="type"/>
      <slot></slot>
        
    </main>
    <footer>
        <AppFooter/>
    </footer>
  </div>
  </template>

<script setup lang="ts">
// import AppHeader from '../components/App/AppHeader.vue'
// import AppFooter from '../components/App/AppFooter.vue'
// import  AppSearchData from '@/components/App/AppSearchData.vue';
import { defineAsyncComponent } from 'vue';
const AppSearchData = defineAsyncComponent(() => import('@/components/App/AppSearchData.vue'));
const AppHeader = defineAsyncComponent(() => import('@/components/App/AppHeader.vue'));
const AppFooter = defineAsyncComponent(() => import('@/components/App/AppFooter.vue'));
defineProps({
  type: {
    type: String,
    default: 'youtube',
  },
})

</script>

<style scoped>

</style>