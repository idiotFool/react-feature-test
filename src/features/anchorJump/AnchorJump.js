import React, { useEffect, useLayoutEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route, Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getData } from './mockApi';
import './AnchorJump.css';

const NavBox = styled.div`
  display: flex;
  justify-content: center;
  ul {
    width: 300px;
    display: flex;
    justify-content: center;
    height: 80px;
    align-items: center;
    li {
      &:first-child {
        margin-right: 10px;
        cursor: pointer;
      }
      a {
        border: 1px solid #ccc;
        width: 100%;
        height: 100%;
        width: 80px;
        height: 60px;
        border-radius: 8px;
        display: inline-block;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        &:hover {
                color: #fff;
                background: #76cd66d9
              }
      }
    }
  }
`;

const HomePage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('detail?tab=anchor');
  };
  return <button onClick={handleClick}>跳转到详情页锚点出</button>;
};

const Detail = () => {
  const param = useLocation();
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    const anchor = new URLSearchParams(param.search).get('tab');
    const dom = document.querySelector(`#${anchor}`);
    dom && dom.scrollIntoView({ block: "start", inline: "nearest", behavior: 'smooth' });

  });

  useEffect(() => {
    getData().then(res => {
      setData(res);
    });
  }, []);

  return (
    <div className='detailWrapper'>
      <h1>详情页面</h1>
      {
        data.length > 0 && (
          <>
            <div className='mockContent'></div>
            <div className='anchorNode' id='anchor'>锚点的位置</div>
            <div className='mockContent'></div>
          </>
        )
      }

    </div>
  );
};

export const AnchorJump = () => {
  return <Router>
    <NavBox>
      <ul>
        <li><Link to='/home'>首页</Link></li>
        <li><Link to='/detail'>详情页</Link></li>
      </ul>
    </NavBox>

    <Switch>
      <Route path='/' exact>
        <HomePage />
      </Route>
      <Route path='/home'>
        <HomePage />
      </Route>
      <Route path='/detail'>
        <Detail />
      </Route>
    </Switch>
  </Router>;
};