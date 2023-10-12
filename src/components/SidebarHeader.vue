<template>
    <div>
    <div
      class="fixed inset-0 bg-black opacity-50 z-40 transition-opacity"
      v-show="showSidebar"
      @click="$emit('toggleSidebar', false)"
    ></div>

    <!-- Sidebar content -->
    <div
      class="fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50 shadow-lg transition-transform transform duration-300"
      :class="{ 'translate-x-full': !showSidebar }"
    >
      <!-- Sidebar header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-center text-gray-800">
          STORING
     
        </h2>
        <button class="text-gray-500 hover:text-gray-600"  @click="$emit('toggleSidebar', false)">
          <svg class="w-10 h-10 fill-current" viewBox="0 0 24 24">
            <path
              d="M6.7 5.3a1 1 0 0 1 1.4 0L12 10.6l3.9-3.9a1 1 0 1 1 1.4 1.4L13.4 12l3.9 3.9a1 1 0 0 1-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 0 1-1.4-1.4L10.6 12 6.7 8.1a1 1 0 0 1 0-1.4z"
            />
          </svg>
        </button>
      </div>
      <!-- Sidebar Controls All -->
      <span class="flex items-center cursor-pointer  px-4 py-3 border-b border-gray-200">
        <p class="text-base hover:underline font-semibold text-green_379 text-center">Download All</p>
        <img src="/src/assets/images/download-icon.svg" width="16" height="16" class=" ml-2 mb-[2px]" />
       
      </span>

      <!-- Sidebar content -->
      <div>
        <SidebarVideoItem v-for="item in 6" :key="item" />
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import SidebarVideoItem from './SidebarVideoItem.vue';
 defineProps({
    showSidebar: {
        type: Boolean,
        default: false
    }
    })

    const toggleSidebar = () => {
        
    }

</script>

<style scoped>

</style>