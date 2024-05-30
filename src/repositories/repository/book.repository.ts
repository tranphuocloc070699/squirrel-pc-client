import type { IAuthor, IBook, IBookDetailResponse, ICategory, IFindBookByAuthorResponse, IParams, IPodcastItem,IShowInfoAndEpisodes } from "@/types";
import { AxiosBackend } from "../axios";
import type { AxiosProgressEvent } from "axios";



export default{
    
    uploadPdfFile(payload : IParams,onProgress: (progressEvent: AxiosProgressEvent) => void){
        const formData = new FormData();
        formData.append('file', payload.file);
        formData.append('page_array', payload.page_array);
        formData.append('lang', payload.lang);
        formData.append('saved', payload.saved);

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
    findById(id : number,category_id : number){
        return AxiosBackend.get<IBookDetailResponse>(`/book/${id}`,{
            params:{
                category_id
            }
        })
    },
    findByNamesContaining(payload : IParams){
        return AxiosBackend.post<IBook[]>(`/book/find-by-keyword`,payload)
    },
    findByNamesContainingAndCountryCode(payload : IParams){
        return AxiosBackend.post<IBook[]>(`/book/find-by-keyword-and-country-code`,payload)
    },
    findByCategory(payload : IParams){
        return AxiosBackend.get<IBook[]>(`/book/by-category`,{
            params:{
                id:payload.id,
            country_code:payload.country_code
            }
        })
    },
    findAuthorDetail(payload : IParams){
        return AxiosBackend.get<IFindBookByAuthorResponse>(`/book/by-author`,{
            params:{
                id:payload.id
            }
        })
    },
    findByAuthorAndCountryCode(payload : IParams){
        return AxiosBackend.get<IBook[]>(`/book/by-author-and-country-code`,{
            params:{
                id:payload.id,
                country_code:payload.country_code
            }
        })
    },

    
    findAllCategories(){
        return AxiosBackend.get<ICategory[]>('/book/category')
    },
    findAllAuthors(){
        return AxiosBackend.get<IAuthor[]>('/book/author')
    },


}