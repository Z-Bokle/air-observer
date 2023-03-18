import { ReactNode } from "react";

declare type Chart = {
  chart: ReactNode
  name: string
} | undefined

declare type ChartList = [Chart, Chart, Chart, Chart]

declare interface ChartContainerProps {
  charts: ChartList

}

declare module ChartProps {
  declare interface RelationChartProps {
    height: number
  }
}

export { Chart, ChartList, ChartContainerProps, ChartProps }