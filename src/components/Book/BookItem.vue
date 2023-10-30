<template>
    <div
      class="flex flex-col justify-between border border-df rounded hover:shadow transition-shadow"
    >
  
      <div  >
        <img
        @click="handleClick"
          :src="book.thumbnail"
          alt="Image"
          class="w-full h-48 object-cover rounded-t-sm cursor-pointer "
        />
        <div @click="handleClick" class="p-4 cursor-pointer ">
          <h3 class="text-base font-semibold ellipsis-line-2">
            {{ book.name }}
          </h3>
          <div class="flex items-center mt-2">
            <h5 class="text-xs text-gray-500 font-semibold">{{ book.published_year }}</h5>
          </div>
        </div>
        <h5
        ref="channelNameRef"
          v-if="book.author"
          class=" ml-4 text-sm inline-block border border-primary rounded text-primary px-4 py-1 hover:bg-primary hover:text-white"
        >
          {{ book.author.name }}
        </h5>
      </div>
    
  
      <div class="flex items-center justify-between p-4">
        <!-- <a ref="spotifyLinkRef" :href="`${SPOTIFY_LINK}/${podcast.id}`" target="_blank">
          <img src="/src/assets/images/spotify.png" />
        </a> -->
        <div></div>
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