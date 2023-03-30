import React, { useEffect, useState } from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts'
import { ChartProps } from '../type'
import { Card } from 'antd'
import { PollutionChartData } from './type'
import { joinParams, jsonGet } from '../../../utils/request'
import { useDrag } from 'react-dnd'
import { Charts as ChartsSymbol } from '../../../symbols'
import { dragEvents } from '../../../utils/eventBus'

const PollutionChart: React.FC<ChartProps.PollutionChartProps> = (props) => {

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'Pollution', title: props.title },
    type: ChartsSymbol,
    end: (draggedItem, monitor) => {
      const result = monitor.getDropResult()
      if (draggedItem && result) {
        props.onDrop?.((result as { index: number }).index, (
          <PollutionChart
            height={300}
            title="某时间段内某污染物全国的日平均值"
          />))
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  useEffect(() => {
    props.onDragging?.(isDragging)
  }, [isDragging])

  const [data, setData] = useState<PollutionChartData[]>([])

  useEffect(() => {
    jsonGet<PollutionChartData[]>(joinParams('/charts/pollutant_day_avg', {
      start_year: 2013,
      end_year: 2013,
      start_month: 1,
      end_month: 2,
      pollutant: 'PM2.5'
    }))
      .then((data) => data ? setData(data) : null)
  }, [])

  return (
    <Card className={props.className + ' w-[28vw] h-[38vh]'} title={props.title} ref={dragRef}>
      <Chart height={props.height} width={400} padding="auto" data={data} autoFit>
        <Interval position="date*average" />
        <Tooltip shared />
      </Chart>
    </Card>

  )
}

export default PollutionChart