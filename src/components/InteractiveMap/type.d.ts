import { CSSProperties, Ref } from "react"
import { Region } from "../type"

declare interface InteractiveMapProps {
  region: Region
  onChangeRegion: (region: Region) => void
  style?: CSSProperties
}

export { InteractiveMapProps }