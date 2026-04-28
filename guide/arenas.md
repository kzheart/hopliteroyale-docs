# 地图与赛场

每场 HopliteRoyale 比赛**独立一张实例世界**——基于 ASP 模板克隆出来,结束自动卸载。Arena 配置就是告诉插件:这张地图该怎么开局、边界多大、怎么缩圈。

## Arena 在哪

```
plugins/HopliteRoyale/arenas/
├── default.yml
└── 你可以加更多.yml
```

每个 yml 一张赛场配置,文件名随意,以内部 `id` 字段为准。

## 一份完整示例

```yaml
id: default
template-world: test_arena      # ⚠ 必须和 ASP 模板名一致

# 边界中心
center:
  x: 0.0
  y: 80.0
  z: 0.0
  yaw: 0.0
  pitch: 0.0

# 初始边界大小(直径,方形边界的边长)
initial-border-size: 1000.0

# 出生点(玩家 / 队伍开局位置)
spawn-points:
  - { x: 12.0,  y: 80.0, z: 0.0, yaw: 90.0,  pitch: 0.0 }
  - { x: -12.0, y: 80.0, z: 0.0, yaw: 270.0, pitch: 0.0 }
  - { x: 0.0,   y: 80.0, z: 12.0, yaw: 180.0, pitch: 0.0 }
  - { x: 0.0,   y: 80.0, z: -12.0, yaw: 0.0,  pitch: 0.0 }

# 中心物资箱(丰饶角阶段生成)
starting-chests:
  - location: { x: 0.0, y: 80.0, z: 0.0 }
    items:
      - { material: minecraft:stone_sword, amount: 1 }
      - { material: minecraft:bread, amount: 8 }

# 缩圈计划
shrink-stages:
  - phase: PVP
    target-size: 500.0
    duration-sec: 300
    delay-sec: 0
  - phase: SHRINKING
    target-size: 200.0
    duration-sec: 240
    delay-sec: 30
  - phase: SHRINKING
    target-size: 50.0
    duration-sec: 180
    delay-sec: 30
```

## 字段速查

| 字段 | 说明 |
| --- | --- |
| `id` | Arena ID,命令里用(如 `/br create default solo`) |
| `template-world` | ASP 模板世界名 |
| `center` | 边界中心(也是缩圈中心) |
| `initial-border-size` | 初始边界大小 |
| `spawn-points` | 玩家/队伍开局点列表 |
| `starting-chests` | 中心物资箱(丰饶角阶段生成) |
| `shrink-stages` | 缩圈计划(下面详说) |

## 出生点策略

- **数量建议** ≥ 模式最大队伍数,避免大量复用
- 单排:每个玩家一个出生点
- 双排:每个**队伍**一个出生点,队员落在附近(自动小偏移)
- 四排:同上
- 出生点之间**间距 ≥ 8 格**,避免视野重叠

::: tip 没足够出生点会怎样?
系统会复用并做小范围偏移。少量复用没问题,大量复用会让玩家挤在一起开局。
:::

## 中心物资箱

丰饶角阶段(开局 30 秒)生成的箱子。建议**多放,但不放太顶级**:

- 中心 1 个主箱 + 周围 4 个副箱是常见布局
- 主箱可以放石剑 / 弓 / 食物 / 少量铁
- 副箱放面包 / 木镐 / 木斧
- 不要放钻石装备 / 已合成的传奇——破坏前期节奏

## 缩圈计划

`shrink-stages` 是一个数组,每一项告诉边界**什么时候、缩到多大、缩多久**:

```yaml
- phase: PVP            # 在哪个阶段触发
  target-size: 500.0    # 目标边界大小
  duration-sec: 300     # WorldBorder 插值时长(秒)
  delay-sec: 0          # 进入该阶段后多少秒触发
```

| 字段 | 说明 |
| --- | --- |
| `phase` | 触发阶段:`PVP` / `SHRINKING` |
| `target-size` | 收缩到的目标大小 |
| `duration-sec` | 收缩持续时长(原版 WorldBorder 插值) |
| `delay-sec` | 进入该阶段多少秒后开始 |

### 经典缩圈节奏(参考)

| 阶段 | 触发时机 | 目标大小 | 时长 | 体验 |
| --- | --- | --- | --- | --- |
| PvP 第一缩 | PvP 开始 +0s | 1000 → 500 | 300s | 玩家被推向中央 |
| 缩圈第一段 | 缩圈阶段 +30s | 500 → 200 | 240s | 战斗集中,激烈 |
| 缩圈第二段 | 缩圈阶段 +30s | 200 → 50 | 180s | 终局压缩,3 分钟内必定决出 |

## 地图生命周期

```
[创建比赛] → 读 Arena 配置
       ↓
[加载实例] → 从 ASP 模板克隆出独立世界
       ↓
[玩家进场] → 传送到出生点
       ↓
[阶段推进] → ... → 结算
       ↓
[销毁比赛] → 卸载实例世界,清理实例数据
```

整个生命周期里**不影响主世界**——这就是用 ASP 模板的意义。

## 调试建议

| 步骤 | 命令 |
| --- | --- |
| 1. 单独验证模板能加载 | `/testmap load test_arena` |
| 2. 走两步看地图对不对 | (在游戏里巡查) |
| 3. 卸载 | `/testmap unload <世界名>` |
| 4. 创建一局比赛 | `/br create default solo` |
| 5. 自己进场 | `/br join <id>` |
| 6. 跳阶段验证缩圈 | `/br forcephase <id> SHRINKING` |

## 进阶:多张地图

可以同时维护多张赛场,玩家投票或随机选:

```
arenas/
├── default.yml          (id: default)
├── desert_ruins.yml     (id: desert_ruins)
├── frozen_keep.yml      (id: frozen_keep)
└── volcanic_arena.yml   (id: volcanic_arena)
```

`/br create <id> <mode>` 即可指定。

## 常见错误

| 现象 | 原因 |
| --- | --- |
| 创建比赛报 `Template not found` | `template-world` 字段拼错或 ASP 没收录 |
| 玩家落到方块里 | 出生点 Y 坐标在地下 / 重叠在方块里 |
| 缩圈开始时玩家被秒杀 | `target-size` 太小 + 玩家在边缘 |
| 中心物资箱拿不到 | `starting-chests.location` 在墙里 |
