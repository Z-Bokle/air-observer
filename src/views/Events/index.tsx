import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ProCard } from '@ant-design/pro-components'
import WindMap from '../../components/WindMap'
import { Region } from '../../components/type'
import { Descriptions } from 'antd'

export default function Event() {

  const [region, setRegion] = useState<Region>({
    city: undefined,
    province: undefined,
    country: 100000
  })

  const desc = [
    {
      label: '类型',
      value: '台风'
    },
    {
      label: '影响城市',
      value: '杭州'
    },
    {
      label: '时间',
      value: '2015.10.10 - 2015.11.1'
    }
  ]

  const titleStyled = useCallback((text: string) => <div className='text-lg font-semibold'>{text}</div>, [])

  const mapOptions: {
    style: string;
    center: [number, number];
    zoom: number;
    token: string;
  } = {
    style: 'light',
    center: [120.9, 30.4],
    zoom: 5,
    token: '526f814f66cc435eed82135e34d11b85' // 仅限开发使用
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [canvasSize, setCanvasSize] = useState([0, 0])

  // 自动更新canvas尺寸，目前没有依赖项
  useEffect(() => {
    setCanvasSize([containerRef.current?.offsetWidth || 0, containerRef.current?.offsetHeight || 0])
  }, [])

  return (
    <div className='flex justify-evenly'>
      <div className='w-[35vw] h-96 '>
        <WindMap />
      </div>

      <div className='w-[50vw] h-96'>
        <ProCard
          split='horizontal'
          bordered
          headerBordered>
          <ProCard title={titleStyled('特殊气象信息')}>
            <Descriptions>
              {desc.map((item) => <Descriptions.Item label={item.label}>{item.value}</Descriptions.Item>)}
            </Descriptions>
          </ProCard>
          <ProCard split='vertical' headerBordered title={titleStyled('周边城市气象信息')}>
            <ProCard title={titleStyled('气温')}>
              222
            </ProCard>
            <ProCard title={titleStyled('气压')}>
              333
            </ProCard>
          </ProCard>
          <ProCard title={titleStyled('周边城市风向图')} split='vertical' headerBordered>
            <ProCard title={titleStyled('杭州')}>

            </ProCard>
            <ProCard title={titleStyled('湖州')}>

            </ProCard>
            <ProCard title={titleStyled('绍兴')}>

            </ProCard>
            <ProCard title={titleStyled('嘉兴')}>

            </ProCard>
          </ProCard>
        </ProCard>
      </div>
    </div>
  )
}
