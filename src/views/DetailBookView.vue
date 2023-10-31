<template>
    <LayoutDefault type="book">
      <div class="w-full max-w-2xl mx-auto flex items-start mt-10 justify-between">
        <div class="flex items-start">
          <img :src="bookDetail.thumbnail"  class="rounded-md md:max-w-[40%] w-full h-auto shadow-xl"/>
        <div class="md:ml-8">
          <h2 class="text-xl font-semibold">{{ bookDetail.name }} </h2>
          <h3 class="mt-2 text-sm">Author:<span class="text-blue-600 ml-2">{{ bookDetail.author.name }}</span></h3>
          <h3 class="mt-1 text-sm">Category:<span class="text-blue-600 ml-2">{{ bookDetail.category.name }}</span></h3>
          <h3 class="mt-1 text-sm">Language:<span class=" ml-2">{{ bookDetail.country_code }}</span></h3>
          <h3 class="mt-1 text-sm">Release Year:<span class=" ml-2">{{ bookDetail.published_year }}</span></h3>
        </div>
        </div>
        <div>
          <button class="px-3 py-2 md:w-40 text-sx font-semibold text-white bg-blue-600 flex items-center rounded-sm">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
  <span class="text-sm">Download Audio</span>
</button>
<button class="mt-4 px-3 py-2 text-sx md:w-40 font-semibold text-white bg-orange-700  flex items-center rounded-sm">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
  <span class="text-sm">Download PDF</span>
</button>
        </div>
      </div>

  
      </LayoutDefault>
  </template>
  
  <script setup lang="ts">
  import LayoutDefault from '@/layouts/LayoutDefault.vue'
import { useBookStore } from '@/stores/book.store'
import type { IBook } from '@/types'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

  const bookStore = useBookStore()
  const route = useRoute()
 
  const bookDetail = ref<IBook>({
    id : 0,
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
    id:0,
    name:''
  },
  author: {
    id:0,
    name:'',
    description:'',
    thumbnail:''
  }
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
          .findById(Number.parseInt(id),Number.parseInt(category))
          .then((data) => {
            if(data){
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

  </script>
  
  <style scoped>
  </style>
  