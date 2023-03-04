import { Button, Card, Col, DatePicker, Row, Slider } from 'antd5'
import React, { useEffect, useState } from 'react'
import spacetimeSlice from '../redux/spacetimeSlice'
import store from '../redux/store'
import locale from 'antd5/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs'
import { PauseOutlined, PlaySquareOutlined } from '@ant-design/icons'
import { SliderMarks } from 'antd5/es/slider'
import { RangePickerProps } from 'antd5/es/date-picker'

// 将时间戳解析为时间
const formatter = (value: number | undefined) => value ?  `${dayjs(value).year()}-${dayjs(value).month() + 1}` : null

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

const PollutionTimeline: React.FC = () => {

    const [year, setYear] = useState(store.getState().spacetime.year)
    const [play, setPlay] = useState(false)

    useEffect(() => {
        const player = play ? setTimeout(() => {year < 1543622400000 ? setYear(year + 2678400000) : setYear(1356998400000)}, 200) : null
        console.log(player)
        return () => {
            if(player !== null) clearTimeout(player)
        }
    }, [play, year])
    

    // 同步到redux
    useEffect(() => {
        store.dispatch(spacetimeSlice.actions.setPollutionOptions(year))

    }, [year])

    const extra = <Button icon={play ? <PauseOutlined/> : <PlaySquareOutlined />} onClick={() => setPlay(!play)} >{play ? '暂停' : '播放'}</Button>

    return (
        <Card title="时间选择" size='small' extra={extra}>
            <Row style={{textAlign: 'center'}}>
                <Col span={21}>
                    <Slider 
                        min={1356998400000} 
                        max={1543622400000} 
                        defaultValue={1356998400000} 
                        step={2678400000} 
                        value={year} 
                        marks={marks}
                        tooltip={{formatter: formatter}} 
                        included={false} 
                        onChange={(value) => setYear(value)} 
                        style={{marginLeft: 15}}
                    />
                </Col>
                <Col span={3}>
                    <DatePicker 
                        picker='month' 
                        locale={locale} 
                        allowClear={false} 
                        value={dayjs(year)} 
                        disabledDate={disabledDate}
                        onChange={(date) => date ? setYear(date.valueOf()) : null} 
                    />
                </Col>
            </Row>
        </Card>

    )
}

export default PollutionTimeline