import type { IParams, IPodcastItem,IShowInfoAndEpisodes } from "@/types";
import { AxiosBackend } from "../axios";
import type { AxiosProgressEvent } from "axios";

export default{
    searchByKeyWord:(payload : IParams) =>{
        return AxiosBackend.post<IPodcastItem[]>(`/book/search`,payload)
    },
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

}