<template>
  <a-layout>
    <a-layout-content>
        <a-row><h2>{{title}}</h2></a-row>
        <a-row :gutter="[8,20]" type="flex" justify="start">
            <a-col flex="100px">模板语法:</a-col>
            <a-col flex="100px">
                <a-tag color="pink">{{tagColor}}</a-tag>
            </a-col>
        </a-row>
        <a-row :gutter="[8,20]">
            <a-col flex="100px">v-bind:</a-col>
            <a-col flex="100px"><a-tag v-bind:color="color">Blue</a-tag></a-col>
        </a-row>
        <a-row :gutter="[8,20]">
            <a-col flex="100px">v-if:</a-col>
            <a-col flex="100px"><a-tag v-if:="showTag" color="green">{{tagColor}}</a-tag></a-col>
        </a-row>
        <a-row :gutter="[8,20]" type="flex" justify="start">
            <a-col flex="100px">v-for:</a-col>
            <a-col flex="100px"><a-tag v-for:="item in items" :key="item.index" color="green">{{item}}</a-tag></a-col>
        </a-row>
        <a-row :gutter="[8,20]">
            <a-col flex="100px">v-on:</a-col>
            <a-col flex="100px"><a-tag  color="cyan" @click.once="handleClick">Click Me</a-tag></a-col>
        </a-row>
        <a-row :gutter="[8,20]">
            <a-col flex="100px">v-model:</a-col>
            <a-col flex="500px">
                <a-row type="flex" justify="start">
                    <a-col :span="4"><a-input v-model:value="formData.name" placeholder="编辑我……" /></a-col>
                    <a-col :span="4"><span>{{realName}}</span></a-col>
                </a-row>
                <a-row type="flex" justify="start">
                    <a-col flex="50px"><a-checkbox v-model:checked="formData.check" /></a-col>
                    <a-col ><span>{{formData.check}}</span></a-col>
                </a-row>
                <a-row type="flex" justify="start">
                    <a-col flex="300px"><a-range-picker v-model:value="formData.date" /></a-col>
                    <a-col flex="100px"><span>{{formData.date}}</span></a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row :gutter="[8,20]">
            <a-col flex="100px">v-show:</a-col>
            <a-col flex="100px"><a-tag color="green" v-show="false">green</a-tag></a-col>
        </a-row>
    </a-layout-content>
    </a-layout>
</template>

<script>
import { onUpdated } from 'vue'
let dataOne = { 
    tagColor: 'Pink',
    color:'blue',
    showTag:false,
    items:[111,222,333,444],
    formData:{
        name:"hcx",
        check: false,
        date:[],
    }
};

export default {
  name: 'NewPage',
  data() {
      return dataOne;
  },
  props:{
      title:String
    },
  setup() {
    onUpdated(() => {
      console.log("update");
    })
  },
  computed:{
    realName(){
        return this.formData.name + "XXX";
    } 
  },
  methods: {
    handleClick(event){
        if (event) {
            alert(event.target.tagName);
            console.log(event);
        }
    }
  },
}
</script>