# 项目技术点总结

## 1. 技术栈

**vue3 + elementPlus + node express + 全栈项目，可登陆注册使用**

## 2. 项目准备

- 安装 `element-plus`、`i18n` 等依赖

- 把 `vuex`、`vue-store` 初始化

## 2. 登陆页面搭建

- 创建 views -> login -> `index.vue`,写入内容后, 在 styles -> login -> `index.scss` 写样式

- 体验用户名： `amdin` ； 密码： `123456`

## 3. utils 工具

- 配置环境变量封装 `axios` 模块

- 封装登录请求动作，封装到 `vuex` 的 `action` 中

> 在 `store` 下创建 `modules` 文件夹，创建 `user.js` 模块，用于处理所有和 **用户相关** 的内容

- 登录触发动作,在 `login` 中，触发定义的 `action`

## 4. 本地缓存

- 本地缓存处理方案

通常情况下，在获取到 `token` 之后，我们会把 `token` 进行缓存，而缓存的方式将会分为两种：

1. 本地缓存：`LocalStorage`
2. 全局状态管理：`Vuex`

保存在 `LocalStorage` 是为了方便实现 **自动登录功能**

保存在 `vuex` 中是为了后面在其他位置进行使用

在 `vuex` 的 `user` 模块下，处理 `token` 的保存

## 5. interceptors 响应拦截器

- 成功提示和错误提示
- 返回数据 data, 无须在 store 中使用多个 data.data.

## 6. 登录鉴权解决方案

在处理了登陆后操作之后，接下来我们就来看一下最后的一个功能，也就是 **登录鉴权**

首先我们先去对 **登录鉴权** 进行一个定义，什么是 **登录鉴权** 呢？

> 当用户未登陆时，不允许进入除 `login` 之外的其他页面。
>
> 用户登录后，`token` 未过期之前，不允许进入 `login` 页面

而想要实现这个功能，那么最好的方式就是通过 [路由守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB) 来进行实现。

## 7. Layout 页面架构

把页面分为了三个部分，分别是：

1. 左侧的 `Menu` 菜单
2. 顶部的 `NavBar`
3. 中间的内容区 `Main`

还有一些其他的小功能，比如：

1. 退出的通用逻辑封装
2. 伸缩侧边栏动画
3. `vue3` 动画
4. 组件状态驱动的动态 `CSS` 值等等

> tip
> 为了在 `script` 中获取变量：在使用 `scss` 的 `variables.scss `变量时，讲文件名改为 `variables.module.scss`

## 8. 获取用户基本信息

实现一下 `navbar` 中的 **头像菜单** 功能

功能主要分为三个部分：

1. 获取并展示用户信息
2. `element-plus` 中的 `dropdown` 组件使用
3. 退出登录的方案实现

**获取并展示用户信息** 把它分为三部分进行实现：

1. 定义接口请求方法
2. 定义调用接口的动作
3. 在权限拦截时触发动作

> 通过路由导航拦截器确定是不是要发起请求（因为有可能存在用户信息，就是用户已经登陆过）

## 9. 渲染用户头像菜单

拿到了 **用户数据，并且在 `getters` 中做了对应的快捷访问** ，那么接下来我们就可以根据数据渲染出 **用户头像内容**

渲染用户头像，我们将使用到 `element-plus` 的两个组件：

1. `avatar`
2. `Dropdown`

## 10. 退出登录方案实现

**退出登录** 一直是一个通用的前端实现方案，对于退出登录而言，它的触发时机一般有两种：

1. 用户**主动**退出
2. 用户**被动**退出

其中：

1. 主动退出指：用户点击登录按钮之后退出
2. 被动退出指：`token` 过期或被 其他人”顶下来“ 时退出

那么无论是什么退出方式，在用户退出时，所需要执行的操作都是固定的：

1. 清理掉当前用户缓存数据
2. 清理掉权限相关配置
3. 返回到登录页

### 用户被动退出

1. 主动处理：主要应对 `token` 失效
2. 被动处理：同时应对 `token` 失效 与 **单用户登录**

> 我们知道 `token` 表示了一个用户的身份令牌，对 服务端 而言，它是只认令牌不认人的。所以说一旦其他人获取到了你的 `token` ，那么就可以伪装成你，来获取对应的敏感数据。
>
> 所以为了保证用户的信息安全，那么对于 `token` 而言就被制定了很多的安全策略，比如：
>
> 1. 动态 `token`（可变 `token`）
> 2. 刷新 `token`
> 3. 时效 `token`
> 4. ...

而我们此时所选择的方案就是 **时效 `token`**

代码中的实现方案为：

1. 在用户登陆时，记录当前 **登录时间**
2. 制定一个 **失效时长**
3. 在接口调用时，根据 **当前时间** 对比 **登录时间** ，看是否超过了 **时效时长**
   1. 如果未超过，则正常进行后续操作
   2. 如果超过，则进行 **退出登录** 操作

单用户登陆方案：

在响应拦截器中判读特点的状态码，例如 401

## 11. 动态 menu 菜单处理方案解析

制定：

1. 对于单个路由规则而言（循环）：
   1. 如果`meta && meta.title && meta.icon` ：则显示在 `menu` 菜单中，其中 `title` 为显示的内容，`icon` 为显示的图标
      1. 如果存在 `children` ：则以 `el-sub-menu（子菜单）` 展示
      2. 否则：则以 `el-menu-item（菜单项）` 展示
   2. 否则：不显示在 `menu` 菜单中

### 生成动态 menu 菜单

整个 `menu` 菜单，分成三个组件来进行处理

1. `SidebarMenu`：处理数据，作为最顶层 `menu` 载体
2. `SidebarItem`：根据数据处理 **当前项为 `el-submenu` || `el-menu-item`**
3. `MenuItem`：处理 `el-menu-item` 样式

## 12. 动态面包屑

**根据当前的 `url` 自动生成面包屑导航菜单**

无论之后路径发生了什么变化，**动态面包屑** 都会正确的进行计算

会分成三大步来实现

1. 创建、渲染基本的面包屑组件
2. 计算面包屑结构数据
3. 根据数据渲染动态面包屑内容

## 13. Icon 图标处理方案：SvgIcon

一共分为两类：

1. `element-plus` 的图标
2. 自定义的 `svg` 图标

对于 `element-plus` 的图标我们可以直接通过 `el-icon` 来进行显示，但是自定义图标的话，我们暂时还缺少显示的方式，所以说我们需要一个自定义的组件，来显示我们自定义的 `svg` 图标。

那么这种自定义组件处理 **自定义 `svg` 图标的形式**，就是我们在面临这种问题时的通用解决方案。

那么对于这个组件的话，它就需要拥有两种能力：

1. 显示外部 `svg` 图标
2. 显示项目内的 `svg` 图标

处理 **内部的 `svg` 图标展示。**

1.  首先导入所有的 `svg` 图标，导入到 `src -> icons -> svg` 处

2.  在 `icons` 下创建 `index.js` 文件，该文件中需要完成两件事情：

    1. 导入所有的 `svg` 图标
    2. 完成 `SvgIcon` 的全局注册

**使用 svg-sprite-loader 处理 svg 图标**

```js
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
}
```

最后全局注册组件就可以了
