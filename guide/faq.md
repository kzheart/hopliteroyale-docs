# 常见问题

按"玩家 / 服主 / 文档"分类。Ctrl+F 找你的关键词。

## 🎮 玩家相关

### 怎么进游戏?

```text
/br quickplay              # 单排
/br quickplay duo          # 双排
/br quickplay squad        # 四排
```

### 怎么和朋友一起玩?

先在大厅 `/party create`,`/party invite <好友>`,然后整队 `/br quickplay duo`。

### 我和队友为什么打不死对方?

这是友伤拦截。同队成员之间**任何攻击都不掉血**,包括弓箭、药水。

### 我刚开局没掉血?

丰饶角(开局 30 秒)+ 发育期(12 分钟)**完全禁 PvP**,这段时间任何攻击都被拦截。

### 我能换职业吗？

进入**发育期之前**可以（`/class select <id>`）。发育期之后本局锁定。

### 职业进度会不会丢？

不会。职业等级 / 经验存数据库，跨局保留。本体已不再内置战令 / 外观 / 钱包系统——这一块请看 [奖励钩子与外部接入](./battlepass)。

### 下线再上能继续吗?

不能。一旦你离场就视为淘汰,这一局对你结束。

---

## 🏰 服主相关

### 这个仓库有插件源码吗?

**没有**。本仓库只发布公开文档。源码、构建脚本、私有地图、线上配置都不在这里。

### 普通 Paper 能跑吗?

非地图功能可以测试,但 `/br create` 一定会失败(地图加载依赖 ASP API)。**生产环境必须 ASP 4.x**。

### 创建比赛后地图加载失败?

依次检查:

1. 服务端是不是 **ASP 4.x**(不是 3.x,也不是普通 Paper)
2. Arena 配置里的 `template-world` 在 ASP 里**真的存在**
3. ASP 的 MySQL loader 能**连接成功**(看 ASP 日志)

### 启动报 `Failed to connect to MySQL`?

九成是 `config.yml` 里的:

- `host` / `port` 错
- 账号 / 密码错
- 数据库名拼错或不存在
- 账号没有建表权限

### 玩家说职业没升级？

检查链:

1. 玩家这一局有**从发育期走到结束**吗？参与经验在结算时才会落库
2. 玩家是**中途退出**还是打到结束?
3. 数据库连接正常吗?(`/br create default solo` 成功就行)

### 修改传奇武器配置要重启吗?

多数情况下 `/legendary reload` 就行。涉及数据库迁移 / 整体依赖的修改才需要重启。

### 赛季系统还在吗？

本体内置的赛季 / 战令 / 外观逻辑**已经下线**。数据库里只保留了 `legendary_obtained.season` 这样的“传奇首获记录”列。想要赛季制 / 货币 / 奖励轨道，请自己用 [奖励钩子与外部接入](./battlepass) 补。

### 可以把真实配置进公开仓库吗?

**不要**。真实数据库密码、地图模板、备份文件、token 都不能提交。`.gitignore` 加上 `config.yml`。

### 玩家数据要怎么备份?

```bash
mysqldump -u root -p hopliteroyale > backup-$(date +%F).sql
```

详见[运维 · 备份建议](./operations#备份建议)。

### 多张地图怎么开?

`arenas/` 下放多个 yml,内部 `id` 字段不重复即可。`/br create <id> <模式>` 选地图。

### 性能问题怎么排查?

- `/legendary perf` 看传奇技能调度耗时
- 把可疑的传奇 `enabled: false` + reload
- 大局玩家数控制在 30 以内,小服 8–16 人最佳

### 怎么参与文档维护?

去 GitHub Pull Request:<https://github.com/kzheart/hopliteroyale-docs>

---

## 📖 文档 / 站点

### 这个站点是哪个工具搭的?

VitePress,GitHub Pages 自动部署。源码就是这个仓库,改完合 `main` 即可。

### 文档说的版本对不对?

文档目标版本:HopliteRoyale **0.1.0** + Paper / ASP **1.21.11**。后续会跟进。

### 我能贡献内容吗?

可以。提 PR、提 Issue 都行。提交前别带真实数据。

---

## 还是没找到答案?

1. 看[命令速查](./commands)有没有相关命令
2. 看[运维诊断](./operations)的故障排查清单
3. 提 Issue:<https://github.com/kzheart/hopliteroyale-docs/issues>
