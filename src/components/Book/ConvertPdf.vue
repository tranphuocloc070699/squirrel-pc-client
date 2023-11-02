<template>
  <div>
    <div class="text-end">
      <button
        @click="modal.show = true"
        class="bg-red-600 text-sm text-white px-4 py-2 font-semibold rounded-sm outline-none"
      >
        CONVERT PDF TO AUDIO
      </button>
    </div>
    <AppModal :show-modal="modal.show" :title="modal.title" @close="modal.show = false">
      <div class="mt-4 relative">
       
        <div class="mt-6">
          <input type="file" accept="application/pdf" @change="handleFileChange" />
        </div>

        <div class="mt-6">
          <div class="text-start">
            <span v-show="page_array.array.length > 0">And</span>
            convert from page
            <input
              v-model="page_array.last"
              class="w-10 h-6 mx-1 rounded-md outline-none border border-slate-400"
              placeholder="0"
              type="number"
            />
            to end
          </div>
        </div>

        <p class="mt-6">Language you want to convert</p>
        <select
          v-model="selectData.selected"
          class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option v-for="item in selectData.options" :key="item.code" :value="item.code">
            {{ item.name }}
          </option>
        </select>
        <div class="mt-4 text-xs text-slate-600  max-w-md">
          Do you want to share this file to everyone? we will store it online then everyone can download it
          <input type="checkbox" class="w-5 h-5 ml-2" v-model="saved" />
        </div>
        <div class=" mt-10 flex justify-end">
          <button
            @click="handleConvert"
            class="bg-primary px-4 py-2  text-white text-sm font-semibold rounded-sm outline-none  flex items-center"
          >
          <ButtonLoading  v-show="bookStore.uploadPdfFileLoading"></ButtonLoading>
            {{ bookStore.uploadPdfFileLoading ? 'PROCESSING...'  : 'CONVERT' }}
          </button>
        </div>
        <div v-show="bookStore.uploadPdfFileLoading" class="absolute inset-0 z-10 opacity-80  bg-white">
       
        </div>
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppModal from '../App/AppModal.vue'
import type { AxiosProgressEvent } from 'axios'
import type { IParams } from '@/types'
import { useBookStore } from '@/stores/book.store'
import { logError } from '@/utils/logError'
import ButtonLoading from '../Loading/ButtonLoading.vue'
import { useNotification } from '@kyvg/vue3-notification'
import jsonFile from '@/assets/json/book-countries.json'

const { notify } = useNotification()
const bookStore = useBookStore()
const modal = reactive({
  show: false,
  title: 'CONVERT PDF TO AUDIO'
})

const selectData = ref({
  selected: 'en',
  options: JSON.parse(JSON.stringify(jsonFile))
})

const saved = ref(false)

const page_array = reactive({
  last: 0,
  array: []
})
const file = ref()

const handleConvert = () => {
  notify({
    title: 'INFO',
    text: 'It can take a time to converting..., please patient!',
    duration: 2000,
    type: 'info'
  })
  const params: IParams = {
    page_array: `${page_array.last}`,
    file: file.value,
    saved: saved.value,
    lang: selectData.value.selected
  }
  bookStore
    .uploadPdfFile(params, handleProgress)
    .then((response) => {
      if (response) {
        const blob = new Blob([response], { type: 'audio/mpeg' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = file.value.name.replace('.pdf', '.mp3')
        a.style.display = 'none'
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      }
    })
    .catch((error) => {
      logError(error, '[Browser BookSearching/uploadFile]')
    })
    .finally(() =>{
      modal.show = false;
      notify({
    title: 'SUCCESS',
    text: 'Convert successfully',
    duration: 2000,
    type: 'success'
  })
    })
}

const handleProgress = (progressEvent: AxiosProgressEvent) => {
  console.log({ progressEvent })
}

const handleFileChange = (event: any) => {
  if (event.target?.files[0]) {
    file.value = event.target?.files[0]
  }
}
</script>

<style scoped></style>
