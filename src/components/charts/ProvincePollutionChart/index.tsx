import React, { useState, useEffect } from 'react';
import {
  Chart,
  Point,
  Line,
  Axis,
  Area,
  Tooltip,
  Coordinate
} from 'bizcharts'

import { ChartProps } from '../type'
import { Button, Card } from 'antd'
import { useDrag } from 'react-dnd'
import { Charts as ChartsSymbol } from '../../../symbols'
import { joinParams, jsonGet } from '../../../utils/request'

const ProvincePollutionChart: React.FC<ChartProps.ProvincePollutionChartProps> = (props) => {

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'Pollution', title: props.title },
    type: ChartsSymbol,
    end: (draggedItem, monitor) => {
      const result = monitor.getDropResult()
      if (draggedItem && result) {
        props.onDrop?.((result as { index: number }).index, {
          key: (result as { index: number }).index,
          chartType: 'ProvincePollution',
          disableDrag: true,
          height: 300,
          title: "省级污染物雷达图"
        })
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  useEffect(() => {
    props.onDragging?.(isDragging && !(props.disableDrag))
  }, [isDragging])

  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (props.adcode && props.year && props.month) {
      (async () => {
        const rawData = await jsonGet<any[]>(joinParams('/charts/pollutantAll_area_avg', {
          year: props.year,
          month: props.month,
          adcode: props.adcode
        }))
        setData(rawData || [])
      })()
    }
  }, [props.year, props.month, props.adcode])

  // console.log(data)

  return (
    <Card
      className={props.className + ' w-[28vw] shrink-0'}
      title={props.title} ref={(!props.disableDrag) ? dragRef : null}
      extra={props.showDelButton && <Button onClick={() => props.onDel?.()}>删除</Button>}>
      <Chart
        height={props.height}
        data={data}
        autoFit
        interactions={['legend-highlight']}
        placeholder
      >
        <Coordinate type="polar" radius={0.8} />
        <Tooltip shared />
        <Point
          position="pollutant*value"
          color="user"
          shape="circle"
        />
        <Line
          position="pollutant*value"
          color="user"
          size={2}
        />
        <Area
          position="pollutant*value"
          color="user"
        />
        {
          // 棱角和圆形，默认圆形
        }
        <Axis name="value" grid={{ line: { type: 'line' } }} />
        {
          // 不需要轴的最外圈
        }
        <Axis
          name="pollutant"
          line={false}
          label={{
            autoHide: false,
            autoEllipsis: true
          }} />
      </Chart>
    </Card>

  )
}

export default ProvincePollutionChart