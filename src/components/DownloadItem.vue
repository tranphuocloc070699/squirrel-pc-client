<template>
    <div>
        <button :disabled="youtubeStore.downloadMediaFromY2MateLoading" class="bg-primary text-white m-3 px-3 py-1 rounded cursor-pointer flex items-center" @click="downloadMedia">
            <ButtonLoading v-show="youtubeStore.downloadMediaFromY2MateLoading" />
            {{ youtubeStore.downloadMediaFromY2MateLoading ? '' : download.q }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type {IDownloadItem, IParams} from '../types/index'
import { useYoutubeStore } from '@/stores/youtube.store';
import ButtonLoading from './Loading/ButtonLoading.vue'
const youtubeStore = useYoutubeStore();

const props = defineProps({
    download: {
      type: Object as () => IDownloadItem,
      required: true
    },
    
})

const  downloadMedia = async () =>{
    if(youtubeStore.searchVideos.length > 0){
        const params : IParams = {
        vid:youtubeStore.searchVideos[0].id,
        k:props.download.k
    }
    console.log({params})
    const response = await youtubeStore.downloadMediaFromY2Mate(params);
    if(response && response.dlink){
        console.log(response.dlink)
        downloadFile(response.dlink)
    }
}
}

const downloadFile = (url :string) =>{
    const link = document.createElement('a');
  link.href = url;
    link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style scoped>

</style>