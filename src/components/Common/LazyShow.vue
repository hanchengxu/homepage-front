<template>
    <transition :name="transName">
        <slot v-if="show"></slot>
    </transition>
</template>
<script>
export default {
    name: 'LazyShow',
    props:{
        //延迟加载时长，单位毫秒
        time:{required:false,default: 0},
        //延迟加载动效
        transName:{required:false,type:String},
    },
    data(){
        return {show:false}
    },
    methods: {
      showSlot() {
        let vm = this;
        setTimeout(function () { vm.show = true;}, (Number(vm.time || 0)));
      }
    },
    created() {
        this.showSlot();
    },
    
}
</script>