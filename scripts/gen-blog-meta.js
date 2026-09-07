/**
 * 扫描 public/blog/posts/*.md，解析文章头部的 front matter（title/date/tags/summary），
 * 生成 public/blog/meta.json 供博客列表页使用。
 * 用法：npm run meta（npm run serve / build 前会自动执行）
 */
const fs = require('fs');
const path = require('path');

const postsDir = path.resolve(__dirname, '../public/blog/posts');
const outFile = path.resolve(__dirname, '../public/blog/meta.json');

function parseFront(raw) {
    const text = raw.replace(/^\uFEFF/, '');
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    const fm = m ? m[1] : '';
    const body = m ? text.slice(m[0].length) : text;
    const meta = { title: '', date: '', tags: [], summary: '' };
    fm.split(/\r?\n/).forEach((line) => {
        const idx = line.indexOf(':');
        if (idx <= 0) return;
        const k = line.slice(0, idx).trim();
        const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (k === 'title') meta.title = v;
        else if (k === 'date') meta.date = v;
        else if (k === 'tags') meta.tags = v.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
        else if (k === 'summary') meta.summary = v;
    });
    // 未写 summary 时，取正文第一个普通段落的前 80 字作为摘要
    if (!meta.summary) {
        const lines = body.split(/\r?\n/).filter((l) => {
            const t = l.trim();
            return t && !/^(#{1,6}\s|!\[|```|>|[-*+] |\d+[.、]|---)/.test(t) && !t.startsWith('```');
        });
        if (lines.length) meta.summary = lines[0].trim().slice(0, 80);
    }
    return meta;
}

if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
}

const posts = fs.readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
        const raw = fs.readFileSync(path.join(postsDir, f), 'utf8');
        const meta = parseFront(raw);
        return { slug: f.replace(/\.md$/, ''), ...meta };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

fs.writeFileSync(outFile, JSON.stringify({ updated: new Date().toISOString(), posts }, null, 2), 'utf8');
console.log(`[blog] meta.json generated: ${posts.length} post(s) -> ${outFile}`);
