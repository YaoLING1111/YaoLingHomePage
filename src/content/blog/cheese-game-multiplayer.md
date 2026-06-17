---
title: "Cheese Game: Multiplayer Social Deduction Online"
date: 2026-03-15 00:00:00
description: 使用 Express 与 Socket.IO 将“奶酪大盗”的身份、夜间行动和投票流程实现为多人实时网页游戏。
cover: /img/projects/cheese-game.webp
categories:
  - Projects
tags:
  - Board Games
  - Socket.IO
  - Express
  - Realtime Multiplayer
draft: false
---

## Project Overview

这是我为桌游 **奶酪大盗** 制作的在线多人版本。项目并不是单纯展示规则，而是把线下桌游中需要主持人维护的身份分配、夜间时序、秘密行动、白天讨论和投票结算交给服务器管理。

- Source: [YaoLING1111/cheese-game](https://github.com/YaoLING1111/cheese-game)
- Stack: Node.js, Express, Socket.IO, HTML, CSS, JavaScript
- Players: 至少 3 人

## Why I Built It

我喜欢桌游里的信息不对称与现场互动，也想尝试把这种体验转换成一个真正可联机的 Web 应用。这个项目的重点不是复杂画面，而是让多个浏览器中的玩家始终看到与自己身份和当前阶段一致的信息。

## Game Flow

一局游戏由服务器维护明确的阶段状态：

1. 玩家输入名称并加入公共大厅。
2. 人数满足条件后，任意玩家可以开始游戏。
3. 服务器随机分配 `Thief`、`Critter`、`GoodRat` 等身份和骰子点数，并分别发送私密信息。
4. 所有玩家确认身份后，游戏按照 1 至 6 点依次进入夜间时段。
5. 奶酪大盗可以在自己的时段偷走奶酪；满足条件的玩家可以查看其他玩家的骰子信息。
6. 大盗选择同伙后进入白天讨论与投票。
7. 服务器统计票型、处理平票，并根据被投玩家的身份计算胜方。

## Realtime Architecture

Express 负责提供静态网页，Socket.IO 负责双向实时通信。服务端保存玩家列表、当前阶段、奶酪状态、投票和已经完成行动的玩家集合，并通过事件驱动状态变化。

关键事件包括：

- `join`：加入大厅并处理重名
- `startGame`：重置回合、分配身份和骰子
- `confirmIdentity`：同步身份确认进度
- `stealCheese` 与 `peekPlayer`：处理秘密夜间行动
- `thiefChooseFollower`：选择同伙
- `submitVote`：收集投票并结算胜负

私密身份和查看结果只发送给对应 socket；大厅人数、阶段变化和最终结果则广播给所有玩家。

## State and Rule Validation

多人游戏最容易出错的地方不是界面，而是非法操作和不同步。服务端会验证：

- 当前是否处于允许该操作的阶段
- 发起操作的 socket 是否属于有效玩家
- 玩家身份和骰子点数是否满足行动条件
- 奶酪是否已经被偷走
- 玩家是否重复完成查看、投票或夜间确认

玩家离线时，服务器也会更新大厅；若离线导致当前游戏无法继续，则终止回合并恢复等待状态。

## What I Learned

这个项目让我实践了权威服务端状态、私密消息与广播消息的边界，以及如何把桌游规则转换为可验证的状态机。相比把所有逻辑放在浏览器端，服务端判定可以减少不同客户端状态分叉，也更适合身份推理游戏。

## Next Steps

后续可以继续增加房间系统、重连与身份恢复、主持人设置、规则说明、自动化测试和更完整的移动端交互。目前仓库保留了一个紧凑的可运行原型，适合作为实时多人 Web 游戏的起点。
