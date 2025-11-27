# 部署指南

本指南将帮助你将时间追踪应用部署到云端，让别人可以访问。

## 📋 准备工作

1. **注册账号**（都是免费的）：
   - [Vercel](https://vercel.com) - 前端部署
   - [Railway](https://railway.app) - 后端部署
   - [GitHub](https://github.com) - 代码托管

2. **安装 Git**（如果还没有）：
   - 下载：https://git-scm.com/downloads

---

## 🚀 部署步骤

### 第一步：上传代码到 GitHub

1. **初始化 Git 仓库**

打开项目根目录的终端，运行：

```bash
git init
git add .
git commit -m "Initial commit: Time Tracking App"
```

2. **创建 GitHub 仓库**

- 访问 https://github.com/new
- 仓库名称：`time-tracking-app`
- 设置为 Public（公开）
- 点击 "Create repository"

3. **推送代码到 GitHub**

复制 GitHub 显示的命令，类似：

```bash
git remote add origin https://github.com/你的用户名/time-tracking-app.git
git branch -M main
git push -u origin main
```

---

### 第二步：部署后端到 Railway

1. **登录 Railway**
   - 访问 https://railway.app
   - 使用 GitHub 账号登录

2. **创建新项目**
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择你的 `time-tracking-app` 仓库

3. **配置后端**
   - Railway 会自动检测到 Node.js 项目
   - 点击项目，进入设置
   - 添加环境变量：
     - `NODE_ENV` = `production`
     - `PORT` = `3000`
     - `DATABASE_URL` = `file:./data/time-tracking.db`
     - `CORS_ORIGIN` = `*` （暂时允许所有来源）

4. **设置根目录**
   - 在 Settings → Service
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成（约 2-3 分钟）
   - 复制生成的 URL，类似：`https://your-app.railway.app`

---

### 第三步：部署前端到 Vercel

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择你的 `time-tracking-app` 仓库
   - 点击 "Import"

3. **配置前端**
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **添加环境变量**
   - 点击 "Environment Variables"
   - 添加：
     - Name: `VITE_API_URL`
     - Value: `https://your-app.railway.app/api` （替换为你的 Railway URL）

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成（约 2-3 分钟）
   - 你会得到一个 URL，类似：`https://your-app.vercel.app`

---

### 第四步：更新 CORS 配置

1. **回到 Railway**
   - 进入你的后端项目
   - 更新环境变量 `CORS_ORIGIN`
   - 改为你的 Vercel URL：`https://your-app.vercel.app`
   - 保存并重新部署

---

## ✅ 完成！

现在你的应用已经上线了！

- **前端地址**：`https://your-app.vercel.app`
- **后端地址**：`https://your-app.railway.app`

分享前端地址给朋友，他们就可以访问你的时间追踪应用了！

---

## 🔧 常见问题

### 1. 前端无法连接后端

**检查：**
- Vercel 的 `VITE_API_URL` 环境变量是否正确
- Railway 的 `CORS_ORIGIN` 是否包含 Vercel 的域名
- 后端是否成功部署并运行

### 2. 数据丢失

**原因：** Railway 免费版重启后会清空文件系统

**解决：** 升级到持久化存储，或使用外部数据库（PostgreSQL）

### 3. 部署失败

**检查：**
- `package.json` 中的脚本是否正确
- Node.js 版本是否兼容（建议 18+）
- 查看部署日志中的错误信息

---

## 📊 监控和维护

### Vercel
- 访问 https://vercel.com/dashboard
- 查看部署历史和日志
- 每次 Git push 会自动重新部署

### Railway
- 访问 https://railway.app/dashboard
- 查看服务状态和日志
- 监控资源使用情况

---

## 💡 优化建议

### 1. 自定义域名
- Vercel 和 Railway 都支持绑定自定义域名
- 在各自的设置中添加域名即可

### 2. 数据持久化
如果需要数据永久保存：
- Railway: 添加 PostgreSQL 数据库
- 修改后端代码使用 PostgreSQL

### 3. 性能优化
- 启用 Vercel 的 CDN 加速
- 配置缓存策略
- 压缩静态资源

---

## 🆘 需要帮助？

如果遇到问题：
1. 查看部署日志
2. 检查环境变量配置
3. 确认代码已推送到 GitHub
4. 查看 Vercel/Railway 的文档

---

**祝部署顺利！🎉**
