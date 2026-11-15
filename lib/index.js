export * from './templates.mjs';

// ── DSH 插件接入（方案 A 薄壳：注册 skill 与 CLI 入口；业务逻辑仍在 lib/bin，不在此处）──
import { createPlugin, pkgRootFrom } from '@deepwhale-cn/dsh-guard-core/plugin';

export const { name, inject, apply } = createPlugin({
  name: 'legal-notice',
  pkgRoot: pkgRootFrom(import.meta.url),
  skillFile: 'skill/legal-notice.md',
  binFile: 'bin/cli.mjs',
  description: "生成催告函、解除通知书、律师函骨架（Markdown + 打印版 HTML），字段占位、供人工审核",
  whenToUse: "起草催告函、解除通知书、律师函骨架。用户会说：帮我起草催告函、解除合同怎么通知。",
});
