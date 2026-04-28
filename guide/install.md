# 安装部署

## 前置要求

部署前需要准备：

| 组件 | 要求 |
| --- | --- |
| Java | JDK 21 |
| 服务端 | AdvancedSlimePaper 4.x，或兼容 Paper 1.21.11 的测试环境 |
| 数据库 | MySQL 8.x |
| 地图模板 | 已导入 ASP MySQL loader 的 SlimeWorld 模板 |
| 插件文件 | `HopliteRoyale-0.1.0.jar` |

普通 Paper 可以用于部分非地图功能测试，但正式地图加载依赖 AdvancedSlimePaper 4.x API。

## 部署步骤

1. 将插件 jar 放入服务端 `plugins/` 目录。
2. 确认服务端运行在 Java 21。
3. 准备 MySQL 数据库和账号。
4. 启动一次服务器，让插件生成默认配置。
5. 停服后编辑 `plugins/HopliteRoyale/config.yml`。
6. 确认 ASP 4.x 已能读取地图模板。
7. 再次启动服务器，检查控制台是否出现 HopliteRoyale 启动成功日志。

## 数据库配置

默认配置结构如下：

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

首次启动会执行数据库迁移，创建玩家、比赛、Kit、Battle Pass、外观和传奇武器相关表。

## 地图准备

地图模板需要提前存入 AdvancedSlimePaper 的 MySQL loader。Arena 配置中的 `template-world` 必须和模板名一致。

最小可用流程：

1. 准备一张可用于 Battle Royale 的地图。
2. 使用 ASP 工具把地图转换并保存为 SlimeWorld 模板。
3. 在 Arena 配置中填写模板名。
4. 用 `/testmap load <template>` 验证地图能加载并传送。
5. 用 `/testmap unload <world>` 验证地图能卸载。

## 启动检查

启动后建议检查：

- `/version HopliteRoyale` 显示插件版本。
- `/br create default solo` 可以创建比赛实例。
- `/br list` 能看到实例。
- `/testmap load test_arena` 能加载测试模板。
- 数据库中存在 Flyway 迁移记录。

## 更新插件

更新前建议：

1. 备份数据库。
2. 备份 `plugins/HopliteRoyale/` 配置目录。
3. 停服。
4. 替换 jar。
5. 启动并观察迁移日志。

如果更新涉及赛季、奖励或地图配置，先在测试服验证完整一局。
