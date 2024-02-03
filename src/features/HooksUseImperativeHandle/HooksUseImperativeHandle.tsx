import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { Button } from "antd";

const ChildrenCpts: React.FC<any> = forwardRef((props, ref) => {
  console.log("接受到的参数: ", props);

  const handleSubmit = () => {
    alert("我是子组件的submit方法");
  };

  useImperativeHandle(ref, () => {
    return {
      handleSubmit
    };
  });

  return <h1>我是子组件</h1>;
});

export default function HooksUseImperativeHandle() {
  const childRef = useRef<any>();
  const handleClick = () => childRef.current.handleSubmit();

  return (
    <>
      <Button onClick={handleClick}>我要调用子组件的方法</Button>
      <ChildrenCpts ref={childRef} name="cpt" />
    </>
  );
}
