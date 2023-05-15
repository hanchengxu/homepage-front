<template>
        <div v-for="(item,index) in itemList" :key="item.itemName" class="d-flex flex-row justify-content-center">
            <div class="col-6 text-end pe-5">{{ item.itemName }}</div>
            <div class="col-6">
                <vue3-autocounter ref='counter' :startAmount='0' :endAmount=item.itemValue 
                    :duration='1' prefix='￥' suffix='円'
                    separator=',' :decimals='0' :autoinit='true' />
            </div>  
        </div>
</template>
<script>
import { postAPI } from '@/utils.js';
import moment from 'moment';
export default {
name: 'AttendanceItem', 
props: {
    itemList: {require: false, default: []}
},
data() {
    return {
    }
  },  
methods: {
  }

}
</script>
<style scoped>
</style>