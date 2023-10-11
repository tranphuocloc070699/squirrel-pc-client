import { AxiosBackend } from "../axios";
import type { ILinkDownloadResponse, IParams, IVideoItem,IVideoFromChannelResponse } from "@/types";



export default{
    searchByKeyWord:(payload : IParams) =>{
        return AxiosBackend.post<IVideoItem[]>(`/youtube/search`,payload)
    },
    listVideoByChannelId:(id : string) =>{
        return AxiosBackend.post<IVideoFromChannelResponse>(`/youtube/channel/videos`,{id})
    },

    getListDownload:(id : string) =>{
        return AxiosBackend.post<ILinkDownloadResponse>(`/youtube/video/download`,{id})
    },
}