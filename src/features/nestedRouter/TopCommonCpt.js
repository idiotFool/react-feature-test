import React, { useState } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import './style.css';

const datas = [{
  id: '1',
  value: '悟空',
  path: 'wukong',
}, {
  id: '2',
  value: '八戒',
  path: 'bajie'
}];

export const TopCommonCpt = () => {
  const [count, setCount] = useState(0);
  const history = useHistory();
  // const { url } = useRouteMatch();
  const location = useLocation();
  const [activeId, setActiveId] = useState(() => {
    const matchObj = datas.filter(data => location.pathname.includes(data.path))[0];
    return matchObj?.id || '1';
  });

  const clickHandler = (path, id) => {
    console.log(path, 'dianjia');
    history.push(path);
    setActiveId(id);
  };

  const url = '/about';
  return (
    <>
      <div className='layout'>
        <div className='topCommon'>
          <h2>当前的计数是： {count}</h2>
          <button onClick={() => setCount(count + 1)}>更新计数</button>
        </div>
      </div>

      <div className='layout'>
        {
          datas.map(({ value, id, path }) => {
            return <button key={id} className={activeId === id ? 'active' : ''} onClick={() => clickHandler(`${url}/${path}`, id)}>{value}</button>;
          })
        }
      </div>
    </>
  );
};

