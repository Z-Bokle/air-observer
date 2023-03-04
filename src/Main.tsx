import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd5'
import { Layout, Menu } from 'antd5'
import { Outlet, useMatches, useNavigate } from 'react-router-dom';
import { HeatMapOutlined, StockOutlined, PieChartOutlined } from '@ant-design/icons'
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
  getItem('时空态势分析', 'spacetime', <HeatMapOutlined />),
  getItem('Option 2', '2', <StockOutlined />, [
    getItem('Sub 1', '2-1'),
    getItem('Sub 2', '2-2')
  ]),
  getItem('Option 3', '3', <PieChartOutlined />)
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
  const currentMatch =  matches[1]
  useEffect(() => {
    const title = (currentMatch.handle as any)?.title
    if(typeof title === 'string') {
      document.title = title
      store.dispatch(mainSlice.actions.setTitle(title))
    }
  }, [currentMatch])

  return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{ height: 34, margin: 16, background: 'rgba(255, 255, 255, 0.2)', textAlign: 'center', fontSize: 24, color: 'white' }} >
            {/* <span style={{margin: 4}}>Air Observer</span> */}
          </div>
          <Menu theme='dark' mode='inline' items={items} onSelect={({keyPath}) => setLink(keyPath.reverse().join('/'))} />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, margin: '4px 4px 0 4px', borderRadius: 4, background: 'rgba(0, 0, 0, 0.6)' }} >
            <div style={{textAlign: 'center', fontSize: 36, color: 'white'}}>{store.getState().main.title}</div>
          </Header>
          <Content style={{ margin: 4 }}>
            <div style={{ padding: 24, height: '100%', borderRadius: 4}}>
              <Outlet /> {/* 子路由出口 */}
            </div>
          </Content>
        </Layout>
      </Layout>
  )
}
