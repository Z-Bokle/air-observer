import { ReactNode, Ref } from "react";

declare interface ChartsManageCardProps {
  onDrop: (dropIndex: number, chart: ReactNode) => void
}