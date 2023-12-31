import { Axios, type AxiosProgressEvent } from "axios";
import { AxiosBackend } from "../axios";
import type { ILinkDownloadResponse, IParams, IVideoItem,IVideoFromChannelResponse } from "@/types";

export default{
    searchByKeyWord:(payload : IParams) =>{
        return AxiosBackend.post<IVideoItem[]>(`/youtube/search`,payload)
    },
    listVideoByChannelId:(id : string) =>{
        return AxiosBackend.post<IVideoFromChannelResponse>(`/youtube/channel/videos`,{id})
    },
    getChannelInfoByChannelId:(id : string) =>{
        return AxiosBackend.post<IVideoFromChannelResponse>(`/youtube/channel/info`,{id})
    },
    getListDownload:(id : string) =>{
        return AxiosBackend.post<ILinkDownloadResponse>(`/youtube/video/download/list`,{id})
    },
    downloadFile(payload : IParams,onProgress: (progressEvent: AxiosProgressEvent) => void){
        return AxiosBackend.put<Blob>(`/youtube/file/download`,payload,{
            timeout:0,
            responseType:'blob',
            onDownloadProgress: onProgress,
        })
    },
    listTrendingVideo:(payload : IParams) =>{
        return AxiosBackend.get<IVideoItem[]>(`/youtube/video/trending`,{
            params:payload
        })
    },
}