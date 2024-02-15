<template>
    <!-- 日期列表 -->
    <div class="date-list" v-if="show === 'date'">
        <div class="date-content">
            <!-- 日历头 -->
            <div v-for="item in header" :key="item">
            {{ item }}
            </div>
            <!-- 日列表 -->
            <div
            v-for="(s, k) in dayList"
            :class="[
                'date-item',
                s.month !== date[1] ? 'other-day' : '',
                s.day === date[2] && s.month === date[1] ? 'today' : '',
            ]"
            :key="s + '-' + k"
            @click="selectDay(s)"
            >
            {{ s.day }}
                <div
                :class="[
                'check',
                haveList.includes(`${s.year}-${s.month}-${s.day}`) ? 'have' : '',
                ]"
                ></div>
            </div>
        </div>
      <!-- 操作栏 -->
        <!-- <div class="date-btn">
            <div
                class="btn-item"
                v-for="k in weeks + 1"
                :key="k"
                @click="weekReport(k)"
                >
                {{ k === 1 ? "" : "看周报" }}
            </div>
        </div>  -->
    </div>
    <!-- <div><h2>中间内容</h2></div> -->
    <!-- 弹出窗口 -->
    <div v-if="isPopupVisible" class="popup">
        <div class="container">
            <p class="foodsDiary">辅食日记</p>
            <button type="button" class="btn-close closeButton" aria-label="Close" @click="close"></button>
        </div>
        <!-- 一日三餐 -->
        <div v-for="(meal, index) in meals" :key="meal" class="meals">
            <div class="meal"><img :src="imageSrc[index]" /></div>
            <div class="foods" v-if="meal.isInput">
                <input type="text" v-model="meal.foods" @blur="handleInputBlur(meal)"/>
            </div>
            <div class="foods" v-else="" @click="foodsInput(meal)">{{meal.foods}}</div>
        </div>
        <div class="taste">
            <img src="../../../assets/imgs/write.png" />
            <textarea v-model="taste"></textarea>
        </div>
        <!-- <div><button @click="!isPopupVisible">关闭</button></div> -->
    </div>
</template>
<script>

import { ref, reactive, toRefs } from 'vue';
import { getAPI } from '@/utils.js';

export default {
    name: 'MenuContent',
    props: {
        show: String,
        dayList: Array,
        date: Array,
        weeks: Number,
        countDay: {
            type: Function,
            dafault: null
        }
    },
    // data() {
    //     return {
    //         cData: []
    //   }
    // },    
    setup() {
        const header = ref(['日', '一', '二', '三', '四', '五', '六']);
        const haveList = ref([]);
        const isPopupVisible = ref(false); // 默认不显示弹出窗口
       // const meals = ref(['早餐', '午餐', '晚餐']);
        const inputfoods = ref({});
        const inputtable = ref(false); // 默认不显示弹出窗口
        const meals = ref([]);
        const imageSrc = [
            require("../../../assets/imgs/breadfast.png"),
            require("../../../assets/imgs/lunch.png"),
            require("../../../assets/imgs/lowtea.png"),
            require("../../../assets/imgs/dinner.png")];
        const taste = ref('');

        return {
            header,
            haveList,
            isPopupVisible,
            meals,
            inputfoods,
            inputtable,
            taste,
            imageSrc,
        };
    },
    watch: {
        date:{ //深度监听，可监听到对象、数组的变化
            handler (newV, oldV) {
            // do something, 可使用this
                //console.log("oldV" +newV + oldV);
            this.getBabyFoodsList();
            },
            deep:true,
            immediate:true
        },
  },

    mounted() {

    },

    methods: {
        // 日期点击事件
        selectDay(val) {
        let oVal = this.date[1];
        this.date.splice(1, 2, val.month, val.day);
        if (val.month !== oVal) {
            this.countDay();
        };
        this.isPopupVisible = !this.isPopupVisible; // 切换弹出窗口的显示状态
        this.$emit("change", this.date.join("-"));
        },

        foodsInput(meal) {
            console.log(meal.isInput);
            meal.isInput = !meal.isInput;
        },
        handleInputBlur(meal) {
            meal.isInput = !meal.isInput;
        },
        close() {
            this.isPopupVisible = !this.isPopupVisible; // 切换弹出窗口的显示状态
        },

        getBabyFoodsList() {
            console.log("this.date:"+this.date  );
            const mealDate = this.date.join("-");
            getAPI('/hamster/api/noauth/babyFoodsList/' + mealDate).then((resp) => {
                    this.meals = resp.data;
                    console.log(resp.data);

                });
        }

    }
}
</script>
<style lang="scss" scoped>
.date-list,
.year-list,
.month-list {
    width: 100%;
    padding: 30px;
    height: 540px;
}
.month-list,
.year-list {
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: auto;
.month-item {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    height: 122px;
}
.month-item:active {
    background-color: #eee;
}
.active {
    background-color: #dcf4f3;
}
}
.date-list {
padding-top: 0;
display: flex;
.date-content { 
    flex: 1;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 20px 20px;
    div {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
    }
    .other-day {
        color: rgba($color: #363636, $alpha: 0.6) !important;
    }
    .today {
        background-color: #dcf4f3;
    }
    .date-item {
        font-size: 28px;
        font-weight: 40px;
        color: #000000;
        // font-weight: bold;
        .check {
            width: 10px;
            height: 10px;
            margin-top: 6px;
            border-radius: 50%;
            background-color: #00b7ae;
            opacity: 0;
        }
        .have {
            opacity: 1;
        }
    }
}
    .date-btn {
        height: 100%;
        width: 80px;
        font-size: 22px;
        color: #4eb9f5;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 20px 20px;
        margin-left: 20px;
        .btn-item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
    }
}
/* 弹出窗口样式 */
.popup {
  position: fixed; /* 相对于视窗进行定位 */
  top: 50%; /* 居中显示 */
  left: 50%;
  transform: translate(-50%, -50%); /* 水平、垂直居中 */
  width: 400px;
  height: 90vh;
//   background-image: url("../../../assets/imgs/meal.jpeg"); /* 指定背景图像路径 */
//   background-repeat: no-repeat; /* 不重复平铺背景图像 */
//   background-position: center; /* 居中显示背景图像 */
//   background-size: cover; /* 根据容器大小自动调整背景图像大小 */
  background-color:#f9fbfbf9;
  //opacity: 0.8;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 20px 20px 20px 20px;
  font-family: cursive;
    .meals {
        border-bottom-width: 1rem;
        border-bottom-style: dotted;
        border-bottom-color: grey;
        border-image-source: url("../../../assets/imgs/wave.png");
        border-image-repeat: repeat;
        border-image-slice: 650 175;
    }
    .meal {
        font-size: 22px;
        float: left;
       // background-color:#00b7a2;
        //margin-bottom:5%
        img {
            width: 30px;
            height: 30px;
        }
    }
    .foods {
        width: 85%;
        height: 20px;
        margin-top: auto;
        margin-top: 2%;
        margin-bottom: 5%;
        input {
            width: 86%;
        }
    }
    .taste {
        font-size: 18px;
        margin-top: 10px;
        img {
            width: 30px;
            height: 30px;
        }
    }
    textarea {
        //margin-top: -15px;
        width: 100%;
    }
    .container {
        border-bottom:#4eb9f5 2px solid ;
        // background-image: url(../../../assets/imgs/meal.jpeg);
        // background-repeat: no-repeat; /* 不重复平铺背景图像 */
        // background-position: center; /* 居中显示背景图像 */
        // background-size: cover; /* 根据容器大小自动调整背景图像大小 */
        display: flex; /* 设置容器为flex布局 */
    // border: #0900b7 1px solid;
        height: 60px;
    }

    .foodsDiary {
        font-size: 35px;
        font-weight: bold;
        height: 80px;
        width: 98%; /* 每个元素占据容器的一半宽度 */
        // background-image: url("../../../assets/imgs/meal.png"); /* 指定背景图像路径 */
        // background-repeat: no-repeat; /* 不重复平铺背景图像 */
        // background-position: center; /* 居中显示背景图像 */
        // background-size: cover; /* 根据容器大小自动调整背景图像大小 */
        // border: #0fb700 1px solid;
        margin-left: -13px;
        margin-top: -7px;
        //animation:  siz 1s linear infinite;
    }

    // @keyframes siz {
    //     0%{
    //       color:red;
    //     }
    //     50%{
    //       color:blue;
    //     }
    //     100%{
    //       color:green;
    //     }
 
    //   }

}
    
</style>