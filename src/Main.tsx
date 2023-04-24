import React, { useEffect, useState } from 'react'
import { Button, MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { Outlet, useMatches, useNavigate } from 'react-router-dom';
import { HeatMapOutlined, StockOutlined, PieChartOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import store from './redux/store'
import mainSlice from './redux/mainSlice'

const { Header, Content, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem('时空态势分析', 'spacetime', <StockOutlined />),
  getItem('特殊气象事件分析', 'event', <HeatMapOutlined />),
  // getItem('污染传播分析', 'pollution', <PieChartOutlined />)
]

export default function Main() {

  const [collapsed, setCollapsed] = useState(false)
  const [link, setLink] = useState('/')
  const navigate = useNavigate()

  useEffect(() => {
    navigate(link)
  }, [navigate, link])

  // 页面标题和页内标题随路由改变
  const matches = useMatches()
  const currentMatch = matches[matches.length - 1]
  useEffect(() => {
    const title = (currentMatch.handle as any)?.title
    if (typeof title === 'string') {
      document.title = title
      store.dispatch(mainSlice.actions.setTitle(title))
    }
  }, [currentMatch])

  return (
    <Layout className='min-h-screen'>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div className='text-white h-9 m-4 text-center text-2xl bg-slate-500' >
          {
            !collapsed ? <span className='m-1'>Air Observer</span> : null
          }
        </div>
        <Menu theme='dark' mode='inline' items={items} onSelect={({ keyPath }) => setLink(keyPath.reverse().join('/'))} />
      </Sider>
      <Layout className="site-layout">
        <Header className='p-0 m-0'>
          <div className='w-full flex mt-2 items-end'>
            <Button type="primary" onClick={() => setCollapsed(!collapsed)} className=''>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div className='text-center text-4xl text-white w-full'>{store.getState().main.title}</div>
          </div>

        </Header>
        <Content className='m-1'>
          <div className='p-6 h-full rounded'>
            <Outlet /> {/* 子路由出口 */}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
