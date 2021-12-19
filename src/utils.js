
import lo from 'lodash';
export function isNull(value){

    if(lo.isUndefined(value)||lo.isNaN(value)|| lo.isNull(value) ){
        return true
    }else{
        return false
    }
}