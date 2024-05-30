<template>
  <div>
    <div
      class="w-full border border-slate-400 rounded-md mt-4 flex items-center hover:shadow transition-shadow"
    >
      <div class="px-2 h-full flex flex-col items-start justify-start">
        <span class="font-semibold text-primary">345</span>
      </div>
      <div class="mx-3 py-2">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-sm">USername</h3>
          
          <!--  <img  src="/liked.svg" alt="" class="w-5 h-5"> -->
        <div class="flex">
            <img src="/trash.svg"  width="20"
            height="20"
            class="w-5 h-5 cursor-pointer hover:scale-x-110 transition-transform mr-6" alt="">
          <img
            src="/like.svg"
            alt=""
            width="20"
            height="20"
            class="w-5 h-5 cursor-pointer hover:scale-x-110 transition-transform"
          />
        </div>
        </div>
        <p class="bg-gray-200 px-2 py-1 mt-2 rounded-md text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quisquam, voluptatum.
        </p>
        <ReplyItem />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReplyItem from '@/components/Feedback/ReplyItem.vue';

</script>

<style scoped></style>
