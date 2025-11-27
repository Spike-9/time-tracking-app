# Requirements Document

## Introduction

本文档定义了一个轻量级时间追踪应用的需求。该应用允许用户快速记录任务时间，通过分类管理不同类型的活动，并提供数据统计和可视化功能。应用设计理念是零干扰、快速记录，帮助用户更好地了解时间分配。

## Glossary

- **Time Tracking System**: 本文档中指代的时间追踪应用系统
- **Task**: 用户需要追踪时间的活动或任务
- **Category**: 任务的分类标签（如工作、学习、娱乐、日常琐碎）
- **Timer**: 自动计时器，记录任务的开始和结束时间
- **Duration**: 任务持续时长，以分钟或小时为单位
- **Activity History**: 用户过往所有任务记录的历史
- **Summary Report**: 按日或周汇总的时间统计报告
- **User**: 使用时间追踪系统的人

## Requirements

### Requirement 1

**User Story:** 作为用户，我想要快速开始和停止任务计时，以便我能够准确记录任务时间而不被打断工作流程

#### Acceptance Criteria

1. WHEN User 点击开始按钮，THE Time Tracking System SHALL 创建新任务记录并开始计时
2. WHEN User 点击停止按钮，THE Time Tracking System SHALL 停止当前任务计时并自动计算时长
3. WHILE 任务正在计时，THE Time Tracking System SHALL 在界面上每秒更新已经过的时间显示
4. THE Time Tracking System SHALL 在任务开始时记录开始时间戳
5. WHEN 任务结束时，THE Time Tracking System SHALL 记录结束时间戳并计算 duration 为两个时间戳之差

### Requirement 2

**User Story:** 作为用户，我想要为任务输入标题和选择分类，以便我能够组织和区分不同类型的活动

#### Acceptance Criteria

1. WHEN User 创建任务，THE Time Tracking System SHALL 提供任务标题输入框
2. WHEN User 创建任务，THE Time Tracking System SHALL 提供分类下拉菜单包含工作、学习、娱乐、日常琐碎选项
3. THE Time Tracking System SHALL 保存任务的标题和分类字段到数据库
4. THE Time Tracking System SHALL 允许任务标题最多包含 200 个字符
5. THE Time Tracking System SHALL 要求每个任务必须选择一个分类

### Requirement 3

**User Story:** 作为用户，我想要手动输入任务时长，以便我能够补录之前忘记计时的任务

#### Acceptance Criteria

1. WHEN User 选择手动输入模式，THE Time Tracking System SHALL 提供时长输入字段
2. THE Time Tracking System SHALL 接受以分钟为单位的时长输入
3. WHEN User 提交手动输入的任务，THE Time Tracking System SHALL 保存任务记录包含标题、分类和时长
4. THE Time Tracking System SHALL 验证手动输入的时长为大于零且不超过 1440 分钟的正数
5. WHEN User 提交手动输入任务时，THE Time Tracking System SHALL 使用当前时间作为任务结束时间并反推开始时间

### Requirement 4

**User Story:** 作为用户，我想要查看我的任务历史记录，以便我能够回顾过去的时间使用情况

#### Acceptance Criteria

1. WHEN User 访问任务列表页面，THE Time Tracking System SHALL 显示所有历史任务记录
2. THE Time Tracking System SHALL 为每个任务显示标题、分类、开始时间、结束时间和时长
3. THE Time Tracking System SHALL 按时间倒序排列任务列表（最新的在前）
4. WHEN User 滚动到列表底部，THE Time Tracking System SHALL 加载更多历史记录（分页加载）
5. THE Time Tracking System SHALL 允许 User 按分类筛选任务列表

### Requirement 5

**User Story:** 作为用户，我想要查看今日和本周的时间统计，以便我能够了解时间分配情况

#### Acceptance Criteria

1. WHEN User 访问统计页面，THE Time Tracking System SHALL 显示今日总时长
2. WHEN User 访问统计页面，THE Time Tracking System SHALL 显示本周总时长
3. THE Time Tracking System SHALL 按分类计算并显示时间占比
4. THE Time Tracking System SHALL 使用饼图可视化分类时间占比
5. THE Time Tracking System SHALL 使用柱状图显示每日时间分布（周视图）

### Requirement 6

**User Story:** 作为用户，我想要看到当前正在进行的任务面板，以便我能够随时了解当前任务状态

#### Acceptance Criteria

1. WHILE 任务正在计时，THE Time Tracking System SHALL 在顶部显示当前任务面板
2. THE Time Tracking System SHALL 在当前任务面板中显示任务标题、分类和已用时间
3. THE Time Tracking System SHALL 每秒更新当前任务的已用时间显示
4. WHEN 没有任务在计时时，THE Time Tracking System SHALL 隐藏当前任务面板
5. THE Time Tracking System SHALL 在当前任务面板中提供停止按钮

### Requirement 7

**User Story:** 作为用户，我想要应用具有响应式布局，以便我能够在不同设备上使用

#### Acceptance Criteria

1. THE Time Tracking System SHALL 在桌面设备（宽度大于 1024px）上显示完整布局
2. THE Time Tracking System SHALL 在平板设备（宽度 768px 到 1024px）上调整布局适配屏幕
3. THE Time Tracking System SHALL 在移动设备（宽度小于 768px）上使用单列布局
4. THE Time Tracking System SHALL 确保所有交互元素在触摸屏上的最小点击区域为 44x44 像素
5. THE Time Tracking System SHALL 在所有设备上保持文字可读性（最小字体 14px）

### Requirement 8

**User Story:** 作为用户，我想要应用自动保存我的数据，以便我不会因为忘记保存而丢失记录

#### Acceptance Criteria

1. WHEN User 停止任务计时，THE Time Tracking System SHALL 立即保存任务记录到数据库
2. WHEN User 创建手动任务，THE Time Tracking System SHALL 立即保存任务记录到数据库
3. IF 保存操作失败，THEN THE Time Tracking System SHALL 显示错误提示并保留 User 输入数据
4. WHEN 保存成功后，THE Time Tracking System SHALL 更新界面显示最新数据
5. WHEN 网络连接恢复后，THE Time Tracking System SHALL 自动重试失败的保存操作

### Requirement 9

**User Story:** 作为用户，我想要查看任务排行榜，以便我能够了解哪些任务占用了最多时间

#### Acceptance Criteria

1. WHEN User 访问统计页面，THE Time Tracking System SHALL 显示本周 Top 5 任务排行
2. THE Time Tracking System SHALL 按任务标题聚合相同任务的总时长
3. THE Time Tracking System SHALL 按总时长降序排列任务
4. THE Time Tracking System SHALL 为每个任务显示标题、分类和总时长
5. THE Time Tracking System SHALL 允许 User 切换查看今日或本周的任务排行

### Requirement 10

**User Story:** 作为用户，我想要应用具有简洁的界面设计，以便我能够专注于时间记录而不被复杂功能干扰

#### Acceptance Criteria

1. THE Time Tracking System SHALL 在首页仅显示开始任务按钮、当前任务面板和今日统计
2. THE Time Tracking System SHALL 使用不超过 3 种主要颜色的配色方案
3. THE Time Tracking System SHALL 使用清晰的视觉层次区分主要和次要功能
4. THE Time Tracking System SHALL 限制每个页面的主要操作不超过 3 个
5. THE Time Tracking System SHALL 使用图标配合文字标签提高可识别性
