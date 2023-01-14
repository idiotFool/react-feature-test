import React from 'react';
import { TopCommonCpt } from './TopCommonCpt';
import { Route, Switch } from 'react-router-dom';
import { AboutRouterCpt } from './AboutRouterCpt'
import { useRouteMatch, Redirect } from 'react-router-dom'

import './style.css';

export const MainAbout = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <TopCommonCpt></TopCommonCpt>

      <div className='content'>
        <Switch>
          <Route path={path} exact>
            <Redirect to={ `${path}/wukong`}></Redirect>
          </Route>
          <Route path={`${path}/:monster`}>
            <AboutRouterCpt></AboutRouterCpt>
          </Route>
        </Switch>
      </div>
    </>
  );
}