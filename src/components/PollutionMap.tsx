import React, { useState } from 'react'
import { LarkMap, HeatmapLayer, HeatmapLayerProps } from '@antv/larkmap'

import style from '../styles/Spacetime.module.css'

const mapOptions = {
      style: 'light',
    //   center: [120.210792, 30.246026],
      pitch: 0,
      zoom: 8,
      rotation: 0,
      token: '526f814f66cc435eed82135e34d11b85' // 仅限开发使用
    }

  const layerOptions: Omit<HeatmapLayerProps, 'source'> = {
    autoFit: true,
    shape: 'heatmap' as const,
    size: {
      field: 't',
      value: [0, 1],
    },
    style: {
      intensity: 3,
      radius: 20,
      opacity: 1,
      rampColors: {
        colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'],
        positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      },
    },
  }

export default function Map() {
    // https://larkmap.antv.antgroup.com/components/layers/base-layers/heatmap-layer
    const [options, setOptions] = useState(layerOptions);
    const [source, setSource] = useState({
      data: [
        { "lng": 121.473117, "lat": 31.230125, "t": 20, "c": 1000 },
        { "lng": 121.473337, "lat": 31.230325, "t": 100, "c": 200 },
        { "lng": 121.473557, "lat": 31.230525, "t": 300, "c": 100 },
        { "lng": 121.473777, "lat": 31.230725, "t": 600, "c": 800 },
        { "lng": 121.473997, "lat": 31.230925, "t": 1000, "c": 50 }
      ],
      parser: { type: 'json', x: 'lng', y: 'lat' },
    });

    return (
        <LarkMap mapType='Gaode' mapOptions={mapOptions} className={style.main} >
          <HeatmapLayer {...options} source={source} />
        </LarkMap>
    )
}
