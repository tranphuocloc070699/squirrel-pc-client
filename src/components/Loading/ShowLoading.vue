<template>
       <div
        role="status"
        class="mt-8 mx-4 md:mx-auto  w-full p-4 border border-slate-400 rounded-lg shadow animate-pulse md:p-6"
      >
        <div class="flex">
          <div class="rounded-md w-[64px] h-[64px] mt-4 bg-gray-200"></div>
          <div class="ml-4 flex-grow">
            <div class="h-2 w-full my-3 p-4 rounded-md bg-gray-200"></div>
            <div class="mt-4 h-2 w-full bg-gray-200 rounded-full"></div>
            <div class="mt-4 h-2 w-80 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>