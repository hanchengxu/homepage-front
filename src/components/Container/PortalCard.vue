<template>
    <LazyShow :time="lazy" transName="sideslip">
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center card-col">
            <div class="card d-flex flex-column justify-content-end"  @click="routerChange(destination)"
                :style="cardStyle()">
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
        bgImage: {type: String, default: ''},
        bgImageSize: {type: String, default: ''},
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
        cardStyle(){
            // 外部/图床卡片：bgImage 存在才加背景图；纯色渐变卡(bgImage为空)不受影响
            let style = `background-position:1rem 10px;background-color: ${this.bgColor};`;
            if(this.bgImage){
                style += `background-image:url(https://raw.githubusercontent.com/hanchengxu/picture-host/master/${this.bgImage});`;
                // 可选：限制背景图尺寸（如 contain / cover / 80% auto 等 CSS background-size 值）
                if(this.bgImageSize){
                    style += `background-size:${this.bgImageSize};`;
                }
            }
            return style;
        },
        routerChange(destination){
            // http(s) 开头的 destination 视为 nginx 托管的外部页面，新标签打开；其余走站内路由
            if(/^https?:\/\//.test(destination)){
                window.open(destination, '_blank');
                return;
            }
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