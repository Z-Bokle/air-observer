import { Button, Card, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useGet } from '../../utils/request'
import { CodeRecord, RegionSelectCardProps } from './type'
import { aliyunRegionCodeApi } from '../../services/aliyun'

const RegionSelectCard: React.FC<RegionSelectCardProps> = (props) => {

  // 获取地区编号列表
  const codeList = useGet<CodeRecord[]>(aliyunRegionCodeApi)

  return (
    <Card title="区域选择">
      <Space direction='vertical' wrap>
        <Space wrap>
          <Select
            value={props.region.country}
            options={
              codeList.data?.filter((record) => record.level === 'country' && record.adcode === 100000)
                .map((record) => { return { label: record.name, value: record.adcode } })
            }
            onChange={(country) => props.onChangeRegion({
              country,
              province: undefined,
              city: undefined
            })
            }
            style={{ width: '180px' }}
          />

          <Select
            value={props.region.province}
            options={
              codeList.data?.filter((record) => record.level === 'province' && record.parent === props.region.country)
                .map((record) => { return { label: record.name, value: record.adcode } })
            }
            onChange={(province) => props.onChangeRegion({
              country: props.region.country,
              province,
              city: undefined
            })
            }
            style={{ width: '120px' }}
          />

          <Select
            value={props.region.city}
            options={
              codeList.data?.filter((record) => record.level === 'city' && record.parent === props.region.province)
                .map((record) => { return { label: record.name, value: record.adcode } })
            }
            onChange={(city) => props.onChangeRegion({ ...props.region, city })}
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
          <Button type='primary' >查看</Button>
        </Space>
      </Space>
    </Card>
  )
}

export default RegionSelectCard