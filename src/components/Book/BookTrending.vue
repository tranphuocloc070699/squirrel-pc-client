<template>
    <div>
<div class="mt-6 mx-auto max-w-7xl w-full ">
  <ConvertPdf />
</div>
<BookList
      :books="bookStore.listBookSearching.data"
      v-show="bookStore.listBookSearching.loading || bookStore.listBookSearching.data.length > 0"
      :loading="bookStore.listBookSearching.loading"
      :country-select="true"
      title="SEARCH RESULT"
      icon="/search.svg"
    >
    <select v-model="bookStore.searchBook.country_code" class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
    <option v-for="item in countries" :key="item.code" :value="item.code">
      {{ item.name }}</option>

  </select>
  </BookList>

    <BookList
    v-show="bookStore.listBookFinding.loading || bookStore.listBookFinding.data.length > 0"
    :books="bookStore.listBookFinding.data"
    :loading="bookStore.listBookFinding.loading"
    :country-select="true"
    :title="`Most Downloadest`"
    :icon="`/star.svg`"
    >
    <select v-model="bookStore.selectedCountry.code" class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded-full appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
    <option v-for="item in countries" :key="item.code" :value="item.code">
      {{ item.name }}</option>

  </select>
    
  </BookList>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookStore } from '@/stores/book.store';
import BookList from './BookList.vue';
import ConvertPdf from './ConvertPdf.vue';
import jsonFile from '@/assets/json/book-countries.json'
import type { IBookCountry } from '@/types';
const bookStore = useBookStore()
watch(
  () => bookStore.selectedCountry.code,
  async () => {
    bookStore.findByCountryCode()
  },
  { immediate: true }
)

let countries : IBookCountry[] = JSON.parse(JSON.stringify(jsonFile))
countries.unshift({name:'All',code:'all'})




</script>

<style scoped>

</style>