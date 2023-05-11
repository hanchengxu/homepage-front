<template>
    <div>
        <div class="pt-3 px-5 d-flex justify-content-between align-items-center">
            <div class="">Master设置</div>
            <i class="menu bi bi-arrow-return-left" style="font-size: 2rem;" @click="backAttendance"></i>
        </div>
        <div class="px-5 d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column" >
            <div>123123</div>
        </div>
    </div>
</template>
<script>
import { onMounted, ref, onUnmounted } from "vue";
export default {
    name: "AttendanceMaster",
    data() {
        return {};
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
        backAttendance(){
            this.$router.push({ path: 'attendance'});
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
</style>