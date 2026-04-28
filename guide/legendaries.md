# 传奇武器

传奇武器是比赛中的高价值装备，支持配方合成、主动技能、被动技能、冷却、图鉴和性能统计。

## 武器列表

| 武器 | 基础物品 | 能力 |
| --- | --- | --- |
| Dragon Katana | Netherite Sword | 永久速度，潜行右键短距传送 |
| Magma Club | Golden Axe | 暴击概率击退敌人并损耗护甲 |
| Headhunter Chestplate | Netherite Chestplate | 力量、Rage 积累、满 Rage 爆发 |
| Magma Pickaxe | Iron Pickaxe | 挖掘石头或矿石时连带破坏 3x3x3 范围 |
| Guardian Cannon | Crossbow | 右键蓄力后发射持续激光 |
| Ricochet Chakrams | Snowball | 投掷命中后反弹并返回 |

## 图鉴与配方

玩家可以使用：

```text
/legendary atlas
/legendary recipes
/recipe legendary
```

服主可以通过配置文件调整每把武器的基础物品、CustomModelData、配方和技能数值。

## 管理命令

| 命令 | 说明 |
| --- | --- |
| `/legendary reload` | 重载传奇武器配置和配方 |
| `/legendary giveall <player>` | 给玩家发放全部传奇武器 |
| `/legendary perf` | 查看传奇技能调度性能 |
| `/legendary perf reset` | 清空性能计数 |

## 配方摘要

| 武器 | 合成方式 |
| --- | --- |
| Dragon Katana | 铁砧：钻石剑 + 龙首 |
| Magma Club | 工作台：钻石、金块、烈焰棒 |
| Headhunter Chestplate | 工作台：下界之星 + 钻石胸甲 |
| Magma Pickaxe | 工作台：黑曜石、火药、钻石镐 |
| Guardian Cannon | 工作台：海晶碎片、弩、海洋之心 |
| Ricochet Chakrams | 工作台：石头、烈焰棒 |

## 服务器性能

传奇系统带有性能统计命令。建议在每次新增或大幅调整武器后，用 4 到 8 名玩家进行测试，并通过 `/legendary perf` 查看平均调度耗时。

如果某个武器造成卡顿，先临时把对应配置的 `enabled` 改为 `false`，重启或重载后再排查。
