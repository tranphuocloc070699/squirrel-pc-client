<template>
  <div class="flex p-4 last:mb-0 border-b border-slate-400 relative">
    <img
      src="/src/assets/images/trash.svg"
      width="16"
      height="16"
      class="cursor-pointer absolute top-3 right-4 hover:opacity-70"
    />
    <img
      class="rounded-md w-24 h-24"
      src="/src/assets/images/Aphelios_0.jpg"
      alt="image sidebar"
      width="100"
      height="140"
    />
    <div class="flex flex-col justify-between">
      <h3 class="ellipsis-line ml-2 leading-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur harum nulla pariatur
        quaerat, molestias accusamus doloribus fugiat consectetur possimus et commodi eum neque
        animi, exercitationem iure vel? Beatae, at nesciunt!
      </h3>
      <div class="w-full bg-gray-200 rounded-full mx-2 mb-1 " v-show="progress.showProgressBar">
      <div
        class="bg-blue_739 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full whitespace-nowrap"
        :style="{ width: `${progress.downloadProgress}%` }"
      >
        {{ progress.loaded }} / {{ progress.total }}
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const progress = reactive({
  showProgressBar: true,
  downloadProgress: 50,
  total:'',
    loaded:''
})

</script>

<style scoped>
.ellipsis-line {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
