import { Button, Card, Select, Space } from 'antd'
import React, { forwardRef, useEffect, useState } from 'react'
import { CodeRecord, RegionSelectCardProps } from './type'
import { aliyunRegionCodeApi } from '../../services/aliyun'
import { jsonGet } from '../../utils/request'

const RegionSelectCard =
  forwardRef<HTMLDivElement, RegionSelectCardProps>((props, ref) => {

    // 获取地区编号列表
    const [codeList, setCodeList] = useState<CodeRecord[]>([])
    useEffect(() => {
      fetch('https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.1/administrative-data/area-list.json')
        .then((res) => res.json())
        .then((data) => data ? setCodeList(data) : null)
    }, [])

    console.log(codeList)

    return (
      <Card title="区域选择" ref={ref}>
        <Space direction='vertical' wrap>
          <Space wrap>
            <Select
              value={props.region.country}
              options={
                codeList.filter((record) => record.level === 'country' && record.adcode === 100000)
                  .map((record) => { return { label: record.name, value: record.adcode } })
              }
              onSelect={(_, { value }) => props.onChangeRegion({
                country: value,
                province: undefined,
                city: undefined
              })
              }
              style={{ width: '180px' }}
            />

            <Select
              value={props.region.province}
              options={
                codeList.filter((record) => record.level === 'province' && record.parent === props.region.country)
                  .map((record) => { return { label: record.name, value: record.adcode } })
              }
              onSelect={(_, { value }) => props.onChangeRegion({
                country: props.region.country,
                province: value,
                city: undefined
              })
              }
              style={{ width: '120px' }}
            />

            <Select
              value={props.region.city}
              options={
                codeList.filter((record) => record.level === 'city' && record.parent === props.region.province)
                  .map((record) => { return { label: record.name, value: record.adcode } })
              }
              onSelect={(_, { value }) => {
                const city = value
                props.onChangeRegion({ ...props.region, city })
              }}
              style={{ width: '120px' }}
            />
          </Space>

          <Space wrap>
            <Button onClick={() => {
              props.onChangeRegion({
                country: 100000,
                province: undefined,
                city: undefined
              })
            }}>
              重置
            </Button>
          </Space>
        </Space>
      </Card>
    )
  })

export default RegionSelectCard