<template>
    <div class="container-fluid ukulele-div" style="min-height: 1000px">
        <LazyShow :time="500" transName="topslip">
            <div  v-if="!isLoginSuccess" style="padding-top:300px">
                <div class="row">
                    <div class="col-5">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">UserName</span>
                            <input type="text" v-model="userName" class="form-control" placeholder="Username"
                                aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Password</span>
                            <input type="password" v-model="password" class="form-control" placeholder="Password"
                                aria-label="Password" aria-describedby="basic-addon1">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <button type="button" @click="loginMQTT" :class="['btn', 'btn-outline-primary',{disabled: isLoginSuccess}]" >Login</button>
                    </div>
                </div>
            </div>
            <div v-else style="padding-top:300px">
                <div class="d-flex flex-row justify-content-center">
                    <div v-if='!isPublishing' class="row">
                        <button  type="button" @click="publishWater" 
                        :class="[{disabled: isPublishing}, 'btn','col', 'rounded', 'btn-outline-primary', 'waterButton','btn-lg']" >{{ waterBtnMessage }}</button>
                        <input type="number" class="form-control col waterTimeInput" v-model="waterTime">
                        <label class="col-sm-2 col-form-label pt-2 mt-1">秒</label>
                    </div>
                    <div v-else>
                        <button class="btn btn-primary btn-lg" type="button" disabled>
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            正在浇水...
                        </button>
                    </div>
                </div>
            </div>
        </LazyShow>
    </div>
</template>
<script>
import mqtt from 'mqtt'
import { toRaw } from 'vue';
export default {
    name: "WaterLogin",
    data() {
        return {
            userName: '',
            password: '',
            isLoginSuccess: false,
            isPublishing: false,
            waterBtnMessage: '浇水',
            waterTime: 4,
            mqttClient: undefined
        }
    },
    setup() {
    },
    unmounted() {
        if ( toRaw(this.mqttClient) != undefined){
            toRaw(this.mqttClient).end()
            console.log('关闭mqtt连接');
        }
    },
    methods: {
        loginMQTT() {
            console.log(this.userName)
            console.log(this.password)
            if (this.userName === "" || this.password === "") {
                alert("please input userName or password");
            } else {
                //mqtt login
                const options = {
                    clean: true,
                    connectTimeout: 4000,
                    clientId: 'waterClient',
                    reconnectPeriod: 0,//禁用重连
                    username: this.userName,
                    password: this.password
                }
                const url = 'wss://hanchengxu.com/mqtt'
                this.mqttClient = mqtt.connect(url, options)
                
                this.mqttClient.on('error', function (error) {
                    console.log(error)
                    alert(error)
                })
                let _that = this;
                this.mqttClient.on('connect', function () {
                    console.log('Connected')
                    _that.isLoginSuccess = true
                })
                this.mqttClient.on('offline', function () {
                    console.log('offline')
                })

            }
        },
        publishWater() {
            //LOCK BUTTON
            console.log('publish water')
            this.isPublishing = true
            let _that = this;
            
            toRaw(this.mqttClient).publish('water',JSON.stringify({"water": 1,"waterTime": this.waterTime}),null,function(error) {
                if (error) {
                    console.log(error)
                    _that.isPublishing = false
                    _that.waterBtnMessage = '发生错误！'
                } else {
                    //publish success
                    console.log('publish success')
                    setTimeout(() => { _that.isPublishing = false;_that.waterBtnMessage = '浇完了' }, _that.waterTime*1000);
                }
            })  
        }
    },
    watch : {
        waterTime:function(newValue, oldValue) {
            if(newValue < 4 ){
                alert('不能少于4秒')
                this.waterTime = 4
            } 
        }
    }
};
</script>
<style scoped>
.waterTimeInput{
    border-top-left-radius: 0%;
    border-bottom-left-radius: 0%;
}
.waterButton{
    border-top-right-radius: 0% !important;
    border-bottom-right-radius: 0% !important;
}

</style>