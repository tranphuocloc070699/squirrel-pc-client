<template>
  <div>
    <div
      class="fixed inset-0 bg-black opacity-50 z-40 transition-opacity"
      v-show="showSidebar"
      @click="$emit('toggleSidebar', false)"
    ></div>

    <!-- Sidebar content -->
    <div
      class="fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50 shadow-lg transition-transform transform duration-300"
      :class="{ 'translate-x-full': !showSidebar }"
    >
      <!-- Sidebar header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-border_gray">
        <h2 class="text-lg font-medium font-noto text-center text-gray-800">STORING</h2>
        <button class="text-gray-500 hover:text-gray-600" @click="$emit('toggleSidebar', false)">
          <svg class="w-10 h-10 fill-current" viewBox="0 0 24 24">
            <path
              d="M6.7 5.3a1 1 0 0 1 1.4 0L12 10.6l3.9-3.9a1 1 0 1 1 1.4 1.4L13.4 12l3.9 3.9a1 1 0 0 1-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 0 1-1.4-1.4L10.6 12 6.7 8.1a1 1 0 0 1 0-1.4z"
            />
          </svg>
        </button>
      </div>
      <!-- Sidebar Controls All -->

      <div class="flex item-center my-3 px-4">
        <svg
          v-if="isDownloading"
          aria-hidden="true"
          class="w-5 h-5 mr-2 text-gray-200 animate-spin fill-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
      <div v-if="!isDownloading" class="my-3 flex items-center justify-between px-4">
        <p
          @click="openConfirmModal('download')"
          class="text-base py-1 px-3 font-normal rounded-full border border-[#333] hover:bg-[#333] hover:text-white"
        >
          Download All
        </p>
        <p
          @click="openConfirmModal('clear')"
          class="text-sm py-1 px-3 font-normal text-gray-600 cursor-pointer hover:underline"
        >
          Clear All
        </p>
      </div>

      <span> </span>

      <!-- Sidebar content -->
      <div class="overflow-y-scroll h-full">
        <transition-group name="sidebar-item" tag="div">
          <SidebarVideoItem
            v-for="item in youtubeStore.savedVideos"
            :key="item.video.id"
            :data="item"
            @removeVideoFromStorage="removeVideoFromStorage"
          />
        </transition-group>
      </div>
    </div>
    <AppModal
      class="z-50"
      :show-modal="modal.show"
      :title="modal.title"
      @close="modal.show = false"
    >
      <div class="mt-8">
        <h3 class="font-normal text- dark:text-white">Choose a type</h3>
        <ul
          class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:text-white"
        >
          <li
            v-for="item in types"
            :key="item.value"
            class="w-full border-b border-gray-200 rounded-t-lg"
          >
            <div class="flex items-center pl-3">
              <input
                id="list-radio-license"
                type="radio"
                :value="item.value"
                name="list-radio"
                class="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                v-model="selectedType"
              />
              <label
                for="list-radio-license"
                class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >{{ item.label }}
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div class="text-end mt-20">
        <span
          class="text-sm font-medium uppercase text-blue-700 cursor-pointer"
          @click="downloadAll"
          >Download</span
        >
      </div>
    </AppModal>

    <AppModal
      class="z-50"
      :show-modal="removeModal.show"
      :title="removeModal.title"
      @close="removeModal.show = false"
    >
      <div class="mt-8 text-base font-medium">Do you really want to clear all item?</div>
      <div class="text-end mt-20">
        <span class="text-sm font-medium uppercase text-red-600 cursor-pointer" @click="clearAllVideoInLocalStorage"
          >Clear all</span
        >
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import type { IDownloadItem, IParams, ISidebarVideoItem } from '@/types'
import SidebarVideoItem from './SidebarVideoItem.vue'
import { useYoutubeStore } from '@/stores/youtube.store'
import AppModal from '../App/AppModal.vue'
import { reactive, ref } from 'vue'
import { logError } from '@/utils/logError'
import { formatBytes } from '@/utils/formatBtyes'
import { useNotification } from '@kyvg/vue3-notification'

interface IType {
  label: string
  value: string
}

const { notify } = useNotification()
const youtubeStore = useYoutubeStore()
defineProps({
  showSidebar: {
    type: Boolean,
    default: false
  }
})
const selectedType = ref('video')
const types = reactive<IType[]>([
  {
    label: 'Video',
    value: 'video'
  }
  // {
  //   label: 'Audio',
  //   value: 'audio'
  // }
])
const isDownloading = ref(false)

const modal = reactive({
  show: false,
  title: 'Download all media'
})

const removeModal = reactive({
  show: false,
  title: 'Clear all media'
})

const clearAllVideoInLocalStorage = () => {
  if (localStorage.getItem('savedVideos')) localStorage.removeItem('savedVideos')
  if (youtubeStore.savedVideos.length>0) youtubeStore.savedVideos= []
  removeModal.show = false
}

const openConfirmModal = (type: 'download' | 'clear') => {

  switch (type) {
    case 'download':
    if (youtubeStore.savedVideos.length === 0) {
    notify({
      title: 'ERROR',
      text: `No ${selectedType.value} to download`,
      duration: 2000,
      type: 'error',
      ignoreDuplicates: true
    })

    return
  }
      modal.show = true
      break
    case 'clear':
      if(youtubeStore.savedVideos.length===0)  {
        notify({
      title: 'ERROR',
      text: `No Video to remove`,
      duration: 2000,
      type: 'error',
      ignoreDuplicates: true
    })
    return;
      }
      removeModal.show = true
      break
    default:
      break
  }
}

const downloadAll = async () => {
  
  modal.show = false
  isDownloading.value = true

  await Promise.all(
    youtubeStore.savedVideos.map(async (item) => {
      const title = `${item.video.title} - ${item.video.channel_name}`
      await youtubeStore.getListDownload(item.video.id).then((item) => {
        const url =
          selectedType.value === 'audio'
            ? getMaxAudio(item?.formats || [])
            : getMinVideo(item?.formats || [])
        if (url) {
          const params: IParams = {
            url,
            title,
            type:'',
            id:''
          }
          const videoCurrent = youtubeStore.savedVideos.find(
            (savedVideo) => savedVideo.video.id === item?.id
          )

          if (videoCurrent) {
            videoCurrent.progress = {
              showProgressBar: true,
              downloadProgress: 0,
              total: '',
              loaded: ''
            }
            downloadMedia(params, videoCurrent)
          }
        }
      })
    })
  ).finally(() => {
    isDownloading.value = false
  })
}

const getMaxAudio = (formats: IDownloadItem[]) => {
  const mediaResponse = formats
    .filter((item) => item.video_ext !== 'mp4')
    .sort((a, b) => (a.filesize || 0) - (b.filesize || 0))

  if (mediaResponse && mediaResponse[0]) {
    return mediaResponse[0].url
  }
  return null
}
const getMinVideo = (formats: IDownloadItem[]) => {
  const mediaResponse = formats
    .filter((item) => item.video_ext === 'mp4')
    .sort((a, b) => (b.filesize || 0) - (a.filesize || 0))

  if (mediaResponse && mediaResponse[0]) {
    return mediaResponse[0].url
  }
  return null
}
const downloadMedia = (params: IParams, videoCurrent: ISidebarVideoItem) => {
  youtubeStore
    .downloadFile(params, (progressEvent) => {
      if (videoCurrent && videoCurrent.progress) {
        videoCurrent.progress = {
          showProgressBar: true,
          downloadProgress: Math.round((progressEvent.loaded / progressEvent.total!) * 100),
          total: formatBytes(progressEvent.total!),
          loaded: formatBytes(progressEvent.loaded)
        }
      }
    })
    .then((response) => {
      if (response) {
        const blob = new Blob([response])
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = params.title + `${selectedType.value === 'audio' ? '.mp3' : '.mp4'}`
        a.style.display = 'none'
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)

        removeVideoFromStorage(videoCurrent.video.id)
      }
    })
    .catch((error) => {
      logError(error, '[Browser SidebarHeader/downloadMedia]')
    })
}

const removeVideoFromStorage = (videoId: string) => {
  ;(youtubeStore.savedVideos = youtubeStore.savedVideos.filter(
    (item) => item.video.id !== videoId
  )),
    localStorage.setItem('savedVideos', JSON.stringify(youtubeStore.savedVideos))
}
</script>

<style scoped>
.sidebar-item-enter-active,
.sidebar-item-leave-active {
  transition: all 0.3s ease;
}

.sidebar-item-enter,
.sidebar-item-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
