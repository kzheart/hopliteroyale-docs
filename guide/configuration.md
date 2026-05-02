# 配置参考

本页是 HopliteRoyale 的**完整配置参考**——所有可配字段、类型、默认值、可选值、注意事项。看完这页你应该不需要靠猜来配任何东西。

## 文件结构

```
plugins/HopliteRoyale/
├── config.yml                 # 主配置（数据库 / ASP / 奖励钩子 / i18n）
├── healing.yml                # 治疗规则 + 玩家头颅 / 金头条目
├── arenas/
│   └── default.yml            # 一份赛场 = 一个 yml，可以加多个
├── classes/
│   ├── miner.yml
│   ├── archer.yml
│   ├── tank.yml
│   ├── ninja.yml
│   ├── alchemist.yml
│   ├── scout.yml
│   ├── lumberjack.yml
│   └── fisher.yml             # 共 8 个职业，每个 yml 文件名固定
├── legendaries/
│   ├── dragon_katana.yml
│   ├── magma_club.yml
│   ├── headhunter_chestplate.yml
│   ├── magma_pickaxe.yml
│   ├── guardian_cannon.yml
│   └── ricochet_chakrams.yml  # 共 6 把传奇，每个 yml 文件名固定
├── custom-crafts/
│   ├── golden_head.yml
│   ├── quick_anvil.yml
│   └── xp_bottle.yml          # 自定义合成配方，可继续添加
└── lang/
    ├── hopliteroyale.properties
    ├── hopliteroyale_en_US.properties
    └── hopliteroyale_zh_CN.properties
```

::: tip 加载规则
- 主配置只读 `config.yml` 一个文件
- `arenas/`、`classes/`、`legendaries/`、`custom-crafts/` 下的所有 yml 都会被读
- `lang/` 下的资源会在启动时释放，可被服主覆盖
- 旧版的 `kits/` 与 `battlepass/` 目录已经下线
:::

---

## 主配置 `config.yml`

完整字段：

```yaml
debug: false                  # 是否开启调试日志
database:
  type: mysql                 # 数据库类型：mysql / postgresql
  host: localhost
  port: 3306
  database: hopliteroyale
  username: root
  password: ""                # ⚠ 不要进 git
  pool-size: 10               # HikariCP 连接池大小
asp:
  datasource: mysql           # ASP loader 类型，跟 ASP 自己的配置走
rewards:
  enabled: false              # 总开关，开了才执行下面的命令模板
  commands:
    on_game_start: []         # 比赛开始时（每位参与玩家执行一次）
    on_game_end: []
    on_kill: []               # 击杀者
    on_first_blood: []        # 全场首杀
    on_eliminated: []         # 被永久淘汰的玩家
    on_win: []                # 胜利队成员
    on_top3: []               # Top3 队伍成员
i18n:
  default-locale: zh_CN       # 控制台 / 非玩家 Audience 语言
  fallback-locale: en_US      # default 语言无效时回退
  allow-player-override: true # 玩家是否按客户端 locale 渲染
```

字段详解：

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `debug` | bool | `false` | 调试日志开关 |
| `database.type` | string | `mysql` | `mysql` / `postgresql`（PG 仍在规划，生产推荐 mysql） |
| `database.host` | string | `localhost` | 数据库主机或 IP |
| `database.port` | int | `3306` | MySQL 一般 3306，PostgreSQL 一般 5432 |
| `database.database` | string | `hopliteroyale` | 必须**预先**在 DBMS 里创建好这个库 |
| `database.username` | string | `root` | 账号需要 CREATE/ALTER/SELECT/INSERT/UPDATE/DELETE 权限 |
| `database.password` | string | `""` | 真实密码 |
| `database.pool-size` | int | `10` | HikariCP 最大连接数 |
| `asp.datasource` | string | `mysql` | 跟 ASP 配置里的 loader 名一致 |
| `rewards.enabled` | bool | `false` | 总开关。`false` 时下方命令完全不执行 |
| `rewards.commands.*` | string[] | `[]` | 控制台命令模板。支持占位符 `{player}`、`{victim}`、`{game}` |
| `i18n.default-locale` | string | `zh_CN` | 控制台等不能识别 locale 的 Audience 用此语言 |
| `i18n.fallback-locale` | string | `en_US` | `default-locale` 找不到 key 时再回退 |
| `i18n.allow-player-override` | bool | `true` | 是否按玩家客户端 locale 渲染 |

::: tip rewards.commands 占位符
所有命令模板里支持的占位符：

| 占位符 | 说明 | 哪些钩子能用 |
| --- | --- | --- |
| `{player}` | 当前要派奖的玩家名 | 全部 |
| `{victim}` | 被击杀者 | `on_kill` / `on_first_blood` |
| `{game}` | 比赛 UUID | 全部 |
| `{arena}` | 比赛使用的 Arena ID | 全部 |
| `{mode}` | `solo` / `duo` / `squad` | 全部 |

例：`["points add {player} 10", "broadcast {player} 在 {arena} 拿下首杀"]`
:::

::: warning 修改主配置必须**重启**
`config.yml` 不支持热重载。改完必须重启服务器才生效。
:::

---

## 治疗规则 `healing.yml`

```yaml
natural-regeneration: disabled   # disabled / vanilla
items:
  player_head:
    material: minecraft:player_head
    instant-heal: 8.0
    cooldown-ms: 1000
    allowed-phases: [PVP, SHRINKING]
    disabled-when-knocked: true
    effects:
      - type: minecraft:regeneration
        duration-ticks: 100
        amplifier: 1
  golden_head:
    material: minecraft:player_head
    instant-heal: 8.0
    cooldown-ms: 1500
    allowed-phases: [PVP, SHRINKING]
    disabled-when-knocked: true
    effects:
      - type: minecraft:regeneration
        duration-ticks: 160
        amplifier: 1
      - type: minecraft:absorption
        duration-ticks: 1200
        amplifier: 0
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `natural-regeneration` | enum | `disabled` 关闭原版自然回血，`vanilla` 保留 |
| `items.<id>.material` | namespaced key | 触发条件的物品材质 |
| `items.<id>.instant-heal` | double | 立即治疗量（半颗心 = 1） |
| `items.<id>.cooldown-ms` | int | 单玩家冷却毫秒 |
| `items.<id>.allowed-phases` | enum[] | 仅这些阶段可用：`PVP` / `SHRINKING` 等 |
| `items.<id>.disabled-when-knocked` | bool | 倒地时是否禁止使用 |
| `items.<id>.effects[]` | list | 命中后追加的 PotionEffect |

::: tip 默认条目 ID
- `player_head` 普通玩家头颅（被淘汰时掉落）
- `golden_head` 金头（通过 `custom-crafts/golden_head.yml` 合成）

ID 用 PDC 持久化，**不依赖 displayName / lore**。
:::

---

## 自定义合成 `custom-crafts/*.yml`

```yaml
id: hopliteroyale:golden_head
enabled: true
shape:
  - "GGG"
  - "GHG"
  - "GGG"
ingredients:
  G: minecraft:gold_ingot
  H:
    material: minecraft:player_head
    custom-item-id: hopliteroyale:player_head    # 仅匹配带此 PDC 标记的物品
result:
  material: minecraft:player_head
  amount: 1
  custom-item-id: hopliteroyale:golden_head      # 产物自动写入 PDC
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | ✅ | 唯一 ID，建议使用命名空间形式 |
| `enabled` | bool | ❌（默认 `true`） | 关闭时不注册 |
| `shape` | string[3] | ✅ | 3 行字符串，每行 3 个字符 |
| `ingredients.<char>` | string \| object | ✅ | 短形式直接写 namespaced key；长形式可加 `custom-item-id` 限制 |
| `result.material` | namespaced key | ✅ | 产物材质 |
| `result.amount` | int | ❌（默认 1） | 产物数量 |
| `result.custom-item-id` | string | ❌ | 给产物打 PDC 标记，配合受保护物品系统 |

::: tip 默认提供的三份配方
- `golden_head.yml`：玩家头颅 + 金锭 → 金头
- `quick_anvil.yml`：铁锭速合成铁砧
- `xp_bottle.yml`：常用经验瓶配方
:::

---

## Arena 配置 `arenas/*.yml`

详见专页 → [地图与赛场](./arenas)。这里只放速查表：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | ✅ | Arena ID，命令里用 |
| `template-world` | string | ✅ | ASP 模板世界名 |
| `center.{x,y,z,yaw,pitch}` | double | ✅ | 边界中心 + 缩圈中心 |
| `initial-border-size` | double | ✅ | 初始边界大小 |
| `spawn-points[]` | list | ✅ | 出生点列表（`{x,y,z,yaw,pitch}`） |
| `starting-chests[]` | list | ⚠ | 中心物资箱列表 |
| `shrink-stages[]` | list | ✅ | 缩圈计划 |

`shrink-stages[]` 每一段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `phase` | enum | 触发阶段：`PVP` / `SHRINKING` |
| `target-size` | double | 目标边界大小 |
| `duration-sec` | int | WorldBorder 插值时长 |
| `delay-sec` | int | 进入该阶段后多少秒触发 |

::: warning Arena 改完要重启
`arenas/*.yml` 也不支持热重载，目前必须重启。
:::

---

## 职业配置 `classes/*.yml`

每个职业一个 yml，**文件名固定**（`miner.yml`/`archer.yml`/...）。完整字段表 → [职业系统 · 完整配置参考](./kits#完整配置参考)

简表：

```yaml
xp-required:
  level-2: 100
  level-3: 300
  level-4: 700
  level-5: 1500
items:        { ... }    # 起始/分级补给
passive:      { ... }    # 旧式被动数值
attributes:   { ... }    # 新式 Bukkit Attribute Modifier，按等级解锁
```

::: warning 职业改完要重启
`classes/*.yml` 不支持热重载。
:::

---

## 传奇武器配置 `legendaries/*.yml`

每把武器一个 yml，**文件名固定**。结构 = `enabled` + `item` + `recipe` + 武器自有 `ability`。

```yaml
enabled: true
item:
  custom-model-data: 1001
  base-material: minecraft:netherite_sword
recipe:
  ...
ability:
  ...
```

`recipe` 两种类型：铁砧（`type: anvil`）与工作台合成（默认）。完整字段见 → [传奇武器 · 完整配置参考](./legendaries#完整配置参考)

### 热重载

```text
/legendary reload
```

修改 `legendaries/*.yml` 后用这条命令热重载，**不需要重启服务器**。

---

## 文案 / i18n `lang/*.properties`

```text
plugins/HopliteRoyale/lang/
├── hopliteroyale.properties           # 共享 fallback
├── hopliteroyale_en_US.properties     # 英文
└── hopliteroyale_zh_CN.properties     # 简体中文
```

- 启动时插件释放默认文件，服主可直接覆盖修改
- key 命名规范由 `KeyValidator` 校验，不规范的会在启动日志中被警告
- 玩家可见文案统一走 `Messages.msg(...)` 与 Adventure translatable，**不允许**在代码里直接 `Component.text("中文")`
- 玩家语言 = 客户端 locale（前提 `i18n.allow-player-override: true`）；控制台等无 locale Audience = `default-locale`，再回退到 `fallback-locale`

::: tip 没实现玩家语言切换命令
项目目前**不实现**玩家语言持久化或 `/lang` 切换命令。需要切换的玩家请改自己客户端的语言。
:::

---

## 重启 vs 热重载 矩阵

| 改动 | 是否需要重启 | 用什么命令 |
| --- | --- | --- |
| `config.yml`（数据库 / ASP / rewards / i18n） | ✅ 重启 | — |
| `healing.yml` | ✅ 重启 | — |
| `arenas/*.yml` | ✅ 重启 | — |
| `classes/*.yml` | ✅ 重启 | — |
| `custom-crafts/*.yml` | ✅ 重启 | — |
| `legendaries/*.yml` | ❌ 热重载 | `/legendary reload` |
| `lang/*.properties` | ✅ 重启 | — |
| 资源包（custom-model-data） | ❌ 客户端刷新 | 玩家重连即可 |

---

## 配置文件命名约定

| 类别 | 命名规则 |
| --- | --- |
| `classes/<id>.yml` | 文件名 = PlayerClass ID，固定 8 个，**别改名** |
| `legendaries/<id>.yml` | 文件名 = 武器 ID，固定 6 个，**别改名** |
| `arenas/<id>.yml` | 文件名随意，以内部 `id` 字段为准 |
| `custom-crafts/<任意>.yml` | 文件名随意，以内部 `id` 字段为唯一键 |

---

## 全部配置中使用 namespaced key 的位置

| 出现位置 | 示例 |
| --- | --- |
| `arenas/*.yml` 里 `starting-chests[].items[].material` | `minecraft:stone_sword` |
| `legendaries/*.yml` 里 `item.base-material` | `minecraft:netherite_sword` |
| `legendaries/*.yml` 里 `recipe.left` / `recipe.right` | `minecraft:diamond_sword` |
| `legendaries/*.yml` 里 `recipe.ingredients` 的值 | `minecraft:diamond` |
| `classes/*.yml` 里 `attributes.<key>.attribute` | `minecraft:max_health` |
| `healing.yml` 里 `items.<id>.material` 与 `effects[].type` | `minecraft:player_head` / `minecraft:regeneration` |
| `custom-crafts/*.yml` 里 `ingredients` 与 `result.material` | `minecraft:gold_ingot` |

::: tip 都用小写 + 命名空间
原版材料是 `minecraft:` 前缀。模组 / 资源包加的物品用各自命名空间。**永远不要漏掉前缀**。
:::

---

## 安全建议

::: danger 永远不要把这些进 git
- `database.password` 真实密码
- ASP 数据库连接密码
- 任何 token / API key

公开仓库提交前用 `git diff` 自检，或加 `.gitignore`：

```text
plugins/HopliteRoyale/config.yml
```
:::

## 配置改动前的备份

```bash
tar czf hr-config-$(date +%F-%H%M).tgz plugins/HopliteRoyale/
```

数据库备份请参考 → [日常运维 · 备份建议](./operations#备份建议)。
