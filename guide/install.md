# 安装部署

> 想要"5 分钟开服"的极简版?直接看 [服主 · 5 分钟开服](./owner-quickstart)。本页是详细版。

## 准备清单

| 组件 | 要求 / 来源 |
| --- | --- |
| Java | **JDK 21** |
| 服务端 | **AdvancedSlimePaper 4.x**(以下简称 ASP) |
| 数据库 | **MySQL 8.x**(主推) |
| 地图后端 | ASP 自带的 MySQL loader |
| 地图模板 | 至少 1 张已转换为 SlimeWorld 的地图 |
| 插件 jar | `HopliteRoyale-0.1.0.jar` |

::: tip 普通 Paper 行不行?
非地图功能可以,但 `/br create` 一定会失败(地图加载依赖 ASP API)。**生产环境强烈建议直接 ASP**。
:::

## 部署 7 步

```text
1. 把 jar 放到 plugins/
2. 确认服务端在 Java 21 上跑
3. 准备好 MySQL 数据库 + 账号
4. 启动一次,让插件生成默认配置
5. 停服,编辑 config.yml(数据库)
6. 准备 ASP 地图模板,改 arenas/default.yml
7. 再次启动,跑 /br create 自检
```

## 数据库配置

`plugins/HopliteRoyale/config.yml`:

```yaml
debug: false                # 是否打开调试日志
database:
  type: mysql
  host: 127.0.0.1
  port: 3306
  database: hopliteroyale
  username: hr_user
  password: ""              # ⚠ 真实密码不要进 git
  pool-size: 10
asp:
  datasource: mysql         # ASP loader 类型
rewards:
  enabled: false            # 奖励钩子总开关，详见《奖励钩子与外部接入》
i18n:
  default-locale: zh_CN
  fallback-locale: en_US
  allow-player-override: true
```

首次启动时，Flyway 会执行迁移：

```
V1__init.sql                          # 玩家、比赛、队伍、职业进度表
V3__legendary_obtained_season.sql     # 传奇首获记录（带 season 列）
V4__rename_kit_to_player_class.sql    # 表 / 列重命名：kit → player_class
```

::: tip 旧赛季 / 战令 / 钱包表在哪里？
原本的 `V2__battlepass_cosmetics.sql` / `V4__player_wallets.sql` 追加的表已随战令 / 外观系统一起下线。升级老库时 Flyway 会跳过该版本号，留在库里的老表不影响启动。要彻底清理请手动 `DROP TABLE`。
:::

## 地图模板准备

最小可用流程:

1. 准备一张可作为大逃杀场地的世界(中心可以放物资箱、有足够战斗空间)
2. 用 ASP 工具转换并保存为 SlimeWorld 模板,假设起名 `test_arena`
3. 确认 ASP 把模板存进了 MySQL loader
4. 在 `arenas/default.yml` 里把 `template-world: test_arena` 对上
5. 用 `/testmap load test_arena` 验证可加载
6. 用 `/testmap unload <实例世界名>` 验证可卸载

详见[地图与赛场](./arenas)。

## 启动后自检

| 命令 | 应有的现象 |
| --- | --- |
| `/version HopliteRoyale` | 显示版本 0.1.0(或当前版本) |
| `/br list` | 空列表(还没创建比赛) |
| `/br create default solo` | 返回新比赛 ID |
| `/testmap load test_arena` | 加载成功并传送 |
| 数据库里 `flyway_schema_history` 表 | 至少有 V1 / V3 / V4 记录 |

任意一条失败 → [运维诊断](./operations)。

## 升级流程

```text
1. 测试服跑一遍新版本完整一局
2. 备份生产 MySQL
3. 备份 plugins/HopliteRoyale/ 配置
4. 停服
5. 替换 jar
6. 启动观察 Flyway 迁移日志
7. 跑一局小规模验证
```

::: warning 不要在玩家比赛中升级
先 `/br list` 确认没有进行中的比赛,公告 5 分钟,再停服。
:::

## 常见首次部署坑

| 现象 | 多半原因 |
| --- | --- |
| 启动报 `Failed to connect to MySQL` | 账号密码 / host / port / 数据库名错 |
| 启动报 `ASP 4.x API not found` | 不是 ASP 4.x |
| 启动报 `Flyway migration failed` | 旧表 schema 冲突 |
| `/br create` 报 `Arena not found` | `arenas/*.yml` 没加载,看启动日志 |
| `/br create` 报 `Template not found` | `template-world` 字段对不上 ASP 模板名 |

更全的排查 → [运维诊断 · 故障排查](./operations#故障排查-启动阶段)
