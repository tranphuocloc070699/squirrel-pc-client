export interface IVideoItem{
    id: string,
    thumbnails: Array<string>,
    title: string,
    long_desc: null,
    channel: string,
    duration: string,
    views: string,
    publish_time: string,
    url_suffix: string,
    download_counter?:number
}