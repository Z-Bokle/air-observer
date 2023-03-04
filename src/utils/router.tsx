import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
import Default from '../views/Default'
import Spacetime from '../views/Spacetime'
import Main from '../Main'
import Error from '../views/Error'

const router = createBrowserRouter([
    // 在Main中可以实现鉴权
    {path: '/', element: <Main />, errorElement: <Error />, children:[
        {path: '', element: <Default />, handle: {title: 'Air Observer'}},
        {path: 'spacetime', element: <Spacetime />, handle: {title: '空气质量时空态势分析'}}
    ]},
    
])

export default router