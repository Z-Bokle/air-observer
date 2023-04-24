import { ReactNode, Ref } from "react";
import { Region } from "../type";

declare interface ChartSchema extends ChartProps.ChartProps {
  chartType: string
  key: number
}

declare type Chart = Exclude<ReactNode, undefined> | ChartSchema

declare type ChartList = [Chart, Chart, Chart, Chart]

declare interface ChartContainerProps {
  charts: ChartList
  onDel: (index: number) => void
  region: Region
  time: number
}

declare module ChartProps {

  declare interface ChartProps {
    height: number
    className?: string
    title: string
    disableDrag?: boolean
    onDragging?: (isDragging: boolean) => void
    onDrop?: (dropIndex: number, chart: Chart) => void
    showDelButton?: boolean
    onDel?: () => void

    adcode?: number
    year?: number
    month?: number

  }

  declare interface EmptyChartProps {
    index: number
  }

  declare interface RelationChartProps extends ChartProps { }

  declare interface PollutionChartProps extends ChartProps { }

  declare interface TemperatureChartProps extends ChartProps { }

  declare interface ProvincePollutionChartProps extends ChartProps { } 
}

export { Chart, ChartList, ChartContainerProps, ChartProps, ChartSchema }