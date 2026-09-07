<template>
    <div class="blog-page">
        <div class="blog-back">
            <router-link class="blog-back-link" :to="{name:'blog'}">← {{ $t('blog.back') }}</router-link>
        </div>
        <div class="blog-tip" v-if="loading">{{ $t('blog.loading') }}</div>
        <div class="blog-tip" v-else-if="errMsg">{{ errMsg }}</div>
        <template v-else>
            <header class="blog-post-head">
                <h1 class="blog-post-title">{{ meta.title }}</h1>
                <div class="blog-item-meta">
                    <time class="blog-item-date">📅 {{ meta.date }}</time>
                    <span class="blog-item-tag" v-for="t in meta.tags" :key="t">#{{ t }}</span>
                </div>
            </header>
            <div ref="body" class="blog-body" v-html="html"></div>
            <BackToTop />
        </template>
    </div>
</template>
<script>
import { marked } from 'marked';
import BackToTop from './BackToTop.vue';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github.css';

// 剥离 markdown 顶部 front matter，返回 {fmText, body}
function stripFrontMatter(raw) {
    const text = String(raw).replace(/^\uFEFF/, '');
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    return m ? { fm: m[1], body: text.slice(m[0].length) } : { fm: '', body: text };
}

// 解析 front matter 里 title/date/tags/summary
function parseFront(fmText) {
    const meta = { title: '', date: '', tags: [] };
    fmText.split(/\r?\n/).forEach((line) => {
        const idx = line.indexOf(':');
        if (idx <= 0) return;
        const k = line.slice(0, idx).trim();
        const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (k === 'title') meta.title = v;
        else if (k === 'date') meta.date = v;
        else if (k === 'tags') meta.tags = v.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
    });
    return meta;
}

// breaks:true —— GFM 换行语法：行尾两个空格 / 单个回车 即渲染为 <br>
// （中文写作习惯「一行一句」，默认 marked 会把这些换行折叠成空格）
// 标准 markdown 里连续空行 == 单个空行（都只分段），这里做个小增强：
// 第 1 个空行仍表示分段，多出来的每个空行补一个单独成段的 <br/>
// （<br/> 必须单独成段，否则会开启 HTML 块把后面的内容吞掉）
function extraBlankLines(raw) {
    const out = [];
    let blanks = 0;
    let inFence = false;
    String(raw).split(/\r?\n/).forEach((line) => {
        if (/^\s*(```|~~~)/.test(line)) {
            inFence = !inFence;
            out.push(line);
            blanks = 0;
            return;
        }
        if (inFence) { out.push(line); return; }
        if (!line.trim()) { blanks += 1; return; }
        if (blanks >= 1) {
            out.push('');
            for (let i = 1; i < blanks; i++) { out.push('<br/>'); out.push(''); }
        }
        blanks = 0;
        out.push(line);
    });
    return out.join('\n');
}

marked.use({ gfm: true, breaks: true });

export default {
    name: 'BlogPost',
    components: { BackToTop },
    data() {
        return {
            loading: true,
            body: '',
            meta: { title: '', date: '', tags: [] },
            errMsg: ''
        }
    },
    created() {
        this.load();
    },
    watch: {
        // 同一组件内切换文章（如路由参数变化）时重新加载
        '$route.params.id'() {
            this.load();
        },
        // v-html 更新后做代码高亮与链接/图片处理
        body() {
            this.$nextTick(() => this.decorate());
        }
    },
    computed: {
        html() {
            return this.body ? marked.parse(extraBlankLines(this.body)) : '';
        }
    },
    methods: {
        // 翻译安全取值：组件卸载后 $t/$i18n 会被 vue-i18n 从实例上删除，
        // 异步失败回调不能依赖 this.$t，这里取到才用、取不到就返回 key 本身
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
            this.body = '';
            const slug = this.$route.params.id;
            const articleMiss = this._t('blog.articleMiss');
            try {
                const res = await fetch(`${process.env.BASE_URL}blog/posts/${encodeURIComponent(slug)}.md`);
                if (!res.ok) throw new Error(String(res.status));
                const raw = await res.text();
                const { fm, body } = stripFrontMatter(raw);
                const fmMeta = parseFront(fm);
                // 文章元信息直接取自 md 头部，不依赖 meta.json
                this.meta = Object.assign(this.meta, fmMeta);
                this.body = body;
            } catch (e) {
                this.errMsg = articleMiss;
            } finally {
                this.loading = false;
            }
        },
        decorate() {
            const root = this.$refs.body;
            if (!root) return;
            // 代码高亮
            root.querySelectorAll('pre code').forEach((el) => {
                try { hljs.highlightElement(el); } catch (e) { /* 忽略无法高亮的片段 */ }
            });
            // 图片紧跟图注时，breaks 会插入 <br>，直接从 DOM 移除（避免多余换行）
            root.querySelectorAll('img + br').forEach((br) => br.remove());
            // 外链新标签打开
            root.querySelectorAll('a').forEach((a) => {
                const href = a.getAttribute('href') || '';
                if (/^https?:\/\//.test(href)) {
                    a.target = '_blank';
                    a.rel = 'noopener';
                }
            });
            // 图片懒加载
            root.querySelectorAll('img').forEach((img) => { img.loading = 'lazy'; });
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
.blog-back{
    margin-bottom: 18px;
}
.blog-back-link{
    color: #5a6bb5;
    text-decoration: none;
}
.blog-back-link:hover{
    text-decoration: underline;
}
.blog-post-title{
    font-weight: bold;
    margin: 0 0 8px;
}
.blog-item-meta{
    font-size: 0.85rem;
    color: #777;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding-bottom: 14px;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 20px;
}
.blog-item-tag{
    background: #eef0ff;
    color: #5a6bb5;
    padding: 1px 8px;
    border-radius: 10px;
}
.blog-tip{
    text-align: center;
    color: #777;
    padding: 60px 0;
}
</style>
<!-- 渲染正文(markdown)的全局样式：v-html 内部元素不受 scoped 约束 -->
<style>
.blog-body{
    line-height: 1.8;
    font-size: 0.93rem;
    color: #333;
    word-break: break-word;
}
.blog-body h1,.blog-body h2,.blog-body h3,.blog-body h4{
    margin: 1.1em 0 0.5em;
    font-weight: bold;
}
.blog-body h1{ font-size: 1.5em; }
.blog-body h2{ font-size: 1.32em; }
.blog-body h3{ font-size: 1.15em; }
.blog-body h4{ font-size: 1em; }
.blog-body h2{
    border-bottom: 1px solid #eee;
    padding-bottom: 6px;
}
.blog-body p{
    margin: 1em 0;
}
.blog-body li{
    margin: 0.15em 0;
}
.blog-body img{
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20px auto;
    border-radius: 8px;
}
/* 图片紧跟图注时，breaks 会把那次换行转成 <br>，这里只隐藏图片后紧邻的换行 */
.blog-body img + br{
    display: none;
}
.blog-body pre{
    background: #f6f8fa;
    border-radius: 8px;
    padding: 10px 12px;
    overflow-x: auto;
    font-size: 0.86rem;
}
.blog-body code{
    font-family: Consolas, Monaco, 'Courier New', monospace;
}
.blog-body p code{
    background: #f0f0f0;
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 0.9em;
}
.blog-body blockquote{
    border-left: 4px solid #b6a8e0;
    margin: 0.8em 0;
    padding: 4px 14px;
    color: #666;
    background: #faf9ff;
    border-radius: 0 6px 6px 0;
    font-size: 0.95em;
}
.blog-body table{
    border-collapse: collapse;
    width: 100%;
    margin: 10px 0;
    font-size: 0.9rem;
}
.blog-body th,.blog-body td{
    border: 1px solid #ddd;
    padding: 5px 9px;
    text-align: left;
}
.blog-body th{
    background: #f4f4f4;
}
</style>
