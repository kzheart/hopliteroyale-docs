# 奖励钩子与外部接入

HopliteRoyale 本体只负责"开一局打到结束"——胜负、击杀、首杀、淘汰这些里程碑通过两条对外通道暴露，让其他插件做积分 / 商店 / 排行 / 任务等长线运营。

1. **轻量级**：开 `config.yml` 的 `rewards.commands`，在指定钩子下执行控制台命令
2. **重量级**：自己写一个外部 Paper 插件，依赖 `:api` 子模块，订阅 Bukkit 事件，做任意逻辑

---

## 方式一：`config.yml` 命令钩子

最快接入。比赛主流程触发后，本体会按当前命令模板按行 `Bukkit.dispatchCommand(consoleSender, ...)` 派发。

```yaml
rewards:
  enabled: true                        # ← 必须打开总开关
  commands:
    on_game_start:
      - "broadcast 比赛 {arena}（{mode}）开始了！"
    on_game_end:
      - "broadcast 比赛 {game} 结束"
    on_kill:
      - "points add {player} 5"
      - "broadcast {player} 击杀了 {victim}"
    on_first_blood:
      - "points add {player} 20"
      - "title {player} title \"\\\"§c首杀!\\\"\""
    on_eliminated: []                  # 留空 = 不做事
    on_win:
      - "points add {player} 100"
      - "broadcast {player} 拿下胜利"
    on_top3:
      - "points add {player} 30"
```

### 钩子列表

| 钩子 key | 触发时机 | 派给谁 |
| --- | --- | --- |
| `on_game_start` | 比赛进入 `STARTING` 阶段（玩家已锁定） | 每个参赛玩家 |
| `on_game_end` | 比赛进入 `ENDING` 阶段 | 每个还在场的玩家 |
| `on_kill` | 玩家击杀玩家（含传奇技能命中） | 击杀者 |
| `on_first_blood` | 该局第一次击杀 | 击杀者 |
| `on_eliminated` | 玩家被永久淘汰（不可复活） | 被淘汰玩家 |
| `on_win` | 比赛结束时仍存活（即胜者队） | 胜者队成员 |
| `on_top3` | 比赛结束时排名前三的队伍 | Top3 队成员 |

### 占位符

| 占位符 | 含义 | 哪些钩子能用 |
| --- | --- | --- |
| `{player}` | 当前要派奖的玩家名 | 全部 |
| `{victim}` | 被击杀者 | `on_kill` / `on_first_blood` |
| `{game}` | 比赛 UUID | 全部 |
| `{arena}` | Arena ID | 全部 |
| `{mode}` | `solo` / `duo` / `squad` | 全部 |

::: tip 命令以控制台身份执行
所有命令都从控制台派发，所以 `points add`、`eco give`、`broadcast` 这些不需要做权限处理。

但如果你想 `effect give @s ...` 自指，**记得把 `@s` 换成 `{player}`**。
:::

::: warning 不要在这里放重逻辑
钩子里跑的是命令，每条命令都会进主线程命令调度。如果要做"按当前职业等级算奖励金额"这种带条件分支的事情，请用方式二。
:::

---

## 方式二：`:api` 子模块 + Bukkit 事件

适合做排行榜 / 任务 / 复杂奖励规则。`HopliteRoyale-api` 是公开发布的 jar，你的外部插件 `compileOnly` 它即可。

### 拿 API jar

把 `HopliteRoyale-api-0.1.0.jar` 放到本地 Maven，或者发到你自己的 repo。本地用法：

```bash
mvn install:install-file \
  -Dfile=HopliteRoyale-api-0.1.0.jar \
  -DgroupId=com.k.hopliteroyale \
  -DartifactId=hopliteroyale-api \
  -Dversion=0.1.0 \
  -Dpackaging=jar
```

然后在你的外部插件 `build.gradle.kts` 里：

```kotlin
dependencies {
    compileOnly("com.k.hopliteroyale:hopliteroyale-api:0.1.0")
    compileOnly("io.papermc.paper:paper-api:1.21.11-R0.1-SNAPSHOT")
}
```

`paper-plugin.yml` 声明软依赖：

```yaml
name: MyHopliteRewards
version: 0.1.0
main: com.example.MyHopliteRewards
api-version: '1.21'
dependencies:
  server:
    HopliteRoyale:
      load: BEFORE
      required: false
      join-classpath: true
```

### 可订阅事件

事件包：`com.k.hopliteroyale.api.events.*`

| 包 | 事件 | 触发时机 |
| --- | --- | --- |
| `events.game` | `GameCreateEvent` / `GameDestroyEvent` | 比赛实例创建 / 销毁 |
|  | `GameStartEvent` / `GameEndEvent` | 比赛开始 / 结束 |
|  | `GamePhaseChangeEvent` | 阶段切换 |
|  | `FirstBloodEvent` / `PlayerKillEvent` / `PlayerEliminatedEvent` | 战斗里程碑 |
| `events.player` | `PlayerJoinGameEvent` / `PlayerLeaveGameEvent` | 玩家进出比赛 |
|  | `PlayerKnockDownEvent` / `PlayerReviveEvent` | 倒地 / 复活 |
|  | `PlayerSpectateEvent` / `PlayerEliminationEvent` | 进入观战 / 被永久淘汰 |
| `events.team` | `TeamJoinEvent` / `TeamEliminatedEvent` | 入队 / 队伍淘汰 |
| `events.playerclass` | `PlayerClassSelectEvent` / `PlayerClassLevelUpEvent` | 选择职业 / 升级 |
| `events.legendary` | `LegendaryCraftEvent` / `LegendaryAbilityUseEvent` | 合成 / 使用传奇技能 |
| `events.border` | `BorderShrinkStartEvent` / `BorderShrinkFinishEvent` | 缩圈起止 |

### 极简示例 Listener

```java
package com.example;

import com.k.hopliteroyale.api.events.game.GameEndEvent;
import com.k.hopliteroyale.api.events.game.PlayerKillEvent;
import com.k.hopliteroyale.api.events.game.FirstBloodEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public final class MyHopliteRewardsListener implements Listener {

    @EventHandler
    public void onKill(PlayerKillEvent e) {
        // e.getKiller() / e.getVictim() / e.getCause() / e.getGame()
        // 这里调用你自家的积分 / 排行榜服务
    }

    @EventHandler
    public void onFirstBlood(FirstBloodEvent e) {
        // 全场首杀，做点炫酷的
    }

    @EventHandler
    public void onGameEnd(GameEndEvent e) {
        // e.getGame().getWinningTeam() != null 时是有胜者的局
    }
}
```

### `HopliteRoyaleAPI` 主入口

需要主动查询比赛状态时：

```java
HopliteRoyaleAPI api = HopliteRoyaleAPI.get();
IGameManager mgr = api.gameManager();
mgr.activeGames().forEach(game -> {
    // game.id() / game.phase() / game.players() / game.teams()
});
```

::: tip API 稳定性
`api/src/main/java/com/k/hopliteroyale/api/` 下的接口与事件是**对外契约**，破坏性改动会标 `@Deprecated` 一个版本后再删除。`com.k.hopliteroyale.api.internal.*` 是实现细节，外部插件**不要直接依赖**。
:::

### 完整示例插件

仓库自带 `dev-assets/sample-plugin`：独立 Gradle 子项目，演示如何 `compileOnly :api`、订阅事件、构建独立 jar。复制即用。

---

## 该选哪种方式？

| 需求 | 选 |
| --- | --- |
| 给胜者发点积分 / 全服广播 | 命令钩子 |
| 计算"每日 3 杀解锁奖励" | API + 事件 + 自家存储 |
| 任务系统 / 赛季轨道 / 经验加成 | API + 事件 |
| 多服群同步排行榜 | API + 事件 + 你自己的同步层 |
| 把 HopliteRoyale 接到 PlaceholderAPI | API（监听 `PlayerKillEvent` 等更新缓存） |

---

## 常见问题

**Q：`rewards.commands` 配了但没生效？**
检查总开关 `rewards.enabled` 是否打开，并确认 `config.yml` 改完已重启服务器。

**Q：钩子里执行的命令报权限错？**
全部从控制台派发，权限不是问题；如果命令本身要求玩家，请把 `@s` / `@p` 替换成 `{player}`。

**Q：能在钩子里跨多行执行吗？**
列表的每一行就是一条命令，不需要 `\n`，按数组顺序执行。

**Q：API 事件是同步还是异步？**
全部主线程同步事件——可以直接读写 Bukkit 状态，不要在事件里做长耗时 IO。
