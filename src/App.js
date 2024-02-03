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
// import Swiper3D from './features/swiper3D/Slider3D';

// 滚动加载
import ScrollLoading from './features/scrollLoading';

// 通过react-router-dom的Promt组件实现路由切换时页面更新数据是否需要保存的功能
import PromptWhenChange from './features/PropmtWhenRouterChange/PromptWhenChange';

// antd 的datepicker组件，定位到某个月份，但是又不显示对应的值的探索
import AntdDatePickerWithDefaultValue from './features/antdDatePickerWithDefaultValue/AntdDatePickerWithDefaultValue';

// 使用useImperativeHandle hook实现父组件调用子组件的方法
import HooksUseImperativeHandle from './features/HooksUseImperativeHandle/HooksUseImperativeHandle';


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

// export default Swiper3D;

// export default ScrollLoading;

// export default PromptWhenChange;

// export default AntdDatePickerWithDefaultValue;

export default HooksUseImperativeHandle;
