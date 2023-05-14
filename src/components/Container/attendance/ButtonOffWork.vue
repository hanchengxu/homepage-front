<template>
    <div class="button2 col-md-6">
        <button  type="button" class="btn btn-success btn-circle" @click="endWork">下班</button>
    </div>
</template>
<script>
import { postAPI } from '@/utils.js';
import moment from 'moment';
export default {
name: 'ButtonOffWork',   
methods: {
    endWork() {
            let requestBody = {workDay: moment().format('YYYY-MM-DD'), workUserName: "Yang"}

            postAPI('/hamster/api/noauth/saveEndWorkTime',requestBody)
            .then(function (response) {
                console.log(response)
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
  width: 200px;
  height: 200px;
  text-align: center;
  padding: 6px 0;
  font-size: 60px;
  line-height: 1.428571429;
  border-radius: 100px;
}
</style>