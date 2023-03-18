import { useState } from 'react'
import { Space } from 'antd'

import PollutionTimeline from '../../components/PollutionTimeline'
import PollutionSelectCard from '../../components/PollutionSelectCard'
import InteractiveMap from '../../components/InteractiveMap'
import RegionSelectCard from '../../components/RegionSelectCard'
import { ChartList } from '../../components/charts/type'
import ChartContainer from '../../components/charts/ChartContainer'
import { Region } from '../../components/type'
import dayjs from 'dayjs'
import { RelationChart } from '../../components/charts/RelationChart'

export default function Spacetime() {

  const [charts, setCharts] = useState<ChartList>([{
    name: '111',
    chart: <RelationChart height={300} />
  }, {
    name: '222',
    chart: 'content2'
  }, {
    name: '333',
    chart: 'content3'
  }, {
    name: '444',
    chart: 'content4'
  }])

  const [pollutionSelection, setPollutionSelection] = useState('AQI')
  const [currentYear, setCurrentYear] = useState(dayjs('2013-01').valueOf())

  const [region, setRegion] = useState<Region>({
    country: 100000,
    province: undefined,
    city: undefined
  })

  return (
    <div className='flex justify-around'>
      <div>
        <ChartContainer charts={charts} />

        <div style={{ height: 100, padding: 10, width: '100%' }}>
          <PollutionTimeline year={currentYear} onChangeYear={(year) => setCurrentYear(year)} />
        </div>
      </div>

      <div className='h-full w-[21vw] max-h-full'>
        <Space direction='vertical'>
          <InteractiveMap region={region} onChangeRegion={(region) => setRegion(region)} />
          <RegionSelectCard region={region} onChangeRegion={(region) => setRegion(region)} />
          <PollutionSelectCard selection={pollutionSelection} onSelect={(value) => setPollutionSelection(value)} />
        </Space>
      </div>
    </div>
  )
}
