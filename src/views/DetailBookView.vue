<template>
    <LayoutDefault type="book">
     <pre>
        {{bookDetail}}
     </pre>
  
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
    description:''
  }
  })
  watch(
    () => route.params,
    async (routeParams) => {
      if (
        routeParams?.id &&
        typeof routeParams?.id === 'string' &&
        route.query.name &&
        typeof route.query.name === 'string'
      ) {
        const id = routeParams.id
        bookStore
          .findById(Number.parseInt(id))
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
  