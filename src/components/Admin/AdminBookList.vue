<template>
  <div class="max-w-7xl w-full mx-auto mt-6">
    <div class="flex">
      <h2 class="font-semibold mt-4 my-2">Books</h2>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">name</th>
            <th scope="col" class="px-6 py-3">thumbnail</th>
            <th scope="col" class="px-6 py-3">publish year</th>
            <th scope="col" class="px-6 py-3">downloaded</th>
            <th scope="col" class="px-6 py-3">created at</th>

            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id" class="bg-white border-b hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item.id }}
            </th>
            <td class="px-6 py-4">
              {{ item.name }}
            </td>
            <td class="px-6 py-4 text-orange-600">
              <img :src="item.thumbnail" width="32" height="32" class="w-8 h-8" />
            </td>

            <td class="px-6 py-4 text-blue-600">
              {{ item.published_year }}
            </td>
            <td class="px-6 py-4 text-blue-600">
              {{ item.downloaded }}
            </td>
            <td class="px-6 py-4 text-blue-600">
              {{ item.created_at }}
            </td>

            <td class="px-6 py-4 text-right flex items-center justify-end">
              <span
                @click="openModal('edit', item)"
                class="font-medium text-orange-600 hover:underline mr-8 cursor-pointer"
                >Edit</span
              >
              <span
                @click="openModal('delete', item)"
                class="font-medium text-red-600 hover:underline mr-8 cursor-pointer"
                >Delete</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AppModal :show-modal="modal.show" :title="modal.title" @close="modal.show = false">
      <div class="w-[400px] mt-8">
       
        <div v-if="modal.type === 'edit'">
          <input
            class="w-full px-2 py-1 rounded-md outline-none border border-slate-400"
            type="text"
            v-model="data.edit.name"
            placeholder="Author Name"
          />
          <input
            class="mt-4 w-full px-2 py-1 rounded-md outline-none border border-slate-400"
            type="text"
            v-model="data.edit.description"
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
            v-model="data.edit.audio_url"
            placeholder="Author Audio"
          />
          <p class="mt-4">PDF Url</p>
          <input
            class="w-full px-2 py-1 rounded-md outline-none border border-slate-400"
            type="text"
            v-model="data.edit.pdf_url"
            placeholder="Author Pdf"
          />
          <p class="mt-4">Published Year</p>
          <input
            class="w-full px-2 py-1 rounded-md outline-none border border-slate-400"
            type="number"
            v-model="data.edit.published_year"
            placeholder="Author Published Year"
          />

          <p class="mt-4">Author</p>
          <select
            v-model="data.edit.author_id"
            class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option v-for="item in bookStore.authorList.data" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>

          <p class="mt-4">Category</p>
          <select
            v-model="data.edit.category_id"
            class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option v-for="item in bookStore.categoryList.data" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div v-else-if="modal.type === 'delete'">
          <p>Are you sure you want to delete this author?</p>
        </div>
      </div>

      <div class="text-end mt-20">
        <button
          class="bg-primary px-2 py-1 rounded-sm text-white font-semibold text-xs uppercase"
          @click="handleSubmit"
        >
          {{ modal.type }}
        </button>
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import type { IAuthor, IBook, IParams, IUpsertBookRequest } from '@/types'
import { reactive, ref } from 'vue'
import AppModal from '../App/AppModal.vue'
import { useAdminStore } from '@/stores/admin.store'
import {useBookStore} from '@/stores/book.store'
const bookStore = useBookStore();
const adminStore = useAdminStore()

const props = defineProps({
  list: {
    type: Array<IBook>,
    required: true
  },

  loading: {
    type: Boolean,
    default: false
  }
})

const modal = reactive({
  show: false,
  type: 'edit' || 'delete',
  title: ''
})

const handleThumbnailChange = ( event: any) => {
  const file = event.target.files[0]
  data.value.edit.file = file
}

const data = ref({
  edit: {
    id: 0,
    name: '',
    description: '',
    thumbnail: '',
    audio_url: '',
    pdf_url: '',
    created_at: new Date(),
    downloaded: 0,
    published_year: 0,
    country_code: '',
    category_id: 0,
    author_id: 0,
    file: null
  },
  delete: {
    id: 0
  }
})

const handleSubmit = async () => {
  if (modal.type === 'edit') {
    if (data.value.edit.file) {
      const params: IParams = {
        file: data.value.edit.file,
        key: 'thumbnail',
        content_type: 'image/jpeg'
      }
      const thumbnaiUrl = await adminStore.uploadFileToS3(params)
      thumbnaiUrl && (data.value.edit.thumbnail = thumbnaiUrl)
    }

    const request: IUpsertBookRequest = {
      ...data.value.edit
    }
    const response = await adminStore.saveBook(request)
    console.log({ response })
    
  } else if (modal.type === 'delete') {
    const response = await adminStore.deleteBook(data.value.delete.id)
    console.log({ response })
  }
  modal.show = false
}

const getModalTitle = (type: string) => {
  if (type === 'edit') {
    return 'EDIT AUTHOR'
  } else if (modal.type === 'delete') {
    return 'DELETE AUTHOR'
  }
  return ''
}

const openModal = (type: string, item?: IBook) => {
  modal.show = true
  modal.type = type
  modal.title = getModalTitle(type)

  if (type === 'edit' && item) {
    data.value.edit.id = item.id!
    data.value.edit.name = item.name
    data.value.edit.description = item.description
    data.value.edit.thumbnail = item.thumbnail
    data.value.edit.audio_url = item.audio_url
    data.value.edit.pdf_url = item.pdf_url
    data.value.edit.created_at = item.created_at
    data.value.edit.downloaded = item.downloaded
    data.value.edit.published_year = item.published_year
    data.value.edit.country_code = item.country_code
    data.value.edit.category_id = item.category.id!
    data.value.edit.author_id = item.author.id!
  } else if (type === 'delete' && item) {
    data.value.delete.id = item.id!
  }
}
</script>

<style scoped></style>
