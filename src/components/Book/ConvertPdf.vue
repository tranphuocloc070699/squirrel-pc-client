<template>
  <div>
    <div class="text-end">
      <button
        @click="modal.show = true"
        class="text-sm text-[#333] px-4 py-2 mx-4 font-medium border border-[#333] rounded-full outline-none"
      >
        CONVERT PDF TO AUDIO
      </button>
    </div>
    <AppModal :show-modal="modal.show" :title="modal.title" @close="modal.show = false">
      <div class="mt-4 relative">
        <div v-show="pageInfo.totalPage === 0" class="mt-6 relative inline-block">
          <span
            class="text-sx border cursor-pointer border-[#333] rounded-full px-3 py-1 font-medium"
            >Upload file</span
          >
          <input
            class="cursor-pointer z-10 absolute inset-0 opacity-0"
            type="file"
            accept="application/pdf"
            @change="handleFileChange"
          />
        </div>
        <div v-show="pageInfo.totalPage > 0" class="mt-6 flex item-start justify-between">
          <img src="/src/assets/images/pdf-image.svg" />
          <div class="ml-3">
            <p class="text-sm font-medium">{{ pageInfo.filename }}</p>
            <p class="text-xs font-medium">{{ pageInfo.totalPage }} page</p>
          </div>
          <img
            @click="removeInputFile"
            src="/src/assets/images/trash.svg"
            class="w-5 h-5  cursor-pointer hover:scale-105"
          />
        </div>

        <div v-show="pageInfo.totalPage > 0">
          <div class="mt-6">
            <!-- <div class="text-start">
            <span v-show="page_array.array.length > 0">And</span>
            convert from page
            <input
              v-model="page_array.last"
              class="w-10 h-6 mx-1 rounded-md outline-none border border-slate-400"
              placeholder="0"
              type="number"
            />
            to end
          </div> -->
            <p class="text-sm font-medium">Chosse page to convert</p>
            <div class="mt-4 overflow-y-scroll h-[300px] w-fit flex flex-wrap gap-2">
              <div
                v-for="n in pageInfo.totalPage"
                :key="n"
                @click="toggleItemFromPdfFile(n)"
                :class="[
                  'px-2 py-1 text-xs font-normal border border-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white ',
                  pageInfo.itemChossingList.includes(n) &&
                    'border border-blue-600 bg-blue-600 text-white'
                ]"
              >
                {{ n }}
              </div>
            </div>
            <div
              :class="[
                'text-start text-sm font-medium mt-4 py-1 ',
                pageInfo.lastErrorMessage.length > 0 && 'bg-red-300'
              ]"
            >
              <span>and</span>
              from page
              <input
                v-model="pageInfo.last"
                class="w-14 pl-2 h-6 mx-1 rounded-md outline-none border border-slate-400"
                placeholder="0"
                type="number"
              />
              to end
            </div>
            <p class="text-red-600 text-sm font-medium">{{ pageInfo.lastErrorMessage }}</p>
          </div>
          <div class="flex items-center mt-4">
            <p class="font-medium text-sm">Language you want to convert</p>
          <select
            v-model="selectData.selected"
            class="block ml-2  px-3 py-1 text-center leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option v-for="item in selectData.options" :key="item.code" :value="item.code">
              {{ item.name }}
            </option>
          </select>
          </div>
          <div class="mt-4 text-sm font-medium flex items-center  max-w-md">
            Upload to server?
            <input type="checkbox" class="w-5 h-5 ml-2" v-model="saved" />
          </div>
          <div class="mt-10 flex justify-end">
            <button
              @click="handleConvert"
              class="bg-primary px-4 py-2 text-white text-sm font-semibold rounded-sm outline-none flex items-center"
            >
              <ButtonLoading v-show="bookStore.uploadPdfFileLoading"></ButtonLoading>
              {{ bookStore.uploadPdfFileLoading ? 'PROCESSING...' : 'CONVERT' }}
            </button>
          </div>
        </div>
        <div v-show="pageInfo.totalPage === 0" class="h-[280px]"></div>

        <div
          v-show="pageInfo.getInfoProcessingLoading"
          class="absolute inset-0 z-10 opacity-80 rounded-md bg-black flex items-center justify-center"
        >
          <p class="text-base font-normal text-white">Analyzing to get file info...</p>
        </div>
        <div
          v-show="bookStore.uploadPdfFileLoading"
          class="absolute inset-0 z-10 opacity-80 bg-white"
        ></div>
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
import { PDFDocument } from 'pdf-lib'
import { JsonWebTokenError } from 'jsonwebtoken'

interface IPageInfo {
  getInfoProcessingLoading: Boolean
  totalPage: number
  filename: string
  itemChossingList: number[]
  last: number

  lastErrorMessage: string
}

const { notify } = useNotification()
const bookStore = useBookStore()
const modal = reactive({
  show: false,
  title: 'CONVERT PDF TO AUDIO'
})
const pageInfo = ref<IPageInfo>({
  getInfoProcessingLoading: false,
  totalPage: 0,
  filename: '',
  itemChossingList: [],
  last: 0,
  lastErrorMessage: ''
})

const selectData = ref({
  selected: 'en',
  options: JSON.parse(JSON.stringify(jsonFile))
})

const saved = ref(false)

const file = ref()

const toggleItemFromPdfFile = (n: number) => {
  const index = pageInfo.value.itemChossingList.findIndex(item => item===n);
  if (index!==-1) {
    pageInfo.value.itemChossingList.splice(index, 1)
    console.log({pageInfoAfter:pageInfo.value.itemChossingList})
  } else {
    pageInfo.value.itemChossingList.push(n)
  }
  if(pageInfo.value.itemChossingList.length>0){
    const max = Math.max(...pageInfo.value.itemChossingList);


  max<pageInfo.value.totalPage ? pageInfo.value.last=max+1 : pageInfo.value.last=max
  }else{
    pageInfo.value.last=0
  }
  pageInfo.value.lastErrorMessage=''
  
}

const handleConvert = () => {
  notify({
    title: 'INFO',
    text: 'It can take a time to converting..., please patient!',
    duration: 2000,
    type: 'info'
  })
  const max = Math.max(...pageInfo.value.itemChossingList)
  if(pageInfo.value.last>pageInfo.value.totalPage){
    pageInfo.value.lastErrorMessage = 'cannot convert page larger than total page'
  }
  if(pageInfo.value.last<max){
    pageInfo.value.lastErrorMessage = 'cannot convert page smaller than max page specific'
  }

  const itemChoosingList : number[] = JSON.parse(JSON.stringify(pageInfo.value.itemChossingList))
  itemChoosingList.push(pageInfo.value.last);

  itemChoosingList.sort((a,b) => a-b)

  const commaSeparatedString = itemChoosingList.join(',');
  console.log({commaSeparatedString})

  const params: IParams = {
    page_array:commaSeparatedString,
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
    .finally(() => {
      modal.show = false
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

const handleFileChange = async (event: any) => {
  if (event.target?.files[0]) {
    file.value = event.target?.files[0]
    pageInfo.value.getInfoProcessingLoading = true
    const numPages = await getPageCount(event.target?.files[0])
    pageInfo.value.getInfoProcessingLoading = false
    if (numPages > 0) {
      pageInfo.value.totalPage = numPages
      pageInfo.value.filename = file.value.name
    }
  }
}

const removeInputFile = () => {
  pageInfo.value.filename = ''
  pageInfo.value.totalPage = 0
  pageInfo.value.getInfoProcessingLoading = false
}

const readFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)

    reader.readAsArrayBuffer(file)
  })
}

const getPageCount = async (file: File) => {
  const arrayBuffer: any = await readFile(file)

  const pdf = await PDFDocument.load(arrayBuffer)

  return pdf.getPageCount()
}
</script>

<style scoped></style>
