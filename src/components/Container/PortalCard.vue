<template>
    <LazyShow :time="lazy" transName="sideslip">
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center card-col">
            <div class="card d-flex flex-column justify-content-end"  @click="routerChange(destination)"
                :style="'background-position:1rem 10px;background-image:url(https://raw.githubusercontent.com/hanchengxu/picture-host/master/'+bgImage+');background-color: '+bgColor+';'">
                <div class="card-title-board" :style="'background: linear-gradient(0deg,'+cardTitleColorFrom+','+cardTitleColorTo+');'">
                    <div><span class="card-title">{{ $t(cardTitle) }}</span><span class="card-title-emoji">{{cardTitleIcon}}</span></div>
                    <div class="card-title2">{{ $t(cardDetail) }}</div>
                </div>
            </div>
        </div>
    </LazyShow>
</template>
<script>

export default {
    name: 'ProtalCard',
    props:{
        bgImage: {type: String, required: true},
        bgColor: {type: String, required: true},
        cardTitleColorFrom: {type: String, required: true}, 
        cardTitleColorTo: {type: String, required: true},
        cardTitle: {type:String, required: true},
        cardDetail: {type:String, required: true},
        cardTitleIcon: {type:String},
        lazy:{type:Number},
        destination:{type:String, required: true}
    },
    methods: {
        routerChange(destination){
            this.$router.push({ path: destination});
        }
    },
}
</script>
<style scoped>
.card{
    width: 15rem;
    height: 20rem;
    padding-top: 20px;
    transform: skewX(-10deg);
    background-repeat:no-repeat;
    box-shadow: 5px 5px 10px #afafaf81;
    border-radius: 10px;
    cursor:pointer;
    transition: 0.3s ease-in-out;
    background-color: #c4928605;
}
.card-col{
    padding-bottom: 20px;
}
.card-col:last-child{
    padding-bottom: 60px;
}
.card:hover{
    transform: skewX(-10deg) scale(1.1);
    background-position:50px 10px !important;
}

.card-title{
    padding-left: 15px;
    font-weight: bold;
    font-size: 1.5rem;
    color: white;
}
.card-title-emoji{
    font-size: 1.5rem;
}
.card-title2{
    padding-left: 15px;
    font-size: 0.85rem;
    white-space: pre-wrap;
    color: white;
    padding-bottom: 10px;
}
.card-title-board{
    min-height: 9rem;
    border-radius: 5px;
}
</style>