import { Button, Card } from 'antd'
import React from 'react'

const HelpCard: React.FC<HelpCardProps> = (props) => {
  return (
    <Card title='帮助'>
      <Button type='primary' onClick={props.onStartTour}>查看指引</Button>
    </Card >
  )
}

export default HelpCard