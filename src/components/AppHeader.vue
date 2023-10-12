<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <span @click="handleBackToHome" class="flex items-center cursor-pointer">
        <img src="/src/assets/images/squirrel-icon.svg" class="h-8 mr-3" alt="Flowbite Logo" />
        <span class="self-center text-2xl text-primary font-semibold whitespace-nowrap"
          >Squirrel</span
        >
      </span>
      <div class="flex md:order-2">
        <img  class="cursor-pointer" @click="showSidebar = true" width="32" height="32" src="/src/assets/images/gallery.svg" />
        <!-- <button
      
          type="button"
          class="text-white bg-primary hover:bg-primary focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
        >
          Get started
        </button> -->
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-cta"
      >
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white"
        >
          <li>
            <span @click="handleBackToHome" class="p-2 cursor-pointer hover:text-primary text-xl"
              >Home</span
            >
          </li>
          <li>
            <RouterLink to="/about" class="p-2 cursor-pointer hover:text-primary text-xl"
              >About</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <SidebarHeader :showSidebar="showSidebar" @toggleSidebar="(value : boolean) => showSidebar=value"/>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

import { useYoutubeStore } from '@/stores/youtube.store'
import { ref } from 'vue'
import SidebarHeader from './SidebarHeader.vue';
const router = useRouter()
const youtubeStore = useYoutubeStore()

const showSidebar = ref(false)

const handleBackToHome = () => {
  if (youtubeStore.searchVideos.length > 0) {
    youtubeStore.searchVideos = []
  }
  router.push({ path: '/' })
}
</script>

<style lang="scss" scoped></style>
