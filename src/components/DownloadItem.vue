<template>
    <div>
        <div class="bg-primary text-white m-3 px-3 py-1 rounded cursor-pointer">{{ download.q }}</div>
    </div>
</template>

<script setup lang="ts">
import type {IDownloadItem} from '../types/index'
defineProps({
    download: {
      type: Object as () => IDownloadItem,
      required: true
    },
    
})
</script>

<style scoped>

</style>