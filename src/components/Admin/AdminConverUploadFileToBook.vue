<template>
  <div class="text-start">
    <span
      @click="modal.show = true"
      class="font-medium text-blue-600 hover:underline mr-8 cursor-pointer"
      >Upload</span
    >
    <AppModal
      class="overflow-y-auto h-[500px]"
      :show-modal="modal.show"
      :title="modal.title"
      @close="modal.show = false"
      v-show="modal.show"
    >
      <input
        class="w-full px-2 py-1 rounded-md outline-none border border-slate-400"
        type="text"
        v-model="book.name"
        placeholder="Author Name"
      />
      <input
        class="mt-4 w-full px-2 py-1 rounded-md outline-none border border-slate-400"
        type="text"
        v-model="book.description"
        placeholder="Author Desc"
      />
      <input
        class="mt-4 w-full px-2 py-1 rounded-md outline-none border border-slate-400"
        type="file"
        @change="handleThumbnailChange"
        placeholder="Author Thumbnail"
      />
      <p class="mt-4">Audio Url</p>
      <input
        class="w-full px-2 py-1 rounded-md outline-none border border-slate-400"
        type="text"
        v-model="book.audio_url"
        placeholder="Author Audio"
      />
      <p class="mt-4">PDF Url</p>
      <input
        class="w-full px-2 py-1 rounded-md outline-none border border-slate-400"
        type="text"
        v-model="book.pdf_url"
        placeholder="Author Pdf"
      />
      <p class="mt-4">Published Year</p>
      <input
        class="w-full px-2 py-1 rounded-md outline-none border border-slate-400"
        type="number"
        v-model="book.published_year"
        placeholder="Author Published Year"
      />

      <p class="mt-4">Author</p>
      <select
        v-model="book.author_id"
        class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option v-for="item in bookStore.authorList.data" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>

      <p class="mt-4">Category</p>
      <select
        v-model="book.category_id"
        class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option v-for="item in bookStore.categoryList.data" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>

      <div class="text-end mt-20">
        <button @click="handleSubmit" class="bg-primary px-3 py-2 text-white text-xs font-medium">
          Submit
        </button>
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppModal from '../App/AppModal.vue'
import type { IParams, IUploadFile, IUpsertBookRequest } from '@/types'
import { useBookStore } from '@/stores/book.store'
import { useAdminStore } from '@/stores/admin.store'

const adminStore = useAdminStore()
const bookStore = useBookStore()
const props = defineProps({
  data: {
    type: Object as () => IUploadFile,
    required: true
  }
})

const book = ref({
  name: '',
  description: '',
  thumbnail: '',
  file: null,
  published_year: 1999,
  country_code: props.data.lang,
  category_id: 0,
  author_id: 0,
  audio_url: props.data.audio_url,
  pdf_url: props.data.pdf_url
})

const emit = defineEmits(['confirm'])
const modal = reactive({
  show: false,
  title: `CONVERT UPLOAD FILE [${props.data.id}] TO BOOK`
})

const handleThumbnailChange = (event: any) => {
  book.value.file = event.target.files[0]
}

const handleSubmit = async () => {
  const params: IParams = {
    file: book.value.file,
    key: 'thumbnail',
    content_type: 'image/jpeg'
  }
  const thumbnaiUrl = await adminStore.uploadFileToS3(params)
  const request: IUpsertBookRequest = {
    name: book.value.name,
    description: book.value.description,
    thumbnail: thumbnaiUrl || '',
    audio_url: book.value.audio_url,
    pdf_url: book.value.pdf_url,
    created_at: new Date(),
    downloaded: 0,
    published_year: book.value.published_year,
    country_code: book.value.country_code,
    category_id: book.value.category_id,
    author_id: book.value.author_id
  }
  console.log({request})

  const response = await adminStore.saveBook(request);
  console.log({response})
  modal.show = false
}
</script>

<style scoped></style>
