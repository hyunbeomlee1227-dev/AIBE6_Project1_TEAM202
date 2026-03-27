'use client'
import { useEffect, useRef } from 'react'

declare global {
    interface Window {
        kakao: any
    }
}

function KakaoMap() {
    const mapRef = useRef(null)

    useEffect(() => {
        const kakao = window.kakao
        const container = mapRef.current

        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        }

        new kakao.maps.Map(container, options)
    }, [])

    return (
        <>
            <h1>카카오맵</h1>
            <div ref={mapRef} style={{ width: '500px', height: '400px' }}></div>
        </>
    )
}

export default KakaoMap
