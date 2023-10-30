<template>
  <div class="max-w-5xl w-full mx-auto mt-6">
    <div class="flex items-center justify-between">
      <h2 class="font-semibold mt-4 my-2">Authors</h2>
      <button
        class="rounded-3xl px-2 py-1 text-xs text-white bg-red-600"
        @click="openModal('create')"
      >
        NEW AUTHOR
      </button>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">name</th>
            <th scope="col" class="px-6 py-3">thumbnail</th>
            <th scope="col" class="px-6 py-3">description</th>

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
              {{ item.description }}
            </td>

            <td class="px-6 py-4 text-right flex items-center justify-end">
              <span
                @click="openModal('edit',item)"
                class="font-medium text-orange-600 hover:underline mr-8 cursor-pointer"
                >Edit</span
              >
              <span
                @click="openModal('delete',item)"
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
        <div v-if="modal.type === 'create'">
        <input class="mt-4 px-2 py-1 rounded-md outline-none border border-slate-400" type="text" v-model="data.create.name" placeholder="Author Name">
        <input class="mt-4 px-2 py-1 rounded-md outline-none border border-slate-400" type="text" v-model="data.create.description" placeholder="Author Desc">
        <input class="mt-4 px-2 py-1 rounded-md outline-none border border-slate-400" type="file"  @change="(event : any )=> handleThumbnailChange('create',event)" placeholder="Author Thumbnail">
    </div>
      <div v-else-if="modal.type === 'edit'">
       
        <input class="mt-4 px-2 py-1 rounded-md outline-none border border-slate-400" type="text" v-model="data.edit.name" placeholder="Author Name">
        
     
        <input class="mt-4 px-2 py-1 rounded-md outline-none border border-slate-400" type="text" v-model="data.edit.description" placeholder="Author Desc">
        <div class="flex items-center mt-4"> 
          <img  :src="data.edit.thumbnail" width="64" height="64" class="w-16 h-16 rounded-lg" alt="">
        <input class="mt-4 px-2 py-1 rounded-md outline-none border border-slate-400" type="file"  @change="(event : any ) => handleThumbnailChange('edit',event)" placeholder="Author Thumbnail">

        </div>
    </div>
      <div v-else-if="modal.type === 'delete'">
        <p>Are you sure you want to delete this author?</p>
    </div>
      </div>

      <div class="text-end mt-20">
        <button class="bg-primary px-2 py-1 rounded-sm text-white font-semibold text-xs uppercase" @click="handleSubmit">
            {{ modal.type }}
        </button>
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import type { IAuthor, IParams } from '@/types'
import { reactive, ref } from 'vue'
import AppModal from '../App/AppModal.vue'
import { useAdminStore } from '@/stores/admin.store'

const adminStore = useAdminStore()

const props = defineProps({
  list: {
    type: Array<IAuthor>,
    required: true
  },

  loading: {
    type: Boolean,
    default: false
  }
})

const modal = reactive({
  show: false,
  type: 'create' || 'edit' || 'delete',
  title: ''
})

const handleThumbnailChange = (type : string,event : any) =>{
    const file = event.target.files[0]
    type==='create' ? data.value.create.file = file : data.value.edit.file = file
    
}

const data = ref({
  create: {
    name: '',
    thumbnail: '',
    description: '',
    file:null
  },
  edit: {
    id: 0,
    name: '',
    thumbnail: '',
    description: '',
    file:null
  },
  delete: {
    id: 0
  }
})

const handleSubmit = async () => {
  if (modal.type === 'create') {
    
    const params : IParams = {
        file:data.value.create.file,
        key:"thumbnail",
        content_type:"image/jpeg"
    }

    const thumbnaiUrl = await adminStore.uploadFileToS3(params);
    console.log({thumbnaiUrl})

    if(thumbnaiUrl){
        const request: IAuthor = {
      name: data.value.create.name,
      description: data.value.create.description,
        thumbnail: thumbnaiUrl
    }
        const response = await adminStore.saveAuthor(request)
    console.log({ response })
    }
    modal.show = false
  } else if (modal.type === 'edit') {

    if(data.value.edit.file){
        const params : IParams = {
          file:data.value.edit.file,
        key:"thumbnail",
        content_type:"image/jpeg"
    }
    const thumbnaiUrl = await adminStore.uploadFileToS3(params);
    thumbnaiUrl && (data.value.edit.thumbnail = thumbnaiUrl)
  }

    const request: IAuthor = {
      name: data.value.edit.name,
      id: data.value.edit.id,
      thumbnail: data.value.edit.thumbnail,
        description: data.value.edit.description
    }
    const response = await adminStore.saveAuthor(request)
    console.log({ response })
    modal.show = false
  } else if (modal.type === 'delete') {
    console.log('delete')
  }
}

const getModalTitle = (type: string) => {
  if (type === 'create') {
    return 'CREATE AUTHOR'
  } else if (modal.type === 'edit') {
    return 'EDIT AUTHOR'
  } else if (modal.type === 'delete') {
    return 'DELETE AUTHOR'
  }
  return ''
}

const openModal = (type: string, item?: IAuthor) => {
  modal.show = true
  modal.type = type
  modal.title = getModalTitle(type)

  if (type === 'edit' && item) {
    data.value.edit.id = item.id!
    data.value.edit.name = item.name
    data.value.edit.thumbnail = item.thumbnail
    data.value.edit.description = item.description
  } else if (type === 'delete' && item) {
    data.value.delete.id = item.id!
  }
}

</script>

<style scoped></style>
