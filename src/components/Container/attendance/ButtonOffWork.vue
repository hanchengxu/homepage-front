<template>
    <div class="button2 col-md-6">
        <button  type="button" class="btn btn-success btn-circle">下班</button>
    </div>
</template>
<script>
export default {
name: 'ButtonOffWork',   
methods: {
    SayWhat() {
      // `this` inside methods points to the current active instance
      alert(`お疲れ様です！`)
    }
  }

}
</script>
<style scoped>

.button2 {
    float:left;
}
.btn-circle {
  width: 300px;
  height: 300px;
  text-align: center;
  padding: 6px 0;
  font-size: 80px;
  line-height: 1.428571429;
  border-radius: 150px;
}
</style>