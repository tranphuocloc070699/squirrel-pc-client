<template>
  <LayoutDefault type="book">
  
    <BookTrending></BookTrending>
  </LayoutDefault>
</template>

<script setup lang="ts">

import BookTrending from '@/components/Book/BookTrending.vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import { useBookStore } from '@/stores/book.store'

</script>

<style scoped></style>
