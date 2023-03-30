import { Button, Card, Drawer, Space } from 'antd'
import React, { forwardRef, useState } from 'react'
import PollutionChart from '../charts/PollutionChart'
import { RelationChart } from '../charts/RelationChart'
import { ChartsManageCardProps } from './types'

const ChartsManageCard =
  forwardRef<HTMLDivElement, ChartsManageCardProps>((props, ref) => {

    const [openDrawer, setOpenDrawer] = useState(false)

    return (
      <>
        <Card title='图表选择' ref={ref}>
          <Button onClick={() => setOpenDrawer(true)}>图表</Button>
        </Card>
        <Drawer
          title="图表"
          placement="right"
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          width={800}>
          <Space wrap>
            <RelationChart
              height={300}
              title='111'
              className=''
              onDragging={(isDragging) => setOpenDrawer(!isDragging)}
              onDrop={props.onDrop}
            />

            <PollutionChart
              height={300}
              title="某时间段内某污染物全国的日平均值"
              onDragging={(isDragging) => setOpenDrawer(!isDragging)}
              onDrop={props.onDrop}
            />
          </Space>
        </Drawer>
      </>

    )
  })

export default ChartsManageCard