# @deepwhale-cn/dsh-legal-notice

> **技能型插件 · 无面板**：安装后由 DSH 智能体按 skill 说明调用 CLI；无独立面板界面。

安装到 DSH：

```bash
dsh plugin --profile web add @deepwhale-cn/dsh-legal-notice
```

法律函件骨架生成：催告函 / 解除通知书 / 律师函骨架（Markdown + A4 打印版 HTML），字段占位、逐项可改。**产物必须人工审核后使用，不构成法律意见。**

```bash
npx @deepwhale-cn/dsh-legal-notice --type demand --party-a 深鲸科技 --party-b 某某公司 --contract 合同-2024-001 --amount 86000元 --days 7 --out ./产物
npx @deepwhale-cn/dsh-legal-notice --type termination --clause "第9.2条" --effective 2026-12-01 --out ./产物
```

内置要点：催告函（宽限期+逾期后果）、解除通知书（民法典第 563/565 条：解除依据+异议途径）、律师函（委托关系+要求+逾期追责）。
