export interface IVideoItem {
  id: string
  thumbnails: Array<IVideoThumbnailItem>
  title: string
  channel_name?: string
  channel_id?: string
  duration: string
  views: string
  publish_time: string
  download_counter?: number
  country?:ICountry
}

export interface ICountry{
  id : number,
  name:string,
  code:string
}

export interface IChannelInfo {
  channelId: string
  title: string
  thumbnails: IVideoThumbnailItem[]
  description: string
  subscribers: string
  url: string
}

export interface IAxiosProgressEvent{
  showProgressBar: boolean,
  downloadProgress: number,
  total:string,
    loaded:string
}

export interface ISidebarVideoItem{
  video:IVideoItem,
  progress?:IAxiosProgressEvent
}

export interface IVideoFromChannelResponse{
  videos?: IVideoItem[]
  channel?: IChannelInfo
}

export interface IVideoThumbnailItem {
  url: string
  width: string
  height: string
}

export interface IDownloadItem {
  format_id: string
  video_ext: string
  format: string
  url: string
  manifest_url?: string
  filesize?: number
}
export interface ILinkDownloadResponse {
  id: string
  title: string
  formats: IDownloadItem[]
  thumbnail: string
  description: String
  channel_id: string
  channel_url: string
  requested_formats: IDownloadItem[]
}

export interface IParams {
  [key: string]: string | number
}

export interface IShow{
  id:string,
  name:string,
  thumbnails:IVideoThumbnailItem[],
  description:string
}

export interface IPodcastItem{
  id: string;
    name: string;
    thumbnails: IVideoThumbnailItem[];
    description: string;
    release_date: string;
    audio_url: string;
    duration: number;
    audio_preview_url: string;
    keywords: string;
    show?:IShow
}

export interface IShowInfoAndEpisodes{
  podcasts:IPodcastItem[],
  show:IShow
}
