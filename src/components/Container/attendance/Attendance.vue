<template>

    <div>
        <div class="py-3 px-5 d-flex justify-content-between align-items-center title m-5 rounded-pill">
            <div class=""><TitleWork msg="出勤管理" /></div>
            <i class="menu bi bi-justify" style="font-size: 2rem;" @click="toMaster"></i>
        </div>
        <div class="d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column 
            justify-content-evenly align-items-center" :style="{ minHeight: scollHeight - 300 + 'px' }">
            <div><ButtonGoToWork /></div>
            <div><ButtonOffWork /></div>
            <div><FeiCalendar :selectedDate="selectedDate" @update:selectedDate="onSelectedDateUpdated" /></div>
        </div>
    </div>
</template>
<script>
import { onMounted, ref, onUnmounted } from "vue";
import TitleWork  from './TitleWork.vue';
import ButtonGoToWork  from './ButtonGoToWork';
import ButtonOffWork  from './ButtonOffWork';
import FeiCalendar  from './FeiCalendar';
export default {
    components: {
        TitleWork,
        ButtonGoToWork,
        ButtonOffWork,
        FeiCalendar,
    },
    name: "Attendance",
    data() {
        return {
            startWorkcommitting: false,
            endWorkCommitting: false,
            selectedDate: new Date(),
        };
    },
    watch: {
      selectedDate(nv) {
        console.log("nv", nv);
      },
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
        onSelectedDateUpdated(selectedDate) {
            this.selectedDate = selectedDate;
        },
    }
};
</script>
<style scoped>
.title {
    background-color: rgba(241, 239, 239, 0.986);
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
</style>