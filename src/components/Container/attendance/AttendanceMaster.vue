<template>
    <div>
        <div class="pt-3 px-5 d-flex justify-content-between align-items-center">
            <div class="">Master设置</div>
            <i class="menu bi bi-arrow-return-left" style="font-size: 2rem;" @click="backAttendance"></i>
        </div>
        <div class="px-5 d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column" >
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">项目名</th>
                        <th scope="col">项目值</th>
                        <th scope="col">说明</th>
                        <th scope="col">更新日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(master,index ) in masterList" :key="master.id">
                        <th scope="row">{{ index+1 }}</th>
                        <WriteableTD v-if="addingNew && master.id === null" :newFlag="true" :value="master.itemValue" @changeItemValue="changeValue(master.id,'itemName',$event)" />
                        <td v-else>{{ master.itemName }}</td>
                        <WriteableTD :newFlag="addingNew && master.id === null" :value="master.itemValue" @changeItemValue="changeValue(master.id,'itemValue',$event)"/>
                        <WriteableTD :newFlag="addingNew && master.id === null" :value="master.itemDesc" @changeItemValue="changeValue(master.id,'itemDesc',$event)"/>
                        <td v-if="addingNew && master.id === null"><button class="btn btn-primary btn-sm" type="button">保存</button></td>
                        <td v-else>{{ moment(master.updateDatetime) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="px-5 ms-1" @click="addingMaster"><i class="bi bi-plus-square add-icon"></i></div>
    </div>
</template>
<script>
import { onMounted, ref, onUnmounted } from "vue";
import { getAPI, postAPI, isNull } from '@/utils.js';
import moment from 'moment';
import WriteableTD from "../../Common/WriteableTD.vue";
import { find, findIndex } from 'lodash'
export default {
    name: "AttendanceMaster",
    components:{
        WriteableTD
    },
    data() {
        return {
            addingNew : false
        }
    },
    setup() {
        const masterList= ref([])

        const getScollHeight = () => {
            return window.innerHeight;
        };
        const scollHeight = ref(getScollHeight());
        const windowResize = () => {
            scollHeight.value = getScollHeight();
        };
        onMounted( () => {
            window.addEventListener("resize", windowResize);
            getAPI('/hamster/api/noauth/getMasterList').then((resp)=>{
                masterList.value = resp.data.data
            })
        });
        onUnmounted(() => {
            window.removeEventListener("resize", windowResize);
        });
        return {
            scollHeight,
            masterList
        };
    },
    methods: {
        backAttendance(){
            this.$router.push({ path: 'attendance'});
        },
        moment: function (date) {
            return isNull(date)? '': moment(date).format('yyyy-MM-DD HH:mm:ss');
        },
        addingMaster(){
            if (!this.addingNew){
                let newMaster= {"id":null,"itemValue":null,"itemDesc":null,"insertDatetime":null,"updateDatetime":null,"itemName":null}
                this.masterList.push(newMaster)
                this.addingNew = true;
            }
        },
        changeValue(masterId,itemName,value){

            if (isNull(masterId)){
                //新增master
            } else {
                //更新master
                let index = findIndex(this.masterList,["id",masterId]);
                let master = this.masterList[index]
                if (master[itemName] !== value) {
                    master[itemName] = value
                    postAPI('/hamster/api/noauth/updateMaster',master).then((response)=>{
                        this.masterList[index] = response.data.data
                    })
                }
            }
        }  
    }
};
</script>
<style scoped>
.menu {
    cursor:pointer;
    transform:scale(1);
    transition: 0.3s;
}
.menu:hover{
    transform:scale(1.2);
    transition: 0.3s;
    color:#0d6efd;
}
.menu:active{
    transform:scale(1.1);
    transition: 0.1s;
    color:#0d6efd;
}
.add-icon{
    cursor:pointer;
    transition: 0.3s;
}
.add-icon:hover{
    font-size: 1.6rem;
    color:#0d6efd;
}
.add-icon:active{
    font-size: 1.4rem;
    color:#0d6efd;
}
</style>