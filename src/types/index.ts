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
}

export interface IChannelInfo {
  channelId: string
  title: string
  thumbnails: IVideoThumbnailItem[]
  description: string
  subscribers: string
  url: string
}

export interface IVideoFromChannelResponse{
  videos: IVideoItem[]
  channel: IChannelInfo
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
