
import lo from 'lodash';
import axios from 'axios';

export function isNull(value){

    if(lo.isUndefined(value)||lo.isNaN(value)|| lo.isNull(value) ){
        return true
    }else{
        return false
    }
}

//axios 为跨域准备
axios.defaults.withCredentials = true;

export function callAPI(method,url,data){

    return axios({
        method: method,
        url:process.env.VUE_APP_API_HOST+url,
        data:data
    }).catch((e)=>{
        console.error(e);
    })
}

export function getAPI(url){
    return callAPI('get',url,null);
}

export function postAPI(url,data){
    return callAPI('post',url,data);
}