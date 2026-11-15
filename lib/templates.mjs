/**
 * dsh-legal-notice —— 法律函件骨架模板
 * 产物是「骨架 + 字段占位」，必须经人工审核后使用；不构成法律意见。
 */

const esc = (s) => String(s || '____').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const TYPES = ['demand', 'termination', 'lawyer'];
export const CATEGORY = { demand: '催告函', termination: '解除通知书', lawyer: '律师函（骨架）' };

export function fields(t) {
  const common = ['party-a 发函方', 'party-b 收函方', 'contract 合同/依据', 'breach 违约/欠付事实', 'date 落款日期'];
  if (t === 'demand') return [...common, 'amount 欠付金额', 'days 宽限天数'];
  if (t === 'termination') return [...common, 'clause 依据的合同条款', 'effective 解除生效日'];
  return [...common, 'firm 律所名称', 'lawyer 律师姓名', 'claim 要求事项'];
}

export function renderMd(t, f = {}) {
  const A = f['party-a'] || '〔发函方〕';
  const B = f['party-b'] || '〔收函方〕';
  const C = f.contract || '〔合同名称及编号〕';
  const breach = f.breach || '〔违约/欠付事实：时间、金额、条款项〕';
  const date = f.date || '〔落款日期〕';
  let body;
  if (t === 'demand') {
    const amount = f.amount || '〔金额〕';
    const days = f.days || '〔N〕';
    body = [
      `贵方与我方 ${C} 项下，贵方存在以下违约/欠付事实：${breach}。`,
      `截至本函出具之日，贵方尚欠 ${amount} 未支付。`,
      `现催告贵方于收到本函之日起 ${days} 日内履行完毕；逾期未履行的，我方将依据 ${C} 及法律规定，追究贵方违约责任（包括但不限于支付逾期利息、违约金，并有权解除合同）。`,
    ];
  } else if (t === 'termination') {
    const clause = f.clause || '〔依据的合同解除条款〕';
    const eff = f.effective || '〔解除生效日〕';
    body = [
      `贵我双方 ${C} 项下，贵方存在如下违约事实：${breach}。`,
      `依据 ${clause} 及《民法典》第 563 条相关规定，现通知贵方：双方 ${C} 自 ${eff} 起解除。`,
      `解除后，请贵方于收函之日起 15 日内完成结算、返还与移交事宜；我方保留就违约损失进一步追偿的权利。`,
      `如贵方对本解除通知有异议，可在法定/约定期限内请求人民法院或仲裁机构确认解除效力（《民法典》第 565 条）。`,
    ];
  } else {
    const firm = f.firm || '〔律师事务所〕';
    const lawyer = f.lawyer || '〔律师姓名〕';
    const claim = f.claim || '〔要求事项：付款/停止侵权/返还…〕';
    body = [
      `受 ${A} 委托，${firm} 指派 ${lawyer} 律师就贵方 ${C} 项下违约事宜致函如下：`,
      `经委托人陈述并提供初步材料，贵方存在以下行为：${breach}。（相关事实与证据材料以委托人提供为准，律师已作初步审查。）`,
      `现郑重要求贵方：${claim}。`,
      `望贵方于收函之日起 7 日内与本律师联系并妥善处理；逾期，委托人将依法采取包括诉讼/仲裁在内的法律手段，届时因此产生的全部费用与损失将一并主张。`,
    ];
  }
  const title = CATEGORY[t];
  const L = [`# ${title}`, '', `**致：${B}**`, '', ...body.map((x) => x), '', `${A}`, `${date}`, '', '---', '', '附注（发函前删除）：',
    '1. 本函为骨架，违约事实、金额、条款务必逐项核实后使用；', '2. 送达方式影响后续举证（EMS 注明文件名称并留存面单/拍照封存）；',
    '3. 本骨架不构成法律意见，重大事项请委托律师出具。'];
  return L.join('\n') + '\n';
}

export function renderHtml(t, f = {}) {
  const md = renderMd(t, f);
  const paras = md.split('\n').filter((x) => x && !x.startsWith('#') && !x.startsWith('>') && x !== '---')
    .map((x) => `<p>${esc(x).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`);
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>${esc(CATEGORY[t])}</title>
<style>@page{size:A4;margin:2.5cm}body{font:16px/2 "Songti SC","SimSun",serif;margin:0 auto;max-width:21cm;padding:2.5cm;color:#000}
p{text-indent:2em;margin:0 0 .5em}h1{text-align:center;font-size:22px;letter-spacing:.3em;margin:0 0 2em}</style>
</head><body><h1>${esc(CATEGORY[t])}</h1>${paras.join('')}</body></html>`;
}
