<template>
  <div>
    <VideoList
      v-show="youtubeStore.listTrendingVideoLoading || youtubeStore.trendingVideos.length > 0"
      :loading="youtubeStore.listTrendingVideoLoading"
      title="TRENDING"
      icon="music.svg"
      :videos="youtubeStore.trendingVideos"
      :country-select="true"
    >
      <div class="relative inline-block">
        <select
          v-model="youtubeStore.selectedCountry"
          class="block w-full px-3 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-full appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option v-for="item in countries" :key="item.code" :value="item.code">
            {{ item.logo }}
            {{ item.name }}
          </option>
        </select>
    
      </div>
    </VideoList>
  </div>
</template>

<script setup lang="ts">
import VideoList from '@/components/Video/VideoList.vue'
import { useYoutubeStore } from '@/stores/youtube.store'
import type { IParams } from '@/types'
import { onMounted, ref, watch } from 'vue'
import jsonFile from '@/assets/json/extract-countries.json'

interface ICountryJson {
  name: string
  code: string
  logo: string
}

const youtubeStore = useYoutubeStore()
const countries = JSON.parse(JSON.stringify(jsonFile))

watch(
  () => youtubeStore.selectedCountry,
  async (selectedCountry) => {
    const params: IParams = {
      countryCode: selectedCountry
    }
    youtubeStore.listTrendingVideo(params)
  },
  { immediate: true }
)
</script>

<style scoped>
select {
  font-family: 'Segoe UI Emoji', sans-serif;
}
</style>
