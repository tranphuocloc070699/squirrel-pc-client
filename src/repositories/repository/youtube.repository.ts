import { AxiosBackend } from "../axios";
import type { ILinkDownloadResponse, IParams, IVideoItem } from "@/types";



export default{
    searchByKeyWord:(payload : IParams) =>{
        return AxiosBackend.post<IVideoItem[]>(`/youtube/search`,payload)
    },
    listVideoByChannelId:(payload : IParams) =>{
        return AxiosBackend.post<IVideoItem[]>(`/youtube/channel/videos`,payload)
    },

    getListDownload:(id : string) =>{
        return AxiosBackend.post<ILinkDownloadResponse>(`/youtube/video/download`,{id})
    },
}