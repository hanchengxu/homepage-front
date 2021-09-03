<template>
    <div class="container-lg" style="margin-top:200px">
        <LazyShow time="100" transName="sideslip">
            <p>bbbbbb</p>
        </LazyShow>
    </div>
</template>
<script>
export default {
    name: 'Resume',
    data() {
        return {
        show: true
        }
    },
    setup() {}
}
</script>
<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(1.25);
    opacity: 0;
  }
  100% {
    transform: scale(1);
  }
}

</style>