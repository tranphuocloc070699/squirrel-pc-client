import type { IBook, IParams, IPodcastItem,IShowInfoAndEpisodes } from "@/types";
import { AxiosBackend } from "../axios";
import type { AxiosProgressEvent } from "axios";

export default{
    
    uploadPdfFile(payload : IParams,onProgress: (progressEvent: AxiosProgressEvent) => void){
        const formData = new FormData();
        formData.append('file', payload.file);
        formData.append('page_array', payload.page_array);

        return AxiosBackend.post<Blob>(`/book/upload`,formData,{
            timeout:0,
            responseType:'blob',
            onDownloadProgress: onProgress,
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    },  
    findByCountryCode(country_code : string){
        return AxiosBackend.get<IBook[]>(`/book/`,{
            params:{
                country_code
            }
        })
    },
    findById(id : number){
        return AxiosBackend.get<IBook>(`/book/${id}`)
    },
    findByNamesContaining(payload : IParams){
        return AxiosBackend.post<IBook[]>(`/book/`,payload)
    },
    findByCategoryId(payload : IParams){
        return AxiosBackend.get<IBook[]>(`/book/category`,{
            params:{
                id:payload.id,
            country_code:payload.country_code
            }
        })
    },
    findByAuthorId(payload : IParams){
        return AxiosBackend.get<IBook[]>(`/book/author`,{
            params:{
                id:payload.id,
            country_code:payload.country_code
            }
        })
    },


}