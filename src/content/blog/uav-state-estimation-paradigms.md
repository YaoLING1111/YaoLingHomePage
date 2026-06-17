---
title: State Estimation Paradigms for UAV Navigation
date: 2026-01-29 00:00:00
description: 在自动化 Unity 仿真中比较 EKF、Particle Filter/MCL 与 Hybrid EKF-PF 的定位精度、鲁棒性和 kidnapped recovery。
cover: /img/projects/provided/unity-estimation-cover.png
categories:
  - Research
tags:
  - State Estimation
  - UAV Navigation
  - EKF
  - Particle Filter
  - Unity
draft: false
---
## Project Context

This project was developed for **KTH EL2320 Applied Estimation**. I built an automated Unity simulation pipeline to compare three localization paradigms for UAV navigation:

- Extended Kalman Filter (EKF)
- Particle Filter / Monte Carlo Localization (MCL)
- Hybrid EKF-PF architecture

The public version below summarizes the system design and method comparison. The original course report and raw experimental material are kept private.

![Automated Unity estimation pipeline](/img/projects/uav-estimation/unity-estimation-pipeline.svg)

## Why Unity

The goal was not only to test filters on clean synthetic data, but to create a controllable environment where the same trajectory, map geometry and disturbance cases could be replayed. Unity made it possible to combine:

- drone dynamics and map geometry;
- scripted autonomous path generation;
- noisy global position observations;
- ray-cast based simulated lidar;
- synchronized logging of ground truth and estimator outputs.

The drone agent follows deterministic routes generated from **Dijkstra's algorithm** and smoothed with **Bezier curves**. This makes the comparison reproducible: each estimator faces the same path, sensor model and disturbance schedule.

## System Pipeline

The simulation separates the problem into three layers:

- **Environment and motion**: Unity scene, map features, drone movement and trajectory generation.
- **Sensor simulation**: noisy GPS-like global position updates and lidar-like feature rays.
- **Estimation layer**: EKF, MCL and Hybrid EKF-PF run against the same logged stream.

An `ExperimentManager` records ground truth pose and estimated pose at 50 Hz, then exports synchronized CSV logs for analysis. The visualization uses feature rays, ground-truth trajectory, estimated trajectory and particle clouds to make failure modes easier to inspect.

## State and Observation Model

The estimator uses a compact five-dimensional state:

```text
x = [px, pz, theta, vx, vz]^T
```

Here `px` and `pz` describe the UAV position in the Unity ground plane, `theta` is the heading, and `vx`, `vz` are planar velocities. The sensor model combines global position observations with geometric information from simulated lidar beams.

## Compared Estimators

![Estimator comparison](/img/projects/uav-estimation/estimator-comparison.svg)

### EKF

EKF is computationally efficient and produces smooth local estimates when the motion model and observation model are reasonably accurate. Its weakness is global recovery: after a severe localization failure, a single Gaussian belief may remain confident in the wrong region.

### Particle Filter / MCL

MCL represents uncertainty with a particle set, so it can maintain multi-modal hypotheses. I used an augmented recovery mechanism with slow/fast weight traces and random particle injection, which helps the filter recover after a kidnapped event.

### Hybrid EKF-PF

The hybrid idea is to combine local precision with broader recovery behavior. Each particle can carry a local EKF-style refinement, while the particle population preserves multiple hypotheses. This is heavier computationally, but it offers a useful design direction for systems that need both smooth tracking and emergency re-localization.

## Kidnapped Robot Stress Test

The most important test case was a scripted kidnapped scenario: the estimator's belief is suddenly inconsistent with the true UAV position. This tests whether the algorithm can notice that its current belief is no longer trustworthy and recover within a short window.

In this setting, the key metrics are not only average localization error. I also look at:

- time to recovery after the position jump;
- maximum error during failure;
- particle diversity and degeneracy;
- computational cost per update;
- stability under sensor noise.

## What I Learned

This project made the tradeoff between estimation paradigms much more concrete. EKF is elegant and efficient, but its assumptions are sharp. Particle filters are robust in global recovery, but their performance depends heavily on particle count, resampling and recovery heuristics. Hybrid methods are promising, but they need careful trigger logic and resource budgeting.

For autonomous systems, a good estimator is not simply the one with the lowest average error. It also needs predictable behavior in the worst moments: model mismatch, sensor noise, sudden failure and recovery.
