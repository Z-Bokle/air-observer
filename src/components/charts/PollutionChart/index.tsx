import React, { useEffect, useState } from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts'
import { ChartProps } from '../type'
import { Button, Card, Select } from 'antd'
import { PollutionChartData } from './type'
import { joinParams, jsonGet } from '../../../utils/request'
import { useDrag } from 'react-dnd'
import { Charts as ChartsSymbol } from '../../../symbols'

const PollutionChart: React.FC<ChartProps.PollutionChartProps> = (props) => {

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'Pollution', title: props.title },
    type: ChartsSymbol,
    end: (draggedItem, monitor) => {
      const result = monitor.getDropResult()
      if (draggedItem && result) {
        props.onDrop?.((result as { index: number }).index, {
          key: (result as { index: number }).index,
          chartType: 'Pollution',
          disableDrag: true,
          height: 300,
          title: "某时间段内某污染物全国的日平均值"
        })
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  useEffect(() => {
    props.onDragging?.(isDragging && !(props.disableDrag))
  }, [isDragging])

  const [data, setData] = useState<PollutionChartData[]>([])
  const [pollutant, setPollutant] = useState('PM2.5')

  useEffect(() => {
    jsonGet<PollutionChartData[]>(joinParams('/charts/pollutant_day_avg', {
      start_year: props.year,
      end_year: props.year,
      start_month: props.month,
      end_month: props.month,
      pollutant
    }))
      .then((data) => data ? setData(data) : null)
  }, [pollutant, props.month, props.year])

  return (
    <Card
      className={props.className + ' w-[28vw] shrink-0'}
      title={props.title} ref={(!props.disableDrag) ? dragRef : null}
      extra={
        <>
          <Select
            className='w-28 mx-3'
            value={pollutant}
            onSelect={(pollutant) => setPollutant(pollutant)}
            options={[
              { value: 'PM2.5', label: 'PM2.5' },
              { value: 'PM10', label: 'PM10' },
              { value: 'NO2', label: '二氧化氮' },
              { value: 'O3', label: '臭氧' },
              { value: 'SO2', label: '二氧化硫' },
              { value: 'CO', label: '一氧化碳' },
            ]}
          />
          {props.showDelButton && <Button onClick={() => props.onDel?.()}>删除</Button>}
        </>

      }>
      <Chart height={props.height} padding="auto" data={data} autoFit placeholder>
        <Interval position="date*average" />
        <Tooltip shared />
      </Chart>
    </Card>

  )
}

export default PollutionChart