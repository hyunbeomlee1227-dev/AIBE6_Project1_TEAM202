'use client'
import { useEffect, useState } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

declare global {
    interface Window {
        kakao: any
    }
}

interface KakaoMapProps {
    name: string
}

interface PlaceType {
    place_name: string
    address_name: string
    road_address_name: string
    phone: string
    x: string
    y: string
}

export default function KakaoMap({ name }: KakaoMapProps) {
    const [map, setMap] = useState<kakao.maps.Map | null>(null)
    const [places, setPlaces] = useState<PlaceType[]>([])
    const [selected, setSelected] = useState<PlaceType | null>(null)

    const [loading, error] = useKakaoLoader({
        appkey: import.meta.env.VITE_KAKAO_API_KEY,
        libraries: ['services'],
    })

    useEffect(() => {
        if (!map || loading) return

        const ps = new window.kakao.maps.services.Places()

        ps.keywordSearch(name, (data: any[], status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const bounds = new window.kakao.maps.LatLngBounds()

                const sliced = data.slice(0, 5)
                setPlaces(sliced)

                sliced.forEach((place) => {
                    bounds.extend(new window.kakao.maps.LatLng(Number(place.y), Number(place.x)))
                })

                map.setBounds(bounds)
            }
        })
    }, [map, name, loading])

    if (loading) return
    if (error) return

    return (
        <div style={{ position: 'relative', width: '100%', height: '350px' }}>
            <Map
                center={{ lat: 37.566826, lng: 126.9786567 }}
                style={{ width: '100%', height: '100%' }}
                level={3}
                onCreate={setMap}
            >
                {places.map((place, i) => (
                    <MapMarker
                        key={`${place.place_name}-${i}`}
                        position={{
                            lat: Number(place.y),
                            lng: Number(place.x),
                        }}
                        onClick={() => {
                            setSelected(place)
                            map?.panTo(new window.kakao.maps.LatLng(Number(place.y), Number(place.x)))
                        }}
                    >
                        {selected?.place_name === place.place_name && (
                            <div style={{ padding: '5px', color: '#000' }}>{place.place_name}</div>
                        )}
                    </MapMarker>
                ))}
                <div
                    id="menu_wrap"
                    className="bg_white"
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        width: '150px',
                        maxHeight: '70%',
                        overflowY: 'auto',
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '10px',
                        padding: '10px',
                        zIndex: 2,
                    }}
                >
                    <div className="option">
                        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>🔍 "{name}" 검색 결과</div>
                    </div>

                    <hr />

                    <ul id="placesList">
                        {places.map((place, i) => (
                            <li
                                key={i}
                                className="item"
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    padding: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setSelected(place)
                                    map?.panTo(new window.kakao.maps.LatLng(Number(place.y), Number(place.x)))
                                }}
                            >
                                <span className={`markerbg marker_${i + 1}`} />

                                <div className="info">
                                    <div style={{ fontWeight: 'bold' }}>
                                        {i + 1}. {place.place_name}
                                    </div>

                                    {place.road_address_name ? (
                                        <>
                                            <span>{place.road_address_name}</span>
                                            <span style={{ color: '#888' }}>{place.address_name}</span>
                                        </>
                                    ) : (
                                        <span>{place.address_name}</span>
                                    )}

                                    <span style={{ color: 'green' }}>{place.phone}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Map>
        </div>
    )
}
