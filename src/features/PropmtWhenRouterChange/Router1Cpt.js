import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Modal } from "antd";
import { Prompt, useHistory } from 'react-router-dom';

export default function Cpt1() {
  const [isUpdated, setIsUpdated] = useState(false);
  const history = useHistory();

  const handleChange = (changedFields) => {
    setIsUpdated(changedFields?.length > 0);
  };

  const handlePrompt = (location, action) => {
    if (!isUpdated) {
      return true;
    }
    Modal.confirm({
      title: "未保存",
      content: "当前内容未保存，确认退出吗？",
      onOk(close) {
        console.log(location, action, '111');

        if (action === 'PUSH') {
          history.push(location.pathname);
          close();
          setIsUpdated(false);
        }
      }
    });

    return false;
  };

  const onFinish = (values) => {
    setIsUpdated(false);
    console.log(values);
  };

  return (
    <>
      <Prompt when={isUpdated} message={handlePrompt} />
      <Form onFieldsChange={handleChange} onFinish={onFinish}>
        <Form.Item name="address" label="籍贯">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
      </Form>

    </>

  );
}
