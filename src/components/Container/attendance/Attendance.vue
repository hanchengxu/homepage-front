<template>
    <div>
        <div class="pt-3 px-5 d-flex justify-content-between align-items-center">
            <div class="">时间显示</div>
            <i class="menu bi bi-justify" style="font-size: 2rem;" @click="toMaster"></i>
        </div>
        <div class="d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column 
            justify-content-evenly align-items-center" :style="{ minHeight: scollHeight - 110 + 'px' }">
            <div @click="startWork">上班</div>
            <div @click="endWork">下班</div>
        </div>
    </div>
</template>
<script>
import { isNull, postAPI } from '@/utils.js';
import { onMounted, ref, onUnmounted } from "vue";
export default {
    name: "Attendance",
    data() {
        return {
            startWorkcommitting: false,
            endWorkCommitting: false,
        };
    },
    setup() {
        const getScollHeight = () => {
            return window.innerHeight;
        };
        const scollHeight = ref(getScollHeight());
        const windowResize = () => {
            scollHeight.value = getScollHeight();
        };
        onMounted(() => {
            window.addEventListener("resize", windowResize);
        });
        onUnmounted(() => {
            window.removeEventListener("resize", windowResize);
        });
        return {
            scollHeight,
        };
    },
    methods: {
        toMaster() {
            this.$router.push({ path: 'attendanceMaster' });
        },
        startWork() {
            let requestBody = {workDay: moment().format('YYYY-MM-DD'), workUserName: "Yang"}
            
            postAPI('/hamster/api/noauth/saveStartWorkTime', requestBody).then(function (response) {
                console.log(response)
            })
        },
        endWork() {
            let requestBody = {workDay: moment().format('YYYY-MM-DD'), workUserName: "Yang"}

            postAPI('/hamster/api/noauth/saveEndWorkTime',requestBody)
            .then(function (response) {
                console.log(response)
            })
        }
    }
};
</script>
<style scoped>
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
</style>