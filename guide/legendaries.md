# 传奇武器

传奇武器是比赛中后期的"翻盘装备"——可以**合成**、有**主动技能**、有**被动**、有**冷却**、有**图鉴**和**配方书**。

## 6 把传奇

| 武器 | 基础物品 | 玩起来什么感觉 |
| --- | --- | --- |
| 🐉 **龙之武士刀**(Dragon Katana) | 下界合金剑 | 永久速度加成,潜行右键短距瞬移 |
| 🌋 **岩浆战棍**(Magma Club) | 金斧 | 暴击概率把敌人击退 + 损耗其护甲 |
| 💀 **猎首胸甲**(Headhunter Chestplate) | 下界合金胸甲 | 力量加成,Rage 满后爆发一波 |
| ⛏️ **岩浆十字镐**(Magma Pickaxe) | 铁镐 | 挖石头/矿连带破坏 3×3×3 范围 |
| 🌊 **守卫者激光炮**(Guardian Cannon) | 弩 | 右键蓄力,发射持续激光 |
| 🪃 **回旋飞轮**(Ricochet Chakrams) | 雪球 | 投掷命中后反弹回来,可继续连击 |

## 玩家命令

```text
/legendary atlas      # 打开传奇图鉴 GUI(看技能、看效果)
/legendary recipes    # 查看所有合成配方
/recipe legendary     # /legendary recipes 的别名
/legendary            # 列出已注册传奇武器
```

## 配方一览

| 武器 | 合成方式 |
| --- | --- |
| 龙之武士刀 | **铁砧**:钻石剑 + 龙首,消耗 8 等级 |
| 岩浆战棍 | 工作台:钻石、金块、烈焰棒 |
| 猎首胸甲 | 工作台:下界之星 + 钻石胸甲 |
| 岩浆十字镐 | 工作台:黑曜石、火药、钻石镐 |
| 守卫者激光炮 | 工作台:海晶碎片、弩、海洋之心 |
| 回旋飞轮 | 工作台:石头、烈焰棒 |

具体材料摆位详见游戏内 `/legendary atlas`。

## 技能怎么用

每把武器都有自己的**键位约定**(以下为默认):

| 键位 | 一般用途 |
| --- | --- |
| 左键 | 普攻 / 触发被动 |
| 右键 | 主动技能(单次/蓄力) |
| 潜行 + 右键 | 第二技能 / 模式切换 |
| 自动 | 持续生效的被动 |

游戏中按 `/legendary atlas` 查每把的具体说明。

## 冷却

主动技能都有冷却,显示在物品栏的物品 cooldown 上。**冷却共享于物品本身**:你换手位、丢出去捡回来,冷却不会重置。

## 服主关心的

### 配置位置

```
plugins/HopliteRoyale/legendaries/
├── dragon_katana.yml
├── magma_club.yml
├── headhunter_chestplate.yml
├── magma_pickaxe.yml
├── guardian_cannon.yml
└── ricochet_chakrams.yml
```

每个文件都支持:

| 字段 | 说明 |
| --- | --- |
| `enabled` | 是否启用这把武器 |
| `item.base-material` | 物品基础材质(namespaced key) |
| `item.custom-model-data` | 资源包模型 ID |
| `recipe` | 合成配方 |
| `ability` | 技能数值(伤害、范围、冷却) |

示例:

```yaml
# legendaries/dragon_katana.yml
enabled: true
item:
  custom-model-data: 1001
  base-material: minecraft:netherite_sword
recipe:
  type: anvil
  left: minecraft:diamond_sword
  right: minecraft:dragon_head
  level-cost: 8
ability:
  speed-amplifier: 1
  blink-range: 8
  blink-cooldown-ms: 5000
```

### 管理命令

| 命令 | 用途 | 权限 |
| --- | --- | --- |
| `/legendary reload` | 重载配置和配方 | 管理员 |
| `/legendary giveall <玩家>` | 一次性发全套传奇(测试用) | 管理员 |
| `/legendary perf` | 查看技能调度耗时 | 管理员 |
| `/legendary perf reset` | 清空性能计数 | 管理员 |

### 性能建议

传奇技能涉及粒子、命中检测、定时器,在 4–8 人小局没问题;30+ 人混战时可能有压力。

如果某把武器明显造成卡顿:

1. 用 `/legendary perf` 看是哪一把耗时最长
2. 把对应配置 `enabled: false`
3. `/legendary reload`
4. 反馈给开发者

## 平衡参考

- 一局比赛**期望玩家最多合出 1 把传奇**——配方资源应该够稀缺
- 不要让任何一把"无脑碾压"——每把都该有反制(冷却、距离、姿态)
- 赛季中段如果某把使用率超 40%,考虑微调数值
