<template>
  <svg :class="svgClass" aria-hidden="true" :style="{height: height,width:width}">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "svg-icon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    },
    height:{type: String,default: "5rem"},
    width:{type: String,default: "5rem",}
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon" + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script>

<style scoped>
</style>