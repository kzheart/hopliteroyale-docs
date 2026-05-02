# 传奇武器

传奇武器是比赛中后期的"翻盘装备"——可以**合成**、有**主动技能**、有**被动**、有**冷却**、有**图鉴**和**配方书**。

## 6 把传奇

| 武器 ID | 中文 | 基础物品 | 玩起来什么感觉 |
| --- | --- | --- | --- |
| `dragon_katana` | 🐉 龙之武士刀 | 下界合金剑 | 永久速度加成,潜行右键短距瞬移 |
| `magma_club` | 🌋 岩浆战棍 | 金斧 | 暴击概率把敌人击退 + 损耗其护甲 |
| `headhunter_chestplate` | 💀 猎首胸甲 | 下界合金胸甲 | 力量加成,Rage 满后爆发一波 |
| `magma_pickaxe` | ⛏️ 岩浆十字镐 | 铁镐 | 挖石头/矿连带破坏 3×3×3 范围 |
| `guardian_cannon` | 🌊 守卫者激光炮 | 弩 | 右键蓄力,发射持续激光 |
| `ricochet_chakrams` | 🪃 回旋飞轮 | 雪球 | 投掷命中后反弹回来,可继续连击 |

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

具体材料摆位详见游戏内 `/legendary atlas`,或往下看完整配置。

## 技能键位

| 键位 | 一般用途 |
| --- | --- |
| 左键 | 普攻 / 触发被动 |
| 右键 | 主动技能(单次/蓄力) |
| 潜行 + 右键 | 第二技能 / 模式切换 |
| 自动 | 持续生效的被动 |

游戏中按 `/legendary atlas` 查每把的具体说明。

## 冷却

主动技能都有冷却,显示在物品栏的物品 cooldown 上。**冷却共享于物品本身**:你换手位、丢出去捡回来,冷却不会重置。

---

## 完整配置参考

每把武器一份 yml,**文件名固定**,放在 `plugins/HopliteRoyale/legendaries/` 下。

### 通用结构(6 把都有)

```yaml
enabled: true
item:
  custom-model-data: 1001
  base-material: minecraft:netherite_sword
recipe:
  ...                    # 看下面两种类型
ability:
  ...                    # 每把武器各自的字段
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `enabled` | bool | `true` | `false` 时不发放、不能合成、图鉴隐藏 |
| `item.custom-model-data` | int | 1001 | 资源包模型 ID,无资源包写啥都行 |
| `item.base-material` | namespaced key | 各自不同 | 物品基底类型,**必须是合法的 Minecraft 物品 ID** |

### Recipe Type A:铁砧合成

适用:目前**只有 `dragon_katana` 用这种**。

```yaml
recipe:
  type: anvil
  left: minecraft:diamond_sword
  right: minecraft:dragon_head
  level-cost: 8
  required-rename: ""    # (可选)需要的命名,空字符串 = 不要求
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `type` | string | ✅ | 必须为 `anvil` |
| `left` | namespaced key | ✅ | 左槽放的物品 |
| `right` | namespaced key | ✅ | 右槽放的物品 |
| `level-cost` | int | ✅ | 合成消耗的经验等级 |
| `required-rename` | string | ❌ | 留空表示不要求改名;非空时玩家必须把左槽物品**精确命名**为这个字符串 |

### Recipe Type B:工作台合成

适用:其它 5 把武器都用这种。

```yaml
recipe:
  shape:
    - "DGD"              # 3 行,每行 3 个字符
    - "DSD"
    - " S "              # 空格 = 该格不需要物品
  ingredients:
    D: minecraft:diamond
    G: minecraft:gold_block
    S: minecraft:blaze_rod
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `shape` | string[3] | 必须 3 行,每行**3 个字符** |
| `ingredients` | map | `字符 → namespaced key` |

::: tip 字符可以自定义
`ingredients` 里的 key 可以是任何**单个字符**(`D` / `g` / `*` / `1`...)。空格 ` ` 永远代表"无物品"。**大小写敏感**。
:::

---

## 各武器 ability 字段详表

### 🐉 龙之武士刀 `dragon_katana.yml`

```yaml
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
  speed-amplifier: 1            # 永久速度药水的放大器(0=I,1=II)
  blink-range: 8                # 瞬移距离(方块)
  blink-cooldown-ms: 5000       # 瞬移冷却(毫秒)
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `ability.speed-amplifier` | int | 1 | 持有时永久获得的速度药水放大器(0=Speed I,1=Speed II,2=Speed III) |
| `ability.blink-range` | int | 8 | 潜行 + 右键瞬移的距离(方块) |
| `ability.blink-cooldown-ms` | int | 5000 | 瞬移冷却(毫秒) |

### 🌋 岩浆战棍 `magma_club.yml`

```yaml
enabled: true
item:
  custom-model-data: 1001
  base-material: minecraft:golden_axe
recipe:
  shape:
    - "DGD"
    - "DSD"
    - " S "
  ingredients:
    D: minecraft:diamond
    G: minecraft:gold_block
    S: minecraft:blaze_rod
ability:
  knockback-chance: 0.30        # 暴击触发概率
  armor-damage: 50              # 暴击时损耗对方护甲耐久
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `ability.knockback-chance` | double | 0.30 | 攻击命中时触发暴击效果的概率(0.0–1.0) |
| `ability.armor-damage` | int | 50 | 暴击时对目标护甲造成的耐久损耗 |

### 💀 猎首胸甲 `headhunter_chestplate.yml`

```yaml
enabled: true
item:
  custom-model-data: 1001
  base-material: minecraft:netherite_chestplate
recipe:
  shape:
    - " N "
    - "NCN"
    - " N "
  ingredients:
    N: minecraft:nether_star
    C: minecraft:diamond_chestplate
ability:
  rage-max: 100                 # Rage 上限
  damage-dealt-rage: 5          # 造成 1 点伤害积累的 Rage
  damage-taken-rage: 10         # 受到 1 点伤害积累的 Rage
  enrage-seconds: 15            # 满 Rage 后爆发持续秒数
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `ability.rage-max` | int | 100 | Rage 槽上限,达到后触发爆发 |
| `ability.damage-dealt-rage` | int | 5 | **每次**造成伤害(无论数值)积累的 Rage |
| `ability.damage-taken-rage` | int | 10 | **每次**受到伤害积累的 Rage |
| `ability.enrage-seconds` | int | 15 | 爆发(力量加成等)持续秒数 |

### ⛏️ 岩浆十字镐 `magma_pickaxe.yml`

```yaml
enabled: true
item:
  custom-model-data: 1001
  base-material: minecraft:iron_pickaxe
recipe:
  shape:
    - "OGO"
    - "GPG"
    - "OGO"
  ingredients:
    O: minecraft:obsidian
    G: minecraft:gunpowder
    P: minecraft:diamond_pickaxe
ability:
  radius: 1                     # 连带破坏半径
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `ability.radius` | int | 1 | 连带破坏的"半径"。`radius=1` → 中心 + 周围一圈 = **3×3×3** 共 27 块。`radius=2` → 5×5×5 = 125 块(谨慎调大,卡服) |

### 🌊 守卫者激光炮 `guardian_cannon.yml`

```yaml
enabled: true
item:
  custom-model-data: 1001
  base-material: minecraft:crossbow
recipe:
  shape:
    - "SSS"
    - "SCS"
    - "SHS"
  ingredients:
    S: minecraft:prismarine_shard
    C: minecraft:crossbow
    H: minecraft:heart_of_the_sea
ability:
  charge-ticks: 40              # 蓄力时长(ticks)
  beam-ticks: 100               # 激光持续(ticks)
  damage: 4.0                   # 每 tick 命中伤害
  cooldown-ms: 30000            # 整体冷却(毫秒)
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `ability.charge-ticks` | int | 40 | 右键蓄力时长(20 ticks = 1 秒,40 = 2 秒) |
| `ability.beam-ticks` | int | 100 | 激光发射持续(100 ticks = 5 秒) |
| `ability.damage` | double | 4.0 | 激光命中目标时**每个 tick** 的伤害 |
| `ability.cooldown-ms` | int | 30000 | 整体冷却(30 秒) |

### 🪃 回旋飞轮 `ricochet_chakrams.yml`

```yaml
enabled: true
item:
  custom-model-data: 1001
  base-material: minecraft:snowball
recipe:
  shape:
    - "SSS"
    - " B "
    - "SSS"
  ingredients:
    S: minecraft:stone
    B: minecraft:blaze_rod
ability:
  first-hit-damage: 6.0         # 初次命中伤害
  return-hit-damage: 4.0        # 反弹后命中伤害
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `ability.first-hit-damage` | double | 6.0 | 飞轮**第一次**命中目标的伤害 |
| `ability.return-hit-damage` | double | 4.0 | 反弹回程**再次**命中的伤害 |

---

## 管理命令

| 命令 | 用途 | 权限 |
| --- | --- | --- |
| `/legendary reload` | **热重载**配置和配方,不需要重启 | 服主 |
| `/legendary giveall <玩家>` | 一次性发全套传奇(测试) | 服主 |
| `/legendary perf` | 查看技能调度性能(平均耗时) | 服主 |
| `/legendary perf reset` | 重置性能计数 | 服主 |

## 修改后

```text
/legendary reload          # ✅ 改 yml 后用这条
```

**不需要重启服务器**——这是传奇配置相比 classes 的优势。

## 性能建议

传奇技能涉及粒子、命中检测、定时器,在 4–8 人小局没问题;30+ 人混战时可能有压力。

如果某把武器明显造成卡顿:

1. `/legendary perf` 看是哪一把耗时最长
2. 编辑对应 yml,`enabled: false`
3. `/legendary reload`
4. 反馈给开发者

## 平衡参考

- 一局比赛**期望玩家最多合出 1 把传奇**——配方资源应该够稀缺
- 不要让任何一把"无脑碾压"——每把都该有反制(冷却、距离、姿态)
- 赛季中段如果某把使用率超 40%,考虑微调数值

## 资源包(可选)

每把武器都有 `item.custom-model-data: 1001` 默认值。如果你不上自定义资源包,这个字段不影响功能——玩家会看到原版的剑/弩/雪球外观。

要做自定义资源包,把对应模型挂到 `base-material` + `custom-model-data` 组合即可。
