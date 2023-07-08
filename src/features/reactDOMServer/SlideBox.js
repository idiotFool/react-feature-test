import React, { useCallback, useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { renderToString } from 'react-dom/server';
import ReactDOM from "react-dom";
import { ServerCtx } from './context';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';

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

let slideID = 1;
export default () => {
  const { now, dispatch } = useContext(ServerCtx);
  console.log(now, '父组件');

  useEffect(() => {
    const dom = document.getElementById(`slide_${slideID}`);
    dom && ReactDOM.hydrate(<SlideCpts now={now} dispatch={dispatch} />, dom);
  }, [dispatch, now]);

  const handleNext = (swiper) => {
    console.log('next事件', swiper);
    slideID += 1;
    swiper.appendSlide(renderToString(<SwiperSlide><div id={`slide_${slideID}`}></div></SwiperSlide>));

    ReactDOM.hydrate(<SlideCpts now={now} dispatch={dispatch} />, document.getElementById(`slide_${slideID}`));
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