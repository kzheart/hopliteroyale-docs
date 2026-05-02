# 日常运维

服主每天 / 每周该看什么、什么时候该警觉、出问题怎么排查。

## 每日检查(2 分钟)

| 看什么 | 怎么看 |
| --- | --- |
| 服务端日志有没有 `HopliteRoyale` 报错 | 控制台 grep `HopliteRoyale` |
| MySQL 是否能连接 | `/br create default solo` 不报错就行 |
| ASP 地图模板可读取 | `/testmap load <模板>` |
| 奖励钩子有效 | 在 `config.yml` 里打开 `rewards.enabled` 后，检查控制台输出是否有对应指令 |

## 每周检查(10 分钟)

- 复盘玩家上线人数曲线 / 赛季完成度
- 看是否有某个职业 / 某把传奇使用率失衡(`/legendary perf` 帮忙)
- 备份数据库
- 备份 `plugins/HopliteRoyale/` 配置目录

---

## 开一局测试(每次更新插件后必做)

```text
/br create default solo
/br list
/br join <id>
# 等几秒看阶段会不会自动跑
/br forcephase <id> CORNUCOPIA   # 调试用,直接跳到丰饶角
```

正式上线前一定要让 2–4 个测试号**完整跑一局**,直到 Ending 阶段地图卸载。

---

## 故障排查 · 启动阶段

### 启动报"Failed to connect to MySQL"

✅ 检查清单:

1. `host` / `port` 对不对
2. 数据库账号 / 密码 / 库名对不对
3. 数据库是否真的存在(`SHOW DATABASES;`)
4. 账号有没有 `CREATE TABLE` / `ALTER TABLE` 权限
5. `pool-size` 别开太大,默认 10 够用

### 启动报"ASP 4.x API not found"

服务端不是 AdvancedSlimePaper 4.x。要么版本太老(3.x),要么用了普通 Paper。**升级到 ASP 4.x**。

### 启动报"Flyway migration failed"

数据库已经有同名旧表,但和插件期望的 schema 对不上。两条路:

1. 备份 → 清掉旧的相关表 → 重启让插件重建
2. 手动按 `db/migration/V*__*.sql` 对齐 schema

---

## 故障排查 · 比赛阶段

### `/br create` 报 "Arena not found"

`arenas/<id>.yml` 没加载。看启动日志有没有 `Loaded N arenas`。

### `/br create` 报 "Template not found"

Arena 配置里的 `template-world` 字段和 ASP 里的模板名对不上。用 `/testmap load <模板>` 单独验证。

### 玩家进场后卡在大厅 / 没有传送

- 出生点不够:`spawn-points` 数量太少,系统会复用并偏移,但极端情况下可能卡住
- 实例世界没加载完:多等几秒,如果还卡看日志有没有 ASP 报错

### 比赛结束后世界没卸载

Ending 阶段异常退出 / ASP 删除失败。临时方案:

```text
/testmap unload <实例世界名>
```

如果反复出现,看日志中 `EndingPhase` 相关报错。

---

## 故障排查 · 传奇武器

| 命令 | 用途 |
| --- | --- |
| `/legendary recipes` | 配方有没有注册 |
| `/legendary atlas` | 图鉴 GUI 渲染对不对 |
| `/legendary giveall <玩家>` | 直接发全套测试 |
| `/legendary perf` | 看技能调度耗时 |
| `/legendary reload` | 重载配置 |

修改配置后 `/legendary reload` 没生效?多半是 yml 写错了——看控制台有没有 yaml parse 错误。

某把武器卡服?

1. `/legendary perf` 找耗时最长那把
2. 编辑对应 yml,`enabled: false`
3. `/legendary reload`
4. 反馈给开发

---

## 故障排查 · 数据 / 进度

### 玩家说"我打了一局没拿到经验"

检查链:

1. 这一局是否进入过**发育期**(参与经验在那时结算)
2. 玩家是否中途**离场**(中途退出不算参与)
3. 数据库连接是否正常(`/br create` 能成功就基本正常)

### 玩家说“我击杀了 / 赢了但没拿到积分”

奖励现在都走 `rewards.commands` 或你自己那个外部接入插件。检查顺序：

1. `config.yml` 的 `rewards.enabled` 是不是 `true`
2. 控制台报了什么错（奖励指令报错会在控制台骨架里）
3. 占位符是否拼写错误（为 `{player}` 不是 `%player%`）
4. 所有命令都以控制台身份执行，需要玩家主体的命令请反映为其提供者插件的问题

---

## 备份建议

```bash
# 数据库
mysqldump -u root -p hopliteroyale > backup-$(date +%F).sql

# 配置
tar czf hr-config-$(date +%F).tgz plugins/HopliteRoyale/
```

频率建议:

| 内容 | 频率 |
| --- | --- |
| 数据库 | 每天(自动) |
| 配置 | 每周(改配置前必做) |
| 地图模板 | 改地图前 |

---

## 升级插件流程

1. 在测试服跑通新版本,完整一局
2. 备份生产数据库 + 配置
3. 停服
4. 替换 jar
5. 启动观察 Flyway 迁移日志
6. 开一局小规模验证
7. 公告玩家

::: warning 不要在玩家打到一半时升级
比赛实例和数据库迁移可能冲突。要升级,先 `/br list` 确认没有进行中的比赛。
:::

---

## 文档维护

本站通过 GitHub Actions 自动构建到 GitHub Pages。

- 改文档:Pull Request → 合并到 `main` → 自动部署
- 不要提交 jar / 真实配置 / 数据库备份 / 地图模板
- `.gitignore` 里已经屏蔽了 `node_modules` 和构建产物
