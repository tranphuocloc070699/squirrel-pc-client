<template>
    <LayoutDefault type="book">
        <p class="mx-auto max-w-7xl w-full py-2 px-4 mt-4 text-center bg-red-200 text-red-600 rounded">
      This Page is for viewing. Features is not complete
    </p>
        <AuthorInfo :loading="loading" :author="data.author"></AuthorInfo>
        <BookList
    v-show="loading || data.bookList.length > 0"
    :books="data.bookList"
    :loading="loading"
    :country-select="true"
    :title="`Another Book By ${data.author.name}`"
    :icon="`star.svg`"
    >
    <select v-model="selectedCountry" class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
    <option v-for="item in countries" :key="item.code" :value="item.code">
      {{ item.name }}</option>

  </select>
    
  </BookList>
    </LayoutDefault>
</template>

<script setup lang="ts">
import AuthorInfo from '@/components/Book/AuthorInfo.vue';

import LayoutDefault from '@/layouts/LayoutDefault.vue';
import {  ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/book.store';
import type { IBook, IFindBookByAuthorResponse, IParams } from '@/types';
import jsonFile from '@/assets/json/book-countries.json'
import BookList from '@/components/Book/BookList.vue';


let countries = JSON.parse(JSON.stringify(jsonFile));
countries.push({name:'All',code:'all'})

const route = useRoute()
const bookStore = useBookStore()

const data  = ref<IFindBookByAuthorResponse>({
    author:{
        id: 0,
        name: '',
        description: '',
        thumbnail: '' 
    },
    bookList:[]
})
const loading = ref(false)
const filterByCountryCodeLoading = ref(false)

const selectedCountry = ref('all');
const bookListOriginal = ref<IBook[]>([])
watch(
  () => route.params,
  async (routeParams) => {
    if (routeParams?.id && typeof routeParams?.id === 'string') {
        loading.value = true;
     bookStore.findAuthorDetail(Number.parseInt(routeParams.id)).then((res) => {
         if(res && res?.author && res?.bookList){
            data.value.author = res.author;
         data.value.bookList = res.bookList;
         bookListOriginal.value = res.bookList;
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

watch(
    () => selectedCountry.value,
    async () => {
        
        if(selectedCountry.value === 'all'){
            data.value.bookList = bookListOriginal.value;
            return;
        }



        filterByCountryCodeLoading.value = true;
        if(route.params.id && typeof route.params.id === 'string'){
                const payload : IParams  ={
            id:Number.parseInt(route.params.id),
            country_code:selectedCountry.value
        }
       
            bookStore.findByAuthorAndCountryCode(payload).then((res) => {
                console.log({res})
                if(res){
                    data.value.bookList = res;
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                filterByCountryCodeLoading.value = false;
            })
        }
    
    }
)




</script>

<style scoped>

</style>