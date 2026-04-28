# 战令与外观

战令(Battle Pass)是 HopliteRoyale 的**长期目标**——每个赛季给玩家一条 100 阶左右的成长曲线,免费 + 进阶双轨,配合每日/每周任务,让玩家有理由每天上来打几局。

## 战令是什么

```
赛季内打比赛 → 拿击杀 / 助攻 / 胜利 / 任务 → 获得战令经验
                                                    ↓
                                             升级到下一阶
                                                    ↓
                                          领取该阶免费/进阶奖励
```

## 玩家命令

```text
/bp                   # 打开战令 GUI
/bp gui               # 同上
/bp progress          # 查当前等级 / 经验 / 下一阶距离
/bp season            # 查当前赛季信息
/bp quests            # 看每日 + 每周任务
/bp claim all         # 一键领取所有可领取奖励
/bp purchase          # 开通进阶轨道(占位实现)
```

## 经验来源

| 行为 | 战令经验 |
| --- | --- |
| 击杀一人 | +50 |
| 助攻一人 | +20 |
| 获胜 | +200 |
| 参与一局 | +50 |
| 第一次合出某把传奇 | +100 |
| 每日 / 每周任务 | 视任务配置 |

::: tip 经验加成
战令奖励里包含 `XP_BOOST`(经验倍率加成)。装备后,**新获得的战令经验全部按倍率算**。
:::

## 当前赛季计划

| 赛季 | 时间 |
| --- | --- |
| 第一赛季:荣耀初现 | 2026-05-01 ~ 2026-07-31 |
| 第二赛季:边境回响 | 2026-08-01 ~ 2026-10-31 |

赛季更替的策略和注意事项见[赛季切换](./season)。

---

## 外观系统

外观**纯视觉**,不影响战斗数值。三大类,共 9 个内置外观:

### ✨ 击杀特效(Kill Effect)

击杀对方时在他身上爆发的视觉:

| ID | 中文 | 效果 |
| --- | --- | --- |
| `kill_effect_fire` | 🔥 火焰终结 | 燃烧粒子 + 火焰圈 |
| `kill_effect_lightning` | ⚡ 雷霆终结 | 雷击下劈 |
| `kill_effect_confetti` | 🎉 彩纸终结 | 彩色纸屑 + 烟花声 |

### 💃 胜利舞蹈(Victory Dance)

吃鸡那一刻自动播放的庆祝动作:

| ID | 中文 | 效果 |
| --- | --- | --- |
| `victory_dance_robot` | 🤖 机器人舞 | 机械姿态 + 电子音 |
| `victory_dance_moonwalk` | 🌙 月步庆祝 | 月球漫步 + 滑行粒子 |
| `victory_dance_firework` | 🎆 烟花谢幕 | 多色烟花连续绽放 |

### 🌈 武器尾迹(Weapon Trail)

挥舞武器时跟随的粒子尾迹:

| ID | 中文 | 效果 |
| --- | --- | --- |
| `weapon_trail_fire` | 🔥 火焰尾迹 | 武器划过留火焰 |
| `weapon_trail_enchant` | ✨ 附魔尾迹 | 紫色附魔光 |
| `weapon_trail_soul` | 👻 灵魂尾迹 | 蓝色灵魂火 |

## 外观命令

```text
/cosmetic       # 打开外观装备 GUI(三类切换)
/cosmetics      # 同上
```

GUI 里:

- 已拥有的会高亮
- 未拥有的会显示"通过战令第 X 阶解锁"
- 每类同时只能装备 1 件

::: tip 外观跨赛季保留
赛季结束后,**战令进度归档重置**,但你已经获得的外观**永久保留**。
:::

---

## 完整配置参考

每个赛季一份 yml,在 `plugins/HopliteRoyale/battlepass/` 下,文件名 `season-<id>.yml`。

### 顶层字段

```yaml
id: 1
name: "第一赛季:荣耀初现"
start: "2026-05-01"
end: "2026-07-31"
xp-per-tier: 1000
tiers:
  - tier: 1
    free-reward: { type: COINS, amount: 100 }
    premium-reward: { type: COSMETIC, id: kill_effect_fire }
  # ... 更多阶位
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | int | ✅ | 赛季编号(1, 2, 3...) |
| `name` | string | ✅ | 显示名,GUI 里看到的 |
| `start` | string | ✅ | 开始日期,**ISO 格式 `YYYY-MM-DD`** |
| `end` | string | ✅ | 结束日期,**ISO 格式 `YYYY-MM-DD`** |
| `xp-per-tier` | int | ✅ | 升一阶所需战令经验 |
| `tiers[]` | list | ✅ | 每阶配置 |

### 每一阶 `tiers[]`

```yaml
- tier: 1
  free-reward:    { type: COINS, amount: 100 }
  premium-reward: { type: COSMETIC, id: kill_effect_fire }
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `tier` | int | ✅ | 阶位编号(从 1 开始,**连续递增**,不要跳号) |
| `free-reward` | reward | ✅ | 免费轨奖励(下面三种之一) |
| `premium-reward` | reward | ✅ | 进阶轨奖励(下面三种之一) |

### 奖励对象(三种类型)

#### `COINS` —— 货币

```yaml
{ type: COINS, amount: 500 }
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `type` | ✅ | 必须为 `COINS` |
| `amount` | ✅ | 货币数量(整数) |

#### `COSMETIC` —— 外观

```yaml
{ type: COSMETIC, id: kill_effect_fire }
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `type` | ✅ | 必须为 `COSMETIC` |
| `id` | ✅ | 外观 ID,见上面[全部 9 个内置外观](#外观系统) |

#### `XP_BOOST` —— 经验加成

```yaml
{ type: XP_BOOST, multiplier: 1.5, duration_min: 30 }
```

| 字段 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- |
| `type` | ✅ | — | 必须为 `XP_BOOST` |
| `multiplier` | ❌ | `1.0` | 战令经验倍率,常用 1.5 / 2.0 |
| `duration_min` | ❌ | `30` | 持续时长(分钟) |

::: danger ⚠️ 注意 `duration_min` 是下划线
战令奖励里的 `duration_min` 用**下划线**,不是 `duration-min`。这是和其他配置的连字符风格不一致的特例。

写成 `duration-min` 的话**会被忽略并使用默认 30 分钟**,但插件不会报错——是个静默坑,务必小心。
:::

### 完整阶位示例(摘自默认 season-1.yml)

```yaml
id: 1
name: "第一赛季:荣耀初现"
start: "2026-05-01"
end: "2026-07-31"
xp-per-tier: 1000
tiers:
  - tier: 1
    free-reward:    { type: COINS, amount: 100 }
    premium-reward: { type: COSMETIC, id: kill_effect_fire }
  - tier: 2
    free-reward:    { type: XP_BOOST, multiplier: 1.5, duration_min: 30 }
    premium-reward: { type: COSMETIC, id: victory_dance_robot }
  - tier: 3
    free-reward:    { type: COINS, amount: 150 }
    premium-reward: { type: COSMETIC, id: weapon_trail_enchant }
  # ... 总共 50 阶,详见 plugins/HopliteRoyale/battlepass/season-1.yml
  - tier: 50
    free-reward:    { type: COINS, amount: 2500 }
    premium-reward: { type: COINS, amount: 5000 }
```

### 紧凑式写法

如果阶位很多,可以用 yaml 行内对象写法压缩:

```yaml
tiers:
  - { tier: 1, free-reward: { type: COINS, amount: 100 }, premium-reward: { type: COSMETIC, id: kill_effect_fire } }
  - { tier: 2, free-reward: { type: COINS, amount: 120 }, premium-reward: { type: COSMETIC, id: victory_dance_robot } }
```

`season-2.yml` 用的就是这种压缩式。

---

## 任务系统(每日 / 每周)

每日 / 每周任务**目前由代码生成**,不通过 yml 配置。

任务类型(枚举):

| 类型 | 说明 |
| --- | --- |
| `KILLS` | 击杀玩家 N 个 |
| `WINS` | 赢得 N 局 |
| `LEGENDARY_USED` | 获得/使用传奇武器 N 次 |

任务对象 (Quest) 字段(参考):

| 字段 | 说明 |
| --- | --- |
| `id` | 任务 ID |
| `type` | 任务类型(上表) |
| `target` | 目标值(必须 ≥1) |
| `progress` | 当前进度 |
| `rewardXp` | 完成奖励战令经验 |
| `completed` | 是否已完成 |
| `periodStart` / `periodEnd` | 任务有效期 |

::: tip 后续版本会开放
计划在后续版本把每日/每周任务模板放进 `battlepass/quests.yml`,届时本页会同步更新。
:::

---

## 赛季切换

详见 → [赛季切换](./season)。

简言之:

```yaml
# config.yml
season:
  auto-switch: true
```

开启后插件按 `start` / `end` 自动切换赛季,旧赛季进度归档,**外观永久保留**。

---

## 修改后

::: warning 战令配置改完要重启
`battlepass/season-N.yml` **不支持热重载**——赛季逻辑涉及数据库迁移,改完必须重启服务器。
:::

## 平衡参考

- `xp-per-tier` 默认 1000,大约让活跃玩家**每 1–2 局升 1 阶**
- 50 阶赛季约需 50,000 战令经验,正常 3 个月可以肝完
- 想加快节奏,把 `xp-per-tier` 调到 800
- 想拉长肝度,加阶位数量(到 100 阶),`xp-per-tier` 保持 1000
- 进阶轨在 1–10 阶给外观,11–50 阶给 COINS 是经典节奏
