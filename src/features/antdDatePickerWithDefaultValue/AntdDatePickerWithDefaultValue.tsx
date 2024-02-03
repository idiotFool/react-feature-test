import React, { useState, useEffect } from "react";
import { Form, DatePicker } from "antd";
import moment from "moment";
import type { RangePickerProps } from "antd/es/date-picker";

export default function AntdDatePickerWithDefaultValue() {
  const [defaultDate, setDefaultDate] = useState<any>(null);
  const [, forceUpdate] = useState<object>();

  // 可选的时间范围 2024-2-2 -> 2024-2-10
  const handleDisabledDate: RangePickerProps["disabledDate"] = (current) => {
    const startTime = moment("2024-04-02");
    const endTime = moment("2024-04-10");

    return current.unix() < startTime.unix() || current.unix() > endTime.unix();
  };

  useEffect(() => {
    setTimeout(() => {
      setDefaultDate(moment("2024-04-02", "YYYY-MM-DD"));
    }, 2000);
  }, []);

  return (
    <Form>
      <Form.Item name="date" label="请选择日期">
        <DatePicker
          disabledDate={handleDisabledDate}
          defaultPickerValue={defaultDate}
        />
      </Form.Item>
    </Form>
  );
}
