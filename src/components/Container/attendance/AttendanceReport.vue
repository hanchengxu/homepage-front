<template>
    <div class="attendance-main pt-5">
        <div class="py-3 mx-1 mx-xxl-5 px-4 d-flex justify-content-end align-items-center attendance-title rounded-pill">
            <div class="me-auto fw-bold fs-2 input-group" >
                <label class="">月报</label>
                <LazyShow :time="500" transName="fade">
                    <select v-model="selectedReportMonth" class="form-select form-select-sm ms-4 mt-2"  aria-label=".form-select-sm" style="max-width: 200px; max-height: 40px;">
                        <option v-for="rDate in allReportDate">{{rDate}}</option>
                    </select>
                    
                </LazyShow>
            </div>
            <i class="menu bi bi-arrow-return-left" style="font-size: 2rem;" @click="backAttendance"></i>
        </div>
        <div class="report">
            <div class="mt-5 py-4 px-xxl-5 px-xl-5 px-lg-5 d-flex flex-column justify-content-center">
                <AttendanceItem :itemList=getItemList() :detailList=detailList />
                <div class="mt-2 border-top border-2 border-primary" v-if="totalBill != null"></div>
                <div class="d-flex flex-row justify-content-between" v-if="totalBill != null">
                    <span class="col-6 ps-4 sum">合计</span>
                    <span class="col-6">
                        <vue3-autocounter ref='counter' :startAmount='0' :endAmount='totalBill' 
                            :duration='1' prefix='￥' suffix='円'
                            separator=',' :decimals='0' :autoinit='true' />
                    </span>  
                </div>
            </div>
        </div>
        <div class="py-3 mx-1 mt-3 mx-xxl-5 px-4 d-flex justify-content-end align-items-center attendance-title rounded-pill">
            <div class="me-auto fw-bold fs-2 input-group">
                <label class="">预支费用追加</label>
            </div>
        </div>
        <div class="cost mt-3 row">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2"><VueDatePicker v-model="date" :format="dateFormat"/></div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3  my-2">
                <select v-model="costType">
                    <option v-for="(costTypes, index) in costTypes" :key="index">{{costTypes}}</option>
                </select>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2 ">
                <input :class="{ fail }" v-model.number.trim="cost" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入金额"/>円
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2">
                <button class="btn btn-primary" @click="addCost">添加</button>
            </div>
        </div> 
    </div>
</template>
<script>
import { onMounted, ref, onUnmounted} from "vue";
import { getAPI, postAPI, isNull } from '@/utils.js';
import moment from 'moment';
import { find, findIndex } from 'lodash'
import AttendanceItem from "./AttendanceItem.vue";
import { ConstantTypes } from "@vue/compiler-core";

export default {
    name: "AttendanceReport",
    components: {
        AttendanceItem
    },
    data() {
        return {
            now: moment().format('YYYY-MM-DD'),
            selectedReportMonth: moment().format('YYYY-MM'),
            costType: '预支费用',
            costTypes: ['预支费用', '追加费用'],
            dateFormat: 'yyyy-MM-dd',
            fail: false
        }
    },
    watch: {

        selectedReportMonth:{
            handler(nv) {
                this.selectedReportMonth = nv;
                this.masterList = JSON.parse(this.$route.params.masterData);
                getAPI('/hamster/api/noauth/getReport/'+nv).then((resp) => {
                    let report  = resp.data.data;
                    this.itemList = [];
                    this.itemList.push({itemName:'平日费用',itemValue:report.workOrdinaryBillMonthly,
                        itemDesc:report.workOrdinaryHoursMonthly,itemDesc2: find(this.masterList,{itemName:'hour_unit_price'}).itemValue})
                    this.itemList.push({itemName:'节假日费用',itemValue:report.workWeekendBillMonthly,
                        itemDesc:report.workWeekendHoursMonthly,itemDesc2: find(this.masterList,{itemName:'holiday_hour_unit_price'}).itemValue})
                    this.itemList.push({itemName:'车费',itemValue:report.traveBillMonthly})
                    this.itemList.push({itemName:'其他费用',itemValue:report.additionalTotal, hasDetail: true})
                    this.totalBill = report.billMonthly
                }),
                getAPI('/hamster/api/noauth/getAdditionalDataMonthly/'+nv).then((resp) => {
                this.detailList = resp.data.data;
                })
             },
             immediate:true
        }

    },
    setup() {
        const masterList = ref([])
        const itemList = ref([])
        const detailList = ref([])
        const allReportDate = ref([])
        const totalBill = ref(null)
        const date = ref(new Date())
        const cost = ref(null)
        const costList = ref([])

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

        onMounted(async () => {
            window.addEventListener("resize", windowResize);
            getAPI('/hamster/api/noauth/getAllReportDate').then((resp) => {
                allReportDate.value = resp.data.data;
            })
            
        });
        onUnmounted(() => {
            window.removeEventListener("resize", windowResize);
        });
        return {
            scollHeight,
            width,
            masterList,
            itemList,
            totalBill,
            detailList,
            allReportDate,
            date,
            cost,
            costList
        };
    },
    methods: {
        formatToPrice(value) {
            return `R$ ${value.toFixed(2)}`;
        },
        startAnimate: function () {
            this.$refs.myNum.start()
        },
        backAttendance() {
            this.$router.push({ path: 'attendance' });
        },
        getHourunitPrice(){
        return find(this.masterList,{itemName:'hour_unit_price'}).itemValue
        },
        getItemList(){
            //selectedReportMonth
            return this.itemList 
        },
        addCost(){

            if(typeof this.cost === 'undefined' || this.cost == null || this.cost === ''){
                this.fail=true;
                return;
            }
            let cost = this.cost;
            if (this.costType === '预支费用') {
                cost = -cost;
            }
            let costData= {workDay: this.date, price: cost, additionalDesc: this.costType};
            postAPI('/hamster/api/noauth/saveAdditionalData',costData).then((response)=>{
                this.$router.go(0);
             }) 
        }
    }
};
</script>
<style scoped>
.report {
    color: white;
    font-weight: bold;
    font-size: 1.4rem;
    -webkit-text-stroke: 1px #000000;
    background: white;
    margin-left: 50px;
    margin-right: 50px;
    opacity: 0.95;
    border-radius: 10px;
}

@media screen and (max-width: 500px) {
    .report {
        margin-left: 10px;
        margin-right: 10px;
        font-size: 0.95rem;
        color: black;
        -webkit-text-stroke: 0px;
    }
}

.sum {
    color: black;
    -webkit-text-stroke: 0px black;
}

.menu {
    cursor: pointer;
    transform: scale(1);
    transition: 0.3s;
}

.menu:hover {
    transform: scale(1.2);
    transition: 0.3s;
    color: #0d6efd;
}

.menu:active {
    transform: scale(1.1);
    transition: 0.1s;
    color: #0d6efd;
}

.add-icon {
    cursor: pointer;
    transition: 0.3s;
}

.add-icon:hover {
    font-size: 1.6rem;
    color: #0d6efd;
}

.add-icon:active {
    font-size: 1.4rem;
    color: #0d6efd;
}
.cost {
    color: black;
    -webkit-text-stroke: 0px black;
    font-weight: bold;
    font-size: 1.4rem;
    background: white;
    margin-left: 50px;
    margin-right: 50px;
    opacity: 0.95;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

}
.fail {
      background-color:pink;
      border:red;
      color:red;
    }
</style>