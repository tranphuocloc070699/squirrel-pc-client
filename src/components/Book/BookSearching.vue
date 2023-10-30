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
      <input
        class="h-full flex-grow pl-4 outline-none border-none mr-4 text-slate-600 text-base"
        placeholder="File"
        id="keyword"
        name="keyword"
        type="file"
        @change="handleFileChange"
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
import { useBookStore } from '@/stores/book.store'

const bookStore = useBookStore()
interface ISearch {
  keyword: string
}

import { reactive } from 'vue'
import type { IParams } from '@/types'
import { useRoute, useRouter } from 'vue-router'
import { logError } from '@/utils/logError'
import type { AxiosProgressEvent } from 'axios'
const searchData = reactive<ISearch>({
  keyword: ''
})
const route = useRoute()
const router = useRouter()

const onSubmit = async () => {
  if (route.name !== 'book') {
    router.push({ path: '/book' })
  }

 
}
// const params : IParams = {
//   keyword:searchData.keyword.trim(),
//   size: '30',
//   countryCode:'ES'
// }
// podcastStore.searchByKeyword(params)
//  searchData.keyword = ''

const handleProgress = (progressEvent: AxiosProgressEvent) => {
  console.log({ progressEvent })
}

const handleFileChange = (event : any) =>{

  // const params: IParams = {
  //   page_array:'1,2,3,4',
  //   file:  event.target?.files[0]
  // }

  // bookStore
  //   .uploadPdfFile(params, handleProgress)
  //   .then((response) => {
  //     if (response) {
  //       const blob = new Blob([response],{ type: 'audio/mpeg' })
  //       const url = window.URL.createObjectURL(blob)
  //       const a = document.createElement('a')
  //       a.href = url
  //       a.download = 'Hello' 
  //       a.style.display = 'none'
  //       a.target = '_blank'
  //       document.body.appendChild(a)
  //       a.click()
  //       window.URL.revokeObjectURL(url)
  //     }
  //   })
  //   .catch((error) => {
  //     logError(error, '[Browser BookSearching/uploadFile]')
  //   })
}
</script>

<style scoped></style>
