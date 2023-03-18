import React, { useState } from 'react'
import { Card, Select } from 'antd'
import { PollutionSelectCardProps } from './type'

const PollutionOptionsCard: React.FC<PollutionSelectCardProps> = (props) => {

  return (
    <Card title="指标选择">
      <Select
        onChange={(value) => props.onSelect(value)}
        value={props.selection}
        options={[
          { value: 'AQI', label: 'AQI' },
          { value: 'PM2.5', label: 'PM2.5' },
          { value: 'PM10', label: 'PM10' },
          { value: 'NO2', label: '二氧化氮' },
          { value: 'O3', label: '臭氧' },
          { value: 'WIND', label: '风力' },
          { value: 'TEMP', label: '气温' },
          { value: 'RH', label: '湿度' },
          { value: 'PSFC', label: '地面气压' }
        ]}
        style={{ width: '120px' }}
      />
    </Card>
  )
}

export default PollutionOptionsCard
