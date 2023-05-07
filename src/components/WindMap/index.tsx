import { Scene, WindLayer, GaodeMap } from '@antv/l7'
import React, { useLayoutEffect } from 'react';
import { eventCenter } from '../../utils/eventBus';


const WindMap:React.FC<WindMapProps> = (props) => {

  const {picUrl} = props

  useLayoutEffect(() => {
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        center: [105.732421875, 32.24997445586331],
        style: 'dark',
        zoom: 2,
        token: '526f814f66cc435eed82135e34d11b85'
      })
    })

    eventCenter.on('setCenter', ({center} : {center: [number, number]}) => {
      if(scene) {
        scene.setZoomAndCenter(6, center)
      }
    })

    scene.on('loaded', () => {
      const layer = new WindLayer({});
      layer
        .source(
          picUrl,
          {
            parser: {
              type: 'image',
              extent: [73.55, 18.33, 134.99, 53.51]
            }
          }
        )
        .animate(true)
        .style({
          uMin: -16.98,
          uMax: 22.92,
          vMin: -13.27,
          vMax: 19.62,
          numParticles: 24000,
          fadeOpacity: 0.98,
          sizeScale: 1.12,
          rampColors: {
            0.0: '#c6dbef',
            0.2: '#9ecae1',
            0.4: '#6baed6',
            0.6: '#4292c6',
            0.8: '#2171b5',
            1.0: '#084594'
          }
        })
      scene.addLayer(layer)
    })
  }, [])

  return (
    <div
      className='min-h-[800px] justify-center relative'
      id="map"
    />
  )
}

export default WindMap