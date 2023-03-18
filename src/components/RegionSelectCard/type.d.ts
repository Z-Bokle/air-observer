import { Region } from "../type"

type CodeRecord = {
  name: string,
  level: 'country' | 'province' | 'city' | 'district',
  adcode: number,
  lat: number,
  lng: number,
  childrenNum: number,
  parent: number | null
}

declare interface RegionSelectCardProps {
  region: Region
  onChangeRegion: (region: Region) => void
}

export { CodeRecord, RegionSelectCardProps }