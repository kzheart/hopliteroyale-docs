# 配置参考

本页是 HopliteRoyale 的**完整配置参考**——所有可配字段、类型、默认值、可选值、注意事项。看完这页你应该不需要靠猜来配任何东西。

## 文件结构

```
plugins/HopliteRoyale/
├── config.yml                 # 主配置(数据库 / ASP / 赛季)
├── arenas/
│   └── default.yml            # 一份赛场 = 一个 yml,可以加多个
├── kits/
│   ├── miner.yml
│   ├── archer.yml
│   ├── tank.yml
│   ├── ninja.yml
│   ├── alchemist.yml
│   ├── scout.yml
│   ├── lumberjack.yml
│   └── fisher.yml             # 共 8 个职业,每个 yml 文件名固定
├── legendaries/
│   ├── dragon_katana.yml
│   ├── magma_club.yml
│   ├── headhunter_chestplate.yml
│   ├── magma_pickaxe.yml
│   ├── guardian_cannon.yml
│   └── ricochet_chakrams.yml  # 共 6 把传奇,每个 yml 文件名固定
└── battlepass/
    ├── season-1.yml
    └── season-2.yml           # 一个赛季一份,可继续加 season-N.yml
```

::: tip 加载规则
- 主配置只读 `config.yml` 一个文件
- `arenas/`、`kits/`、`legendaries/` 下的所有 yml 都会被读
- `battlepass/` 下按赛季时间窗口选择当前生效的那一份
:::

---

## 主配置 `config.yml`

完整字段:

```yaml
debug: false                  # 是否开启调试日志
database:
  type: mysql                 # 数据库类型:mysql / postgresql
  host: localhost             # 数据库主机
  port: 3306                  # 端口(MySQL 默认 3306,PG 默认 5432)
  database: hopliteroyale     # 库名(必须先 CREATE DATABASE)
  username: root              # 账号
  password: ""                # 密码(⚠ 不要进 git)
  pool-size: 10               # HikariCP 连接池大小
asp:
  datasource: mysql           # ASP loader 类型(跟 ASP 自己的配置走)
season:
  auto-switch: true           # 是否按日期自动切换赛季
```

字段详解:

| 字段 | 类型 | 默认 | 可选值 / 说明 |
| --- | --- | --- | --- |
| `debug` | bool | `false` | `true` 时打印额外调试日志 |
| `database.type` | string | `mysql` | `mysql` / `postgresql`(PG 仍在规划中,生产推荐 mysql) |
| `database.host` | string | `localhost` | 数据库主机或 IP |
| `database.port` | int | `3306` | MySQL 一般 3306,PostgreSQL 一般 5432 |
| `database.database` | string | `hopliteroyale` | 必须**预先**在 DBMS 里创建好这个库 |
| `database.username` | string | `root` | 账号需要 CREATE/ALTER/SELECT/INSERT/UPDATE/DELETE 权限 |
| `database.password` | string | `""` | 真实密码 |
| `database.pool-size` | int | `10` | HikariCP 最大连接数,默认够用,小服 5 也行 |
| `asp.datasource` | string | `mysql` | 跟 ASP 配置里的 loader 名一致 |
| `season.auto-switch` | bool | `true` | `true` 时插件按 `start`/`end` 日期自动切换赛季 |

::: warning 修改主配置必须**重启**
`config.yml` 不支持热重载。改完必须重启服务器才生效。
:::

---

## Arena 配置 `arenas/*.yml`

详见专页 → [地图与赛场](./arenas)。这里只放速查表:

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | ✅ | Arena ID,命令里用 |
| `template-world` | string | ✅ | ASP 模板世界名 |
| `center.{x,y,z,yaw,pitch}` | double | ✅ | 边界中心 + 缩圈中心 |
| `initial-border-size` | double | ✅ | 初始边界大小 |
| `spawn-points[]` | list | ✅ | 出生点列表(`{x,y,z,yaw,pitch}`) |
| `starting-chests[]` | list | ⚠ | 中心物资箱列表 |
| `shrink-stages[]` | list | ✅ | 缩圈计划(下面详) |

`shrink-stages[]` 每一段:

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `phase` | enum | 触发阶段:`PVP` / `SHRINKING`(其它阶段不会触发缩圈) |
| `target-size` | double | 目标边界大小 |
| `duration-sec` | int | WorldBorder 插值时长(秒) |
| `delay-sec` | int | 进入该阶段后多少秒触发 |

`starting-chests[]` 每一项:

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `location.{x,y,z,yaw,pitch}` | double | 箱子坐标 |
| `items[]` | list | 箱内物品 |
| `items[].material` | string | namespaced key,如 `minecraft:stone_sword` |
| `items[].amount` | int | 数量(1-64) |

::: warning Arena 改完要重启
`arenas/*.yml` 也不支持热重载,目前必须重启。
:::

---

## 职业配置 `kits/*.yml`

每个职业一个 yml,**文件名固定**(`miner.yml`/`archer.yml`/...)。通用字段 + 职业自有字段。

### 通用字段(8 个职业都有)

```yaml
xp-required:
  level-2: 100      # 升到 2 级需要的经验
  level-3: 200
  level-4: 300
  level-5: 400
```

### 各职业专属字段

完整每个职业的 `items` / `passive` 字段表见 → [职业系统 · 完整配置参考](./kits#完整配置参考)

::: warning 职业改完要重启
`kits/*.yml` 不支持热重载。
:::

---

## 传奇武器配置 `legendaries/*.yml`

每把武器一个 yml,**文件名固定**。结构 = 通用 `enabled` + `item` + `recipe` + 武器自有 `ability`。

### 通用字段(6 把武器都有)

```yaml
enabled: true                          # 是否启用,false = 不发放、不能合成
item:
  custom-model-data: 1001              # 资源包模型 ID,无资源包写啥都行
  base-material: minecraft:netherite_sword   # 物品基底,namespaced key
recipe:
  ...                                  # 看下面两种类型
ability:
  ...                                  # 每把武器各自的字段
```

### `recipe` 有两种类型

#### Type A:铁砧合成(`type: anvil`)

```yaml
recipe:
  type: anvil
  left: minecraft:diamond_sword        # 左槽物品
  right: minecraft:dragon_head         # 右槽物品
  level-cost: 8                        # 消耗经验等级
  required-rename: ""                  # (可选)需要的命名,空 = 不要求命名
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `type` | string | ✅ | 必须为 `anvil` |
| `left` | namespaced key | ✅ | 左槽放的物品 |
| `right` | namespaced key | ✅ | 右槽放的物品 |
| `level-cost` | int | ✅ | 合成消耗的经验等级 |
| `required-rename` | string | ❌ | 留空表示不要求改名 |

#### Type B:工作台合成(默认,无需 `type` 字段)

```yaml
recipe:
  shape:
    - "DGD"                            # 3 行,每行 3 个字符
    - "DSD"
    - " S "                            # 空格 = 该格不需要物品
  ingredients:
    D: minecraft:diamond               # 字符 → 材料
    G: minecraft:gold_block
    S: minecraft:blaze_rod
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `shape` | string[3] | 3 行字符串,每行 3 个字符 |
| `ingredients` | map | 单字符 → namespaced key |

::: tip 字符可以自定义
`ingredients` 里的字符随便挑,大小写敏感。空格永远代表"无物品"。
:::

### 各传奇武器的 `ability` 字段

完整每把武器的字段表(伤害、冷却、半径)见 → [传奇武器 · 完整配置参考](./legendaries#完整配置参考)

### 热重载

```text
/legendary reload
```

修改 `legendaries/*.yml` 后用这条命令热重载,**不需要重启服务器**。

---

## 战令配置 `battlepass/season-N.yml`

每个赛季一份 yml。文件名 `season-1.yml` / `season-2.yml` / ...,数字与 `id` 字段对应。

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

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | int | 赛季编号(1, 2, 3...) |
| `name` | string | 显示名,GUI 里看到的 |
| `start` | string | 开始日期,**ISO 格式 `YYYY-MM-DD`** |
| `end` | string | 结束日期,**ISO 格式 `YYYY-MM-DD`** |
| `xp-per-tier` | int | 升一阶所需战令经验 |
| `tiers[]` | list | 每阶配置(下面) |

### `tiers[]` 每一项

```yaml
- tier: 1
  free-reward:    { type: COINS, amount: 100 }
  premium-reward: { type: COSMETIC, id: kill_effect_fire }
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tier` | int | 阶位编号(从 1 开始,连续) |
| `free-reward` | reward 对象 | 免费轨奖励(下面三种之一) |
| `premium-reward` | reward 对象 | 进阶轨奖励(下面三种之一) |

### 奖励对象(3 种类型)

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
| `id` | ✅ | 外观 ID,见下方[全部 9 个内置外观](#内置外观-id) |

#### `XP_BOOST` —— 经验加成

```yaml
{ type: XP_BOOST, multiplier: 1.5, duration_min: 30 }
```

| 字段 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- |
| `type` | ✅ | — | 必须为 `XP_BOOST` |
| `multiplier` | ❌ | `1.0` | 战令经验倍率,常用 1.5 / 2.0 |
| `duration_min` | ❌ | `30` | 持续时长(分钟) |

::: danger ⚠️ 注意 `duration_min` 是下划线!
战令奖励里的 `duration_min` 用**下划线**,不是 `duration-min`。这是和其他配置的连字符风格不一致的特例,**写错会被忽略并使用默认 30 分钟**。
:::

### 内置外观 ID

赛季奖励里 `id` 字段可用的外观:

| 类型 | ID | 显示名 |
| --- | --- | --- |
| 击杀特效 | `kill_effect_fire` | 火焰终结 |
| 击杀特效 | `kill_effect_lightning` | 雷霆终结 |
| 击杀特效 | `kill_effect_confetti` | 彩纸终结 |
| 胜利舞蹈 | `victory_dance_robot` | 机器人舞 |
| 胜利舞蹈 | `victory_dance_moonwalk` | 月步庆祝 |
| 胜利舞蹈 | `victory_dance_firework` | 烟花谢幕 |
| 武器尾迹 | `weapon_trail_fire` | 火焰尾迹 |
| 武器尾迹 | `weapon_trail_enchant` | 附魔尾迹 |
| 武器尾迹 | `weapon_trail_soul` | 灵魂尾迹 |

### 任务系统

每日 / 每周任务**目前由代码生成**(基于 `QuestType.KILLS` / `WINS` / `LEGENDARY_USED`),不通过 yml 配置。

各类任务的目标值与奖励经验在源码 `DailyQuestService` / `WeeklyQuestService` / `SeasonQuestService` 中定义。后续版本计划开放为 yml。

---

## 重启 vs 热重载 矩阵

| 改动 | 是否需要重启 | 用什么命令 |
| --- | --- | --- |
| `config.yml`(数据库 / ASP / 赛季) | ✅ 重启 | — |
| `arenas/*.yml` | ✅ 重启 | — |
| `kits/*.yml` | ✅ 重启 | — |
| `legendaries/*.yml` | ❌ 热重载 | `/legendary reload` |
| `battlepass/season-N.yml` | ✅ 重启 | (赛季逻辑涉及表迁移) |
| 资源包(custom-model-data) | ❌ 客户端刷新 | 玩家重连即可 |

---

## 配置文件命名约定

| 类别 | 命名规则 |
| --- | --- |
| `kits/<id>.yml` | 文件名 = Kit ID,固定 8 个,**别改名** |
| `legendaries/<id>.yml` | 文件名 = 武器 ID,固定 6 个,**别改名** |
| `arenas/<id>.yml` | 文件名随意,以内部 `id` 字段为准 |
| `battlepass/season-N.yml` | `N` 与内部 `id` 字段对应 |

---

## 全部配置字段使用 namespaced key 的位置

| 出现位置 | 示例 |
| --- | --- |
| `arenas/*.yml` 里 `starting-chests[].items[].material` | `minecraft:stone_sword` |
| `legendaries/*.yml` 里 `item.base-material` | `minecraft:netherite_sword` |
| `legendaries/*.yml` 里 `recipe.left` / `recipe.right` | `minecraft:diamond_sword` |
| `legendaries/*.yml` 里 `recipe.ingredients` 的值 | `minecraft:diamond` |

::: tip 都用小写 + 命名空间
原版材料是 `minecraft:` 前缀。模组 / 资源包加的物品用各自命名空间。**永远不要漏掉前缀**——会被解析为 `minecraft:xxx` 但有些场景会失败。
:::

---

## 安全建议

::: danger 永远不要把这些进 git
- `database.password` 真实密码
- ASP 数据库连接密码
- 任何 token / API key

公开仓库提交前用 `git diff` 自检,或加 `.gitignore`:

```text
plugins/HopliteRoyale/config.yml
```
:::

## 配置改动前的备份

```bash
tar czf hr-config-$(date +%F-%H%M).tgz plugins/HopliteRoyale/
```

数据库备份请参考 → [日常运维 · 备份建议](./operations#备份建议)。
