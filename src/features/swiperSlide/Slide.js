import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Calendar } from "antd";
import dayjs from "dayjs";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";

import "./Slide.css";

export const VerticalSlide = () => {
  const [date, setDate] = useState(dayjs());

  const handleMove = (swiper) => {
    const { startY, currentY } = swiper.touches;

    // 无法通过swipeDirection来判断滑动的方向， 只能通过滑动的点的坐标；当currentY大于startY时，向下滑动；反之向上滑动;
    setDate(date.add(currentY > startY ? -1 : 1, 'month'));
  };

  const cellRender = (current) => {
    return <div style={{ textAlign: 'center' }} className={current.format('YYYYMMDD') === date.format('YYYYMMDD') ? 'active' : ''}>{current.format('MMDD')}</div>;
  };

  const handleSelect = (current) => {
    setDate(current);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p>这是一个段落</p>
      <Swiper
        direction={"vertical"}
        onSliderFirstMove={(swiper) => handleMove(swiper)}
        className="mySwiper"
      >
        <SwiperSlide>
          <Calendar
            dateFullCellRender={cellRender}
            value={date.startOf("month")}
            onSelect={handleSelect}
            headerRender={() => null}
          />
        </SwiperSlide>
      </Swiper>

      <p>这是一个段落</p>
    </div>
  );
};
