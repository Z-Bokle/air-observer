import { Ref } from "react"

declare interface PollutionTimelineProps {
  time: number
  onChangeTime: (time: number) => void
  // ref?: Ref
}

export { PollutionTimelineProps }