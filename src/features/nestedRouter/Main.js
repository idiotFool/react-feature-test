import React, { useState } from "react";
import { Switch, Route, useHistory, Link, Redirect } from 'react-router-dom'
import { MainHome } from './MainHome';
import { MainAbout } from './MainAbout';
import { AboutRouterCpt1 } from './AboutRouterCpt1'
import { AboutRouterCpt2 } from './AboutRouterCpt2'

import './style.css'

// 1: 使用Link做路由跳转
export const TopCommonCptWithLink = () =>
{

  const [count, setCount] = useState(0);
  return (
    <>
      <div className='layout'>
        <div className='topCommon'>
          <h2>当前的计数是： {count}</h2>
          <button onClick={() => setCount(count + 1)}>更新计数</button>
        </div>
      </div>

      <div className='layout'>
        <button>
          <Link to='/wukong'>悟空</Link>
        </button>
        <button><Link to='/bajie'>八戒</Link></button>
      </div>

      <div className='content'>
        <Switch>
          <Route path='/wukong'>
            <AboutRouterCpt1></AboutRouterCpt1>
          </Route>
          <Route path='/bajie'>
            <AboutRouterCpt2></AboutRouterCpt2>
          </Route>
        </Switch>
      </div>
    </>
  )
}

// 2: 使用history对象进行路由跳转
export const TopCommonCptHistoryFn = () =>
{
  const [count, setCount] = useState(0);
  const history = useHistory();

  const clickHandler = (e, route) =>
  {
    e.preventDefault();
    history.push(route)
  }

  return (
    <>
      <div className='layout'>
        <div className='topCommon'>
          <h2>当前的计数是： {count}</h2>
          <button onClick={() => setCount(count + 1)}>更新计数</button>
        </div>
      </div>

      <div className='layout'>
        <button onClick={(e) => { clickHandler(e, '/wukong') }}>悟空</button>
        <button onClick={(e) => { clickHandler(e, '/bajie') }}>八戒</button>
      </div>

      <div className='content'>
        <Switch>
          <Route path='/wukong'>
            <AboutRouterCpt1></AboutRouterCpt1>
          </Route>
          <Route path='/bajie'>
            <AboutRouterCpt2></AboutRouterCpt2>
          </Route>
        </Switch>
      </div>
    </>
  )
}

// 3: 通过嵌套路由加载
export const TopCommonCptNestedRouter = () =>
{
  const history = useHistory();

  const clickHandler = (e, route) =>
  {
    e.preventDefault();
    history.push(route)
  }

  return (
    <>
      <div className='layout'>
        <button onClick={(e) => { clickHandler(e, '/home') }}>home</button>
        <button onClick={(e) => { clickHandler(e, '/about') }}>about</button>
      </div>

      <div className='content'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home'></Redirect>
          </Route>
          <Route path='/home' exact>
            <MainHome></MainHome>
          </Route>
          <Route path='/about'>
            <MainAbout></MainAbout>
          </Route>
        </Switch>
      </div>
    </>
  )
}
