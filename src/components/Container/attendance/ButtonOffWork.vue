<template>
    <div class="button2 col-md-6">
        <button  type="button" class="btn btn-success btn-circle" @click="endWork">
            <div class="work"><p>下班</p></div>
            <div class="time"><p>{{ overTime }}</p></div>
        </button>
    </div>
</template>
<script>
import { postAPI } from '@/utils.js';
import moment from 'moment';
export default {
name: 'ButtonOffWork', 
data() {
    return {
        overTime: null
    }
  },  
methods: {
    endWork() {
            let requestBody = {workDay: moment().format('YYYY-MM-DD'), workUserName: "Yang"}

            postAPI('/hamster/api/noauth/saveEndWorkTime',requestBody)
            .then((response)=> {
                this.overTime = moment(response.data.data.endTime).format('HH:mm:ss');
            })
        },
  }

}
</script>
<style scoped>

.button2 {
    float:left;
}
.btn-circle {
  width: 240px;
  height: 240px;
  text-align: center;
  padding: 6px 0;
  font-size: 60px;
  line-height: 1.428571429;
  border-radius: 120px;
}
.work {
    margin-top: 30px; 
}
.time {
    font-size: 20px; 
}
</style>