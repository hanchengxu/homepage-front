<template>
    <div class="button1 col-md-6">
        <button type="button" class="btn btn-primary btn-circle">上班</button>
        <!-- <p>The button above has been clicked {{ counter }} times.</p> -->
    </div>
</template>
<script>
export default {
    name: 'ButtonGoToWork', 
    data() {
    return {
        counter: 0
    }
  },
methods: {
    Sayhi() {
      // `this` inside methods points to the current active instance
      this.counter++;
    }
  }

}
</script>
<style scoped>
.btn-circle {
  width: 300px;
  height: 300px;
  margin-left: 100px;
  padding: 6px 0;
  font-size: 80px;
  line-height: 1.428571429;
  border-radius: 150px;
}
</style>