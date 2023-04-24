import React, { useEffect, useState } from 'react'
import {
  Axis,
  Chart,
  Line
} from 'bizcharts'

import type { ChartProps } from '../type'
import { Button, Card, Select } from 'antd'
import { useDrag } from 'react-dnd'
import { Charts as ChartsSymbol } from '../../../symbols'
import { jsonGet } from '../../../utils/request'

export const TemperatureChart: React.FC<ChartProps.TemperatureChartProps> = (props) => {

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'Temperature', title: props.title },
    type: ChartsSymbol,
    end: (draggedItem, monitor) => {
      const result = monitor.getDropResult()
      if (draggedItem && result) {
        props.onDrop?.((result as { index: number }).index,
          {
            key: (result as { index: number }).index,
            chartType: 'Temperature',
            title: props.title,
            disableDrag: true,
            height: 300
          }
        )
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  useEffect(() => {
    props.onDragging?.(isDragging && !(props.disableDrag))
  }, [isDragging])

  const [data, setData] = useState<any[]>([])
  const [selection, setSelection] = useState('temperature')

  useEffect(() => {
    if (props.year && props.month) {
      (async () => {
        const data = await jsonGet<any[]>(`/charts/temp_day_avg?start_year=${props.year}&start_month=${props.month}&end_year=${props.year}&end_month=${props.month}`)
        setData(data?.map((item) => ({ ...item, temperature: (item.temperature - 273.15).toFixed(1) })) || [])
      })()
    }
  }, [props.year, props.month])

  return (
    <Card
      className={props.className + ' w-[28vw] shrink-0'}
      title={props.title} ref={(!props.disableDrag) ? dragRef : null}
      extra={
        <div className='flex'>
          <Select
            className='mx-3'
            value={selection}
            onSelect={(selection) => setSelection(selection)}
            options={[{ label: '温度', value: 'temperature' }, { label: '湿度', value: 'humidity' }]} />
          {props.showDelButton && <Button onClick={() => props.onDel?.()}>删除</Button>}
        </div>
      }>
      <Chart autoFit height={props.height} data={data} forceUpdate scale={{ temperature: { type: 'linear' } }} placeholder>
        <Line
          shape="smooth"
          position={`date*${selection}`}
          color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
        />
        <Axis name="date" />
        <Axis
          name={selection}
          label={{
            formatter: val => `${val}${selection === 'temperature' ? '°C' : '%'}`
          }}
        />
      </Chart>
    </Card>
  )
}

