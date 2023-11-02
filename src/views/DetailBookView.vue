<template>
  <LayoutDefault type="book">
    <div
      v-show="!bookStore.bookDetailLoading && bookDetail.book.name.length > 0"
      class="w-full max-w-2xl mx-auto flex md:flex-nowrap flex-wrap items-start mt-10 justify-between px-4 md:px-0"
    >
      <div class="flex items-start flex-wrap md:flex-nowrap flex-grow">
        <img
          :src="bookDetail.book.thumbnail"
          class="rounded-md md:max-w-[40%] w-full h-auto shadow-xl"
        />
        <div class="md:mx-4 mt-4 md:mt-0">
          <h2 class="text-xl font-semibold">{{ bookDetail.book.name }}</h2>
          <h3 class="mt-2 text-sm font-medium">
            Author:<RouterLink
              :to="`/author/${bookDetail.book.author.id}`"
              class="text-blue-600 ml-2"
              >{{ bookDetail.book.author.name }}</RouterLink
            >
          </h3>
          <h3 class="mt-1 text-sm font-medium">
            Category:<RouterLink
              :to="`/category/${bookDetail.book.author.id}`"
              class="text-blue-600 ml-2"
              >{{ bookDetail.book.category.name }}</RouterLink
            >
          </h3>
          <h3 class="mt-1 text-sm font-medium">
            Language:<span class="ml-2">{{ languageComputed }}</span>
          </h3>
          <h3 class="mt-1 text-sm font-medium">
            Release Year:<span class="ml-2">{{ bookDetail.book.published_year }}</span>
          </h3>
        </div>
      </div>
      <div class="mt-4 md:mt-0 flex flex-col flex-grow md:flex-grow-0 items-end">
        <button
          @click="downloadFile('mp3')"
          class="px-3 py-2 md:w-40 w-full flex items-center justify-center text-sx font-semibold text-white bg-blue-600 rounded-sm"
        >
          <svg
            class="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span class="text-sm">Download Audio</span>
        </button>
        <button
          @click="downloadFile('pdf')"
          class="mt-4 px-3 py-2 text-sx justify-center md:w-40 w-full font-semibold text-white bg-orange-700 flex items-center rounded-sm"
        >
          <svg
            class="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span class="text-sm">Download PDF</span>
        </button>
      </div>
    </div>
   
    <AuthorLoading  v-show="bookStore.bookDetailLoading"/>

    <p v-show="progress.showProgressBar" class="mt-6 font-medium text-sm w-full max-w-2xl mx-auto">
      {{ bookDetail.book.name }} downloading...
    </p>

    <div
      class="mt-2 w-full max-w-2xl mx-auto bg-gray-200 rounded-full"
      v-show="progress.showProgressBar"
    >
      <div
        class="bg-blue_739 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full whitespace-nowrap"
        :style="{ width: `${progress.downloadProgress}%` }"
      >
        {{ progress.loaded }} / {{ progress.total }}
      </div>
    </div>

    <BookList
      :books="bookDetail.related_list"
      title="Related List"
      icon="/star.svg"
      :loading="bookStore.bookDetailLoading"
      :isTitleCenter="true"
      class="mt-20"
    />
  </LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import { useBookStore } from '@/stores/book.store'
import type { IBookDetailResponse } from '@/types'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import BookList from '@/components/Book/BookList.vue'
import { convertedSentence } from '@/utils/converter'
import { useYoutubeStore } from '@/stores/youtube.store'
import type { AxiosProgressEvent } from 'axios'
import { logError } from '@/utils/logError'
import { formatBytes } from '@/utils/formatBtyes'
import jsonFile from '@/assets/json/book-countries.json'
import AuthorLoading from '@/components/Loading/AuthorLoading.vue'
const bookStore = useBookStore()
const youtubeStore = useYoutubeStore()
const route = useRoute()

const bookDetail = ref<IBookDetailResponse>({
  book: {
    id: 0,
    name: '',
    description: '',
    thumbnail: '',
    audio_url: '',
    pdf_url: '',
    created_at: new Date(),
    downloaded: 0,
    published_year: 0,
    country_code: '',
    category: {
      id: 0,
      name: ''
    },
    author: {
      id: 0,
      name: '',
      description: '',
      thumbnail: ''
    }
  },
  related_list: []
})

const progress = reactive({
  showProgressBar: false,
  downloadProgress: 0,
  total: '',
  loaded: ''
})
watch(
  () => route.params,
  async (routeParams) => {
    if (
      routeParams?.id &&
      typeof routeParams?.id === 'string' &&
      route.query.category &&
      typeof route.query.category === 'string'
    ) {
      const id = routeParams.id
      const category = route.query.category
      bookStore
        .findById(Number.parseInt(id), Number.parseInt(category))
        .then((data) => {
          if (data) {
            bookDetail.value = data
          }
        })
        .catch((error) => {
          console.log({ error })
        })
    }
  },

  { immediate: true }
)

const languageComputed = computed(() => {
  const index = jsonFile.findIndex((item) => item.code === bookDetail.value.book.country_code)
  if (index !== -1) return jsonFile[index].name
  else return ''
})

const downloadFile = (type: 'pdf' | 'mp3') => {
  const url = type === 'pdf' ? bookDetail.value.book.pdf_url : bookDetail.value.book.audio_url

  const params = {
    url
  }
  progress.showProgressBar = true
  youtubeStore
    .downloadFile(params, handleProgress)
    .then((response) => {
      if (response) {
        progress.downloadProgress = 0
        progress.showProgressBar = false

        const blob = new Blob([response])
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = convertedSentence(bookDetail.value.book.name) + '.' + type
        a.style.display = 'none'
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      }
    })
    .catch((error) => {
      logError(error, '[Browser DetailBookView/downloadFile]')
    })
}

const handleProgress = (progressEvent: AxiosProgressEvent) => {
  progress.downloadProgress = Math.round((progressEvent.loaded / progressEvent.total!) * 100)
  progress.total = formatBytes(progressEvent.total!)
  progress.loaded = formatBytes(progressEvent.loaded)
}
</script>

<style scoped></style>
