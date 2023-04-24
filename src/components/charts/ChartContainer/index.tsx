import { Card } from 'antd'
import React, { ReactNode, forwardRef, useMemo } from 'react'
import { ChartContainerProps, ChartSchema } from '../type'
import { RelationChart } from '../RelationChart'
import { TemperatureChart } from '../TemperatureChart'
import PollutionChart from '../PollutionChart'
import dayjs from 'dayjs'
import ProvincePollutionChart from '../ProvincePollutionChart'


const ChartContainer =
  forwardRef<HTMLDivElement, ChartContainerProps>((props, ref) => {

    const restProps = {
      showDelButton: true,
      adcode: props.region.province,
      year: dayjs(props.time).year(),
      month: dayjs(props.time).month() + 1
    }

    return (
      <div className='h-[80vh] w-[65vw] flex justify-around content-around flex-wrap' ref={ref}>
        {props.charts.map((item, index) => {
          if ((item as ChartSchema).chartType === undefined) {
            return item as ReactNode
          }
          else if ((item as ChartSchema).chartType === 'Relation') {
            return (
              <RelationChart {...item as ChartSchema} {...restProps} onDel={() => props.onDel(index)} />
            )
          } else if ((item as ChartSchema).chartType === 'Temperature') {
            return (
              <TemperatureChart {...item as ChartSchema} {...restProps} onDel={() => props.onDel(index)} />
            )
          } else if ((item as ChartSchema).chartType === 'Pollution') {
            return (
              <PollutionChart {...item as ChartSchema} {...restProps} onDel={() => props.onDel(index)} />
            )
          } else if ((item as ChartSchema).chartType === 'ProvincePollution') {
            return (
              <ProvincePollutionChart {...item as ChartSchema} {...restProps} onDel={() => props.onDel(index)} />
            )
          } else {
            return undefined
          }

        })}
      </div>
    )
  })

export default ChartContainer