<template>
  <div class="border-b border-slate-300 last:border-b-0 flex items-center">
    <button
      :disabled="youtubeStore.downloadMediaLoading"
      class="bg-primary text-white m-3 px-3 py-1 rounded cursor-pointer flex items-center"
      @click="downloadMedia"
    >
      <ButtonLoading v-show="youtubeStore.downloadMediaLoading" />

      {{ youtubeStore.downloadMediaLoading ? '' : `${mediaTitle}` }}
    </button>
    <div class="w-full bg-gray-200 rounded-full mr-4 " v-show="progress.showProgressBar">
      <div
        class="bg-blue_739 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full whitespace-nowrap"
        :style="{ width: `${progress.downloadProgress}%` }"
      >
        {{ progress.loaded }} / {{ progress.total }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDownloadItem, IParams } from '../../types/index'
import { useYoutubeStore } from '@/stores/youtube.store'
import ButtonLoading from '../Loading/ButtonLoading.vue'
import { computed, reactive, ref } from 'vue'
import { logError } from '@/utils/logError'
import type { AxiosProgressEvent } from 'axios'
import { formatBytes } from '@/utils/formatBtyes'
const youtubeStore = useYoutubeStore()

const props = defineProps({
  download: {
    type: Object as () => IDownloadItem,
    required: true
  },
  isAudio: {
    type: Boolean,
    default: false
  }
})

const progress = reactive({
  showProgressBar: false,
  downloadProgress: 0,
  total:'',
    loaded:''
})

const mediaTitle = computed(() => {
  if (props.isAudio) {
    return '192Kbs'
  }
  return `${extractFormat(props.download.format)}${formatBytes(props?.download?.filesize || 0)}`
})



const downloadMedia = async () => {
  const url = props.download.url
  const title = `${youtubeStore.detailVideo.title} - ${youtubeStore.detailVideo.channel_name}`
  const params: IParams = {
    url,
    type:'',
    id:''
  }
//   if (props.isAudio) params.type = 'audio'

  progress.showProgressBar = true

  youtubeStore
    .downloadFile(params, handleProgress)
    .then((response) => {
      if (response) {
        progress.downloadProgress = 0
        progress.showProgressBar = false

        const blob = new Blob([response])
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = title + `${props.isAudio ? '.mp3' : '.mp4'}` // Replace with the desired file name
        a.style.display = 'none'
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      }
    })
    .catch((error) => {
      logError(error, '[Browser DownloadItem/downloadFile]')
    })
}

const handleProgress = (progressEvent: AxiosProgressEvent) => {
  progress.downloadProgress = Math.round((progressEvent.loaded / progressEvent.total!) * 100)
  progress.total = formatBytes(progressEvent.total!)
    progress.loaded = formatBytes(progressEvent.loaded)
}

const extractFormat = (str: string) => {
  const qualityRegex = /\(([^)]+)\)/
  const match = qualityRegex.exec(str)

  if (match && match[1]) {
    const videoQuality = match[1]
    return videoQuality
  } else {
    return str
  }
}
</script>

<style scoped>
.progress-container {
  width: 100%;
  height: 20px;
  background-color: #ccc;
  margin: 10px 0;
}

.progress {
  height: 100%;
  width: 0;
  background-color: #007bff;
  transition: width 0.3s;
}
</style>
