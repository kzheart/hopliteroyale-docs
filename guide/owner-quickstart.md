# 服主 · 5 分钟开服

> 这是最小可跑流程,跟着做就能把 HopliteRoyale 跑起来。详细配置在后面章节。

## 你需要准备

| 组件 | 版本 / 说明 |
| --- | --- |
| Java | **21** |
| 服务端 | **AdvancedSlimePaper 4.x**(基于 Paper 1.21.11) |
| 数据库 | **MySQL 8.x**,准备好库名和账号密码 |
| 地图模板 | 至少 1 张已导入 ASP MySQL loader 的 SlimeWorld |
| 插件 jar | `HopliteRoyale-0.1.0.jar` |

::: tip 没 ASP 也想试一下?
非地图功能可以在普通 Paper 1.21.11 跑通。**但创建比赛会失败**,因为地图加载依赖 ASP API。建议直接上 ASP。
:::

## 第 1 步:扔 jar、第一次启动

```bash
# 把 jar 放进 plugins/
cp HopliteRoyale-0.1.0.jar /server/plugins/

# 启动一次让它生成默认配置(然后停服)
./start.sh
# 看到 [HopliteRoyale] Generated default config 就可以 Ctrl+C
```

启动后会出现:

```
plugins/HopliteRoyale/
├── config.yml              # 主配置
├── arenas/                 # 地图配置
├── kits/                   # 8 个职业配置
├── legendaries/            # 6 把传奇配置
└── battlepass/             # 赛季配置
```

## 第 2 步:配数据库

编辑 `plugins/HopliteRoyale/config.yml`:

```yaml
database:
  type: mysql
  host: 127.0.0.1
  port: 3306
  database: hopliteroyale     # 提前在 MySQL 里 CREATE DATABASE
  username: hr_user
  password: "你的密码"
  pool-size: 10

asp:
  datasource: mysql           # 让插件用 ASP 的 MySQL loader 读地图
```

::: warning 别提交真实密码
公开仓库 / Discord / 截图都不要贴真实密码。改完确认 `config.yml` 不在你的 git 仓库追踪范围。
:::

## 第 3 步:准备一张地图

最快方式是让 ASP 接管一张现成地图:

1. 用 ASP 工具把现有世界**转换并保存**为 SlimeWorld 模板,起名比如 `test_arena`
2. 确认 ASP 把它存到了 MySQL loader

然后编辑 `plugins/HopliteRoyale/arenas/default.yml`,把模板名对上:

```yaml
id: default
template-world: test_arena    # ⚠ 必须和 ASP 里的模板名一致
center: { x: 0.0, y: 80.0, z: 0.0, yaw: 0.0, pitch: 0.0 }
initial-border-size: 1000.0
spawn-points:
  - { x: 12.0, y: 80.0, z: 0.0, yaw: 90.0, pitch: 0.0 }
  - { x: -12.0, y: 80.0, z: 0.0, yaw: 270.0, pitch: 0.0 }
starting-chests:
  - location: { x: 0.0, y: 80.0, z: 0.0 }
    items:
      - { material: minecraft:stone_sword, amount: 1 }
      - { material: minecraft:bread, amount: 8 }
```

详细字段见[地图与赛场](./arenas)。

## 第 4 步:启动 + 自检

再次启动服务器,关注这几行:

```
[HopliteRoyale] Connected to MySQL
[HopliteRoyale] Flyway migrations applied: V1, V2, V3, V4
[HopliteRoyale] Loaded 8 kits, 6 legendaries
[HopliteRoyale] Loaded 1 arena: default
```

进游戏跑这几条命令验收:

```text
/version HopliteRoyale          # 看版本
/testmap load test_arena        # 测试地图能不能加载
/testmap unload <世界名>        # 测试能不能卸载
/br create default solo         # 创建一局单排比赛
/br list                        # 看到刚才创建的实例
/br join <id>                   # 自己进去
```

任何一条失败,直接跳[运维诊断](./operations)。

## 第 5 步:开一局给玩家试

最少 2 名玩家(单排开局门槛)进场后,系统会自动:

```
等待中 → 准备开始(30s) → 丰饶角(30s) → 发育期(12min) → PvP(5min) → 缩圈 → 结算(15s)
```

跑完一局后:

- 数据库里应该有玩家记录、比赛记录
- 玩家 `/kit info <id>` 能看到经验
- 玩家 `/bp progress` 能看到战令经验

## 常见首次开服坑

| 现象 | 多半原因 |
| --- | --- |
| 启动报"Failed to connect to MySQL" | host/port/账号密码有错,或者数据库不存在 |
| 启动报"ASP 4.x API not found" | 不是 ASP 4.x,要么版本不对,要么用了普通 Paper |
| `/br create` 报"Arena not found" | `arenas/default.yml` 没加载,看启动日志 |
| `/br create` 报"Template not found" | `template-world` 字段和 ASP 里的模板名对不上 |
| 玩家进场卡在大厅 | 出生点不够 / spawn-points 数量小于队伍数 |

更全的排查清单 → [运维诊断](./operations)

## 接下来

- 想细调地图边界、缩圈节奏 → [地图与赛场](./arenas)
- 想知道每个配置字段的意思 → [配置参考](./configuration)
- 想准备下个赛季 → [赛季切换](./season)
- 出问题查不到原因 → [常见问题](./faq)
