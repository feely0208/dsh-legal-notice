#!/usr/bin/env node
/**
 * dsh-legal-notice —— 法律函件骨架生成（离线）
 * 用法：
 *   dsh-legal-notice --type demand|termination|lawyer [--party-a ... --party-b ... --contract ...] [--out 目录] [--json]
 * 产物：函件骨架 .md + 打印版 .html（A4）。骨架必须人工审核后使用。
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { renderMd, renderHtml, TYPES, CATEGORY, fields } from '../lib/index.js';

const args = process.argv.slice(2);
const has = (k) => args.includes('--' + k);
const val = (k, d = '') => {
  const i = args.indexOf('--' + k);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d;
};

if (has('help') || !args.length) {
  console.log(`dsh-legal-notice —— 法律函件骨架

用法：dsh-legal-notice --type <${TYPES.join('|')}> [--party-a 发函方] [--party-b 收函方] [--contract 合同] [--breach 违约事实] [--amount 金额] [--days 宽限天数] [--clause 条款] [--effective 生效日] [--firm 律所] [--lawyer 律师] [--claim 要求] [--date 日期] [--out 目录] [--json]
类型：${Object.entries(CATEGORY).map(([k, v]) => `${k}=${v}`).join('、')}
字段：${TYPES.map((t) => `${t}: ${fields(t).join(', ')}`).join('；')}`);
  process.exit(0);
}

const type = val('type', '');
if (!TYPES.includes(type)) {
  console.error('❌ --type 必须是 ' + TYPES.join('|'));
  process.exit(2);
}
const input = {};
for (const a of args) {
  const m = a.match(/^--([a-z0-9-]+)$/i);
  if (m && !['type', 'json', 'out'].includes(m[1])) input[m[1]] = val(m[1]);
}

const md = renderMd(type, input);
const html = renderHtml(type, input);
let outputs = null;
if (has('out')) {
  const dir = resolve(val('out'));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${CATEGORY[type]}.md`), md, 'utf8');
  writeFileSync(join(dir, `${CATEGORY[type]}.html`), html, 'utf8');
  outputs = { dir, md: join(dir, `${CATEGORY[type]}.md`), html: join(dir, `${CATEGORY[type]}.html`) };
}
if (has('json')) console.log(JSON.stringify({ ok: true, type, outputs, content: md }, null, 2));
else {
  console.log(md);
  if (outputs) console.log(`\n产物：\n  ${outputs.md}\n  ${outputs.html}`);
}
process.exit(0);
