import React, { useEffect, useState } from 'react'
import {
  Chart,
  Area,
  Line,
  Point,
  Tooltip,
  Axis,
  View,
  Label,
  Interaction,
  Polygon
} from 'bizcharts'

import type { ChartProps } from '../type'
import { Button, Card } from 'antd'
import { useDrag } from 'react-dnd'
import { Charts as ChartsSymbol } from '../../../symbols'
import { joinParams, jsonGet } from '../../../utils/request'

export const RelationChart: React.FC<ChartProps.RelationChartProps> = (props) => {

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'Relation', title: props.title },
    type: ChartsSymbol,
    end: (draggedItem, monitor) => {
      const result = monitor.getDropResult()
      if (draggedItem && result) {
        props.onDrop?.((result as { index: number }).index, {
          key: (result as { index: number }).index,
          chartType: 'Relation',
          disableDrag: true,
          height: 300,
          title: "地区污染物关系图",
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
        const rawData = await jsonGet<any[]>(joinParams('/charts/correlation_Mavg', {
          year: props.year,
          month: props.month,
          adcode: props.adcode
        }))
        setData(rawData || [])
      })()
    }
  }, [props.year, props.month, props.adcode])


  const scale = {
    corr1: {
      type: 'cat',
      values: ['PM2.5','PM10', 'SO2', 'NO2', 'CO', 'O3'],
    },
    corr2: {
      type: 'cat',
      values: ['PM2.5','PM10', 'SO2', 'NO2', 'CO', 'O3'],
    },
    value: {
      nice: true,
    }
  }

  return (
    <Card
      className={props.className + ' w-[28vw] shrink-0'}
      title={props.title} ref={(!props.disableDrag) ? dragRef : null}
      extra={props.showDelButton && <Button onClick={() => props.onDel?.()}>删除</Button>}>
      <Chart
        scale={scale}
        height={props.height}
        data={data}
        autoFit
        placeholder
        pure
      >

        <Axis
          name={'corr1'}
          tickLine={null}
          grid={{
            alignTick: false,
            line: {
              style: {
                lineWidth: 1,
                lineDash: null,
                stroke: '#f0f0f0',
              },
            },
          }}
        />
        <Axis
          name={'corr2'}
          title={null}
          grid={{
            alignTick: false,
            line: {
              style: {
                lineWidth: 1,
                lineDash: null,
                stroke: '#f0f0f0',
              },
            },
          }}
        />
        <Tooltip shared showMarkers={false} />
        <Polygon
          position={'corr1*corr2'}
          color={['value', '#BAE7FF-#1890FF-#0050B3']}
          label={['value', {
            offset: -2,
            style: {
              fill: '#fff',
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)',
            },
          }]}
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
        >

        </Polygon>
        <Interaction type='element-active' />
        <Interaction type='element-highlight-by-color' />
      </Chart>

    </Card>

  )
}

