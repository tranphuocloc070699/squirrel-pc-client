<template>
  <div class="px-4 md:px-0">

    <form
      @submit.prevent="onSubmit"
      class="flex items-center mt-10 w-full max-w-2xl mx-auto border border-slate-400 rounded-sm overflow-hidden"
    >
      <!-- <div class="relative">
        <select
          v-model="searchData.type"
          class="block appearance-none min-w-[89px] w-full bg-white border-r border-gray-300 hover:border-slate-400 px-4 py-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-slate-400"
        >
          <option value="video">Video</option>
          <option value="channel">Channel</option>
        </select>
      </div> -->

      <input
        class="h-full flex-grow pl-4 outline-none border-none mr-4 text-slate-600 text-base"
        placeholder="Enter your keyword..."
        id="keyword"
        name="keyword"
        type="text"
        v-model="searchData.keyword"
      />
      <button
        class="bg-primary text-white font-medium outline-none border-none m-1 px-4 rounded-sm hidden md:block"
        type="submit"
      >
        SEARCH
      </button>
    </form>
   
  </div>
</template>

<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification'
import { useYoutubeStore } from '@/stores/youtube.store';

const { notify } = useNotification()
const youtubeStore = useYoutubeStore()

interface ISearch {
  keyword: string
  type: string
}
import { reactive } from 'vue'
import type { IParams } from '@/types';
import {useRoute,useRouter} from 'vue-router'
const searchData = reactive<ISearch>({
  keyword: '',
  type: 'video'
})
const route = useRoute();
const router = useRouter();

const  onSubmit = async () => {
  if (searchData.keyword.trim().length <= 1) {
    youtubeStore.searchVideos = []
    return;
  }

  if(route.name!=='home'){
    router.push({path:'/'})
  }

  const params : IParams = {
    keyword:searchData.keyword.trim(),
    size: '20',
  }
   youtubeStore.searchByKeyword(params)
   searchData.keyword = ''

}
</script>

<style scoped></style>
