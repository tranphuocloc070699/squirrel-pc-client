<template>
    <div class="w-full max-w-2xl mx-auto mt-8 shadow rounded-lg p-4 flex items-start">
      <img :src="author.thumbnail" alt="Author" class="max-w-[40%]">
      <div class="ml-4">
        <h2 class="text-base font-semibold">{{ author.name }}</h2>
        <h3 class="text-sm text-slate-800 mt-2">{{ author.description }}</h3>
      </div>
    </div>
</template>

<script setup lang="ts">
import type { IAuthor } from '@/types';

  const props = defineProps({
    author: {
      type: Object as () => IAuthor,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  })
</script>

<style scoped>

</style>