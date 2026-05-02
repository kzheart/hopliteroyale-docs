# 职业系统

::: tip 想看每个职业的详细介绍？
本页是配置 / 数值参考。每个职业的角色定位、各等级解锁内容、玩法建议、传奇配合见 → [职业图鉴](./class-list)。
:::

职业（PlayerClass）决定你**这一局的开局装备**和部分**被动 / 属性加成**。8 个基础职业，每个都能从 Lv1 升到 Lv5——打得越多，越强。

## 8 个职业一览

| 职业 ID | 中文 | 定位 | 关键内容 |
| --- | --- | --- | --- |
| `miner` | ⛏️ 矿工 | 挖矿发育 | 镐 + 面包，挖矿额外掉落 + Lv4 起挖矿速度属性加成 |
| `archer` | 🏹 弓手 | 远程输出 | 弓和箭、备用近战、远程伤害加成 |
| `tank` | 🛡️ 坦克 | 生存前排 | 皮甲 + 木剑，Lv5 时 `max_health` 属性 +4.0 |
| `ninja` | 🥷 忍者 | 机动近战 | 木/石剑、蜘蛛眼、潜行速度加成 |
| `alchemist` | 🧪 炼金 | 药水流派 | 玻璃瓶、酿造台、烈焰棒，自饮药水持续时间加成 |
| `scout` | 🧭 侦察 | 信息位 | 指南针、木剑，附近敌人粒子标记 |
| `lumberjack` | 🪵 樵夫 | 木材发育 | 斧头、连锁砍树、额外掉落 |
| `fisher` | 🎣 渔夫 | 钓鱼出货 | 钓竿、水桶，钓鱼稀有掉落 + Luck 效果 |

## 职业等级

每个职业独立计算等级。打谁是哪个职业，经验就给谁：

| 等级 | 大致变化 |
| --- | --- |
| Lv1 | 基础装备 |
| Lv2 | 小幅补给提升 |
| Lv3 | 主装备升级 |
| Lv4 | 开始解锁关键被动 / 属性 |
| Lv5 | 满级能力 |

默认升级所需经验（**累计**）：

| 升到 | 所需经验 |
| --- | --- |
| Lv2 | 100 |
| Lv3 | 300 |
| Lv4 | 700 |
| Lv5 | 1500 |

## 经验来源

| 来源 | 给多少 |
| --- | --- |
| 参与一局 | +20 |
| 击杀一人 | +10 |
| 获胜 | +100 |

经验落库，**下一局自动应用**当前等级。所有经验只在真实战斗结算时落库（保护期不会自动塞熟练度）。

## 玩家命令

```text
/class                       # 打开 GUI 选职业
/class list                  # 查看全部职业
/class select archer         # 直接选弓手
/class info archer         # 查看自己弓手等级 / 经验
```

::: warning 发育期之后职业锁定
进入发育期后，本局**禁止换职业**。下一局开始前可以随便换。
:::

---

## 完整配置参考

每个职业一份 yml，文件名固定为 `<职业 ID>.yml`，放在 `plugins/HopliteRoyale/classes/` 下。

### 通用字段（8 个职业都有）

```yaml
xp-required:
  level-2: 100      # 升到 2 级需要的累计经验
  level-3: 300
  level-4: 700
  level-5: 1500
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `xp-required.level-2` ~ `level-5` | int | 100 / 300 / 700 / 1500 | **累计**经验，不是增量 |

::: tip 累计 vs 增量
配置里写的是"打到这一级时累计需要多少经验"。所以默认升到 Lv5 总共需要 1500 点。
:::

### 通用 `attributes:` 字段（任意职业都可加）

`attributes:` 节点用来在玩家达到指定等级后挂 Bukkit Attribute Modifier，纯数值加成，不依赖被动逻辑。

```yaml
attributes:
  mining_speed:                          # 任意短名（YAML key）
    min-level: 4                         # 该等级起生效
    attribute: minecraft:block_break_speed
    amount: 0.20
    operation: add_scalar                # add_number / add_scalar / multiply_scalar_1
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `min-level` | int | ✅ | 达到该等级才挂载 |
| `attribute` | namespaced key | ✅ | Bukkit Attribute key，如 `minecraft:max_health`、`minecraft:movement_speed`、`minecraft:block_break_speed` |
| `amount` | double | ✅ | 数值。配合 `operation` 解释含义 |
| `operation` | enum | ✅ | `add_number`（基础值加） / `add_scalar`（按基础值百分比加） / `multiply_scalar_1`（按总值百分比乘） |

### ⛏️ 矿工 `miner.yml`

```yaml
xp-required: { level-2: 100, level-3: 300, level-4: 700, level-5: 1500 }
items:
  bread-lv1: 1            # Lv1 给 1 个面包
  bread-lv2: 1            # Lv2 再多给 1 个（累加）
  bread-lv5: 2            # Lv5 再多给 2 个
passive:
  bonus-drop-chance: 0.20 # 挖矿时 20% 概率额外掉落
attributes:
  mining_speed:
    min-level: 4
    attribute: minecraft:block_break_speed
    amount: 0.20
    operation: add_scalar
```

### 🏹 弓手 `archer.yml`

```yaml
xp-required: { level-2: 100, level-3: 300, level-4: 700, level-5: 1500 }
items:
  arrows-lv1: 8           # Lv1 给 8 支箭
  arrows-lv3: 16          # Lv3 再多给 16 支
  arrows-lv5: 32          # Lv5 再多给 32 支
passive:
  ranged-damage-multiplier: 1.10  # 远程伤害 × 1.10
```

### 🛡️ 坦克 `tank.yml`

```yaml
xp-required: { level-2: 100, level-3: 300, level-4: 700, level-5: 1500 }
passive:
  max-health: 24.0        # 旧版被动字段（兼容保留）
attributes:
  max_health:
    min-level: 5
    attribute: minecraft:max_health
    amount: 4.0
    operation: add_number
```

::: tip 坦克数值改哪个？
新版优先用 `attributes.max_health`，原 `passive.max-health` 仍兼容。两者并存时以 `attributes` 为准。
:::

### 🥷 忍者 `ninja.yml`

```yaml
xp-required: { level-2: 100, level-3: 300, level-4: 700, level-5: 1500 }
items:
  spider-eyes-lv5: 4
passive:
  speed-amplifier: 0      # 潜行时速度等级：0 = Speed I, 1 = Speed II
```

### 🧪 炼金 `alchemist.yml`

```yaml
xp-required: { level-2: 100, level-3: 300, level-4: 700, level-5: 1500 }
items:
  redstone-lv5: 4
passive:
  self-potion-duration-multiplier: 1.30  # 自饮药水持续 × 1.30
```

### 🧭 侦察 `scout.yml`

```yaml
xp-required: { level-2: 100, level-3: 300, level-4: 700, level-5: 1500 }
items:
  bread-lv3: 1
passive:
  marker-range: 50        # 标记附近多少格内的敌人
```

### 🪵 樵夫 `lumberjack.yml`

```yaml
xp-required: { level-2: 100, level-3: 300, level-4: 700, level-5: 1500 }
passive:
  bonus-drop-chance: 0.50
  chain-limit: 64
```

### 🎣 渔夫 `fisher.yml`

```yaml
xp-required: { level-2: 100, level-3: 300, level-4: 700, level-5: 1500 }
passive:
  rare-drop-chance: 0.10
  luck-duration-ticks: 1200
```

---

## 改完之后

```text
# 改完任意 classes/*.yml，必须重启服务器
# (目前没有 /class reload 命令)
```

## 平衡建议

第一次开服建议保留默认数值，跑几个赛季后根据玩家反馈再调：

- 击杀强势 → 上调对应职业升级所需经验
- 玩家集中选某个职业 → 适度削弱其满级被动 / 属性数值
- 想用属性系统强化坦克 → 直接调 `attributes.max_health.amount`

## 调试

```text
/class list                # 看插件确实加载了几个职业
/class info <id>           # 看自己当前等级和经验数
/legendary giveall <玩家>  # 测试时给玩家发全套传奇，不用打到中后期
```
