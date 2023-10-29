import type { IParams, IPodcastItem,IShowInfoAndEpisodes } from "@/types";
import { AxiosBackend } from "../axios";

export default{
    searchByKeyWord:(payload : IParams) =>{
        return AxiosBackend.post<IPodcastItem[]>(`/podcast/search`,payload)
    },
    getPodcastDetail(payload: IParams){
        return AxiosBackend.post<IPodcastItem>(`/podcast/detail`,payload)
    },
    getShowInfoAndEpisodes(showId : string){
        return AxiosBackend.get<IShowInfoAndEpisodes>(`/podcast/show/${showId}`)
    },
    
  
}