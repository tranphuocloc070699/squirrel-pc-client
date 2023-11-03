<template>
  <div
    class="mx-auto mt-20 max-w-md w-full p-1 flex items-center justify-between rounded-full border border-slate-300"
  >
  
    <div
      :class="[
        ' px-3 py-2 round-full text-xs round-full  rounded-full cursor-pointer',
        type == 0 && 'bg-primary text-white font-semibold'
      ]"
       @click="$emit('change', 0)"
    >
      BOOKS
    </div>
    <div
      :class="[
        ' px-3 py-2 round-full text-xs round-full  rounded-full cursor-pointer',
        type == 1 && 'bg-primary text-white font-semibold'
      ]"
       @click="$emit('change', 1)"
    >
      CATEGORIES
    </div>
    <div
      :class="[
        ' px-3 py-2 round-full text-xs round-full  rounded-full cursor-pointer',
        type == 2&& 'bg-primary text-white font-semibold'
      ]"
       @click="$emit('change', 2)"
    >
      AUTHORS
    </div>
    <div
      :class="[
        'px-3 py-2 round-full text-xs rounded-full cursor-pointer',
        type == 3 && 'bg-primary text-white font-semibold'
      ]"
      @click="$emit('change', 3)"
    >
      UPLOAD FILES
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: Number,
    required: true
  }
})
</script>

<style scoped></style>
