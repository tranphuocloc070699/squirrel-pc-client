<template>
  <LayoutDefault type="podcast">
    <div v-if="!podcastDetailLoading && podcastDetail.id.length>0" class=" mt-8 mx-4 md:mx-auto max-w-3xl w-full p-4 border border-slate-400 rounded-lg">
        <div class="flex items-center mb-4">
            <audio v-if=" podcastDetail.audio_url && podcastDetail.audio_url.length>0" controls :src="podcastDetail.audio_url"> </audio>
            <p v-else class="text-red-500 text-sm font-semibold">Audio not found for this podast.</p>
        </div>
        <h2 class="uppercase text-lg font-medium">{{ podcastDetail.name }}</h2>
        <img :src="thumbnail" class="rounded-lg my-2"/>
        <div class="inline-block w-auto">
           <RouterLink v-if="podcastDetail.show" :to="`/show/${podcastDetail.show?.id}`">
            <div class=" flex items-center my-3 p-4 shadow-md rounded-lg hover:scale-105 transition-all cursor-pointer">
            <img :src="showThumbnail" width="64" height="64" class="w-7 h-7 rounded-full"  />
            <h3 class="ml-2 text-base font-medium">{{ podcastDetail.show?.name }}</h3>
        </div>
           </RouterLink>
        </div>
        <h4 class=" text-slate-700 mt-4 text-sm">{{ podcastDetail.description }}</h4>
    </div>
    <DetailPodcastLoading v-else></DetailPodcastLoading>

    </LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import {computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePodcastStore } from '@/stores/podcast.store'
import type { IParams, IPodcastItem } from '@/types'
import DetailPodcastLoading from '@/components/Loading/DetailPodcastLoading.vue'
const podcastStore = usePodcastStore()
const route = useRoute()
const podcastDetailLoading = ref(false)
const podcastDetail = ref<IPodcastItem>({
    id: '',
    name: '',
    thumbnails: [],
    description: '',
    release_date: '',
    audio_url: '',
    duration: 0,
    audio_preview_url: '',
    keywords: '',
})
watch(
  () => route.params,
  async (routeParams) => {
    if (
      routeParams?.id &&
      typeof routeParams?.id === 'string' &&
      route.query.name &&
      typeof route.query.name === 'string'
    ) {
      const searchParams: IParams = {
        keyword: route.query.name,
        id: routeParams.id
      }
      podcastDetailLoading.value = true
      podcastStore
        .getPodcastDetail(searchParams)
        .then((data) => {
          if(data){
            podcastDetail.value = data
          }
        })
        .catch((error) => {
          console.log({ error })
        })
        .finally(() => {
          podcastDetailLoading.value = false
        })
    }
  },

  { immediate: true }
)

const showThumbnail = computed(() => {
   if(podcastDetail.value.show){
    if(podcastDetail.value.show.thumbnails[2]) {
        return podcastDetail.value.show.thumbnails[2].url
    }else if(podcastDetail.value.show.thumbnails[1]) {
        return podcastDetail.value.show.thumbnails[1].url
    }else{
        return podcastDetail.value.show.thumbnails[0].url
    }
   }else{
    return ''
   }
  
})

const thumbnail = computed(() => {
   if(podcastDetail.value.thumbnails.length > 0){
    if(podcastDetail.value.thumbnails[1]) {
        return podcastDetail.value.thumbnails[1].url
    }else if(podcastDetail.value.thumbnails[0]) {
        return podcastDetail.value.thumbnails[0].url
    }else{
        return podcastDetail.value.thumbnails[2].url
    }
   }else{
    return ''
   }
  
})
</script>

<style scoped>
</style>
