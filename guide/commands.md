# 命令参考

## 比赛命令

| 命令 | 说明 |
| --- | --- |
| `/br create <arena> <mode>` | 创建比赛实例并加载地图 |
| `/br join <id>` | 加入指定比赛 |
| `/br leave` | 离开当前比赛 |
| `/br quickplay` | 快速加入 Solo |
| `/br quickplay <mode>` | 快速加入指定模式：`solo`、`duo`、`squad` |
| `/br list` | 查看当前比赛实例 |
| `/br info <id>` | 查看比赛详情 |
| `/br forcephase <id> <phase>` | 强制切换阶段，管理员调试用 |

## 地图调试命令

| 命令 | 说明 |
| --- | --- |
| `/testmap load <template>` | 从 ASP 模板加载实例地图并传送自己 |
| `/testmap unload <world>` | 卸载指定实例地图 |
| `/testmap list` | 查看通过调试命令加载的实例地图 |

## Party 命令

| 命令 | 说明 |
| --- | --- |
| `/party create` | 创建队伍 |
| `/party invite <player>` | 邀请玩家，邀请 30 秒后过期 |
| `/party accept <leader>` | 接受指定队长的邀请 |
| `/party leave` | 离开当前队伍 |
| `/party disband` | 队长解散队伍 |
| `/party kick <player>` | 队长踢出成员 |
| `/party list` | 查看队伍成员 |
| `/party chat <message>` | 发送队伍聊天 |
| `/p <message>` | Party 聊天快捷命令 |

## 游戏内队伍聊天

| 命令 | 说明 |
| --- | --- |
| `/tc <message>` | 给当前比赛队友发送消息 |
| `/t <message>` | `/tc` 的快捷命令 |

## Kit 命令

| 命令 | 说明 |
| --- | --- |
| `/kit` | 打开 Kit 选择 GUI |
| `/kit list` | 查看可用 Kit |
| `/kit select <id>` | 直接选择 Kit |
| `/kit info <id>` | 查看指定 Kit 等级和经验 |

Grace 之后不能更换本局 Kit。

## 传奇武器命令

| 命令 | 说明 |
| --- | --- |
| `/legendary` | 列出可用传奇武器 |
| `/legendary atlas` | 打开传奇武器图鉴 |
| `/legendary recipes` | 查看已注册传奇配方 |
| `/recipe legendary` | 查看传奇配方别名命令 |
| `/legendary reload` | 重载传奇武器配置，需要管理员权限 |
| `/legendary perf` | 查看传奇调度性能，需要管理员权限 |
| `/legendary perf reset` | 重置性能计数 |
| `/legendary giveall <player>` | 给指定玩家发放全部传奇武器，需要管理员权限 |

## Battle Pass 命令

| 命令 | 说明 |
| --- | --- |
| `/bp` | 打开 Battle Pass GUI |
| `/bp gui` | 打开 Battle Pass GUI |
| `/bp progress` | 查看当前 Battle Pass 等级和经验 |
| `/bp season` | 查看当前赛季 |
| `/bp quests` | 查看每日和每周任务 |
| `/bp claim all` | 一键领取可领取奖励 |
| `/bp purchase` | 开通 Premium 轨道，占位实现 |

## 外观命令

| 命令 | 说明 |
| --- | --- |
| `/cosmetic` | 打开外观装备 GUI |
| `/cosmetics` | `/cosmetic` 的别名 |
