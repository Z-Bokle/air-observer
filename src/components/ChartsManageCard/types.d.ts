import { ReactNode, Ref } from "react";
import { Chart } from "../charts/type";

declare interface ChartsManageCardProps {
  onDrop: (dropIndex: number, chart: Chart) => void
}