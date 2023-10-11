import { AxiosBackend } from "../axios";
import type { IListDownloadY2MateResponse,ILinkDownloadResponse, IParams, IVideoItem } from "@/types";



export default{
    searchByKeyWord:(payload : IParams) =>{
        return AxiosBackend.post<IVideoItem[]>(`/youtube/search`,payload)
    },
    listVideoByChannelId:(payload : IParams) =>{
        return AxiosBackend.post<IVideoItem[]>(`/youtube/channel/videos`,payload)
    },

    getListDownloadFromY2Mate:(id : string) =>{
        return AxiosBackend.get<IListDownloadY2MateResponse>(`/youtube/video/download/list/${id}`)
    },
    downloadMediaFromY2Mate:(payload : IParams) =>{
        return AxiosBackend.get<ILinkDownloadResponse>(`/youtube/video/download`,{
            params:payload
        })
    }
}