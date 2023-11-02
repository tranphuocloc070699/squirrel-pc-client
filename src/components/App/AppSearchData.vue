<template>
  <div class="px-4 md:px-0">
    <div
      class="flex items-center mt-10 w-full max-w-lg mx-auto border border-border_gray rounded-full overflow-hidden"
    >
      <input
        class="h-full font-light flex-grow px-4 py-2 outline-none border-none mr-4 text-slate-600 text-base"
        :placeholder="`Search for ${type}...`"
        id="keyword"
        name="keyword"
        type="text"
        v-model="searchData.keyword"
        @keyup.enter="onSubmit"
      />
      <img
        @click="onSubmit"
        src="/src/assets/images/search-gray.svg"
        class="text-white m-1 px-4 block"
        type="submit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useYoutubeStore } from '@/stores/youtube.store'
import { usePodcastStore } from '@/stores/podcast.store'
import { useBookStore } from '@/stores/book.store'

const podcastStore = usePodcastStore()
const youtubeStore = useYoutubeStore()
const bookStore = useBookStore()
interface ISearch {
  keyword: string
}

import { reactive, watch } from 'vue'
import type { IParams } from '@/types'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const props = defineProps({
  type: {
    type: String,
    default: ''
  }
})



watch(
  () => bookStore.searchBook.country_code,
  async () => {
   
    const payload: IParams = {
      keyword: bookStore.searchBook.keyword,
      countryCode: bookStore.searchBook.country_code
    }
    if (payload.keyword.length > 0 && payload.countryCode === 'all') {
      bookStore.findByNamesContaining(bookStore.searchBook.keyword)
    } else {
      bookStore.findByNamesContainingAndCountryCode(payload)
    }
  }
)

const searchData = reactive<ISearch>({
  keyword: ''
})

const onSubmit = async () => {
  if(searchData.keyword.trim().length===0){
    alert('Cannot search with keyword length less than 2')
  }
  switch (props.type) {
    case 'youtube':
      youtubeSubmit()
      break
    case 'podcast':
      podcastSubmit()
      break
    case 'book':
      bookSubmit()
      break

    default:
      break
  }
}

const youtubeSubmit = () => {
  if (searchData.keyword.trim().length <= 1) {
    youtubeStore.searchVideos = []
    return
  }

  if (route.name !== 'home') {
    router.push({ path: '/' })
  }

  const params: IParams = {
    keyword: searchData.keyword.trim(),
    size: '20'
  }
  youtubeStore.searchByKeyword(params)
  searchData.keyword = ''
}

const podcastSubmit = () => {
  if (route.name !== 'podcast') {
    router.push({ path: '/podcast' })
  }
  const params: IParams = {
    keyword: searchData.keyword.trim(),
    size: '30',
    countryCode: 'ES'
  }
  podcastStore.searchByKeyword(params)
  searchData.keyword = ''
}

const bookSubmit = async () => {
  if (route.name !== 'book') {
    router.push({ path: '/book' })
  }

  bookStore.searchBook.keyword = searchData.keyword;

    bookStore.findByNamesContaining(searchData.keyword)
  
}
</script>

<style scoped></style>
