### 【问题】不同的路由下使用到了同一个组件；  如何在路由切换时， 保证共有的组件的状态保持不变，只更新两个路由中不同的地方







##  注意： 1 useHistory只能用在子组件上， 不可以用在父组件或是组件本身上； 否则返回值为undefined；  可以将Router提升到上一层包裹的， 然后在子组件中使用useHistory
##  注意： 2 通过Redirect组件跳转时，对应的路由不渲染?? 记得加上exact属性； 路由完全匹配

```
  <Switch>
    <Route path='/' exact>
        <Redirect to='/home'></Redirect>
    </Route>
    <Route path='/home'>
        <MainHome></MainHome>
    </Route>
    <Route path='/about'>
        <MainAbout></MainAbout>
    </Route>
</Switch>
```

1 当加载races路由时， 渲染顶部共有组件和路由组件
2 
```
<Route path={`${path}/:type`}>
    <RaceList></RaceList>
</Route>
```

3 在RaceList中； 根据type来使用对应的api接口获取数据进行渲染
