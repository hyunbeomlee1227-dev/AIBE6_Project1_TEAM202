'use client'
import { useEffect, useRef, useState } from 'react'

declare global {
    interface Window {
        kakao: any
    }
}

interface KakaoMapProps {
    name: string
}

interface Place {
    place_name: string
    address_name: string
    road_address_name?: string
    phone: string
    x: string
    y: string
}

interface Pagination {
    last: number
    current: number
    gotoPage(page: number): void
}

export default function KakaoMap({ name }: KakaoMapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null)
    const mapInstance = useRef<kakao.maps.Map | null>(null)
    const infowindowRef = useRef<kakao.maps.InfoWindow | null>(null)
    const markersRef = useRef<kakao.maps.Marker[]>([])
    const [places, setPlaces] = useState<Place[]>([])

    useEffect(() => {
        if (!mapRef.current) return
        const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY

        if (window.kakao && window.kakao.maps) {
            initMap()
            return
        }

        const script = document.createElement('script')
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=services`
        script.async = true
        document.head.appendChild(script)

        script.onload = () => {
            window.kakao.maps.load(() => {
                initMap()
            })
        }

        function initMap() {
            if (!mapRef.current) return
            const kakao = window.kakao

            mapInstance.current = new kakao.maps.Map(mapRef.current, {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            })

            infowindowRef.current = new kakao.maps.InfoWindow({ zIndex: 1 })
            const ps = new kakao.maps.services.Places()
            ps.keywordSearch(name, placesSearchCB)
        }
    }, [name])

    function placesSearchCB(data: Place[], status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
            const top5 = data.slice(0, 5)
            setPlaces(top5)
            displayPlaces(top5)
        }
    }

    function displayPlaces(places: Place[]) {
        if (!mapInstance.current || !infowindowRef.current) return

        removeMarkers()

        const bounds = new window.kakao.maps.LatLngBounds()

        places.forEach((place, index) => {
            const position = new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x))
            const marker = addMarker(position, index)
            bounds.extend(position)

            markerEvents(marker, place.place_name)
        })

        mapInstance.current.setBounds(bounds)
    }

    function removeMarkers() {
        markersRef.current.forEach((m) => m.setMap(null))
        markersRef.current = []
    }

    function addMarker(position: kakao.maps.LatLng, idx: number): kakao.maps.Marker {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'
        const imageSize = new window.kakao.maps.Size(36, 37)
        const imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
            offset: new window.kakao.maps.Point(13, 37),
        }
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)
        const marker = new window.kakao.maps.Marker({ position, image: markerImage })
        marker.setMap(mapInstance.current)
        markersRef.current.push(marker)
        return marker
    }

    function markerEvents(marker: kakao.maps.Marker, title: string) {
        if (!infowindowRef.current) return
        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            infowindowRef.current!.setContent(`<div style="padding:5px;">${title}</div>`)
            infowindowRef.current!.open(mapInstance.current!, marker)
        })
        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindowRef.current!.close()
        })
    }

    return (
        <div style={{ position: 'relative', width: 500, height: 400 }}>
            {/* 지도 */}
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

            {/* menu_wrap 역할 */}
            <div
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    width: 250,
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: 10,
                    padding: 10,
                    zIndex: 10,
                }}
            >
                <b>🔍 {name}</b>

                <ul>
                    {places.slice(0, 3).map((place, i) => (
                        <li key={i}>
                            <b>{place.place_name}</b>
                            <br />
                            {place.road_address_name || place.address_name}
                            <br />
                            {place.phone}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
