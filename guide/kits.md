# 职业系统

职业(Kit)决定你**这一局的开局装备**和部分**被动能力**。8 个基础职业,每个都能从 Lv1 升到 Lv5——打得越多,越强。

## 8 个职业一览

| 职业 ID | 中文 | 定位 | 关键内容 |
| --- | --- | --- | --- |
| `miner` | ⛏️ 矿工 | 挖矿发育 | 镐 + 面包,挖矿急迫 + 额外掉落 |
| `archer` | 🏹 弓手 | 远程输出 | 弓和箭、备用近战、远程伤害加成 |
| `tank` | 🛡️ 坦克 | 生存前排 | 皮甲 + 木剑,满级生命值大幅提升 |
| `ninja` | 🥷 忍者 | 机动近战 | 木/石剑、蜘蛛眼、潜行速度加成 |
| `alchemist` | 🧪 炼金 | 药水流派 | 玻璃瓶、酿造台、烈焰棒,药水持续时间提升 |
| `scout` | 🧭 侦察 | 信息位 | 指南针、木剑,附近敌人粒子标记 |
| `lumberjack` | 🪵 樵夫 | 木材发育 | 斧头、额外木材,连锁砍树 |
| `fisher` | 🎣 渔夫 | 钓鱼出货 | 钓竿、水桶,钓鱼效率与稀有收益提升 |

## 职业等级

每个职业独立计算等级。打谁是哪个职业,经验就给谁:

| 等级 | 大致变化 |
| --- | --- |
| Lv1 | 基础装备 |
| Lv2 | 小幅补给提升 |
| Lv3 | 主装备升级 |
| Lv4 | 开始解锁关键被动 |
| Lv5 | 满级能力 |

默认升级所需经验:

| 升到 | 所需经验 |
| --- | --- |
| Lv2 | 100 |
| Lv3 | 200 |
| Lv4 | 300 |
| Lv5 | 400 |

## 经验来源

| 来源 | 给多少 |
| --- | --- |
| 参与一局 | +20 |
| 击杀一人 | +10 |
| 获胜 | +100 |

经验落库,**下一局自动应用**当前等级。

## 玩家命令

```text
/kit                       # 打开 GUI 选职业
/kit list                  # 查看全部职业
/kit select archer         # 直接选弓手
/kit info archer           # 查看自己弓手等级 / 经验
```

::: warning 发育期之后职业锁定
进入发育期后,本局**禁止换职业**。下一局开始前可以随便换。
:::

---

## 完整配置参考

每个职业一份 yml,文件名固定为 `<职业 ID>.yml`,放在 `plugins/HopliteRoyale/kits/` 下。

### 通用字段(8 个职业都有)

```yaml
xp-required:
  level-2: 100      # 升到 2 级需要的累计经验
  level-3: 200
  level-4: 300
  level-5: 400
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `xp-required.level-2` ~ `level-5` | int | 100 / 200 / 300 / 400 | **累计**经验,不是增量 |

::: tip 累计 vs 增量
配置里写的是"打到这一级时累计需要多少经验"。所以默认升到 Lv5 总共需要 400 点。
:::

### ⛏️ 矿工 `miner.yml`

```yaml
xp-required:
  level-2: 100
  level-3: 200
  level-4: 300
  level-5: 400
items:
  bread-lv1: 1            # Lv1 给 1 个面包
  bread-lv2: 1            # Lv2 再多给 1 个(累加)
  bread-lv5: 2            # Lv5 再多给 2 个
passive:
  bonus-drop-chance: 0.20 # 挖矿时 20% 概率额外掉落
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `items.bread-lv1` | int | 1 | Lv1 起始面包数 |
| `items.bread-lv2` | int | 1 | Lv2 **额外**多给的面包数 |
| `items.bread-lv5` | int | 2 | Lv5 **额外**多给的面包数 |
| `passive.bonus-drop-chance` | double | 0.20 | 挖矿(石头/矿石)时额外掉落概率(0.0–1.0) |

### 🏹 弓手 `archer.yml`

```yaml
xp-required:
  level-2: 100
  level-3: 200
  level-4: 300
  level-5: 400
items:
  arrows-lv1: 8           # Lv1 给 8 支箭
  arrows-lv3: 16          # Lv3 再多给 16 支
  arrows-lv5: 32          # Lv5 再多给 32 支
passive:
  ranged-damage-multiplier: 1.10  # 远程伤害 × 1.10
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `items.arrows-lv1` | int | 8 | Lv1 起始箭数 |
| `items.arrows-lv3` | int | 16 | Lv3 额外箭数 |
| `items.arrows-lv5` | int | 32 | Lv5 额外箭数 |
| `passive.ranged-damage-multiplier` | double | 1.10 | 远程伤害倍率(1.0 = 原伤害) |

### 🛡️ 坦克 `tank.yml`

```yaml
xp-required:
  level-2: 100
  level-3: 200
  level-4: 300
  level-5: 400
passive:
  max-health: 24.0        # Lv5 最大生命值(原版 20 = 10 颗心)
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `passive.max-health` | double | 24.0 | Lv5 时的最大生命值上限,半颗心 = 1 |

::: tip 坦克没有自定义 items
坦克的起始装备是固定的(皮甲 + 木剑),不开放配置。

如果想给坦克更多血,只调 `max-health`。
:::

### 🥷 忍者 `ninja.yml`

```yaml
xp-required:
  level-2: 100
  level-3: 200
  level-4: 300
  level-5: 400
items:
  spider-eyes-lv5: 4      # Lv5 给 4 个蜘蛛眼
passive:
  speed-amplifier: 0      # 潜行时速度等级:0 = Speed I, 1 = Speed II
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `items.spider-eyes-lv5` | int | 4 | Lv5 时给的蜘蛛眼数量 |
| `passive.speed-amplifier` | int | 0 | 潜行时获得的速度药水**放大器值**(原版语义:0 = I 级,1 = II 级,以此类推) |

### 🧪 炼金 `alchemist.yml`

```yaml
xp-required:
  level-2: 100
  level-3: 200
  level-4: 300
  level-5: 400
items:
  redstone-lv5: 4                     # Lv5 给 4 个红石(用来延长药水)
passive:
  self-potion-duration-multiplier: 1.30  # 自己喝的药水持续 × 1.30
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `items.redstone-lv5` | int | 4 | Lv5 时的红石数量 |
| `passive.self-potion-duration-multiplier` | double | 1.30 | 自己喝下的药水持续时间倍率,**只对自己**生效 |

### 🧭 侦察 `scout.yml`

```yaml
xp-required:
  level-2: 100
  level-3: 200
  level-4: 300
  level-5: 400
items:
  bread-lv3: 1            # Lv3 给 1 个面包
passive:
  marker-range: 50        # 标记附近多少格内的敌人
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `items.bread-lv3` | int | 1 | Lv3 时的额外面包数 |
| `passive.marker-range` | int | 50 | 敌人粒子标记的探测半径(方块) |

### 🪵 樵夫 `lumberjack.yml`

```yaml
xp-required:
  level-2: 100
  level-3: 200
  level-4: 300
  level-5: 400
passive:
  bonus-drop-chance: 0.50   # 砍树额外掉落概率
  chain-limit: 64           # 一次连锁砍树上限(块数)
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `passive.bonus-drop-chance` | double | 0.50 | 砍树时额外掉落概率(0.0–1.0) |
| `passive.chain-limit` | int | 64 | 单次连锁砍树最多砍多少块,防卡服 |

### 🎣 渔夫 `fisher.yml`

```yaml
xp-required:
  level-2: 100
  level-3: 200
  level-4: 300
  level-5: 400
passive:
  rare-drop-chance: 0.10        # 钓出稀有物的额外概率
  luck-duration-ticks: 1200     # 持续多少 ticks 的 Luck 效果(20 = 1 秒)
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `passive.rare-drop-chance` | double | 0.10 | 钓鱼额外稀有掉落概率 |
| `passive.luck-duration-ticks` | int | 1200 | 钓鱼后获得 Luck 效果的持续 ticks(20 ticks = 1 秒,1200 = 1 分钟) |

---

## 改完之后

```text
# 改完任意 kits/*.yml,必须重启服务器
# (目前没有 /kit reload 命令)
```

## 平衡建议

第一次开服建议保留默认数值,跑几个赛季后根据玩家反馈再调:

- 击杀强势 → 上调对应职业升级所需经验
- 玩家集中选某个职业 → 适度削弱其满级被动数值
- 新人撑不到中后期 → 上调坦克 Lv1 的初始装备数量(不过 tank 没开 items 字段,需要源码加)
- 数值改大点小点都不会让插件崩——放心试

## 调试

```text
/kit list                # 看插件确实加载了几个职业
/kit info <id>           # 看自己当前等级和经验数
/legendary giveall <玩家># 测试时给玩家发全套传奇,不用打到中后期
```
