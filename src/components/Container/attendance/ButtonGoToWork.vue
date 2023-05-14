<template>
    <div class="button1 col-md-6">
        <button type="button" :class="['btn', 'btn-primary', 'btn-circle', 'mt-1',{disabled:committing}]" @click="startWork">
            <div class="work"><p>上班</p></div>
            <div class="time"><p>{{ cqTime }}</p></div>
        </button>
    </div>
</template>
<script>
import { postAPI } from '@/utils.js';
import moment from 'moment';
export default {
    name: 'ButtonGoToWork', 
    data() {
    return {
        cqTime: null,
        committing: false
    }
  },
methods: {
    startWork() {
            let requestBody = {workDay: moment().format('YYYY-MM-DD'), workUserName: "Yang"}
            this.committing = true;
            postAPI('/hamster/api/noauth/saveStartWorkTime', requestBody).then((response)=> {
                this.cqTime = moment(response.data.data.startTime).format('HH:mm:ss');
            }).finally(()=>{
                this.committing = false;
            })
        },
  }

}
</script>
<style scoped>
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