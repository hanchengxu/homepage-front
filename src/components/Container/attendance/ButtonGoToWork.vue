<template>
    <div class="button1 col-md-6">
        <button type="button" class="btn btn-primary btn-circle"  @click="startWork">
            <div><p>上班</p></div>
            <div><p>{{ cqTime }}</p></div>
        </button>
        <!--  -->
    </div>
</template>
<script>
import { postAPI } from '@/utils.js';
import moment from 'moment';
export default {
    name: 'ButtonGoToWork', 
    data() {
    return {
        cqTime: null
    }
  },
methods: {
    startWork() {
            let requestBody = {workDay: moment().format('YYYY-MM-DD'), workUserName: "Yang"}
            
            postAPI('/hamster/api/noauth/saveStartWorkTime', requestBody).then((response)=> {
                console.log(response.data.data.startTime);
                this.cqTime = response.data.data.startTime;
            })
        },
  }

}
</script>
<style scoped>
.btn-circle {
  width: 400px;
  height: 400px;
  margin-left: 100px;
  padding: 6px 0;
  font-size: 60px;
  line-height: 1.428571429;
  border-radius: 100px;
}
</style>