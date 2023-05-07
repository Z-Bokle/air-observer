declare interface RoundChartProps {
  value: number
  max?: number
  min?: number
  formatter?: (value: number) => string
  color: string
}

export { RoundChartProps }