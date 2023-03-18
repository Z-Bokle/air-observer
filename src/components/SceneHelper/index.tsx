import { useScene } from '@antv/larkmap'
import React, { useEffect } from 'react'

interface IProps {
    center: [number, number],
    zoom: number
}

export default function SceneHelper(props: IProps) {
    const scene = useScene()

    useEffect(() => {
        scene.setZoomAndCenter(props.zoom, props.center)
    }, [props.center, props.zoom, scene])
    
    
    return null
}
