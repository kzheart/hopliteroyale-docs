# HopliteRoyale 文档

斯巴达风格 Minecraft 大逃杀插件的**公开文档站**。在线访问:

- 🌐 https://kzheart.github.io/hopliteroyale-docs/

本仓库**不发布插件源码**——只包含玩家说明、服主指南、配置参考、命令速查和 GitHub Pages 构建配置。

## 受众分流

| 你是 | 入口 |
| --- | --- |
| 玩家 | `guide/player-quickstart.md` |
| 服主 | `guide/owner-quickstart.md` |
| 查命令 | `guide/commands.md` |

## 本地开发

```bash
npm install
npm run dev          # http://127.0.0.1:5173/hopliteroyale-docs/
```

## 构建

```bash
npm run build        # 输出到 .vitepress/dist
npm run preview      # 本地预览构建产物
```

## 部署

推到 `main` 分支会通过 `.github/workflows/deploy.yml` 自动部署到 GitHub Pages。

## 贡献

欢迎 PR / Issue。提交前请确保:

- 不要包含真实数据库密码 / 私有地图 / 服务器凭证
- 中文为主,游戏阶段名 / 命令保持准确
- 改动如涉及命令或配置,请同步更新 `guide/commands.md` 和 `guide/configuration.md`
