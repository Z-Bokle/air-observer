import { LarkMap, LarkMapRefAttributes, LayerPopup, LayerPopupProps, PolygonLayer, PolygonLayerProps, ScaleControl, useScene, ZoomControl } from '@antv/larkmap';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import SceneHelper from '../SceneHelper';
import { InteractiveMapProps } from './type'
import { aliyunGeojsonApi } from '../../services/aliyun'

const mapOptions: {
  style: string;
  center: [number, number];
  zoom: number;
  token: string;
} = {
  style: 'light',
  center: [120.9, 30.4],
  zoom: 5,
  token: '526f814f66cc435eed82135e34d11b85' // 仅限开发使用
}

const polygonLayerOption: Omit<PolygonLayerProps, 'source'> = {
  id: 'PolygonLayer',
  state: {
    active: { color: 'blue' }
  },
  color: 'green',
  style: {
    opacity: 0.5
  }
}

const items: LayerPopupProps['items'] = [{
  layer: 'PolygonLayer',
  fields: [
    {
      field: 'adcode',
      formatField: '地区编号',
    },
    {
      field: 'name',
      formatField: '地区名',
    },
    {
      field: 'level',
      formatField: '等级',
      formatValue:
        (value) => value === 'country' ? '国' :
          value === 'province' ? '省' :
            value === 'city' ? '市' :
              value === 'district' ? '区/县' : null
    },
    {
      field: 'center',
      formatField: '中心坐标',
      formatValue: (value) => `[${value[0]}, ${value[1]}]`
    }]
}]

const InteractiveMap =
  forwardRef<HTMLDivElement, InteractiveMapProps>((props, ref) => {
    const [source, setSource] = useState({
      data: { type: 'FeatureCollection', features: [] },
      parser: { type: 'geojson' },
    })

    const [country, setCountry] = useState(props.region.country)
    const [province, setProvince] = useState(props.region.province)
    const [city, setCity] = useState(props.region.city)

    useEffect(() => {
      props.onChangeRegion({ country, province, city })
    }, [country, city, province])

    useEffect(() => {
      setCountry(props.region.country)
      setProvince(props.region.province)
      setCity(props.region.city)
    }, [props.region])


    const [center, setCenter] = useState(mapOptions.center)
    const [zoom, setZoom] = useState(mapOptions.zoom)

    // 计算得到应该查询的区域代码
    const code = useMemo(() => city || province || country, [city, country, province])


    // 获取geojson
    useEffect(() => {
      fetch(`${aliyunGeojsonApi}${code}_full.json`)
        .then((res) => res.json())
        .then((data) => setSource((prevState) => ({ ...prevState, data })))
    }, [code]);

    // 左键点击色块选中区域
    const handleClick = useCallback(
      (...args: any) => {
        const properties = args[0].feature.properties
        setCenter(properties.center)
        if (properties.level === 'province') {

          setProvince(properties.adcode)
          setCity(undefined)
          setZoom(6.5)
        } else if (properties.level === 'city') {

          setCity(properties.adcode)
        } else {
          // 无事发生
        }
      }, [])

    return (
      <div ref={ref}>
        <LarkMap mapType='Gaode' mapOptions={mapOptions} style={Object.assign({ height: '30vh' }, props.style)}> {/* LarkMap不写样式指定高度会报错！！！！！ */}
          <ScaleControl /> {/* 需要关闭StrictMode，否则地图样式、控制按钮等都会被渲染两次导致出错 */}
          <ZoomControl />
          <PolygonLayer source={source} {...polygonLayerOption} onClick={handleClick} /*onContextMenu={handleRightClick}*/ />
          <LayerPopup
            closeButton={false}
            closeOnClick={false}
            anchor="bottom-left"
            trigger="hover"
            items={items}
          />
          <SceneHelper center={center} zoom={zoom} />
        </LarkMap>
      </div>

    )
  })

export default InteractiveMap
