import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Calendar } from "antd";
import dayjs from "dayjs";
import { CalendarCtx } from "./index";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import './SlideCalendar.css';

dayjs.extend(weekday);
dayjs.extend(localeData);

export const SlideCalendar = () => {
  const { date, setDate } = useContext(CalendarCtx);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const firstRef = useRef(false);

  useEffect(() => {
    swiperInstance && swiperInstance.update();
  }, [swiperInstance, date.format('YYYYMMDD')]);

  const cellRender = (current) => {
    const handleClick = (e, current) => {
      setDate(current);
      const actives = document.querySelectorAll('.swiper-slide-active .ant-picker-content td .active');

      actives.forEach((item => {
        item.removeAttribute('class');
      }));

      e.target.className += 'active';
    };
    console.log(current.format('MMDD'));
    return <div onClick={(e) => handleClick(e, current)} className={current.date() === date.date() ? 'active' : ''}>{current.format("MMDD")}</div>;;
  };

  const handleNext = (swiper) => {
    console.log("end");

    if (!firstRef.current) {
      firstRef.current = true;
      return;
    }

    const div = document.createElement("div");
    const id = `slide_${date
      .add(2, "month")
      .startOf("month")
      .format("YYYYMMDD")}`;
    ReactDOM.render(
      <SwiperSlide>
        <div id={id}></div>
      </SwiperSlide>,
      div
    );

    swiper.removeSlide(0);
    swiper.appendSlide(div.innerHTML);

    ReactDOM.render(
      <Calendar
        value={date.add(2, "month")}
        headerRender={() => null}
        dateFullCellRender={cellRender}
      />,
      document.getElementById(id)
    );

    setDate(date.add(1, "month"));
  };

  const handlePrev = (swiper) => {
    const div = document.createElement("div");
    const id = `slide_${date
      .add(-2, "month")
      .startOf("month")
      .format("YYYYMMDD")}`;
    ReactDOM.render(
      <SwiperSlide>
        <div id={id}></div>
      </SwiperSlide>,
      div
    );

    swiper.removeSlide(2);
    swiper.prependSlide(div.innerHTML);

    ReactDOM.render(
      <Calendar
        value={date.add(-2, "month")}
        headerRender={() => null}
        dateFullCellRender={cellRender}
      />,
      document.getElementById(id)
    );

    setDate(date.add(-1, "month"));
    swiper.update();
  };

  console.log("swiper实例", swiperInstance);
  return (
    <>
      <h1>{date.format("YYYYMMDD")}</h1>
      <Swiper
        initialSlide={1}
        onSlideNextTransitionEnd={handleNext}
        onSlidePrevTransitionEnd={handlePrev}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        <SwiperSlide>
          <div

          >
            <Calendar
              dateFullCellRender={cellRender}
              value={date.startOf("month")}
              headerRender={() => null}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <Calendar
              dateFullCellRender={cellRender}
              value={date.startOf("month")}
              headerRender={() => null}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <Calendar
              dateFullCellRender={cellRender}
              value={date.startOf("month")}
              headerRender={() => null}
            />
          </div>

        </SwiperSlide>
      </Swiper>
    </>
  );
};
