<template>
    <LayoutDefault type="book">
        <AuthorInfo :loading="loading" :author="data.author"></AuthorInfo>
    </LayoutDefault>
</template>

<script setup lang="ts">
import AuthorInfo from '@/components/Book/AuthorInfo.vue';

import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/book.store';
import type { IFindBookByAuthorResponse } from '@/types';
const route = useRoute()
const bookStore = useBookStore()

const data : IFindBookByAuthorResponse = {
    author:{
        id: 0,
        name: '',
        description: '',
        thumbnail: '' 
    },
    bookList:[]
}
const loading = ref(false)

watch(
  () => route.params,
  async (routeParams) => {
    if (routeParams?.id && typeof routeParams?.id === 'string') {
        loading.value = true;
     bookStore.findByAuthorId(Number.parseInt(routeParams.id)).then((res) => {
         if(res && res?.author && res?.bookList){
            data.author = res.author;
         data.bookList = res.bookList;
         }
     }).catch((err) => {
         console.log(err);
     }).finally(() => {
         loading.value = false;
     })
    }
  },
  { immediate: true }
)

</script>

<style scoped>

</style>