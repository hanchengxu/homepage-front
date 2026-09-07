<template>
    <button v-show="visible" class="back-to-top" :title="title" :aria-label="title" @click="toTop">
        <i class="bi-chevron-up" aria-hidden="true"></i>
    </button>
</template>
<script>
export default {
    name: 'BackToTop',
    data() {
        return { visible: false };
    },
    computed: {
        title() {
            // 与 Blog 组件一致：不依赖可能被卸载删除的 this.$t
            try {
                const fn = this.$t || (this.$i18n && this.$i18n.t);
                if (typeof fn === 'function') return fn('blog.backToTop');
            } catch (e) { /* ignore */ }
            return 'Back to top';
        }
    },
    mounted() {
        this.onScroll();
        window.addEventListener('scroll', this.onScroll, { passive: true });
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll() {
            const y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            this.visible = y > 300;
        },
        toTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}
</script>
<style scoped>
.back-to-top{
    position: fixed;
    right: 28px;
    bottom: 40px;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: #6356E5;
    color: #fff;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.18);
    transition: 0.25s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
}
.back-to-top:hover{
    background: #4a3fc5;
    transform: translateY(-2px);
}
@media (max-width: 768px){
    .back-to-top{
        right: 16px;
        bottom: 24px;
        width: 40px;
        height: 40px;
    }
}
</style>
