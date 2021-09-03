<template>
    <transition :name="transName">
        <slot v-if="show"></slot>
    </transition>
</template>
<script>
export default {
    name: 'LazyShow',
    props:{
        time:{required:false,default: 0},
        transName:{required:false,type:String}
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