import React from 'react'
import { AdvancedLineChartProps } from './type'
import { Chart, LineAdvance } from 'bizcharts'

const AdvancedLineChart:React.FC<AdvancedLineChartProps> = (props) => {

  return (
    <Chart padding={[10, 20, 80, 40]} autoFit height={350} data={props.data} >
		<LineAdvance
			shape="smooth"
			point
      area
      animate
			position={`${props.x}*${props.y}`}
      color={props.group}
		/>
	
	</Chart>
  )
}

export default AdvancedLineChart