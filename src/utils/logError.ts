import type { AxiosError } from "axios";

export function logError(error : AxiosError | any,name : string){

    if(error.response){
        if(error.response.status ){
           
            let data;
            if(error.response.data){
                data = JSON.stringify(error.response.data).slice(0,200);
            }
            console.error(`[${name}] error with status: ${error.response?.status} | data:${data}`);
        }else{
            if(error.response.data && typeof error.response.data=='object'){
                console.error(`[${name}] error with data: ${JSON.stringify(error.response.data)}`)
            }
        }
    }
    if(error.response==undefined || error.response==null){
        console.error(`[${name}] error without response`,error)
    }

}