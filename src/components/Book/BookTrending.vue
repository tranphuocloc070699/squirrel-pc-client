<template>
    <div>
<div class="mt-6 mx-auto max-w-7xl w-full ">
  <ConvertPdf />
</div>
    <BookList
    v-show="bookStore.listBookFinding.loading || bookStore.listBookFinding.data.length > 0"
    :books="bookStore.listBookFinding.data"
    :loading="bookStore.listBookFinding.loading"
    :country-select="false"
    :title="`Downloadest`"
    :icon="`/star.svg`"
    ></BookList>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useBookStore } from '@/stores/book.store';
import BookList from './BookList.vue';
import ConvertPdf from './ConvertPdf.vue';

const bookStore = useBookStore()
watch(
  () => bookStore.selectedCountry,
  async () => {
    bookStore.findByCountryCode()
  },
  { immediate: true }
)
</script>

<style scoped>

</style>