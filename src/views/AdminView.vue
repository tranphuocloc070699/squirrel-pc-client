<template>
    <div>
        <LayoutDefault type="admin">
            <AdminTabs :type="tabSelected" @change="num  => tabSelected=num"/>
                <AdminUploadFileList v-show="tabSelected==0" :list="adminStore.uploadFiles" :loading="adminStore.loading"/>
                <AdminBookList v-show="tabSelected==1" :list="bookStore.allBook.data" :loading="bookStore.allBook.loading"/>
                <AdminCategoryList v-show="tabSelected==2" :list="bookStore.categoryList.data" :loading="bookStore.categoryList.loading"/>
                <AdminAuthorList v-show="tabSelected==3" :list="bookStore.authorList.data" :loading="bookStore.authorList.loading"/>
        </LayoutDefault>
    </div>
</template>

<script setup lang="ts">
import  LayoutDefault from '@/layouts/LayoutDefault.vue';
import AdminUploadFileList from '@/components/Admin/AdminUploadFileList.vue';
import { useAdminStore } from '@/stores/admin.store';
import {useBookStore} from '@/stores/book.store';
import { onMounted, ref } from 'vue';
import AdminTabs from '@/components/Admin/AdminTabs.vue';
import AdminCategoryList from '@/components/Admin/AdminCategoryList.vue';
import AdminAuthorList from '@/components/Admin/AdminAuthorList.vue';
import  AdminBookList from '@/components/Admin/AdminBookList.vue';
const adminStore = useAdminStore()
const bookStore = useBookStore()
const tabSelected = ref(0)

onMounted(() => {
    adminStore.findAllUploadFile()
    bookStore.findAllAuthor()
    bookStore.findAllCategory()
    bookStore.findAllBook()
})

</script>

<style scoped>

</style>