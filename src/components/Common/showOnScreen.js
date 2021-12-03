import { onMounted, ref } from 'vue';
/**
 * @description 传入domId，返回该对象是否出现在可视区。
 * @param {*} domId 
 * @returns ref对象，value 为boolean值
 */
export default function showOnScreen(domId) {

    let result = ref(false);

    //声明IntersectionObserver对象
    let io = new IntersectionObserver(
        function (changes) {
            //因为每个dom都使用唯一IntersectionObserver，所以callback里取数组中第一个
            let IntersectionObserverEntry = changes[0];
            result.value = IntersectionObserverEntry.isIntersecting;
        }
    );

    onMounted(() => {
        //根据形参id获取真实dom
        io.observe(document.getElementById(domId));
    })

    return result;
}