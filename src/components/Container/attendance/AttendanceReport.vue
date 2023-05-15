<template>
    <div class="attendance-main pt-5">
        <div class="py-3 mx-1 mx-xxl-5 px-4 d-flex justify-content-end align-items-center attendance-title rounded-pill">
            <div class="me-auto fw-bold fs-2">月报</div>
            <i class="menu bi bi-arrow-return-left" style="font-size: 2rem;" @click="backAttendance"></i>
        </div>
        <div class="report">
            <div class="mt-5 py-4 px-xxl-5 px-xl-5 px-lg-5 d-flex flex-column justify-content-center">
                <AttendanceItem :itemList=itemList />
                <div class="mt-2 border-top border-2 border-primary"></div>
                <div class="d-flex flex-row justify-content-between">
                    <span class="col-6 ps-4 sum">合计</span>
                    <span class="col-6">
                        <vue3-autocounter ref='counter' :startAmount='0' :endAmount='4000' 
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
            value: 1000,
            now: moment().format('YYYY-MM-DD'),
            itemList: [
                {itemName:'项目1',itemValue:5000},
                {itemName:'项目2',itemValue:15000},
                {itemName:'项目3',itemValue:2000},
                {itemName:'项目4',itemValue:4000},
            ]
        }
    },
    setup() {
        const masterList = ref([])

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
        onMounted(() => {
            window.addEventListener("resize", windowResize);
            getAPI('/hamster/api/noauth/getMasterList').then((resp) => {
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
        formatToPrice(value) {
            return `R$ ${value.toFixed(2)}`;
        },
        startAnimate: function () {
            this.$refs.myNum.start()
        },
        backAttendance() {
            this.$router.push({ path: 'attendance' });
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