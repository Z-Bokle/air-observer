import { Card } from 'antd'
import React from 'react'
import { ChartContainerProps } from '../type'

const ChartContainer: React.FC<ChartContainerProps> = (props) => {
  return (
    <div className='h-[80vh] w-[65vw] flex justify-around content-around flex-wrap'>
      {props.charts.map(
        (chart, index) => (
          <Card
            className='w-[28vw] h-[38vh]'
            key={`chart${index}`} title={chart?.name}>
            {chart?.chart}
          </Card>
        ))}
    </div>
  )
}

export default ChartContainer