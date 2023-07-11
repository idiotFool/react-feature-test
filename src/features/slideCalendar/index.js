import React, { useState } from 'react';
import dayjs from 'dayjs';
import { SlideCalendar } from './SlideCalendar';

export const CalendarCtx = React.createContext(null);


export default function SlideContainer() {
  const [date, setDate] = useState(dayjs());
  return (
    <CalendarCtx.Provider value={{ date, setDate }}>
      <SlideCalendar />
    </CalendarCtx.Provider>
  );
}