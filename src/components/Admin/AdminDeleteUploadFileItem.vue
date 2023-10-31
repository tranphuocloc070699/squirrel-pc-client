<template>
    <div>
        <span  class="font-medium text-red-600  hover:underline cursor-pointer" @click="modal.show=true">Delete</span>
        <AppModal :show-modal="modal.show" :title="modal.title" @close="modal.show = false">
            <div class="relative">
              <p class="text-start w-[400px] py-8 font-semibold text-lg text-red-700">Do you really want to delete file upload?</p>
        
                <div class="text-end mt-10">
          <button
            @click="handleDelete"
            class="bg-red-600 px-4 py-2 text-white text-sm font-semibold rounded-sm outline-none"
          >
            DELETE
          </button>
     
            </div>
            <AdminSimpleModalLoading v-show="loading"/>
            </div>
        </AppModal>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import  AppModal from '../App/AppModal.vue';
import AdminSimpleModalLoading from '../Loading/AdminSimpleModalLoading.vue';
const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  loading:{
    type:Boolean,
    default:false
  }
})
const emit = defineEmits(['delete'])
const modal = reactive({
  show: false,
  title: `DELETE UPLOAD FILE [${props.id}]`,
})

const handleDelete = () =>{
    emit('delete', props.id)
    modal.show = false
}

 

</script>

<style scoped>

</style>