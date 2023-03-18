import React, { useState } from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts'

export default function PollutionChart() {
    const [data, setData] = useState([
        {year: 2013, aqi: 200},
        {year: 2014, aqi: 100},
        {year: 2015, aqi: 99},
        {year: 2016, aqi: 123},
        {year: 2017, aqi: 312},
        {year: 2018, aqi: 321},
    ])

  return (
    <Chart height={400} width={400} padding="auto" data={data} autoFit>
        <Interval position="year*aqi" />
        <Tooltip shared />
    </Chart>
  )
}
