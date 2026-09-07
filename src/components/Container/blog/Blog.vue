<template>
    <div class="blog-page">
        <div class="blog-tip" v-if="loading">{{ $t('blog.loading') }}</div>
        <div class="blog-tip" v-else-if="errMsg">{{ errMsg }}</div>
        <div class="blog-tip" v-else-if="posts.length===0">{{ $t('blog.empty') }}</div>
        <div class="blog-layout" v-else>
            <!-- 左侧：时间线一览 -->
            <aside class="blog-side">
                <div class="blog-side-title">{{ $t('blog.timeline') }}</div>
                <div class="blog-timeline">
                    <div class="tl-group" v-for="g in timeline" :key="g.year">
                        <div class="tl-year">{{ g.year }}</div>
                        <div class="tl-item" v-for="p in g.items" :key="p._id" :title="p.title" @click="goTo(p)">
                            <span class="tl-dot"></span>
                            <span class="tl-date">{{ shortDate(p.date) }}</span>
                            <span class="tl-title">{{ p.title }}</span>
                        </div>
                    </div>
                </div>
            </aside>
            <!-- 右侧：标签过滤 + 文章列表 -->
            <main class="blog-main">
                <div class="blog-tags" v-if="allTags.length">
                    <span class="blog-tags-label">{{ $t('blog.filterByTag') }}</span>
                    <button type="button" class="tag-chip" :class="{active: selectedTags.length===0}" @click="clearTags">
                        {{ $t('blog.all') }}
                    </button>
                    <button type="button" class="tag-chip" v-for="t in allTags" :key="t"
                        :class="{active: isSelected(t)}" @click="toggleTag(t)">#{{ t }}</button>
                </div>
                <div class="blog-tip" v-if="filteredPosts.length===0">{{ $t('blog.empty') }}</div>
                <article class="blog-item" v-for="post in filteredPosts" :key="post._id" :id="post._id"
                    @click="$router.push({name:'blogPost',params:{id:post.slug}})">
                    <h3 class="blog-item-title">{{ post.title }}</h3>
                    <div class="blog-item-meta">
                        <time class="blog-item-date">📅 {{ post.date }}</time>
                        <span class="blog-item-tag" v-for="t in post.tags" :key="t">#{{ t }}</span>
                    </div>
                    <p class="blog-item-summary">{{ post.summary }}</p>
                </article>
            </main>
        </div>
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
            errMsg: '',
            selectedTags: []
        }
    },
    computed: {
        // 所有标签（按出现顺序去重）
        allTags() {
            const set = [];
            this.posts.forEach((p) => {
                (p.tags || []).forEach((t) => { if (set.indexOf(t) === -1) set.push(t); });
            });
            return set;
        },
        // 按选中标签过滤（多个标签之间为「或」关系）
        filteredPosts() {
            if (!this.selectedTags.length) return this.posts;
            return this.posts.filter((p) => (p.tags || []).some((t) => this.selectedTags.indexOf(t) !== -1));
        },
        // 左侧时间线：按年份分组（posts 已按日期新→旧排好）
        timeline() {
            const groups = [];
            this.filteredPosts.forEach((p) => {
                const year = (p.date || '').slice(0, 4) || '—';
                let g = groups.filter((x) => x.year === year)[0];
                if (!g) { g = { year: year, items: [] }; groups.push(g); }
                g.items.push(p);
            });
            return groups;
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
                this.posts = (json.posts || []).slice().sort((a, b) => ts(b) - ts(a))
                    .map((p, i) => Object.assign({}, p, { _id: `post-${i}` }));
            } catch (e) {
                this.errMsg = loadFailed;
            } finally {
                this.loading = false;
            }
        },
        isSelected(tag) {
            return this.selectedTags.indexOf(tag) !== -1;
        },
        toggleTag(tag) {
            const i = this.selectedTags.indexOf(tag);
            if (i === -1) this.selectedTags.push(tag);
            else this.selectedTags.splice(i, 1);
        },
        clearTags() {
            this.selectedTags = [];
        },
        shortDate(date) {
            return String(date || '').slice(5).replace('-', '/');
        },
        // 点时间线条目平滑滚动到对应文章卡片
        goTo(post) {
            const el = document.getElementById(post._id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}
</script>
<style scoped>
.blog-page{
    max-width: 1080px;
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
/* 两栏布局：左时间线 + 右列表 */
.blog-layout{
    display: flex;
    gap: 30px;
    align-items: flex-start;
}
.blog-side{
    flex: 0 0 220px;
    width: 220px;
    position: sticky;
    top: 100px;
}
.blog-main{
    flex: 1 1 auto;
    min-width: 0;
}
.blog-side-title{
    font-weight: bold;
    margin-bottom: 12px;
}
.blog-timeline{
    border-left: 2px solid #e6e6f5;
    padding-left: 14px;
}
.tl-group{
    margin-bottom: 14px;
}
.tl-year{
    font-weight: bold;
    color: #5a6bb5;
    margin-bottom: 6px;
}
.tl-item{
    position: relative;
    display: flex;
    align-items: baseline;
    gap: 6px;
    padding: 3px 0;
    font-size: 0.85rem;
    color: #666;
    cursor: pointer;
}
.tl-item:hover{
    color: #6356E5;
}
.tl-dot{
    position: absolute;
    left: -18px;
    top: 10px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #c8cff5;
}
.tl-item:hover .tl-dot{
    background: #6356E5;
}
.tl-date{
    color: #999;
    flex: 0 0 auto;
}
.tl-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* 标签过滤 */
.blog-tags{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
}
.blog-tags-label{
    font-size: 0.85rem;
    color: #777;
}
.tag-chip{
    border: 1px solid #ddd;
    background: #fff;
    color: #555;
    font-size: 0.85rem;
    padding: 3px 12px;
    border-radius: 14px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
}
.tag-chip:hover{
    border-color: #b9b1f2;
    color: #6356E5;
}
.tag-chip.active{
    background: #6356E5;
    border-color: #6356E5;
    color: #fff;
}
@media (max-width: 900px){
    .blog-layout{
        flex-direction: column;
    }
    .blog-side{
        position: static;
        width: 100%;
        flex: 1 1 auto;
    }
}
</style>
