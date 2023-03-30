import React, { useEffect } from 'react'
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
import { Card } from 'antd'
import { useDrag } from 'react-dnd'
import { Charts as ChartsSymbol } from '../../../symbols'

const data = [
  [0, 0, 10],
  [0, 1, 19],
  [0, 2, 8],
  [0, 3, 24],
  [0, 4, 67],
  [0, 5, 45],
  [0, 6, 80],
  [0, 7, 34],
  [1, 0, 92],
  [1, 1, 58],
  [1, 2, 78],
  [1, 3, 117],
  [1, 4, 48],
  [1, 5, 45],
  [1, 6, 80],
  [1, 7, 34],
  [2, 0, 35],
  [2, 1, 15],
  [2, 2, 123],
  [2, 3, 64],
  [2, 4, 52],
  [2, 5, 45],
  [2, 6, 80],
  [2, 7, 34],
  [3, 0, 72],
  [3, 1, 132],
  [3, 2, 114],
  [3, 3, 19],
  [3, 4, 16],
  [3, 5, 45],
  [3, 6, 80],
  [3, 7, 34],
  [4, 0, 38],
  [4, 1, 5],
  [4, 2, 8],
  [4, 3, 117],
  [4, 4, 115],
  [4, 5, 45],
  [4, 6, 80],
  [4, 7, 34],
  [5, 0, 88],
  [5, 1, 32],
  [5, 2, 12],
  [5, 3, 6],
  [5, 4, 120],
  [5, 5, 45],
  [5, 6, 80],
  [5, 7, 34],
  [6, 0, 13],
  [6, 1, 44],
  [6, 2, 88],
  [6, 3, 98],
  [6, 4, 96],
  [6, 5, 45],
  [6, 6, 80],
  [6, 7, 34],
  [7, 0, 31],
  [7, 1, 1],
  [7, 2, 82],
  [7, 3, 32],
  [7, 4, 30],
  [7, 5, 45],
  [7, 6, 80],
  [7, 7, 34]
]

export const RelationChart: React.FC<ChartProps.RelationChartProps> = (props) => {

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'Relation', title: props.title },
    type: ChartsSymbol,
    end: (draggedItem, monitor) => {
      const result = monitor.getDropResult()
      if (draggedItem && result) {
        props.onDrop?.((result as { index: number }).index, (<RelationChart
          height={300}
          title='111'
        />))
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  useEffect(() => {
    props.onDragging?.(isDragging)
  }, [isDragging])


  const source = data.map((arr) => {
    return {
      namex: arr[0],
      namey: arr[1],
      value: arr[2],
    };
  })

  const scale = {
    namex: {
      type: 'cat',
      values: ['AQI', 'PM2.5', 'PM10', 'NO2', 'O3', 'TEMP', 'RH', 'PSFC'],
    },
    namey: {
      type: 'cat',
      values: ['AQI', 'PM2.5', 'PM10', 'NO2', 'O3', 'TEMP', 'RH', 'PSFC'],
    },
    value: {
      nice: true,
    }
  }

  return (
    <Card className={props.className + ' w-[28vw] h-[38vh]'} title={props.title} ref={dragRef}>
      <Chart
        scale={scale}
        height={props.height}
        data={source}
        autoFit
        pure
      >

        <Axis
          name={'namex'}
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
          name={'namey'}
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
          position={'namex*namey'}
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

