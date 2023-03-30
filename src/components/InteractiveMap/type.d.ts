import { Ref } from "react"
import { Region } from "../type"

declare interface InteractiveMapProps {
  region: Region
  onChangeRegion: (region: Region) => void
  // ref?: Ref
}

export { InteractiveMapProps }