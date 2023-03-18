import React, { useEffect, useState } from 'react'
import { LarkMap, PointLayer, HeatmapLayerProps, LayerPopupProps, LayerPopup, PointLayerProps } from '@antv/larkmap'

import style from '../styles/Spacetime.module.css'

const mapOptions:{
  style: string;
  center: [number, number];
  zoom: number;
  token: string;
  } = {
      style: 'light',
      center: [120.9, 30.4],
      zoom: 1,
      token: '526f814f66cc435eed82135e34d11b85' // 仅限开发使用
    }

  const layerOptions: Omit<PointLayerProps, 'source'> = {
    autoFit: true,
    shape: 'circle',
    size: { // 点线面大小
      field: 'dat',
      value: [5, 20]
    },
    color: { // 颜色
      field: 'dat',
      value: [
        '#78e71c',
        '#b7e611',
        '#ecde0e',
        '#d88211',
        '#f1120a',
        '#5c0606',
      ]
    }
  }

  const layerPopupItems: LayerPopupProps['items'] = [
    {
      layer: 'tagsLayer',
      fields: ['dat']
    }
  ]

export default function Map() {
    // https://larkmap.antv.antgroup.com/components/layers/base-layers/heatmap-layer
    const [options, setOptions] = useState(layerOptions);
    const [source, setSource] = useState({
      data: [ //面图层只能支持geojson
        {lon: 120.90, lat: 30.45, dat: 12},
        {lon: 120.93, lat: 30.42, dat: 110},
        {lon: 120.92, lat: 30.41, dat: 97},
        {lon: 120.96, lat: 30.44, dat: 94},
        {lon: 120.88, lat: 30.45, dat: 128},
      ],
      parser: { type: 'json', x: 'lon', y: 'lat' },
    });


    return (
        <LarkMap mapType='Gaode' mapOptions={mapOptions} style={{height: 400}} >
          <PointLayer {...options} source={source} />
          <LayerPopup items={layerPopupItems} trigger="hover" />
        </LarkMap>
    )
}
