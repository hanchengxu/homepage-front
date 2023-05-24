<template>
    <div :class="['attendance-main pt-5']">
        <div class="py-3 mx-1 mx-xxl-5 px-4 d-flex justify-content-end align-items-center attendance-title rounded-pill">
            <div class="me-auto fw-bold">Master设置</div>
            <i class="menu bi bi-arrow-return-left" style="font-size: 2rem;" @click="backAttendance"></i>
        </div>
        <div class="mt-4 px-xxl-5 px-xl-5 px-lg-5 d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column" >
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
                        <td v-if="addingNew && master.id === null"><button @click="saveNewMaster" class="btn btn-primary btn-sm" type="button">保存</button></td>
                        <td v-else>{{ moment(master.updateDatetime) }}</td>
                    </tr>
                    <tr><td><i class="bi bi-plus-square add-icon" @click="addingMaster"></i></td></tr>
                </tbody>
            </table>
        </div>
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
        const getScollWidth = () => {
            return window.innerWidth;
        };
        const scollHeight = ref(getScollHeight());
        const width = ref(getScollWidth());
        const windowResize = () => {
            scollHeight.value = getScollHeight();
            width.value = getScollWidth();
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
            width,
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
            // 点击新增master按钮
            if (!this.addingNew){
                // 限定同时只能新增一条，newMaster为新增空对象
                let newMaster= {"id":null,"itemValue":null,"itemDesc":null,"insertDatetime":null,"updateDatetime":null,"itemName":null}
                // 把空对象放置在masterList 最后尾
                this.masterList.push(newMaster)
                // 将新增flag置位true
                this.addingNew = true;
            }
        },
        saveNewMaster(){
            if (this.addingNew){
                // 将masterList最后一条提交
                postAPI('/hamster/api/noauth/insertMaster',this.masterList[this.masterList.length-1]).then((response)=>{
                        // 后台返回的master覆盖最后一条
                        this.masterList[this.masterList.length-1] = response.data.data;
                }).finally(()=>{
                    // 关闭新增flag
                    this.addingNew
                })
            }
        },
        changeValue(masterId,itemName,value){
            if (null === masterId){
                //新增master,根据输入内容仅更新对象属性，不提交到后台
                this.masterList[this.masterList.length-1][itemName] = value;
            } else {
                //更新master，根据输入内容使用API提交到后台
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
.table {
    border-radius: 8px;
    background-color: white;
    opacity: 0.95;
}
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
    color:#0d6efd;
}
.add-icon:active{
    color:#0d6efd;
}
</style>