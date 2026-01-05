# 在线简历编辑器

一个纯前端的在线简历编辑器，支持实时编辑、保存和导出多种格式的简历。

## 功能特性

- 📝 **实时编辑**：所见即所得的简历编辑体验
- 💾 **本地存储**：使用浏览器localStorage保存数据
- 📄 **多格式导出**：支持导出为PDF和Word文档
- 🎨 **响应式设计**：适配各种屏幕尺寸
- 🖨️ **打印优化**：专为打印优化的样式
- 🔗 **数据导入/导出**：支持JSON格式的数据备份和恢复

## 使用方法

### 1. 编辑简历
1. 打开 `editor.html` 文件
2. 填写个人信息、工作经历、项目经验等
3. 点击"保存简历"按钮保存更改

### 2. 查看和导出简历
1. 打开 `index.html` 文件
2. 查看渲染好的简历
3. 点击相应按钮导出为PDF或Word格式

### 3. 部署到GitHub Pages
1. 在GitHub上创建新仓库
2. 将所有文件上传到仓库
3. 进入仓库设置 > Pages
4. 选择分支并保存，稍等片刻即可访问

## 文件结构

- `index.html` - 简历展示页面
- `editor.html` - 简历编辑页面
- `script.js` - 通用JavaScript功能
- `style.css` - 通用样式
- `editor.js` - 编辑器专用功能
- `preview.js` - 预览页面专用功能

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (ES6+)
- localStorage 数据存储
- html2pdf.js (PDF生成)
- docx.js (Word文档生成)

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 自定义

1. **修改样式**：编辑 `style.css` 文件
2. **添加字段**：在编辑器和预览页面的JavaScript中添加相应逻辑
3. **修改默认数据**：在 `script.js` 中修改 `DEFAULT_RESUME` 对象

## 许可证

MIT License - 自由使用和修改