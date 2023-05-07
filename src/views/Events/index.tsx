import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ProCard } from '@ant-design/pro-components'
import WindMap from '../../components/WindMap'
import { Region } from '../../components/type'
import { Descriptions, Select, Slider } from 'antd'
import { jsonGet } from '../../utils/request'
import dayjs from 'dayjs'
import RoundChart from '../../components/RoundChart'
import AdvancedLineChart from '../../components/AdvancedLineChart'
import { eventCenter } from '../../utils/eventBus'


const processData = (areaData: any[]) => {
  const regions = Array.from(new Set(areaData?.[0].list.map((item: any) => item.area)))
  return regions.map((region) => areaData.map((item) => item.list.find((item: any) => item.area === region))).flat(2)
}

export default function Event() {

  const titleStyled = useCallback((text: string) => <div className='text-lg font-semibold'>{text}</div>, [])

  useEffect(() => {
    ;(async () => {
      const data = await jsonGet<any[]>('/data/typhoon')
      setData(data ?? [])
    })()
  }, [])

  const [data, setData] = useState<any[]>()

  const [selectedData, setSelectedData] = useState<number>(0)

  const [selectedDate, setSelectedDate] = useState<number>()

  const areaData = (data?.[selectedData].area_data as Array<any>)

  const dailyData = areaData?.find((item) => dayjs(item.list[0].date).valueOf() === selectedDate)

  const marks = useMemo(() => {
    let marks = {}
    Array.from(new Set(areaData?.map((item: any) => dayjs(item.list[0].date)))).forEach((day) => Object.defineProperty(marks, day.valueOf(), {
      enumerable: true,
      value: day.format('YYYY.MM.DD')
    }))
    return marks
  }, [areaData])

  useEffect(() => {
    setSelectedDate(dayjs(data?.[selectedData].start_time).valueOf())
  }, [selectedData, data])

  console.log(processData(areaData))

  return (
    <div className='flex justify-evenly'>
      <div className='w-[35vw] h-96 '>
        <WindMap picUrl='' />
        <Slider 
          min={dayjs(data?.[selectedData].start_time).valueOf()} 
          max={dayjs(data?.[selectedData].end_time).valueOf()} 
          step={dayjs().valueOf() - dayjs().subtract(1, 'day').valueOf()} 
          value={selectedDate}
          onChange={(val) => setSelectedDate(val)}
          tooltip={{formatter: (value) => dayjs(value).format('YYYY.MM.DD')}}
          included={false}
          marks={marks}
        />
      </div>

      <div className='w-[50vw] h-96'>
        <ProCard
          split='horizontal'
          title={titleStyled('特殊气象信息')}
          extra={(
            <Select 
              className='w-56' 
              value={selectedData} 
              onChange={(val) => {
                setSelectedData(val)
                eventCenter.emit('setCenter', { center: data?.[selectedData].center })
              }}
              options={data?.map((item, index) => ({label: item.typhoon, value: index}))} 
              placeholder='请选择要查看的特殊气象'/>)}
          bordered
          headerBordered>
          <ProCard>
            <Descriptions>
              <Descriptions.Item label='类型'>
                台风
              </Descriptions.Item>
              <Descriptions.Item label='起止时间'>
                {`${dayjs(data?.[selectedData].start_time).format('YYYY.MM.DD')}-${dayjs(data?.[selectedData ?? 0].end_time).format('YYYY.MM.DD')}`}
              </Descriptions.Item>
              <Descriptions.Item label='影响范围'>
                {Array.from(new Set(areaData?.[0].list.map((item: any) => item.area))).join(', ')}
              </Descriptions.Item>
            </Descriptions>
          </ProCard>
          <ProCard tabs={{ type: 'card' }}>
              <ProCard.TabPane key='tab1' tab='受影响省份气象信息'>
                <ProCard split='horizontal' headerBordered title={titleStyled('受影响省份气象信息')}>
                  {dailyData?.list.map((item: any) => (
                    <ProCard title={titleStyled(item.area)} hoverable>
                      <div className='w-full flex justify-evenly'>
                        <RoundChart value={item.temp - 273.15} max={40} min={0} formatter={(value) => `${value.toFixed(2)}℃`} color='#78CC00' />
                        <RoundChart value={item.pa} max={120000} min={0} formatter={(value) => `${value.toFixed(1)}Pa`} color='#1890FF' />                  
                      </div>

                    </ProCard>
                  ))}
                </ProCard>
              </ProCard.TabPane>
              <ProCard.TabPane key='tab2' tab='天气变化趋势'>
                <ProCard title={titleStyled('天气变化趋势')} split='vertical' headerBordered>
                  <ProCard hoverable>
                    <AdvancedLineChart data={processData(areaData)} x='date' y='temp' group='area' />
                  </ProCard>
                  <ProCard hoverable>
                    <AdvancedLineChart data={processData(areaData)} x='date' y='pa' group='area' />
                  </ProCard>
                </ProCard>
              </ProCard.TabPane>
          </ProCard>
        </ProCard>
      </div>
    </div>
  )
}
