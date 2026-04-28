# 地图与赛场

每场 HopliteRoyale 比赛**独立一张实例世界**——基于 ASP 模板克隆出来,结束自动卸载。Arena 配置就是告诉插件:这张地图该怎么开局、边界多大、怎么缩圈。

## Arena 在哪

```
plugins/HopliteRoyale/arenas/
├── default.yml
└── 你可以加更多.yml
```

每个 yml 一张赛场配置,文件名随意,**以内部 `id` 字段为准**。

## 完整示例(默认配置)

```yaml
id: default
template-world: test_arena      # ⚠ 必须和 ASP 模板名一致

# 边界中心(也是缩圈中心)
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
  - { x: 12.0,  y: 80.0, z: 0.0,   yaw: 90.0,  pitch: 0.0 }
  - { x: -12.0, y: 80.0, z: 0.0,   yaw: -90.0, pitch: 0.0 }
  - { x: 0.0,   y: 80.0, z: 12.0,  yaw: 180.0, pitch: 0.0 }
  - { x: 0.0,   y: 80.0, z: -12.0, yaw: 0.0,   pitch: 0.0 }

# 中心物资箱(丰饶角阶段生成)
starting-chests:
  - location: { x: 0.0, y: 80.0, z: 0.0, yaw: 0.0, pitch: 0.0 }
    items:
      - { material: minecraft:stone_sword, amount: 1 }
      - { material: minecraft:bread,       amount: 8 }

# 缩圈计划(默认 4 段)
shrink-stages:
  - { phase: PVP,       target-size: 500.0, duration-sec: 300, delay-sec: 0  }
  - { phase: SHRINKING, target-size: 200.0, duration-sec: 240, delay-sec: 30 }
  - { phase: SHRINKING, target-size:  50.0, duration-sec: 180, delay-sec: 60 }
  - { phase: SHRINKING, target-size:  10.0, duration-sec: 120, delay-sec: 60 }
```

## 字段速查

### 顶层

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | ✅ | Arena ID,命令里用(如 `/br create default solo`) |
| `template-world` | string | ✅ | ASP 模板世界名,**必须和 ASP loader 里收录的名字一致** |
| `center.{x,y,z,yaw,pitch}` | double | ✅ | 边界中心 |
| `initial-border-size` | double | ✅ | 初始边界大小(方边长,默认 1000) |
| `spawn-points[]` | list | ✅ | 出生点列表 |
| `starting-chests[]` | list | ⚠ | 中心物资箱列表(可空,但建议至少 1 个) |
| `shrink-stages[]` | list | ✅ | 缩圈计划 |

### 坐标对象 `{x, y, z, yaw, pitch}`

出现在 `center`、`spawn-points[]`、`starting-chests[].location`。

| 字段 | 类型 | 单位 | 说明 |
| --- | --- | --- | --- |
| `x` | double | 方块 | X 坐标 |
| `y` | double | 方块 | Y 坐标(高度) |
| `z` | double | 方块 | Z 坐标 |
| `yaw` | float | 度 | 朝向(-180 ~ 180,0 = 南,90 = 西,-90 = 东,180/-180 = 北) |
| `pitch` | float | 度 | 俯仰角(-90 = 朝天,0 = 平视,90 = 朝地) |

::: tip 取坐标的快捷办法
游戏里站在你想要的位置,按 F3 看 XYZ 和 Facing。把 Facing 那行的 yaw/pitch 直接抄进去。
:::

### `starting-chests[]`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `location` | 坐标对象 | ✅ | 箱子坐标(yaw/pitch 一般可以填 0) |
| `items[]` | list | ✅ | 箱内物品 |
| `items[].material` | namespaced key | ✅ | 物品 ID,如 `minecraft:stone_sword` |
| `items[].amount` | int | ✅ | 数量(1-64,超出会被限制到堆叠上限) |

### `shrink-stages[]`

每一段告诉边界**什么时候、缩到多大、缩多久**:

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `phase` | enum | — | 触发阶段:`PVP` 或 `SHRINKING` |
| `target-size` | double | — | 目标边界大小 |
| `duration-sec` | int | — | WorldBorder 插值时长(秒)——边界从当前大小**线性缩小到**目标大小所用的时间 |
| `delay-sec` | int | — | 进入该阶段后**多少秒**触发这一段(可以为 0) |

::: warning `phase` 只能是 PVP 或 SHRINKING
其它阶段(`WAITING` / `STARTING` / `CORNUCOPIA` / `GRACE` / `ENDING`)写进去**不会触发缩圈**——前期阶段插件强制 PvP 关闭,缩圈逻辑只在战斗阶段和缩圈阶段跑。
:::

## 出生点策略

- **数量建议** ≥ 模式最大队伍数,避免大量复用
- 单排:每个玩家一个出生点
- 双排:每个**队伍**一个出生点,队员落在附近(自动小偏移)
- 四排:同上
- 出生点之间**间距 ≥ 8 格**,避免视野重叠
- Y 坐标必须在**实体物料表面之上**——地图克隆出来后不会重新生成方块

::: tip 没足够出生点会怎样?
系统会复用并做小范围随机偏移。少量复用没问题,大量复用会让玩家挤在一起开局。

具体规则:有 4 个出生点 + 8 个队伍时,每个出生点会被用 2 次,但相邻队伍会偏移 ±3 格防止叠在一起。
:::

## 中心物资箱

丰饶角阶段(开局 30 秒)生成的箱子。建议**多放,但不放太顶级**:

- 中心 1 个主箱 + 周围 4 个副箱是常见布局
- 主箱可以放石剑 / 弓 / 食物 / 少量铁
- 副箱放面包 / 木镐 / 木斧
- **不要**放钻石装备 / 已合成的传奇——破坏前期节奏

### 多个箱子示例

```yaml
starting-chests:
  # 中央主箱
  - location: { x: 0.0, y: 80.0, z: 0.0 }
    items:
      - { material: minecraft:iron_sword, amount: 1 }
      - { material: minecraft:bow,        amount: 1 }
      - { material: minecraft:arrow,      amount: 16 }
      - { material: minecraft:bread,      amount: 8 }
  # 北副箱
  - location: { x: 0.0, y: 80.0, z: -10.0 }
    items:
      - { material: minecraft:wooden_pickaxe, amount: 1 }
      - { material: minecraft:bread,          amount: 4 }
  # 南副箱
  - location: { x: 0.0, y: 80.0, z: 10.0 }
    items:
      - { material: minecraft:wooden_axe, amount: 1 }
      - { material: minecraft:cobblestone, amount: 32 }
```

## 缩圈节奏(参考方案)

下面是默认 4 段的体感:

| 段 | 触发 | 大小变化 | 时长 | 玩家体验 |
| --- | --- | --- | --- | --- |
| 1 | PvP 开始 +0s | 1000 → 500 | 5 分钟 | 玩家被推向中央 |
| 2 | 缩圈阶段 +30s | 500 → 200 | 4 分钟 | 战斗集中,激烈 |
| 3 | 缩圈阶段 +60s | 200 → 50 | 3 分钟 | 终局压缩 |
| 4 | 缩圈阶段 +60s | 50 → 10 | 2 分钟 | 决死之圈 |

总缩圈时长约 14 分钟。如果你想做"短局"版本,把每段 `duration-sec` 砍半即可。

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

## 多张地图

可以同时维护多张赛场,玩家可以指定:

```
arenas/
├── default.yml          (id: default)
├── desert_ruins.yml     (id: desert_ruins)
├── frozen_keep.yml      (id: frozen_keep)
└── volcanic_arena.yml   (id: volcanic_arena)
```

`/br create <id> <模式>` 即可指定。

## 调试建议

| 步骤 | 命令 |
| --- | --- |
| 1. 单独验证模板能加载 | `/testmap load test_arena` |
| 2. 走两步看地图对不对 | (在游戏里巡查) |
| 3. 卸载 | `/testmap unload <世界名>` |
| 4. 创建一局比赛 | `/br create default solo` |
| 5. 自己进场 | `/br join <id>` |
| 6. 跳阶段验证缩圈 | `/br forcephase <id> SHRINKING` |

## 修改后

::: warning Arena 改完要重启
`arenas/*.yml` 不支持热重载,目前必须**重启服务器**。
:::

## 常见错误

| 现象 | 原因 |
| --- | --- |
| 创建比赛报 `Template not found` | `template-world` 字段拼错或 ASP 没收录 |
| 玩家落到方块里 | 出生点 Y 坐标在地下 / 重叠在方块里 |
| 缩圈开始时玩家被秒杀 | `target-size` 太小 + 玩家在边缘 |
| 中心物资箱拿不到 | `starting-chests.location` 在墙里 |
| 边界尺寸异常 | `initial-border-size` 写成 int 而不是 double——保险点带 `.0` |
| 缩圈不触发 | `phase` 写错(只能 `PVP` 或 `SHRINKING`,大写) |
