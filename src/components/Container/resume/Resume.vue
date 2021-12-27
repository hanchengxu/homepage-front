<template>
    <div class="container-lg" style="margin-top:200px;">
        <LazyShow time="100" transName="topslip">
        <div class="row d-flex align-items-center">
            <div class="col d-flex justify-content-center text-secondary">
                <div>
                    <h1 class="fw-bold">COMING SOON</h1>
                    <h2>Page is under construction 🛠️</h2>
                </div>
            </div>
            <div class="col d-flex justify-content-center"><img class="constr-icon" src="https://raw.githubusercontent.com/hanchengxu/picture-host/master/3426525-ai.png"></div>
        </div>
        </LazyShow>
    </div>
</template>
<script>
export default {
    name: 'Resume',
    setup() {
    },
}
</script>
<style scoped>
@media screen and (max-width: 1200px) {
    .constr-icon{
        height: 450px;
    }
}
@media screen and (max-width: 900px) {
    .constr-icon{
        height: 300px;
    }
}
</style>