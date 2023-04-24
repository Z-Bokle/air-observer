// import type { RangePickerProps } from 'antd'
import type { Dayjs } from 'dayjs'

declare type RangePickerValue = [Dayjs | null, Dayjs | null]

/*
  TODO
  1. 非受控用法 Done
  2. presets预设开关 Done
  3. 默认预设 Done
  4. 动态时间选择功能
 */

declare interface DateRangePreset<T> {
  value: [Dayjs, Dayjs]
  label: string
  code: T
}

declare type ShenduRangePickerValue<T> = RangePickerValue | T | undefined | null

declare interface ShenduRangePickerProps<T> {
  /** 受控组件的值，可以是[Dayjs, Dayjs]，也可以是设置了presets后某个preset的code */
  value?: ShenduRangePickerValue<T>
  /** 受控组件变化后的回调函数，value的类型参考value字段 */
  onChange?: (value: ShenduRangePickerValue<T>) => void
  /** 开启预设功能 */
  allowPresets?: boolean
  /** 
    时间预设，将显示在面板左侧，由preset组成的数组，在allowPresets为true时才生效 

    preset字段定义如下：  
    value: 用于给内部RangePicker展示用的值，仅用于展示，为保证和内部RangePicker属性名的一致性，使用了value作为字段名  
    label: 面板上该preset的标签内容  
    code: 该preset真正的value，可以作为ShenduRangePicker的value属性或onChange回调函数的参数  
    
    当presets为undefined时，将启用默认预设，否则将会用传入的预设代替  
  */
  presets?: DateRangePreset<T>[]
  /** 非受控用法的默认值 */
  defaultValue?: ShenduRangePickerValue<T>
  /** 启用“过去N天”预设，仅在allowPresets启用时才会生效，将会被置于presets的末尾 */
  enablePastNDays?: boolean

}

export {
  DateRangePreset,
  RangePickerValue,
  ShenduRangePickerProps,
  ShenduRangePickerValue
}
