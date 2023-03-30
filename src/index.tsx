import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import router from './utils/router';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import 'antd/locale/zh_CN'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <DndProvider backend={HTML5Backend}>
    <RouterProvider router={router} />
  </DndProvider>
  // </React.StrictMode>
);