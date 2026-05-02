# 赛季切换

::: danger 本章节描述的功能已大部分下线
HopliteRoyale 早期版本带过一套**内置赛季 / 战令 / 外观**系统，按 `start` / `end` 自动归档玩家进度。**那一整块已经从插件中移除**：

- `config.yml` 的 `season.auto-switch` **不再存在**
- `/bp season` / `/bp progress` / `/cosmetic` **不再注册**
- `battlepass/season-N.yml` **不再加载**

数据库里只剩 `legendary_obtained.season` 这种"传奇首获记录"列保留着 season 概念，仅用于历史归档统计。

如果你想搞赛季玩法，请通过 [奖励钩子与外部接入](./battlepass) 自行实现。下面这些建议保留作为**外部插件实现赛季逻辑时**的参考。
:::

## 用外部插件实现赛季的思路

把 HopliteRoyale 当成"只产生事件 / 数据"的核心，赛季层完全在你自己的插件里：

```
HopliteRoyale (events) ──→ 你的赛季插件 ──→ 自家 season_progress 表
                                       ──→ 战令 / 任务 GUI
                                       ──→ 排行榜 / 公告
```

### 推荐流程

1. 监听 `GameEndEvent` / `PlayerKillEvent` / `PlayerEliminatedEvent` 等
2. 写入你自家的 `season_progress(player_uuid, season_id, xp, tier, ...)` 表
3. 每天调度一次 `auto-switch` 检查：到日期了 → 把当前赛季快照写到 `season_archive`，重置 `season_progress`
4. 自家 GUI 展示战令进度 / 已领奖励等

### 切换前自检清单（参考）

- [ ] 新赛季 schema 已就绪
- [ ] 测试服里把日期手动调到新赛季并验证归档脚本
- [ ] 数据库做了完整备份
- [ ] 玩家公告 / 资源包同步上线

### 切换日当天

```text
1. 备份生产数据库
2. 在低峰时间段重启服务器
3. 启动后立刻验证你自家的赛季插件状态
4. 找一个老玩家试 GUI 是否显示新赛季
```

## 推荐节奏

| 节奏 | 适合 |
| --- | --- |
| 3 个月 / 赛季 | 大型综合服（默认） |
| 1 个月 / 赛季 | 高强度小游戏服 |
| 2 周 / 赛季 | 公会内部赛 / 短期活动 |

赛季越短，**奖励曲线要越平**——不然玩家追不上。

## 数据库残留清理

老库（早于本次重构）可能存在战令 / 外观相关表，可视情况手动删除：

```sql
DROP TABLE IF EXISTS battle_pass_progress;
DROP TABLE IF EXISTS cosmetic_ownership;
DROP TABLE IF EXISTS quest_progress;
-- 等等
```

::: warning 操作前一定备份
线上数据库永远先 `mysqldump` 再清。
:::
