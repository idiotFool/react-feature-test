import React from 'react';
import { Form, Input } from 'antd';

export default function Cpt2() {
  return <Form>
    <Form.Item name='name' label="姓名">
      <Input />
    </Form.Item>
    <Form.Item name='country' label="国家">
      <Input />
    </Form.Item>
  </Form>;
};