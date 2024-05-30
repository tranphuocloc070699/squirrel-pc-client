<template>
  <div class="max-w-5xl w-full mx-auto mt-6">
    <div v-show="loading">Loading...</div>
    <h2 class="font-semibold mt-4 my-2">List Upload Files</h2>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    name
                </th>
                <th scope="col" class="px-6 py-3">
                    audio
                </th>
                <th scope="col" class="px-6 py-3">
                    pdf
                </th>
                <th scope="col" class="px-6 py-3">
                    saved
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in list" :key="item.id" class="bg-white border-b   hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {{ item.id }}
                </th>
                <td class="px-6 py-4">
                    {{ item.name }}
                </td>
                <td class="px-6 py-4 text-blue-600">
                    <a :href="item.audio_url" target="_blank">LINK TO AUDIO FILE</a>
                </td>
                <td class="px-6 py-4 text-orange-600">
                  <a :href="item.pdf_url" target="_blank">LINK TO PDF FILE</a>
                </td>
                <td class="px-6 py-4">
                  {{ item.saved }}
                </td>
                <td class="px-6 py-4 text-right flex items-center">
                  <AdminConverUploadFileToBook :data="item" :loading="loading"/>
                  
                    <AdminDeleteUploadFileItem :id="item.id" @delete="handleDelete" :loading="loading"/>
                </td>
            </tr>
        </tbody>
    </table>
</div>

  </div>
</template>

<script setup lang="ts">
import type { IUploadFile } from '@/types'
import AdminDeleteUploadFileItem from './AdminDeleteUploadFileItem.vue'
import AdminConverUploadFileToBook from './AdminConverUploadFileToBook.vue';
import { useAdminStore } from '@/stores/admin.store';

const adminStore = useAdminStore()
const props = defineProps({
  list: {
    type: Array<IUploadFile>,
    required: true
  },

  loading: {
    type: Boolean,
    default: false
  }
})

const handleDelete = (id : number) =>{
  adminStore.deleteUploadFileById(id).then((data) =>{
    alert(data)

  }).catch((error) =>{
    console.log({error})
  })
}
</script>

<style scoped></style>
