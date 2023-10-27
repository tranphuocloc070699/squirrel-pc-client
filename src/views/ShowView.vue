<template>
  <LayoutDefault type="podcast">
    <div class="mx-auto max-w-6xl w-full mt-8 rounded-md">
      <div
        v-if="showInfoAndEpisodes.podcasts.length > 0 && showInfoAndEpisodes.show.id.length > 0"
        class="flex p-4 border border-slate-400 mx-4 rounded-md"
      >
        <img :src="showThumbnail" class="rounded-md object-cover" />
        <div class="ml-4">
          <h2 class="uppercase text-lg font-medium">{{ showInfoAndEpisodes.show.name }}</h2>
          <h4 class="text-slate-700 text-sm">{{ showInfoAndEpisodes.show.description }}</h4>
        </div>
      </div>
      <ShowLoading  v-else></ShowLoading>
   
      <PodcastList
        v-show="showInfoAndEpisodesLoading || showInfoAndEpisodes.podcasts.length > 0"
        :loading="showInfoAndEpisodesLoading"
        title="EPISODES"
        icon="/search.svg"
        :podcasts="showInfoAndEpisodes.podcasts"
      ></PodcastList>
    </div>
  </LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import type { IShowInfoAndEpisodes } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { usePodcastStore } from '@/stores/podcast.store'
import { useRoute } from 'vue-router'
import PodcastList from '@/components/PodcastList.vue'
import ShowLoading from '@/components/Loading/ShowLoading.vue'
const podcastStore = usePodcastStore()
const route = useRoute()
const showInfoAndEpisodes = ref<IShowInfoAndEpisodes>({
  podcasts: [],
  show: {
    id: '',
    name: '',
    thumbnails: [],
    description: ''
  }
})
const showInfoAndEpisodesLoading = ref(false)

const showThumbnail = computed(() => {
  if (showInfoAndEpisodes.value.show.thumbnails.length > 0) {
    if (showInfoAndEpisodes.value.show.thumbnails[2]) {
      return showInfoAndEpisodes.value.show.thumbnails[2].url
    } else if (showInfoAndEpisodes.value.show.thumbnails[1]) {
      return showInfoAndEpisodes.value.show.thumbnails[1].url
    } else {
      return showInfoAndEpisodes.value.show.thumbnails[0].url
    }
  } else {
    return ''
  }
})

onMounted(() => {
  showInfoAndEpisodesLoading.value = true
  if (route.params.id && typeof route.params.id === 'string') {
    podcastStore
      .getShowInfoAndEpisodes(route.params.id)
      .then((data) => {
        if (data) {
          showInfoAndEpisodes.value = data
        }
      })
      .catch((error) => {
        console.log({ error })
      })
      .finally(() => {
        showInfoAndEpisodesLoading.value = false
      })
  }
})
</script>

<style scoped></style>
