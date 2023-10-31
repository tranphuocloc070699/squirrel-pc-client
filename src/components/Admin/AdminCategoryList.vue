<template>
  <div class="max-w-5xl w-full mx-auto mt-6">
    <div class="flex items-center justify-between">
      <h2 class="font-semibold mt-4 my-2">Categories</h2>
   
        <button class="rounded-3xl px-2 py-1 text-xs text-white bg-red-600" @click="openModal('create')">
      NEW CATEGORY
    </button>
    </div>
    
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">name</th>

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
        <input class="px-2 py-1 rounded-md outline-none border border-slate-400" type="text" v-model="data.create.name" placeholder="Category Name">
    </div>
      <div v-else-if="modal.type === 'edit'">
        <input class="px-2 py-1 rounded-md outline-none border border-slate-400" type="text" v-model="data.edit.name" placeholder="Category Name">
    </div>
      <div v-else-if="modal.type === 'delete'">
        <p>Are you sure you want to delete this category?</p>
    </div>
    <div class="text-end mt-20">
        <button class="bg-primary px-2 py-1 rounded-sm text-white font-semibold text-xs uppercase" @click="handleSubmit">
            {{ modal.type }}
        </button>
      </div>

    <AdminSimpleModalLoading v-show="loading"/>
      </div>

     
    </AppModal>
   
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from '@/types'
import { reactive, ref } from 'vue'
import AppModal from '../App/AppModal.vue'
import { useAdminStore  } from '@/stores/admin.store';
import AdminSimpleModalLoading from '../Loading/AdminSimpleModalLoading.vue';
const adminStore = useAdminStore();

const props = defineProps({
  list: {
    type: Array<ICategory>,
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



const data = ref({
    create:{
        name:''
    },
    edit:{
        id:0,
        name:''
    },
    delete:{
        id:0
    }
})


const handleSubmit = async () =>{
    if(modal.type==='create'){
        const request : ICategory = {
            name:data.value.create.name
        }
        const response = await adminStore.saveCategory(request)
        console.log({response})
        modal.show = false
    }else if(modal.type==='edit'){
        const request : ICategory = {
            name:data.value.edit.name,
            id:data.value.edit.id
        }
        const response = await adminStore.saveCategory(request)
        console.log({response})
        modal.show = false
    }else if(modal.type==='delete'){
        console.log('delete')
    }
}





const getModalTitle = (type : string) => {
  if (type === 'create') {
    return 'CREATE CATEGORY'
  } else if (modal.type === 'edit') {
    return 'EDIT CATEGORY'
  } else if (modal.type === 'delete') {
    return 'DELETE CATEGORY'
  }
  return ''
}


const openModal = (type: string,item? : ICategory) => {
  modal.show = true
  modal.type = type
  modal.title = getModalTitle(type)

  if(type==='edit' && item){
    data.value.edit.id = item.id!
    data.value.edit.name = item.name
  }
  else if(type==='delete' && item){
    data.value.delete.id = item.id!
}

}

</script>

<style scoped></style>
