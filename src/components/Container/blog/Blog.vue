<template>
    <div class="blog-page">
        <div class="blog-tip" v-if="loading">{{ $t('blog.loading') }}</div>
        <div class="blog-tip" v-else-if="errMsg">{{ errMsg }}</div>
        <div class="blog-tip" v-else-if="posts.length===0">{{ $t('blog.empty') }}</div>
        <template v-else>
            <article class="blog-item" v-for="post in posts" :key="post.slug"
                @click="$router.push({name:'blogPost',params:{id:post.slug}})">
                <h3 class="blog-item-title">{{ post.title }}</h3>
                <div class="blog-item-meta">
                    <time class="blog-item-date">📅 {{ post.date }}</time>
                    <span class="blog-item-tag" v-for="t in post.tags" :key="t">#{{ t }}</span>
                </div>
                <p class="blog-item-summary">{{ post.summary }}</p>
            </article>
        </template>
        <BackToTop />
    </div>
</template>
<script>
import BackToTop from './BackToTop.vue';

export default {
    name: 'Blog',
    components: { BackToTop },
    data() {
        return {
            loading: true,
            posts: [],
            errMsg: ''
        }
    },
    created() {
        this.load();
    },
    methods: {
        // 翻译安全取值：异步回调里不依赖 this.$t（组件卸载时会被 vue-i18n 删除）
        _t(key) {
            try {
                const fn = this.$t || (this.$i18n && this.$i18n.t);
                if (typeof fn === 'function') return fn(key);
            } catch (e) { /* ignore */ }
            return key;
        },
        async load() {
            this.loading = true;
            this.errMsg = '';
            const loadFailed = this._t('blog.loadFailed');
            try {
                const res = await fetch(`${process.env.BASE_URL}blog/meta.json`);
                if (!res.ok) throw new Error(String(res.status));
                const json = await res.json();
                // 按 date 从新到旧排序（meta.json 顺序仅作后备，这里双保险）
                const ts = (p) => {
                    const t = p && p.date ? new Date(String(p.date).replace(/-/g, '/')).getTime() : 0;
                    return Number.isNaN(t) ? 0 : t;
                };
                this.posts = (json.posts || []).slice().sort((a, b) => ts(b) - ts(a));
            } catch (e) {
                this.errMsg = loadFailed;
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>
<style scoped>
.blog-page{
    max-width: 860px;
    margin: 120px auto 80px;
    padding: 0 16px;
}
.blog-item{
    cursor: pointer;
    padding: 18px 22px;
    margin-bottom: 18px;
    background: rgba(255,255,255,0.75);
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    box-shadow: 3px 3px 8px #00000014;
    transition: 0.25s ease-in-out;
}
.blog-item:hover{
    transform: translateY(-3px);
    box-shadow: 5px 8px 14px #00000022;
}
.blog-item-title{
    margin: 0 0 6px;
    font-weight: bold;
}
.blog-item-meta{
    font-size: 0.85rem;
    color: #777;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
}
.blog-item-tag{
    background: #eef0ff;
    color: #5a6bb5;
    padding: 1px 8px;
    border-radius: 10px;
}
.blog-item-summary{
    margin: 10px 0 0;
    color: #555;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.blog-tip{
    text-align: center;
    color: #777;
    padding: 60px 0;
}
</style>
