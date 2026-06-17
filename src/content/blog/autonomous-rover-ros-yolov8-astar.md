---
title: Space Robotics Sand Rover at Tohoku University
date: 2024-08-15 00:00:00
description: TESP 2024 暑研项目：沙地场景中的机器人设计与搭建。
cover: /img/projects/provided/japan-summer-rover.png
categories:
  - Projects
tags:
  - ROS
  - YOLOv8
  - A-star Search
  - Autonomous Rover
  - Space Robotics
draft: false
---
## Project Context

2024 年暑期，我参加了 Tohoku University Engineering Summer Program (TESP) 的 Space Robotics 项目。我们小组从0搭建，完成了一个面向沙地环境的 **Space Robotics Sand Rover** 原型，用于模拟火星/月面类似地形中的移动机器人导航任务。

![Space Robotics Sand Rover](/img/projects/japan-summer-rover/robot.webp)

## Mechanical Design

机器人采用适合沙地移动的轮式结构，轮子带有 fin-like 结构以增强沙面牵引。驱动系统由三个电机组成：两个前轮分别独立驱动，后轮由一个共享电机驱动。

硬件上，机器人同时搭载 **Raspberry Pi 4** 和 **Lego EV3 brick**。Raspberry Pi 负责更上层的任务控制和路径执行，EV3 brick 负责底层电机控制。这样的结构把感知、规划和运动执行拆成相对清晰的模块，便于调试和小组协作。

## System and Communication

系统由 PC、RealSense camera、Raspberry Pi 和 Lego EV3 brick 构成，并通过 ROS 组织通信。

![System and communication diagram](/img/projects/japan-summer-rover/system-communication.webp)

整体链路如下：

- **PC + RealSense camera**：运行 `rock_detector` 和 `robot_detector`，负责视觉输入与目标/障碍识别。
- **Raspberry Pi**：运行 `Mission_control`，其中包含 `path_planning` 和 `path_following`。
- **Lego EV3 Brick**：运行 `motor_controller`，接收运动指令并驱动电机。
- **ROS**：连接感知、规划和控制模块，使各部分通过消息传递协同工作。

这套结构的核心是让高层算法不直接控制电机，而是通过中间控制链路逐步下发目标，降低模块之间的耦合。

## Localization

定位模块通过 **ArUco markers** 确定机器人在二维地图坐标系中的位姿：

```text
pose = [x, y, theta]
```

其中 `x`、`y` 表示机器人位置，`theta` 表示朝向。这个位姿会传递给路径规划和 PD 控制模块，作为后续运动决策的状态输入。

## Obstacle Mapping

障碍映射部分结合了多个视觉处理步骤：

- 针对任务场景 fine-tune YOLOv8。
- 使用任务相关数据集进行障碍预测。
- 对相机图像进行坐标变换。
- 生成可用于规划的地图。
- 使用 OpenCV 提取 sandbox contour。

这个环节的关键不是单纯“检测出障碍”，而是把视觉结果转换成路径规划可以理解的地图表示。对于沙盘任务，边界本身也需要被识别，否则路径规划可能给出贴边或不可执行的路线。

## Path Planning with A*

路径规划模块使用 **A\*** 在栅格地图上搜索从起点到终点的可行路径。

![A-star path planning grid map](/img/projects/japan-summer-rover/path-planning.webp)

展示材料中提到，我们的 A* 规划会优先选择不靠近边界或障碍物的网格。这一点在真实机器人上非常重要：即使某条路径在几何上可行，如果它太贴近障碍或边界，机器人也可能因为转向半径、轮子打滑或定位误差而无法顺利通过。

## PD Control

控制模块使用当前位姿与期望位姿之间的误差来决定轮子转速。前轮可以以不同速度运动，从而修正机器人朝向。

这种 PD 控制方式适合快速搭建原型，也便于调试：当机器人偏离路径时，可以通过姿态误差和位置误差调整左右轮速度，使其逐步回到目标轨迹。

## Functionality and Integration Status

最终系统能够在沙地中较好移动，各个子系统也分别完成了开发验证。由于暑研周期有限，完整系统集成仍需要更多时间。

这也是移动机器人项目中非常真实的一点：感知、定位、规划和控制分别跑通，并不等于整机系统自然稳定。模块之间的时序、坐标系、延迟、误差积累和硬件行为，都会影响最终表现。

## What I Learned

这次暑研让我更具体地理解了机器人系统集成的复杂性：

- ROS 通信结构需要和硬件职责边界一起设计。
- 视觉检测结果必须经过坐标变换和地图生成，才能真正服务路径规划。
- A* 的“最短路径”不一定是机器人最容易执行的路径。
- 沙地地形会放大轮子牵引、定位误差和控制稳定性问题。
- 项目周期有限时，清晰的模块划分和可演示功能比堆叠复杂算法更重要。

后续如果继续扩展这个项目，我会优先补强完整闭环集成、路径跟踪稳定性，以及不同沙地/障碍布局下的系统测试。
