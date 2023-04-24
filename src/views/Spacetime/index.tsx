import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Space, Tour, TourProps } from 'antd'

import PollutionTimeline from '../../components/PollutionTimeline'
import PollutionSelectCard from '../../components/PollutionSelectCard'
import InteractiveMap from '../../components/InteractiveMap'
import RegionSelectCard from '../../components/RegionSelectCard'
import { Chart, ChartList } from '../../components/charts/type'
import ChartContainer from '../../components/charts/ChartContainer'
import { Region } from '../../components/type'
import dayjs from 'dayjs'
import { RelationChart } from '../../components/charts/RelationChart'
import HelpCard from '../../components/HelpCard'
import ChartsManageCard from '../../components/ChartsManageCard'
import EmptyChart from '../../components/charts/EmptyChart'
import { cloneDeep } from 'lodash-es'

export default function Spacetime() {

  const [tourOpen, setTourOpen] = useState(false)
  const tourSteps: TourProps['steps'] = [
    {
      title: '交互式地图',
      description: '从地图上依次选择您想要的地区，以查看相关信息。',
      target: () => interactiveMapRef.current,
      cover: <img src='./map.gif' />,
      placement: 'left'
    },
    {
      title: '地区选择器',
      description: '不喜欢直接操作地图？有更便捷的级联选择器供您使用！',
      target: () => regionSelectRef.current
    },
    {
      title: '自动展示图表',
      description: '每一次地区的修改都会自动更新图表的数据源，您无需额外操作。',
      target: () => chartContainerRef.current
    },
    {
      title: '丰富的图表类型',
      description: '数种图表供您选择，您可以通过拖拽的方式管理您需要的图表及其顺序。',
      target: () => chartsManageRef.current
    },
    {
      title: '时间轴',
      description: '可自由拖动的时间选择器，还可以跟随时间轴自动播放。',
      target: () => timelineRef.current
    }
  ]

  const [charts, setCharts] = useState<ChartList>([
    <EmptyChart index={0} key={0} />,
    <EmptyChart index={1} key={1} />,
    <EmptyChart index={2} key={2} />,
    <EmptyChart index={3} key={3} />])

  const [pollutionSelection, setPollutionSelection] = useState('AQI')
  const [currentTime, setCurrentTime] = useState(dayjs('2013-01').valueOf())

  const [region, setRegion] = useState<Region>({
    country: 100000,
    province: undefined,
    city: undefined
  })

  const regionSelectRef = useRef(null)
  const interactiveMapRef = useRef(null)
  const chartContainerRef = useRef(null)
  const chartsManageRef = useRef(null)
  const timelineRef = useRef(null)

  const handleDrop = (dropIndex: number, chart: Chart) => {
    const newCharts = cloneDeep(charts)
    if (chart) newCharts[dropIndex] = chart
    setCharts(newCharts)
  }

  const handleDelChart = (index: number) => {
    const newCharts = cloneDeep(charts)
    newCharts[index] = <EmptyChart index={index} key={index} />
    setCharts(newCharts)
  }

  return (
    <>
      <div className='flex justify-around'>
        <div className='h-full py-8'>
          <ChartContainer
            charts={charts}
            ref={chartContainerRef}
            onDel={handleDelChart}
            time={currentTime}
            region={region} />

          <div className='w-full h-[100px] p-[10px]'>
            <PollutionTimeline time={currentTime} onChangeTime={(time) => setCurrentTime(time)} ref={timelineRef} />
          </div>
        </div>

        <div className='h-full w-[21vw] max-h-full'>
          <Space direction='vertical'>
            <InteractiveMap region={region} onChangeRegion={(region) => { setRegion(region) }} ref={interactiveMapRef} />
            <RegionSelectCard region={region} onChangeRegion={(region) => { setRegion(region) }} ref={regionSelectRef} />
            {/* <PollutionSelectCard selection={pollutionSelection} onSelect={(value) => setPollutionSelection(value)} /> */}
            <ChartsManageCard ref={chartsManageRef} onDrop={handleDrop} />
            <HelpCard onStartTour={() => setTourOpen(true)} />
          </Space>
        </div>
      </div>
      {tourOpen && <Tour open={tourOpen} onClose={() => setTourOpen(false)} steps={tourSteps} />}
    </>
  )
}
