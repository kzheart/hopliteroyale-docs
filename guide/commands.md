# 命令速查

按使用场景分组的所有命令。Ctrl+F 搜你需要的关键词。

## 🎮 玩家最常用

| 命令 | 用途 |
| --- | --- |
| `/br quickplay` | 快速进入单排 |
| `/br quickplay solo` | 单排 |
| `/br quickplay duo` | 双排 |
| `/br quickplay squad` | 四排 |
| `/br leave` | 离开当前比赛 |
| `/kit` | 打开职业选择 GUI |
| `/kit info <职业>` | 查看自己的职业等级 |
| `/bp` | 打开战令 GUI |
| `/bp progress` | 查战令进度 |
| `/bp claim all` | 一键领取奖励 |
| `/cosmetic` | 装备外观 |
| `/legendary atlas` | 翻传奇图鉴 |
| `/recipe legendary` | 看传奇配方 |

## ⚔️ 比赛控制

| 命令 | 用途 | 权限 |
| --- | --- | --- |
| `/br create <arena> <模式>` | 创建比赛(模式:`solo` / `duo` / `squad`) | 服主 |
| `/br join <比赛 ID>` | 加入指定比赛 | 玩家 |
| `/br leave` | 离开当前比赛 | 玩家 |
| `/br quickplay [模式]` | 快速匹配 | 玩家 |
| `/br list` | 查看当前所有比赛实例 | 任意 |
| `/br info <比赛 ID>` | 查看比赛详情 | 任意 |
| `/br forcephase <比赛 ID> <阶段>` | 强制切阶段 | 服主调试 |

阶段名:`WAITING` / `STARTING` / `CORNUCOPIA` / `GRACE` / `PVP` / `SHRINKING` / `ENDING`

## 👥 Party(大厅组队)

| 命令 | 用途 |
| --- | --- |
| `/party create` | 创建 Party |
| `/party invite <玩家>` | 邀请(30 秒过期) |
| `/party accept <队长>` | 接受邀请 |
| `/party leave` | 离开 Party |
| `/party kick <玩家>` | 队长踢人 |
| `/party disband` | 队长解散 |
| `/party list` | 查看成员 |
| `/party chat <消息>` 或 `/p <消息>` | Party 聊天 |

## 💬 比赛内队伍聊天

| 命令 | 用途 |
| --- | --- |
| `/tc <消息>` | 发送给当前比赛的队友 |
| `/t <消息>` | `/tc` 的快捷命令 |

## 🎯 职业(Kit)

| 命令 | 用途 |
| --- | --- |
| `/kit` | 打开 GUI |
| `/kit list` | 查看全部职业 |
| `/kit select <职业>` | 直接选职业 |
| `/kit info <职业>` | 查看自己的等级 / 经验 |

可用职业 ID:`miner` / `archer` / `tank` / `ninja` / `alchemist` / `scout` / `lumberjack` / `fisher`

## 🔥 传奇武器

| 命令 | 用途 | 权限 |
| --- | --- | --- |
| `/legendary` | 列出已注册武器 | 任意 |
| `/legendary atlas` | 打开图鉴 GUI | 任意 |
| `/legendary recipes` | 查看所有配方 | 任意 |
| `/recipe legendary` | 别名 | 任意 |
| `/legendary reload` | 重载配置 | 服主 |
| `/legendary perf` | 查看技能调度耗时 | 服主 |
| `/legendary perf reset` | 重置性能计数 | 服主 |
| `/legendary giveall <玩家>` | 一键发全套(测试) | 服主 |

## 🏆 战令(Battle Pass)

| 命令 | 用途 |
| --- | --- |
| `/bp` 或 `/bp gui` | 打开战令 GUI |
| `/bp progress` | 查等级 / 经验 / 距离下一阶 |
| `/bp season` | 查当前赛季信息 |
| `/bp quests` | 查每日 / 每周任务 |
| `/bp claim all` | 一键领可领奖励 |
| `/bp purchase` | 开通进阶轨道(占位) |

## ✨ 外观

| 命令 | 用途 |
| --- | --- |
| `/cosmetic` | 打开装备 GUI |
| `/cosmetics` | 别名 |

## 🗺️ 地图调试(服主)

| 命令 | 用途 |
| --- | --- |
| `/testmap load <模板>` | 从 ASP 模板加载实例并传送自己 |
| `/testmap unload <世界名>` | 卸载指定实例 |
| `/testmap list` | 查看通过调试加载的实例 |

## 通用

| 命令 | 用途 |
| --- | --- |
| `/version HopliteRoyale` | 查插件版本 |
