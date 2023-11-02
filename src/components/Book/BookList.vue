<template>
  <div class="mt-8">
    <div
      :class="[
        'mx-auto max-w-7xl w-full flex items-center px-4',
        isTitleCenter ? 'justify-center' : 'justify-between'
      ]"
    >
      <h3 class="flex items-center">
        <img :src="`/src/assets/images${icon}`" />
        <span class="ml-2 mt-1 font-medium font-noto text-xl uppercase">{{ title }}</span>
      </h3>
      <div v-show="countrySelect">
        <slot></slot>
      </div>
    </div>

    <div
      class="w-full max-w-7xl mt-8 mx-auto"
      v-show="!loading && books.length === 0 && errorMessage.length > 0"
    >
      <span class="font-semibold text-base text-slate-500 shadow rounded-lg p-4 mx-4">{{
        errorMessage
      }}</span>
    </div>

    <div class="mt-8 mx-auto max-w-7xl w-full grid gap-8 px-4 grid-auto-fill">
      
        <BookItem v-for="book in books" :key="book.id" v-show="!loading && books.length > 0" :book="book" />
 
      <!--  -->
      <div v-for="n in 6" :key="n">
        <VideoItemSkeleton  v-show="loading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBook } from '@/types'
import BookItem from './BookItem.vue'
import VideoItemSkeleton from '@/components/Loading/VideoItemSkeleton.vue'

const props = defineProps({
  books: {
    type: Array<IBook>,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  isTitleCenter: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  countrySelect: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped></style>
