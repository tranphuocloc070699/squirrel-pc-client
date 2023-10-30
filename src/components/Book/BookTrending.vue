<template>

    <div>
    <BookList
    v-show="bookStore.listBookFinding.loading || bookStore.listBookFinding.data.length > 0"
    :books="bookStore.listBookFinding.data"
    :loading="bookStore.listBookFinding.loading"
    :country-select="false"
    :title="`Downloadest`"
    :icon="`/src/assets/images/download.png`"
    ></BookList>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useBookStore } from '@/stores/book.store';
import BookList from './BookList.vue';

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