import React, { useEffect, useState } from 'react'
import { Card, Button, Space, Switch } from 'antd'
import store from '../../redux/store'
import spacetimeSlice from '../../redux/spacetimeSlice'

interface IOption {
  name: string,
  option: boolean
}

const PollutionOptionsCard: React.FC = () => {
  // 分别代表PM2.5 PM10 NO2 O3 WIND TEMP RH PSFC
  const [options, setOptions] = useState<IOption[]>(store.getState().spacetime.pollutionOptions)

  // 自动同步到Redux
  useEffect(() => {
    store.dispatch(spacetimeSlice.actions.setPollutionOptions(options))
  }, [options])

  // 切换状态时自动修改state
  const handleChange = (indexes: number[], checked: boolean) => {
    let newOptions = JSON.parse(JSON.stringify(options))
    indexes.forEach((index) => {
      newOptions[index].option = checked
    })
    setOptions(newOptions)
  }

  // 额外按钮
  const extra =
    (<Space>
      <Button size='small' type="primary" onClick={() => handleChange((new Array(options.length)).fill(0).map((val, index) => index), true)}>全选</Button>
      <Button size='small' onClick={() => handleChange((new Array(options.length)).fill(0).map((val, index) => index), false)}>全不选</Button>
    </Space>)

  return (
    <Card title="指标展示" extra={extra}>
      {
        options.map((item, index, options) =>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }} key={item.name}>
            <span>{item.name}</span>
            <Switch checked={item.option} onChange={(checked) => handleChange([index], checked)} />
          </div>
        )
      }
    </Card>
  )
}

export default PollutionOptionsCard
