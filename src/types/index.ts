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
export interface IListDownloadY2MateResponse {
    status: string;
    mess: string;
    page: string;
    vid: string;
    extractor: string;
    title: string;
    t: number;
    a: string;
    links: {
      mp4: {
        [key: string]: IDownloadItem;
      };
      mp3: {
        [key: string]: IDownloadItem;
      };
      other: {
        [key: string]: IDownloadItem;
      };
    };
    related: {
      title: string;
      contents: {
        v: string;
        t: string;
      }[];
    }[];
  }

export interface IDownloadItem{
    size: string,
    f: string,
    q: string,
    q_text: string,
    k: string
}

export interface IParams{
    [key:string]:string | number
}