import { Card } from 'antd'
import React, { forwardRef, useMemo } from 'react'
import { ChartContainerProps } from '../type'


const ChartContainer =
  forwardRef<HTMLDivElement, ChartContainerProps>((props, ref) => {

    return (
      <div className='h-[80vh] w-[65vw] flex justify-around content-around flex-wrap' ref={ref}>
        {props.charts}
      </div>
    )
  })

export default ChartContainer