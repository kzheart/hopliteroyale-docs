# 地图与比赛

## Arena 配置

Arena 配置位于 `plugins/HopliteRoyale/arenas/`。

基础结构：

```yaml
id: default
template-world: test_arena
center:
  x: 0.0
  y: 80.0
  z: 0.0
  yaw: 0.0
  pitch: 0.0
initial-border-size: 1000.0
spawn-points:
  - x: 12.0
    y: 80.0
    z: 0.0
    yaw: 90.0
    pitch: 0.0
starting-chests:
  - location:
      x: 0.0
      y: 80.0
      z: 0.0
      yaw: 0.0
      pitch: 0.0
    items:
      - material: minecraft:stone_sword
        amount: 1
      - material: minecraft:bread
        amount: 8
```

## 字段说明

| 字段 | 说明 |
| --- | --- |
| `id` | Arena ID，命令中使用 |
| `template-world` | ASP 模板世界名 |
| `center` | 世界边界中心 |
| `initial-border-size` | 初始边界大小 |
| `spawn-points` | 玩家或队伍出生点 |
| `starting-chests` | Cornucopia 中心物资箱 |

## 缩圈计划

```yaml
shrink-stages:
  - phase: PVP
    target-size: 500.0
    duration-sec: 300
    delay-sec: 0
  - phase: SHRINKING
    target-size: 200.0
    duration-sec: 240
    delay-sec: 30
```

`phase` 决定在哪个阶段触发，`target-size` 是目标边界大小，`duration-sec` 是原版 WorldBorder 插值时间，`delay-sec` 是进入该阶段后的延迟。

## 地图生命周期

1. 创建比赛时读取 Arena 配置。
2. 从 ASP 模板克隆实例世界。
3. 玩家进入比赛实例。
4. Ending 阶段结束后销毁比赛。
5. 卸载实例世界并清理实例数据。

## 调试建议

- 先用 `/testmap load <template>` 单独验证地图模板。
- 地图模板名必须和 `template-world` 一致。
- 出生点不足时，队伍会复用出生点并做小范围偏移。
- 中心物资箱建议放在边界中心附近，避免玩家开局找不到。
