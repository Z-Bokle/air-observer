import { Button, Card, Col, DatePicker, Input, Row, Slider } from 'antd'
import React, { forwardRef, useEffect, useState } from 'react'
import locale from 'antd/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs'
import { PauseOutlined, PlaySquareOutlined } from '@ant-design/icons'
import { SliderMarks } from 'antd/es/slider'
import { RangePickerProps } from 'antd/es/date-picker'
import { PollutionTimelineProps } from './type'

// 将时间戳解析为时间
const formatter = (value: number | undefined) => value ? `${dayjs(value).year()}-${dayjs(value).month() + 1}` : null

const disabledDate: RangePickerProps['disabledDate'] = (date) => date < dayjs(1356998400000) || date > dayjs(1543622400000)

const marks: SliderMarks = {
  1356998400000: '2013-01',
  1388534400000: '2014-01',
  1420070400000: '2015-01',
  1451606400000: '2016-01',
  1483142400000: '2017-01',
  1514678400000: '2018-01',
  // 1543622400000: '2018-12'
}


const PollutionTimeline =
  forwardRef<HTMLDivElement, PollutionTimelineProps>((props, ref) => {

    const [play, setPlay] = useState(false)
    const [speed, setSpeed] = useState(2800)

    useEffect(() => {
      const player = play ? setTimeout(() => { props.time < 1543622400000 ? props.onChangeTime(props.time + 2678400000) : props.onChangeTime(1356998400000) }, speed) : null
      return () => {
        if (player !== null) clearTimeout(player)
      }
    }, [play, props.time])

    const extra = 
    <div className='flex'>
      <Input className='mx-2 w-52' disabled={play} value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} prefix='播放速度' suffix='毫秒/次' />
      <Button icon={play ? <PauseOutlined /> : <PlaySquareOutlined />} onClick={() => setPlay(!play)} >{play ? '暂停' : '播放'}</Button>
    </div>
    
    return (
      <Card title="时间选择" size='small' extra={extra} ref={ref}>
        <Row style={{ textAlign: 'center' }}>
          <Col span={21}>
            <Slider
              min={1356998400000}
              max={1543622400000}
              defaultValue={1356998400000}
              step={2678400000}
              value={props.time}
              marks={marks}
              tooltip={{ formatter: formatter }}
              included={false}
              onChange={(value) => props.onChangeTime(value)}
              style={{ marginLeft: 15 }}
            />
          </Col>
          <Col span={3}>
            <DatePicker
              picker='month'
              locale={locale}
              allowClear={false}
              value={dayjs(props.time)}
              disabledDate={disabledDate}
              onChange={(date) => date ? props.onChangeTime(date.valueOf()) : null}
            />
          </Col>
        </Row>
      </Card>

    )
  })

export default PollutionTimeline