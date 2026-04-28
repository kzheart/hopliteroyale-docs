# 配置参考

## 主配置

主配置位于 `plugins/HopliteRoyale/config.yml`。

```yaml
debug: false
database:
  type: mysql
  host: localhost
  port: 3306
  database: hopliteroyale
  username: root
  password: ""
  pool-size: 10
asp:
  datasource: mysql
season:
  auto-switch: true
```

| 字段 | 说明 |
| --- | --- |
| `debug` | 是否启用调试输出 |
| `database.type` | 数据库类型，当前优先使用 `mysql` |
| `database.host` | 数据库地址 |
| `database.port` | 数据库端口 |
| `database.database` | 数据库名 |
| `database.username` | 数据库账号 |
| `database.password` | 数据库密码 |
| `database.pool-size` | 连接池大小 |
| `asp.datasource` | ASP loader 类型 |
| `season.auto-switch` | 是否自动处理赛季切换 |

## Kit 配置

Kit 配置位于 `plugins/HopliteRoyale/kits/`。

每个 Kit 都有等级经验配置：

```yaml
xp-required:
  level-2: 100
  level-3: 200
  level-4: 300
  level-5: 400
```

不同 Kit 还会有自己的物品或被动参数，例如 Miner：

```yaml
items:
  bread-lv1: 1
  bread-lv2: 1
  bread-lv5: 2
passive:
  bonus-drop-chance: 0.20
```

## 传奇武器配置

传奇武器配置位于 `plugins/HopliteRoyale/legendaries/`。

每把武器都支持：

| 字段 | 说明 |
| --- | --- |
| `enabled` | 是否启用 |
| `item.base-material` | 物品基础材质，使用 namespaced key |
| `item.custom-model-data` | 资源包模型 ID |
| `recipe` | 合成配方 |
| `ability` | 技能数值 |

示例：

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
  speed-amplifier: 1
  blink-range: 8
  blink-cooldown-ms: 5000
```

修改传奇武器配置后，可以使用 `/legendary reload` 重载。

## Battle Pass 配置

赛季配置位于 `plugins/HopliteRoyale/battlepass/`。

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
```

奖励类型包括：

| 类型 | 说明 |
| --- | --- |
| `COINS` | 货币奖励 |
| `COSMETIC` | 外观奖励 |
| `XP_BOOST` | 经验倍率加成 |

## 配置修改建议

- 生产服修改配置前先备份。
- 涉及地图、赛季、奖励和传奇武器的修改，先在测试服跑一局。
- 不要把真实数据库密码提交到公开仓库。
