<template>
    <div>
      <div v-for="(item,index) in itemList" :key="item.itemName" class="d-flex flex-row justify-content-center">
            <div class="col-6 text-end pe-5 pb-2">{{ item.itemName }}</div>
            <div class="col-6">
                <vue3-autocounter ref='counter' :startAmount='0' :endAmount=item.itemValue 
                    :duration='1' prefix='￥' suffix='円'
                    separator=',' :decimals='0' :autoinit='true' />
                <LazyShow :time="500" transName="fade">
                  <span v-if="item.itemDesc >= 0 " class="detail-desc ps-3">(时长: {{item.itemDesc}}h * {{item.itemDesc2}}円 )</span>
                </LazyShow>
            </div>
      </div>
      <div v-for="detail in detailList" :key="detail.additionalId" class="detail-div">
        <LazyShow :time="500" transName="fade">
          <div class="d-flex flex-row justify-content-center">
            <div class="col-6 text-end pe-5"></div>
            <div class="col-6">
              <span class="pe-4">{{detail.additionalDesc}} </span>
              <span class="pe-4">{{ dateFormat(detail.workDay) }} </span>
              <vue3-autocounter ref='counter' :startAmount='0' :endAmount=detail.price 
                      :duration='1' prefix='￥' suffix='円'
                      separator=',' :decimals='0' :autoinit='true' /></div>
          </div>
        </LazyShow>
      </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
name: 'AttendanceItem', 
props: {
    itemList: {require: false, default: []},
    detailList: {require: false, default: []},
    masterList: {require: false, default: []}
},
data() {
    return {
    }
  },  
methods: {
    dateFormat(date){
      return moment(date).format('YYYY-MM-DD')
    }
  }

}
</script>
<style scoped>
.detail-div{
  color: black;
  font-size: 19px;
  -webkit-text-stroke: 0px;
}
.detail-desc{
  color: black;
  font-size: 17px;
  -webkit-text-stroke: 0px;
}
</style>