## 重要

### 此处想解决的问题：

> 1 Swiper 组件如何动态的 append 一个滑动单元

      Swiper实例有对应的实现方式， appendSlide， prependSlide等

> 2 appendSlide， prependSlide 只能追加 HTML element； 无法追加 react element

      借助react-dom/server 的renderToString方法

> 3 renderToString 后的组件无法交互

      借助ReactDOM的hydrate方法

> 4 renderToString 的组件内部触发状态更新后，组件内部无法接收到最新的状态

      在useEffect中重新hydrate一次
