<template>
  <LayoutDefault type="book">
    <p class="mx-auto max-w-7xl w-full py-2 px-4 mt-4 text-center bg-red-200 text-red-600 rounded">
      This Page is for viewing. Features is not complete
    </p>
    <BookTrending></BookTrending>
  </LayoutDefault>
</template>

<script setup lang="ts">
import BookTrending from '@/components/Book/BookTrending.vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
</script>

<style scoped></style>
