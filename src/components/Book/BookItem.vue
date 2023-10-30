<template>
    <div
      class="flex flex-col justify-between border border-df rounded hover:shadow transition-shadow"
    >
  
      <div>
        <img
        @click="handleClick"
          :src="book.thumbnail"
          alt="Image"
          class="w-full h-48 object-cover rounded-t-sm cursor-pointer "
        />
        <div  @click="handleClick" class="p-4 cursor-pointer ">
          <h3 class="text-base font-semibold ellipsis-line-2">
            {{ book.name }}
          </h3>
          <h4 class="ellipsis-line-3 text-sm leading-5 mt-1 text-slate-600">{{ book.description }}</h4>
          <div class="flex items-center mt-2">
            <h5 class="text-xs text-gray-500 font-semibold">{{ book.created_at }}</h5>
            <h5 class="text-xs text-gray-500 font-semibold">{{ book.published_year }}</h5>
          </div>
        </div>
      </div>
  
      <div class="flex items-center justify-between p-4">
        <!-- <a ref="spotifyLinkRef" :href="`${SPOTIFY_LINK}/${podcast.id}`" target="_blank">
          <img src="/src/assets/images/spotify.png" />
        </a> -->
        <RouterLink  :to="`/book/${book.id}?name=${book.name}`" class="text-sm text-blue-700 font-semibold">LISTEN FULL</RouterLink>
      
      </div>
        
    </div>
</template>

<script setup lang="ts">
import type { IBook } from '@/types';

const props = defineProps({
    book: {
        type: Object as () => IBook,
        required: true
    }
})

const handleClick = () =>{

}
</script>

<style scoped>

</style>