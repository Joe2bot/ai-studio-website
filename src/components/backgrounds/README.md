# Ballpit 背景

基于 React Bits 官方 TypeScript Ballpit 源码，本地调整用于首页第二屏服务区。

- 来源：https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Backgrounds/Ballpit/Ballpit.tsx
- 原文件 SHA-256：`c107ee42f876e9ea5c2ab41bf32b0741299cfba5440f788a445473e21ac05526`
- 许可全文：`public/licenses/react-bits.md`（MIT + Commons Clause）。作为本网站的一部分使用，不单独销售或分发组件。
- 本地适配：就绪与不可用回调、WebGL 上下文丢失降级、StrictMode 清理修复、严格 TypeScript 参数检查。

`ServicesBallpit.tsx` 管理配色、数量、尺寸、移动端配置、动态偏好和静态降级。采用零重力与轻微漂移，让球体持续分布在 服务区背景中。桌面 30 个球，触屏/小屏 12 个球；关闭触屏拖拽以保留页面滚动。减少动态效果时不创建 WebGL，使用静态 CSS 球体背景。源码按需加载，不添加运行依赖，也不请求远程素材。原组件在离屏和页面隐藏时暂停绘制。
