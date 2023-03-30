import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
import Default from '../views/Default'
import Spacetime from '../views/Spacetime'
import Main from '../Main'
import Error from '../views/Error'
import Trend from '../views/Trend'
import Events from '../views/Events'
import Pollution from '../views/Pollution'

const router = createBrowserRouter([
  // 在Main中可以实现鉴权
  {
    path: '/', element: <Main />, errorElement: <Error />, children: [
      { path: '', element: <Default />, handle: { title: 'Air Observer' } },
      { path: 'spacetime', element: <Spacetime />, handle: { title: '时空态势分析' } },
      { path: 'event', element: <Events />, handle: { title: '特殊气象事件分析' } },
      { path: 'pollution', element: <Pollution />, handle: { title: '污染传播分析' } },
    ]
  },
])

export default router