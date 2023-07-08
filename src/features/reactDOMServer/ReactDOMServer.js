import React, { useReducer } from "react";
import SlideBox from './SlideBox';
import { ServerCtx } from './context';

const initialState = {
  now: 1
};

const reducer = function (state, action) {
  if (action.type === 'CHANGE_COUNT') {
    return {
      ...state,
      now: state.now + 1
    };
  } else {
    return state;
  }
};

export const ReactDOMServer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ServerCtx.Provider value={{ ...state, dispatch }}>
      <div>
        <h1>用来测试RenderToString与Hydrate对状态更新的响应</h1>
        <SlideBox />

        <hr />
        <h2>now的值为 {state.now}</h2>
      </div>
    </ServerCtx.Provider>
  );
};
