<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <span @click="handleBackToHome" class="flex items-center cursor-pointer">
        <span class="self-center text-2xl font-lobster font-normal whitespace-nowrap text-gray-700"
          >Squirrel</span
        >
      </span>
      <div class="md:order-2 relative">
        <img
          class="cursor-pointer"
          @click="showSidebar = true"
          width="32"
          height="32"
          src="/src/assets/images/gallery.svg"
        />
        <span
          v-show="youtubeStore.savedVideos.length > 0"
          class="absolute text-xs h-5 w-5 top-[-7px] right-[-8px] flex items-center justify-center text-white bg-red-600 rounded-full p-1"
          >{{ youtubeStore.savedVideos.length }}</span
        >
      </div>
      <div
        class="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-cta"
      >
        <ul
          class="flex flex-col font-normal text-base font-noto p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white"
        >
          <li>
            <span @click="handleBackToHome" class="p-2 cursor-pointer hover:text-blue_557"
              >Youtube</span
            >
          </li>

          <!-- <li>
            <RouterLink to="/podcast" class="p-2 cursor-pointer hover:text-blue_557 "
              >Podcast</RouterLink
            >
          </li> -->
          <li>
            <RouterLink to="/book" class="p-2 cursor-pointer hover:text-blue_557"
              >Book</RouterLink
            >
          </li>
          <li v-show="isAdmin">
            <RouterLink to="/admin" class="p-2 cursor-pointer hover:text-blue_557"
              >Admin</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <SidebarHeader
    :showSidebar="showSidebar"
    @toggleSidebar="(value: boolean) => (showSidebar = value)"
  />
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

import { useYoutubeStore } from '@/stores/youtube.store'
import { onMounted, ref } from 'vue'
import SidebarHeader from '../Sidebar/SidebarHeader.vue'
import type { ISidebarVideoItem } from '@/types'
const router = useRouter()
const youtubeStore = useYoutubeStore()
const isAdmin = ref(false)
const showSidebar = ref(false)

const handleBackToHome = () => {
  // if (youtubeStore.searchVideos.length > 0) {
  //   youtubeStore.searchVideos = []
  // }
  router.push({ path: '/' })
}

onMounted(() => {
  const adminData = localStorage.getItem("admin");
  if(adminData && adminData=='true') isAdmin.value = true;

  const savedVideos: ISidebarVideoItem[] = localStorage.getItem('savedVideos')
    ? JSON.parse(localStorage.getItem('savedVideos')!)
    : []
  youtubeStore.savedVideos = savedVideos
})
</script>

<style lang="scss" scoped></style>
