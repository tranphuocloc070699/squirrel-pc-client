import type { IBook, IParams, IUploadFile, IUpsertBookRequest } from "@/types";
import { AxiosBackend } from "../axios";


export default{
    saveBook:(payload : IUpsertBookRequest) =>{
        return AxiosBackend.post<IBook>(`/admin/book/save`,payload)
    },
    deleteBook:(bookId : number) =>{
        return AxiosBackend.delete<string>(`/admin/book/${bookId}`)
    },
    uploadFileToS3:(payload : IParams) =>{
        const formData = new FormData();
        formData.append('key', payload.key);
        formData.append('content_type', payload.content_type);
        formData.append('file', payload.file);
        return AxiosBackend.post<string>(`/admin/upload`)
    },
    findAllUploadFile(){
        return AxiosBackend.get<IUploadFile[]>('/admin/file')
    },
    findUploadFileById(fileId : number){
        return AxiosBackend.get<IUploadFile>(`/admin/file/${fileId}`)
    },
    deleteUploadFileById(fileId : number){
        return AxiosBackend.delete<string>(`/admin/file/${fileId}`)
    },
    

}