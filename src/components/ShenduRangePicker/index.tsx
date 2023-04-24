import { Button, DatePicker, Form, Input, InputNumber, InputRef, Modal, Popover, Space, Tag } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { isArray, isEqual } from 'lodash-es'
import type React from 'react'
import { ReactNode, useEffect, useRef } from 'react'
import { useCallback, useMemo, useState } from 'react'

import type {
  DateRangePreset,
  RangePickerValue,
  ShenduRangePickerProps,
  ShenduRangePickerValue
} from './type'
import { useForm } from 'antd/es/form/Form'

const { CheckableTag } = Tag

const { RangePicker } = DatePicker

type DefaultPresetCodeType = {
  name: string
  nameCn?: string
  count?: number
}

// 因为value只用于展示，实际的value值为code，因此不需要对时间戳的时间部分进行特殊处理
const defaultPresets: DateRangePreset<DefaultPresetCodeType>[] = [
  {
    label: '今天',
    value: [dayjs(), dayjs()],
    code: { name: 'Today' }
  },
  {
    label: '昨天',
    value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
    code: { name: 'Yesterday' }
  },
  {
    label: '本周',
    value: [
      dayjs().subtract(1, 'week').endOf('week').add(2, 'day'),
      dayjs().endOf('week').add(1, 'day')
    ],
    code: { name: 'ThisWeek' }
  },
  {
    label: '上周',
    value: [
      dayjs().subtract(2, 'week').endOf('week').add(2, 'day'),
      dayjs().subtract(1, 'week').endOf('week').add(1, 'day')
    ],
    code: { name: 'LastWeek' }
  },
  {
    label: '本月',
    value: [
      dayjs().subtract(1, 'month').endOf('month').add(1, 'day'),
      dayjs().endOf('month')
    ],
    code: { name: 'ThisMonth' }
  },
  {
    label: '上月',
    value: [
      dayjs().subtract(2, 'month').endOf('month').add(1, 'day'),
      dayjs().subtract(1, 'month').endOf('month')
    ],
    code: { name: 'LastMonth' }
  },
  {
    label: '过去7天',
    value: [
      dayjs().endOf('day').subtract(8, 'day'),
      dayjs().endOf('day').subtract(1, 'day')
    ],
    code: { name: 'Past7Days', count: 7 }
  },
  {
    label: '过去30天',
    value: [
      dayjs().endOf('day').subtract(31, 'day'),
      dayjs().endOf('day').subtract(1, 'day')
    ],
    code: { name: 'Past30Days', count: 30 }
  },
  {
    label: '过去90天',
    value: [
      dayjs().endOf('day').subtract(91, 'day'),
      dayjs().endOf('day').subtract(1, 'day')
    ],
    code: { name: 'Past90Days', count: 90 }
  }
]

/**
 * 该组件支持泛型用法，T为presets中code的类型
 */
export function ShenduRangePicker<T>(props: ShenduRangePickerProps<T>) {
  const [defaultValue, setDefaultValue] = useState(props.defaultValue)

  const [openPanel, setOpenPanel] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [customValue, setCustomValue] = useState<number>(0)


  useEffect(() => {
    // 先根据value修改customValue，确保在传入一个PastNDays的情况下时内部的状态发生改变
    resetCustomValue()
  }, [props.value])

  const resetCustomValue = () => {
    if (checkType.isPastNDays(props.value) && (props.value as any).count !== customValue) {
      setCustomValue((props.value as any).count)
    }
  }

  const presets = props.presets || defaultPresets

  const checkType = useMemo(
    () => ({
      isEnum: (value: ShenduRangePickerValue<T>) => {
        if (!value) return false
        return presets?.some((preset) => isEqual(preset.code, value)) || false
      },
      isDate: (value: ShenduRangePickerValue<T>) =>
        isArray(value) && (value as RangePickerValue).length === 2,
      isPastNDays: (value: ShenduRangePickerValue<T>) =>
        (value as any)?.name === 'PastNDays'
    }),
    [presets]
  )

  const findPreset = useCallback(
    (value: T, presets: DateRangePreset<any>[]) =>
      presets?.find((preset) => isEqual(preset.code, value)),
    []
  )

  const getRange = useCallback(
    (value: ShenduRangePickerValue<T>) => {
      if (checkType.isDate(value)) {
        return value as [Dayjs, Dayjs]
      }

      if (checkType.isEnum(value)) {
        return findPreset(value as T, presets)?.value
      }

      if (checkType.isPastNDays(value)) {
        const num: number = (value as any).count
        return [dayjs().subtract(num, 'days'), dayjs()] as [Dayjs, Dayjs]
      }

      return undefined
    },
    [checkType, findPreset, presets]
  )

  const rangeValue = getRange(props.value || defaultValue)

  // 接受一个面板组件，做加工后返回给RangePicker
  const panelProcesser: (panel: ReactNode) => ReactNode = useCallback(
    (panel) => {
      return (
        <div className='flex'>
          <Space direction='vertical' className='w-full text-center my-4'>
            {presets.map((preset: DateRangePreset<any>, index: number) => (
              // 预设
              <CheckableTag
                className='mx-4'
                key={index}
                checked={isEqual(findPreset((props.value || defaultValue) as T, presets), preset)}
                onClick={() => {
                  // 选择了预设
                  props.onChange?.(preset.code)
                  setDefaultValue(preset.code)
                  setOpenPanel(false)
                }}>
                <span className='text-base'>{preset.label}</span>
              </CheckableTag>
            ))}
            {/* 选择时间段 */}
            <CheckableTag
              checked={checkType.isDate(props.value || defaultValue) || (props.value || defaultValue) === undefined || (props.value || defaultValue) === null}
              onClick={() => {
                props.onChange?.(undefined)
                setDefaultValue(undefined)
              }}>
              <span className='text-base'>选择时间段</span>
            </CheckableTag>
            {props.enablePastNDays &&
              // 过去N天
              <CheckableTag
                onClick={() => {
                  // props.onChange?.({ name: 'PastNDays', count: customValue } as T)
                  // setDefaultValue({ name: 'PastNDays', count: customValue } as T)
                  setOpenPanel(false)
                  setOpenModal(true)
                }}
                checked={checkType.isPastNDays(props.value || defaultValue)}>
                <span className='text-base'>过去N天</span>
              </CheckableTag>
            }
          </Space>
          {panel}
        </div>
      )
    },
    [presets, props]
  )

  return (
    <>
      <div className='flex'>
        <Space.Compact>
          {(props.value || defaultValue) && (findPreset((props.value || defaultValue) as T, presets)?.label || checkType.isPastNDays(props.value || defaultValue)) && (
            <Input
              className='w-[100px]'
              readOnly
              value={
                findPreset((props.value || defaultValue) as T, presets)?.label ?
                  findPreset((props.value || defaultValue) as T, presets)?.label :
                  checkType.isPastNDays(props.value || defaultValue) ?
                    `过去${customValue}天` :
                    undefined
              }
              onClick={() => setOpenPanel(true)}
            />
          )}
          <RangePicker
            panelRender={props.allowPresets ? panelProcesser : undefined}
            value={rangeValue}
            onClick={() => setOpenPanel(true)}
            inputReadOnly
            onOpenChange={(open) => setOpenPanel(open)}
            onChange={(dates) => {
              // 选择了具体时间
              props.onChange?.(dates)
              setDefaultValue(dates)
              setOpenPanel(false)
            }}
            open={openPanel}
          />
        </Space.Compact>
      </div>
      <Modal
        open={openModal}
        onCancel={() => {
          resetCustomValue()
          setOpenModal(false)
        }}
        onOk={() => {
          props.onChange?.({ name: 'PastNDays', count: customValue } as T)
          setDefaultValue({ name: 'PastNDays', count: customValue } as T)
          setOpenModal(false)
        }}
        title='过去N天' >
        <div className='flex items-center my-4'>
          <div className='text-base'>
            请输入过去的天数
          </div>

          <InputNumber className=' mx-4' min={0} value={customValue} onChange={(val) => setCustomValue(val || 0)} />
        </div>
      </Modal>
    </>
  )
}
