<template>
    <td @dblclick="changeWriteState">
        <span v-if="writing">
            <input type="text" :value="value" @keyup.enter="keyUpEnter" v-on:blur="leaveInput" @mouseout="leaveInput">
        </span>
        <span v-else class="d-flex align-items-end">
            <span>{{ value }}</span>
            <i class="bi bi-pencil-square write-icon ms-1"></i>
        </span>
    </td>
</template>
<script>
export default {
    name: "WriteableTD",
    props: {
        value: { require: false, default: undefined },
        newFlag: { require: false, default: false },//新追加flag，如果为true，默认data.writing为true，既默认编辑模式
    },
    data() {
        return { writing: false };
    },
    mounted(){
        if(this.newFlag){
            this.writing = true;
        }
    },
    methods: {
        keyUpEnter(e) {
            if(!this.newFlag){
                // 不是新增模式的话，enter之后 让输入框失效
                this.writing = false;
            }
            this.$emit('changeItemValue',e.target.value);
        },
        leaveInput(e){
            if(!this.newFlag){
                // 更新模式下，输入框失去焦点不传递输入值
                this.writing = false;
            }else {
                //新增模式下，输入框失去焦点也传递输入值
                this.$emit('changeItemValue',e.target.value);
            }
        },
        changeWriteState() {
            this.writing = true;
        }
    }
}
</script>

<style>
.write-icon {
    cursor:pointer;
    font-size: 10px;
}
.write-icon:hover{
    color:#0d6efd;
}
</style>