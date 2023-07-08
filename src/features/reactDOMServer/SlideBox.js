import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { renderToString } from 'react-dom/server';
import ReactDOM from "react-dom";
import { Spin } from 'antd';
import { ServerCtx } from './context';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';

// Warning: useLayoutEffect does nothing on the server, 
// because its effect cannot be encoded into the server renderer's output format. 
// This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. 
// To avoid this, useLayoutEffect should only be used in components that render exclusively on the client;;
// React.useLayoutEffect = React.useEffect; // 关闭warning

// 滑动组件是静态的
const SlideCpts = ({ now, dispatch }) => {
  console.log(now, 'slide');
  const handleClick = () => {
    console.log('测试append的点击事件');
    dispatch({ type: 'CHANGE_COUNT' });
  };
  const styles = {
    backgroundColor: '#ccc',
    width: '100%',
    height: '60px'
  };

  return <div onClick={handleClick} style={styles}>这是append的滑动组件</div>;
};

// 动态获取内容
const DynamicSlideCpts = ({ now, dispatch }) => {
  console.log(now, 'slide');
  const [data, setDate] = useState([]);
  const handleClick = () => {
    console.log('测试append的点击事件');
    dispatch({ type: 'CHANGE_COUNT' });
  };
  const styles = {
    backgroundColor: '#ccc',
    width: '100%',
    height: '60px'
  };

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setDate([1, 2]); // 随意
      }, 2000);
    });
  });

  if (data.length === 0) {
    return <Spin />;
  }

  return <div onClick={handleClick} style={styles}>这是append的滑动组件</div>;
};


let slideID = 1;
export default () => {
  const { now, dispatch } = useContext(ServerCtx);
  console.log(now, '父组件');

  useEffect(() => {
    const dom = document.getElementById(`slide_${slideID}`);
    dom && ReactDOM.hydrate(<DynamicSlideCpts now={now} dispatch={dispatch} />, dom);
  }, [dispatch, now]);

  const handleNext = (swiper) => {
    console.log('next事件', swiper);
    slideID += 1;
    swiper.appendSlide(renderToString(<SwiperSlide><div id={`slide_${slideID}`}></div></SwiperSlide>));

    ReactDOM.hydrate(<DynamicSlideCpts now={now} dispatch={dispatch} />, document.getElementById(`slide_${slideID}`));
  };

  return (
    <Swiper
      spaceBetween={50}
      onSlideNextTransitionEnd={handleNext}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
    </Swiper>
  );
};