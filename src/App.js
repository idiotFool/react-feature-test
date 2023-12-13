import React, { createContext, useContext, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';

/* hook  test */
import Example from './hooks/Example';
import './hooks/index.css';
import "antd/dist/antd.css";

/* redux test */
import ReduxExample from './redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';

import RefTest from './components/RefTest';
import { FormControlByHook } from './components/FormControl';
import { ContextByHook } from './components/Context';
import IdiotFoolInfo from './components/IdiotFoolInfo';
import { TopCommonCptWithLink, TopCommonCptHistoryFn, TopCommonCptNestedRouter } from './features/nestedRouter/Main';
import { RequireContext } from './features/requireContext';
// import { ReactDOMServer } from './features/reactDOMServer/ReactDOMServer';
// import { VerticalSlide } from './features/swiperSlide/Slide';

// 拖拽
import { MultiTableDrag } from './features/antdAndreactBeautifulDnD';

// 锚点跳转
import { AnchorJump } from './features/anchorJump/AnchorJump';

// 滑动日历
// import SlideContainer from './features/slideCalendar';

// 3D滑动
import Slide3D from './features/cardSlide3D/Slide3D';

// Swiper 3D滑动
import Swiper3D from './features/swiper3D/Slider3D';

const store = createStore(reducers, applyMiddleware(thunk));

export const TreeContext = createContext();

export const useTrees = () => useContext(TreeContext);

const trees = [{
  id: 1,
  type: 'oka'
}, {
  id: 2,
  type: 'baihualin'
}, {
  id: 3,
  type: 'song'
}, {
  id: 4,
  type: 'yang'
}];


function App() {

  return (
    <Provider store={store}>
      <TreeContext.Provider value={{ trees }}>
        <div className="App">
          {/*<Example/>*/}
          {console.log('app')}
          <ReduxExample />
        </div>
        <RefTest />
        <FormControlByHook />

        <ContextByHook />

        <IdiotFoolInfo />
      </TreeContext.Provider >
    </Provider>
  );
}

// features/nestedRouter 功能测试测试代码
export const RouterApp = () => {
  return (
    <Router>
      <TopCommonCptNestedRouter></TopCommonCptNestedRouter>
    </Router>
  );
};


// features/requireContext 功能测试测试代码
export const RequireContextApp = () => {
  return (
    <Router>
      <RequireContext />
    </Router>
  );
};

// export default MultiTableDrag;

// export default AnchorJump;

// export default ReactDOMServer;

// export default VerticalSlide;

// export default SlideContainer;

// export default Slide3D;

export default Swiper3D;
