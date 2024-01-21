import React, { useState, useEffect } from "react";
import { Modal } from 'antd';
import { Switch, Route, useHistory, Link, Redirect, Router, BrowserRouter, Prompt } from "react-router-dom";
import Cpt1 from "./Router1Cpt";
import Cpt2 from "./Router2Cpt ";

import './PromptWhenChange.css';

export default function PromptWhenChange() {
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    const handleBeforeUpload = (event) => {
      const message = '当前页面有未保存数据，确认要离开吗';
      if (isUpdated) {
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUpload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUpload);
    };
  }, [isUpdated]);

  const handlePrompt = (message, action) => {
    Modal.confirm({
      content: message,
      onOk() {
        console.log(1111111);
        Modal.destroyAll();
      },
      onCancel() {
        console.log('Cancel');
        Modal.destroyAll();
      },
    });

    console.log(action, 'action');
  };

  return (
    <BrowserRouter>
      <div className="layout">
        <button>
          <Link to="/wukong">悟空</Link>
        </button>
        <button>
          <Link to="/bajie">八戒</Link>
        </button>
      </div>

      <div className="content">
        <Switch>
          <Route path="/wukong">
            <Cpt1 setIsUpdated={setIsUpdated} />
          </Route>
          <Route path="/bajie">
            <Cpt2 />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
