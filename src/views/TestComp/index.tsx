import React, { useState } from 'react'
import { ShenduRangePicker } from '../../components/ShenduRangePicker'



const TestComp = () => {
  const [val, setVal] = useState<any>({ name: 'PastNDays', count: 12 })

  console.log(val)

  return (
    <ShenduRangePicker enablePastNDays allowPresets value={val} onChange={(val) => setVal(val)} />
  )
}

export default TestComp