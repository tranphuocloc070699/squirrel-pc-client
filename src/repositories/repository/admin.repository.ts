import type { IAuthResponse, IAuthor, IBook, ICategory, IParams, IUploadFile, IUpsertBookRequest } from "@/types";
import { AxiosBackend } from "../axios";





export default{
    helloUser:() =>{
        return AxiosBackend.get<string>(`/user`)
    },
    login:(payload : IParams) =>{
        return AxiosBackend.post<IAuthResponse>(`/user/login`,payload)
    },
    saveBook:(payload : IUpsertBookRequest,accessToken:string) =>{
        return AxiosBackend.post<IBook>(`/admin/book`,payload,{
            headers:{
                ...(accessToken.length>0 && {'Authorization':`Bearer ${accessToken}`})
            }
        })
    },
    saveAuthor:(payload : IAuthor,accessToken:string) =>{
        return AxiosBackend.post<IAuthor>(`/admin/author`,payload,{
            headers:{
                ...(accessToken.length>0 && {'Authorization':`Bearer ${accessToken}`})
            }
        })
    },
    saveCategory:(payload : ICategory,accessToken:string) =>{
        return AxiosBackend.post<ICategory>(`/admin/category`,payload,{
            headers:{
                ...(accessToken.length>0 && {'Authorization':`Bearer ${accessToken}`})
            }
        })
    },
    deleteBook:(bookId : number,accessToken:string) =>{
        return AxiosBackend.delete<string>(`/admin/book/${bookId}`,{
            headers:{
                ...(accessToken.length>0 && {'Authorization':`Bearer ${accessToken}`})
            }
        })
    },
    uploadFileToS3:(payload : IParams,accessToken:string) =>{
      
        const formData = new FormData();
        formData.append('key', payload.key);
        formData.append('content_type', payload.content_type);
        formData.append('file', payload.file);
        return AxiosBackend.post<string>(`/admin/upload`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                ...(accessToken.length>0 && {'Authorization':`Bearer ${accessToken}`})
            }
        })
        
    },
    findAllUploadFile(accessToken:string){
        return AxiosBackend.get<IUploadFile[]>('/admin/file',{
            headers:{
                ...(accessToken.length>0 && {'Authorization':`Bearer ${accessToken}`})
            }
        })
    },
  
    findUploadFileById(fileId : number,accessToken:string){
        return AxiosBackend.get<IUploadFile>(`/admin/file/${fileId}`,{
            headers:{
                ...(accessToken.length>0 && {'Authorization':`Bearer ${accessToken}`})
            }
        })
    },
    deleteUploadFileById(fileId : number,accessToken:string){
        return AxiosBackend.delete<string>(`/admin/file/${fileId}`,{
            headers:{
                ...(accessToken.length>0 && {'Authorization':`Bearer ${accessToken}`})
            }
        })
    },
    

}