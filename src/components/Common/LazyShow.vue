<template>
  <transition :name="transName">
    <slot v-if="show || isOpen"></slot>
  </transition>
</template>
<script>
export default {
  name: "LazyShow",
  props: {
    //延迟加载时长，单位毫秒
    time: { required: false, default: 0 },
    //延迟加载动效
    transName: { required: false, type: String },
    //外部控制加载，使用isOpen后time延迟加载失效
    isOpen: { required: false, type: Boolean, default: null },
  },
  data() {
    return { show: false };
  },
  methods: {
    showSlot() {
      let vm = this;
      setTimeout(function () {
        vm.show = true;
      }, Number(vm.time || 0));
    },
  },
  created() {
    if (null == this.isOpen) {
      this.showSlot();
    }
  },
};
</script>