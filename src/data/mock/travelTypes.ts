import { CameraIcon, CompassIcon, HeartIcon, MapIcon, SparklesIcon, UtensilsIcon } from 'lucide-react'
import type { TravelType } from '../models/travelType'

export const travelTypes: TravelType[] = [
    {
        id: 'healing',
        title: '감성 힐링',
        emoji: '🌿',
        icon: HeartIcon,
        desc: '여유로운 풍경과 감성적인 공간에서 마음을 쉬어가요',
        color: 'bg-green-100 text-green-700',
    },
    {
        id: 'shopping',
        title: '도시 탐험',
        emoji: '🛍',
        icon: MapIcon,
        desc: '트렌디한 공간과 핫플을 빠르게 경험하는 여행',
        color: 'bg-purple-100 text-purple-700',
    },
    {
        id: 'foodie',
        title: '맛집 투어',
        emoji: '🍜',
        icon: UtensilsIcon,
        desc: '여행의 중심은 음식, 로컬 맛집을 찾아 떠나요',
        color: 'bg-orange-100 text-orange-700',
    },
    {
        id: 'photo',
        title: '포토 여행',
        emoji: '📸',
        icon: CameraIcon,
        desc: '분위기와 순간을 기록하는 감성 여행',
        color: 'bg-pink-100 text-pink-700',
    },
    {
        id: 'calm',
        title: '고요 힐링',
        emoji: '🧘',
        icon: SparklesIcon,
        desc: '조용한 공간에서 온전히 나에게 집중하는 시간',
        color: 'bg-gray-100 text-gray-700',
    },
    {
        id: 'explorer',
        title: '모험 여행',
        emoji: '🧭',
        icon: CompassIcon,
        desc: '새로운 경험과 활동을 찾아 떠나는 여행',
        color: 'bg-blue-100 text-blue-700',
    },
]
