<template>
    <div>
        {{ author }}
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