import React from 'react'
import { Row, Col } from 'antd5'
import style from '../styles/Spacetime.module.css'

import PollutionMap from '../components/PollutionMap'
import PollutionOptionsCard from '../components/PollutionOptionsCard'
import PollutionTimeline from '../components/PollutionTimeline'

// 拼接class名
function joinClassNames(...args: string[]) {
  return args.join(' ')
}

// Todo Map中引入热力图和其它所需图层
// Todo 侧边栏设置card，用于控制不同的热力图层，实现数据按需展示
// Todo 底栏设置时间轴，实现自动播放/拖动变化热力图
// Todo 点击地图实现查看该点附近数据点的具体信息，展示在地图浮窗上

export default function Spacetime() {

  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Row>
            <Col className={joinClassNames(style.block, style.main)}>
              <PollutionMap />
            </Col>
          </Row>

          <Row>
            <Col className={joinClassNames(style.block, style.footer)}>
              <PollutionTimeline />
            </Col>
          </Row>
        </Col>

        <Col span={6} className={joinClassNames(style.block, style.side)}>
          <PollutionOptionsCard />
        </Col>
      </Row>

    </div>
  )
}
