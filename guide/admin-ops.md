# 服主管理

## 日常检查

建议每天检查：

- 服务端日志是否有 HopliteRoyale 启动或运行错误。
- MySQL 是否可连接。
- ASP 地图模板是否可读取。
- 当前赛季是否正确。
- Battle Pass 奖励领取是否正常。

## 开一局测试

最小测试流程：

```text
/br create default solo
/br list
/br join <id>
/br info <id>
```

多人测试建议使用 `/br quickplay <mode>`，更接近真实玩家流程。

## 地图问题排查

优先使用：

```text
/testmap load <template>
/testmap list
/testmap unload <world>
```

常见原因：

| 现象 | 可能原因 |
| --- | --- |
| 地图加载失败 | ASP 4.x API 不存在、模板名错误、MySQL loader 连接失败 |
| 玩家无法传送 | 实例世界未加载完成 |
| 比赛结束后世界未清理 | Ending 阶段异常或 ASP 删除失败 |

## 数据库问题排查

插件启动时会执行连接检查和迁移。若启动失败，优先检查：

- MySQL 地址、端口、账号和密码。
- 数据库是否存在。
- 账号是否有建表、改表权限。
- 连接池大小是否过大。

生产环境不要在公开仓库或公开聊天中粘贴真实密码。

## 传奇武器排查

| 命令 | 用途 |
| --- | --- |
| `/legendary recipes` | 检查配方是否注册 |
| `/legendary atlas` | 检查图鉴 GUI |
| `/legendary giveall <player>` | 快速发放测试武器 |
| `/legendary perf` | 查看调度耗时 |
| `/legendary reload` | 重载配置 |

如果重载后配方不符合预期，检查对应 `legendaries/*.yml` 中的材料 namespaced key 是否正确。

## 发布建议

1. 先在测试服跑完整比赛。
2. 确认数据库迁移通过。
3. 确认地图模板可加载和卸载。
4. 备份生产配置和数据库。
5. 停服替换插件。
6. 开服后跑一局小规模验证。

## 公开文档维护

这个文档仓库会通过 GitHub Actions 构建到 GitHub Pages。更新文档时只提交 Markdown、VitePress 配置和公开资源，不提交插件源码、jar、地图模板或数据库备份。
