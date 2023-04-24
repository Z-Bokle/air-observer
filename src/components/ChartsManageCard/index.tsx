import { Button, Card, Drawer, Space } from 'antd'
import React, { forwardRef, useState } from 'react'
import PollutionChart from '../charts/PollutionChart'
import { RelationChart } from '../charts/RelationChart'
import { ChartsManageCardProps } from './types'
import { TemperatureChart } from '../charts/TemperatureChart'
import ProvincePollutionChart from '../charts/ProvincePollutionChart'

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
              title="污染物全国的日平均值"
              onDragging={(isDragging) => setOpenDrawer(!isDragging)}
              onDrop={props.onDrop}
              year={2013}
              month={1}
            />

            <TemperatureChart
              height={300}
              title='全国月度温度折线图'
              onDragging={(isDragging) => setOpenDrawer(!isDragging)}
              onDrop={props.onDrop}
              year={2013}
              month={1}
            />

            <ProvincePollutionChart
              height={300}
              title='省级污染物雷达图'
              onDragging={(isDragging) => setOpenDrawer(!isDragging)}
              onDrop={props.onDrop}
              adcode={110000}
              year={2013}
              month={1}
            />

          </Space>
        </Drawer>
      </>

    )
  })

export default ChartsManageCard