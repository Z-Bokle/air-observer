import React, { useState } from 'react'
import { RoundChartProps } from './type'
import { 	
  Chart,
	Point,
	Area,
	Annotation,
	Axis,
	Coordinate,
	registerShape,
	registerAnimation, } from 'bizcharts';

  registerShape('point', 'pointer', {
    draw(cfg, container) {
  
      const group = container.addGroup();
  
      const center = this.parsePoint({ x: 0, y: 0 }); // 获取极坐标系下画布中心点
      const start = this.parsePoint({ x: 0, y: 0.5 }); // 获取极坐标系下起始点
  
  
      const preAngle = this.preAngle || 0;
  
      const angle1 = Math.atan((start.y - center.y) / (start.x - center.x));
      const angle = (Math.PI - 2 * (angle1)) * cfg.points[0].x;
  
      this.preAngle = angle;
  
      return group;
    },
  })

const RoundChart:React.FC<RoundChartProps> = (props) => {

  const scale = {
    value: {
      min: props.min ?? 0,
      max: props.max ?? 1,
      tickInterval: 0.1,
      formatter: (v:any) => v * 100
    }
  }

	const data = [{ value: props.value }]
	const startAngle = Math.PI / 2
	const endAngle = startAngle + Math.PI * 2;
	return (
		<Chart
			height={160}
			data={data}
			scale={scale}
			autoFit
		>
			<Coordinate
				type="polar"
				radius={0.75}
				startAngle={startAngle}
				endAngle={endAngle}
			/>
			<Axis
				name="value"
				line={null}
				visible={false}
				label={{
					offset: -36,
					style: {
						fontSize: 18,
						textAlign: 'center',
						textBaseline: 'middle',
					},
				}}

				grid={null}
			/>
			<Point
				position="value*1"
				color={props.color}
				shape="pointer"
			/>
			<Annotation.Arc
				start={[0, 1]}
				end={[1, 1]}
				style={{
					stroke: '#CBCBCB',
					lineWidth: 18,
					lineDash: null,
					lineCap: 'round',
				}}
			/>
			<Annotation.Arc
				start={[0, 1]}
				end={[data[0].value, 1]}
				style={{
					stroke: props.color,
					lineCap: 'round',
					lineWidth: 18,
					lineDash: null,
				}}
			/>
			<Annotation.Text
				position={['50%', '50%']}
				content={props.formatter?.(data[0].value) ?? data[0].value.toString()}
				style={{
					fontSize: 24,
					fill: '#262626',
					textAlign: 'center',
				}}
			/>
		</Chart>
	)
}

export default RoundChart