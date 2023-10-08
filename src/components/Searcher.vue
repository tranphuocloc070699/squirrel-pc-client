<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      class="flex items-center mt-10 w-full max-w-2xl mx-auto border border-slate-400 rounded-sm overflow-hidden"
    >
    <div class="relative">
  <select  class="block appearance-none w-full bg-white border-r border-gray-300 hover:border-slate-400 px-4 py-2 pr-8  leading-tight focus:outline-none focus:bg-white focus:border-slate-400">
    <option >Video</option>
    <option >Channel</option>

  </select>
  
</div>

      <input
        class="h-full flex-grow pl-4 outline-none border-none mr-4 text-slate-600 text-base"
        placeholder="Enter your keyword..."
        id="keyword"
        name="keyword"
        type="text"
      />
      <!-- <p class="bg-red-400" /> -->
      <button
        class="bg-primary text-white font-medium outline-none border-none m-1 px-4 rounded-sm"
        type="submit"
      >
        SEARCH
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const onSubmit = (values: any) => {
  console.log(values, null, 2)
}
</script>

<style scoped>

</style>
