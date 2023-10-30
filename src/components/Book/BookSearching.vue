<template>
  <div class="px-4 md:px-0">
    <form
      @submit.prevent="onSubmit"
      class="flex items-center mt-10 w-full max-w-2xl mx-auto border border-slate-400 rounded-sm overflow-hidden"
    >
      <input
        class="h-full flex-grow pl-4 outline-none border-none mr-4 text-slate-600 text-base"
        placeholder="Search for book..."
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
import { useBookStore } from '@/stores/book.store';

const bookStore = useBookStore()
interface ISearch {
  keyword: string
}

import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const searchData = reactive<ISearch>({
  keyword: ''
})
const route = useRoute()
const router = useRouter()

const onSubmit = async () => {
  if (route.name !== 'book') {
    router.push({ path: '/book' })
  }

  if (searchData.keyword.length > 0) {
    await bookStore.findByNamesContaining(searchData.keyword)
  } 
}


</script>

<style scoped></style>
