import { ReactNode, Ref } from "react";

declare type Chart = Exclude<ReactNode, undefined>
declare type ChartList = [Chart, Chart, Chart, Chart]

declare interface ChartContainerProps {
  charts: ChartList
}

declare module ChartProps {

  declare interface ChartProps {
    height: number
    className?: string
    title: string
    onDragging?: (isDragging: boolean) => void
    onDrop?: (dropIndex: number, chart: ReactNode) => void
  }

  declare interface EmptyChartProps {
    index: number
  }

  declare interface RelationChartProps extends ChartProps { }

  declare interface PollutionChartProps extends ChartProps { }
}

export { Chart, ChartList, ChartContainerProps, ChartProps }