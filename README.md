# 静谧花园 - 个人博客

一个极致美丽的个人博客，托管于 GitHub Pages。

## 本地预览

直接在浏览器中打开 `index.html` 即可预览。

## 部署到 GitHub Pages

1. 在 GitHub 上创建一个名为 `你的用户名.github.io` 的公开仓库
2. 将本目录下的所有文件推送到该仓库
3. 等待几分钟，访问 `https://你的用户名.github.io` 即可看到你的网站

```bash
git init
git add .
git commit -m "初始化博客网站"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

## 自定义

- 修改 `index.html` 中的个人信息、博客内容
- 修改 `style.css` 中的 CSS 变量来调整配色方案
- 在 `posts/` 目录下添加新的博客文章

## 技术栈

纯 HTML + CSS + JavaScript，无需任何框架或构建工具。