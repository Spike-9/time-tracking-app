# Time Tracking App

一个轻量级的时间追踪应用，帮助用户记录和分析时间使用情况。

## 项目结构

```
time-tracking-app/
├── frontend/          # React + TypeScript 前端
│   ├── src/
│   │   ├── components/    # UI 组件
│   │   ├── pages/         # 页面组件
│   │   ├── services/      # API 服务
│   │   ├── context/       # 状态管理
│   │   ├── types/         # TypeScript 类型
│   │   └── utils/         # 工具函数
│   └── package.json
├── backend/           # Node.js + Express 后端
│   ├── src/
│   │   ├── controllers/   # 控制器
│   │   ├── services/      # 业务逻辑
│   │   ├── repositories/  # 数据访问层
│   │   ├── middleware/    # 中间件
│   │   ├── types/         # TypeScript 类型
│   │   └── utils/         # 工具函数
│   └── package.json
└── README.md
```

## 技术栈

### 前端
- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- React Router
- Axios

### 后端
- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite

## 快速开始

### 前置要求
- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

### 环境配置

```bash
# 后端环境变量
cd backend
cp .env.example .env

# 前端环境变量
cd ../frontend
cp .env.example .env
```

### 运行开发服务器

```bash
# 启动后端 (端口 3000)
cd backend
npm run dev

# 启动前端 (端口 5173)
cd frontend
npm run dev
```

访问 http://localhost:5173 查看应用

## 开发指南

### 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 严格模式

### 构建生产版本

```bash
# 构建前端
cd frontend
npm run build

# 构建后端
cd backend
npm run build
```

## 功能特性

- ⏱️ 快速开始/停止任务计时
- 📝 手动输入任务时长
- 📊 任务历史记录查看
- 📈 今日/本周统计分析
- 🎨 响应式设计，支持多设备
- 💾 自动保存，离线重试

## License

MIT
