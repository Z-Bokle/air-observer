import React, { useState } from 'react'
import { ChartProps } from '../type'
import { useDrop } from 'react-dnd'
import { Charts as ChartsSymbol } from '../../../symbols'

const EmptyChart: React.FC<ChartProps.EmptyChartProps> = (props) => {

  const [hoverItem, setHoverItem] = useState<any>()

  const [{ isOver }, dropRef] = useDrop<{ type: string, title: string }, any, any>({
    accept: ChartsSymbol,
    drop: (item, monitor) => ({ name: 'Container', index: props.index }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      conDrop: monitor.canDrop()
    }),
    hover: (item, monitor) => {
      setHoverItem(item)
    },
  })

  return (
    <div
      ref={dropRef}
      className=' w-[28vw] h-[30vh] bg-slate-400 text-center select-none shrink-0'>
      {
        isOver ?
          <>
            <div className='m-auto text-4xl'>松手完成拖放</div>
            <div className='text-2xl'>{`即将在此处插入：${hoverItem.title}`}</div>
          </> :
          <>
            <div className='m-auto text-4xl'>空图表位</div>
            <div className='text-2xl'>请将表格拖放于此</div>
          </>
      }
    </div>
  )
}

export default EmptyChart