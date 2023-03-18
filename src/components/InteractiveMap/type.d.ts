import { Region } from "../type"

declare interface InteractiveMapProps {
  region: Region
  onChangeRegion: (region: Region) => void
}

export { InteractiveMapProps }