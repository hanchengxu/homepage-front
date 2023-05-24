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
                <AttendanceItem :itemList=itemList :detailList=detailList />
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
    </div>
</template>
<script>
import { onMounted, ref, onUnmounted } from "vue";
import { getAPI, postAPI, isNull } from '@/utils.js';
import moment from 'moment';
import { find, findIndex } from 'lodash'
import AttendanceItem from "./AttendanceItem.vue";
export default {
    name: "AttendanceReport",
    components: {
        AttendanceItem
    },
    data() {
        return {
            now: moment().format('YYYY-MM-DD'),
            selectedReportMonth: moment().format('YYYY-MM'),
        }
    },
    watch: {
        selectedReportMonth(nv) {
            //TODO
        },
    },
    setup() {
        const masterList = ref([])
        const itemList = ref([])
        const detailList = ref([])
        const allReportDate = ref([])
        const totalBill = ref(null);

        const getScollHeight = () => {
            return window.innerHeight;
        };
        const getScollWidth = () => {
            return window.innerWidth; y
        };
        const scollHeight = ref(getScollHeight());
        const width = ref(getScollWidth());
        const windowResize = () => {
            scollHeight.value = getScollHeight();
            width.value = getScollWidth();
        };
        onMounted(async () => {
            window.addEventListener("resize", windowResize);
            let masterResp = await getAPI('/hamster/api/noauth/getMasterList');

            let reportRest = await getAPI('/hamster/api/noauth/getReport/'+moment().format('YYYY-MM'));
            let report = reportRest.data.data
            itemList.value.push({itemName:'平日费用',itemValue:report.workOrdinaryBillMonthly,
                    itemDesc:report.workOrdinaryHoursMonthly,itemDesc2: find(masterResp.data.data,{itemName:'hour_unit_price'}).itemValue})
            itemList.value.push({itemName:'节假日费用',itemValue:report.workWeekendBillMonthly,
                    itemDesc:report.workWeekendHoursMonthly,itemDesc2: find(masterResp.data.data,{itemName:'holiday_hour_unit_price'}).itemValue})
            itemList.value.push({itemName:'车费',itemValue:report.traveBillMonthly})
            itemList.value.push({itemName:'其他费用',itemValue:report.additionalTotal, hasDetail: true})
            totalBill.value = report.billMonthly
            
            masterList.value = masterResp.data.data

            getAPI('/hamster/api/noauth/getAdditionalDataMonthly/'+moment().format('YYYY-MM')).then((resp) => {
                detailList.value = resp.data.data
            })

            getAPI('/hamster/api/noauth/getAllReportDate').then((resp) => {
                allReportDate.value.push(resp.data.data[0])
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
            allReportDate
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
</style>