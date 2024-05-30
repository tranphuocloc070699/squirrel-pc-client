<template>
    <div class="bg-slate-200 rounded-md mb-4 px-4 py-2">
        {{ data}}
    </div>
</template>

<script setup lang="ts">
import type { IUploadFile } from '@/types'
const props = defineProps({
    data: {
        type: Object as () => IUploadFile,
        required: true
    }
})

</script>

<style scoped>

</style>