<template>
    <div>
        <button :disabled="youtubeStore.downloadMediaLoading" class="bg-primary text-white m-3 px-3 py-1 rounded cursor-pointer flex items-center" @click="downloadMedia">
            <ButtonLoading v-show="youtubeStore.downloadMediaLoading" />
          
            {{ youtubeStore.downloadMediaLoading ? '' : `${download.format}-${formatBytes(props?.download?.filesize || 0)}` }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type {IDownloadItem} from '../types/index'
import { useYoutubeStore } from '@/stores/youtube.store';
import ButtonLoading from './Loading/ButtonLoading.vue'
const youtubeStore = useYoutubeStore();

const props = defineProps({
    download: {
      type: Object as () => IDownloadItem,
      required: true
    },
    
})

const formatBytes = (bytes : number) => {
    if(typeof bytes==='string') bytes = parseInt(bytes)
    
    var marker = 1024; // Change to 1000 if required
    var decimal = 3; // Change as required
    var kiloBytes = marker; // One Kilobyte is 1024 bytes
    var megaBytes = marker * marker; // One MB is 1024 KB
    var gigaBytes = marker * marker * marker; // One GB is 1024 MB
  
    // return bytes if less than a KB
    if(bytes < kiloBytes) return bytes + " Bytes";
    // return KB if less than a MB
    else if(bytes < megaBytes) return(bytes / kiloBytes).toFixed(decimal) + " KB";
    // return MB if less than a GB
    else if(bytes < gigaBytes) return(bytes / megaBytes).toFixed(decimal) + " MB";
    // return GB if less than a TB
    else return(bytes / gigaBytes).toFixed(decimal) + " GB";
}

const  downloadMedia = async () =>{
    console.log(props.download.url)
//     if(youtubeStore.searchVideos.length > 0){
//         const params : IParams = {
//         vid:youtubeStore.searchVideos[0].id,
//         k:props.download.k
//     }
//     console.log({params})
//     const response = await youtubeStore.downloadMediaFromY2Mate(params);
//     if(response && response.dlink){
//         console.log(response.dlink)
//         downloadFile(response.dlink)
//     }
// }
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