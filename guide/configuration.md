# 配置参考

所有配置文件都在 `plugins/HopliteRoyale/` 下。本页只列字段、示例和注意事项,**不深入实现细节**。

## 文件结构

```
plugins/HopliteRoyale/
├── config.yml                 # 主配置(数据库 / ASP / 赛季)
├── arenas/
│   └── default.yml            # 赛场:出生点 / 边界 / 缩圈
├── kits/
│   ├── miner.yml ... 共 8 个职业
├── legendaries/
│   ├── dragon_katana.yml ... 共 6 把传奇
└── battlepass/
    ├── season-1.yml
    └── season-2.yml
```

## 主配置 `config.yml`

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
| `debug` | 调试日志开关 |
| `database.type` | 数据库类型(目前 `mysql`) |
| `database.host` / `port` / `database` | 数据库连接信息 |
| `database.username` / `password` | 账号 |
| `database.pool-size` | HikariCP 连接池大小,默认 10 |
| `asp.datasource` | ASP loader 类型,跟着 ASP 配置走 |
| `season.auto-switch` | 是否按日期自动切赛季 |

## Arena 配置

详见[地图与赛场](./arenas)。

## 职业(Kits)

每个职业一份 yml,**字段不同**(每个职业有自己的特色字段)。通用字段:

```yaml
xp-required:
  level-2: 100
  level-3: 200
  level-4: 300
  level-5: 400
```

特色字段示例(矿工):

```yaml
items:
  bread-lv1: 1
  bread-lv2: 1
  bread-lv5: 2
passive:
  bonus-drop-chance: 0.20
```

更多 → [职业系统](./kits)

## 传奇武器

每把武器一份 yml。通用字段:

```yaml
enabled: true
item:
  custom-model-data: 1001
  base-material: minecraft:netherite_sword
recipe:
  type: anvil               # anvil / shaped(工作台)
  ... 配方相关字段
ability:
  ... 技能数值
```

详细 → [传奇武器](./legendaries)

修改后用 `/legendary reload` 热更新。

## 战令(Battle Pass)

每个赛季一份 yml,例如 `season-1.yml`:

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
  - tier: 2
    free-reward: { type: XP_BOOST, multiplier: 1.1, duration-min: 30 }
    premium-reward: { type: COSMETIC, id: victory_dance_robot }
```

| 字段 | 说明 |
| --- | --- |
| `id` | 赛季编号 |
| `name` | 赛季名(GUI 显示) |
| `start` / `end` | 起止日期(YYYY-MM-DD) |
| `xp-per-tier` | 升一阶所需经验 |
| `tiers[].tier` | 阶位编号 |
| `tiers[].free-reward` | 免费轨奖励 |
| `tiers[].premium-reward` | 进阶轨奖励 |

奖励类型:

| 类型 | 必填字段 |
| --- | --- |
| `COINS` | `amount` |
| `COSMETIC` | `id`(对应外观 ID) |
| `XP_BOOST` | `multiplier`, `duration-min` |

## 配置改动建议

| 修改 | 是否需要重启 |
| --- | --- |
| `config.yml` 数据库 / ASP | ✅ 必须重启 |
| `arenas/*.yml` | ✅ 重启(目前没有 reload) |
| `kits/*.yml` | ✅ 重启 |
| `legendaries/*.yml` | ❌ `/legendary reload` 即可 |
| `battlepass/season-N.yml` | ✅ 重启(赛季切换涉及数据库迁移) |

## 安全注意

::: danger 永远不要把真实密码进公开仓库
- `config.yml` 里的数据库密码
- ASP 数据库连接信息
- 任何 token / API key

公开仓库提交前用 `git diff` 自检,或加 `.gitignore`:

```gitignore
plugins/HopliteRoyale/config.yml
```
:::

## 备份建议

每次改配置前:

```bash
tar czf hr-config-$(date +%F-%H%M).tgz plugins/HopliteRoyale/
```

数据库备份请参考[运维 · 备份建议](./operations#备份建议)。
