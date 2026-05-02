---
layout: home

hero:
  name: HopliteRoyale
  text: 斯巴达大逃杀 · Minecraft 服务端插件
  tagline: 7 阶段循环 · 单/双/四排 · 8 大职业 · 6 把传奇 · 双语 i18n · 公共 API。一把就让玩家上瘾，一晚就能让服主开局。
  image:
    src: /logo.svg
    alt: HopliteRoyale
  actions:
    - theme: brand
      text: 玩家 · 3 分钟上手 →
      link: /guide/player-quickstart
    - theme: alt
      text: 服主 · 5 分钟开服
      link: /guide/owner-quickstart
    - theme: alt
      text: GitHub
      link: https://github.com/kzheart/hopliteroyale-docs

features:
  - icon: 🛡️
    title: 完整比赛循环
    details: 等待 → 准备 → 丰饶角 → 发育 → PvP → 缩圈 → 结算，7 个阶段全自动推进，无需人工开局。
  - icon: ⚔️
    title: 单/双/四排
    details: 三档组队规模，队友互伤拦截 / 队伍聊天 / 队友复活全部内置，Party 一键带朋友进场。
  - icon: 🎯
    title: 8 大职业可成长
    details: 矿工、弓手、坦克、忍者、炼金、侦察、樵夫、渔夫。打得越多职业等级越高，被动 / 属性越强。
  - icon: 🔥
    title: 6 把传奇武器
    details: 龙之刃、岩浆棍、守卫者炮 …… 合成 + 主动技能 + 被动 + 图鉴 + 配方书，全套都有。
  - icon: 🪙
    title: 奖励钩子开放
    details: 内置战令 / 外观已下线。胜负、击杀、首杀、淘汰全部走 Bukkit 事件 + 控制台命令模板，第三方插件随便接。
  - icon: 🌐
    title: 双语 i18n
    details: en_US / zh_CN 内置，按客户端 locale 自动切换。控制台/非玩家 Audience 走 default-locale，无效配置回退到 fallback-locale。
  - icon: 🗺️
    title: 实例地图
    details: 基于 AdvancedSlimePaper 4.x 模板克隆，每场比赛独立世界，结束自动卸载，不污染主世界。
  - icon: 🩹
    title: 治疗规则可配
    details: 关闭原版自然回血，玩家头颅 / 金头按 healing.yml 注入即时治疗 + 持续效果，PvP / 缩圈期才生效。
  - icon: 🔌
    title: 公共 API + 示例
    details: :api 子模块导出事件与契约接口，dev-assets/sample-plugin 提供独立外部插件示例，复制即可用。
---

<div class="hr-section">
<h2>选择你的入口</h2>
<p class="hr-section-sub">三类用户，三条路径。点对应卡片直接进入对应文档。</p>
<div class="hr-roles">
<a class="hr-role-card" href="./guide/player-quickstart">
<span class="hr-role-emoji">🎮</span>
<div class="hr-role-title">我是玩家</div>
<div class="hr-role-desc">想知道怎么进游戏、阶段是怎么回事、职业怎么选、传奇怎么用。</div>
<div class="hr-role-cta">3 分钟看完上场 →</div>
</a>
<a class="hr-role-card" href="./guide/owner-quickstart">
<span class="hr-role-emoji">🏰</span>
<div class="hr-role-title">我是服主</div>
<div class="hr-role-desc">想把插件搭起来、配数据库、加地图、开始测试一局，以及处理常见崩盘。</div>
<div class="hr-role-cta">5 分钟开起一局 →</div>
</a>
<a class="hr-role-card" href="./guide/commands">
<span class="hr-role-emoji">📜</span>
<div class="hr-role-title">我要查命令</div>
<div class="hr-role-desc">所有命令、所有配置字段、所有 FAQ。直接 Ctrl+F 搜你需要的关键词。</div>
<div class="hr-role-cta">直达命令速查 →</div>
</a>
</div>
</div>

<div class="hr-section">
<h2>一局比赛长这样</h2>
<p class="hr-section-sub">从大厅到结算，7 个阶段全自动推进，玩家什么都不用管。</p>
<div class="hr-timeline">
<div class="hr-timeline-step"><strong>等待中</strong>凑人数</div>
<div class="hr-timeline-step"><strong>准备开始</strong>30 秒</div>
<div class="hr-timeline-step"><strong>丰饶角</strong>抢中心箱</div>
<div class="hr-timeline-step"><strong>发育期</strong>12 分钟</div>
<div class="hr-timeline-step is-pvp"><strong>PvP</strong>开战</div>
<div class="hr-timeline-step"><strong>缩圈</strong>压缩战场</div>
<div class="hr-timeline-step"><strong>结算</strong>定胜负</div>
</div>
</div>

<div class="hr-section">
<h2>项目定位</h2>
<p class="hr-section-sub">面向独立小游戏服 / Battle Royale 主题服 / 公会内部 PvP 训练场。</p>
</div>

> **本仓库只发布公开文档**，不发布插件源码、不发布私有地图、不发布数据库凭证。所有示例配置仅作演示，真实部署请参考[安装部署](./guide/install)。
