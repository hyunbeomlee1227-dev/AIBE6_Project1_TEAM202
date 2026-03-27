import type { LucideIcon } from 'lucide-react'

export type TravelTypeId = 'HEALING' | 'SHOPPING' | 'FOOD' | 'PHOTO' | 'CALM' | 'EXPLORER'

export interface TravelType {
    id: TravelTypeId
    title: string
    emoji: string
    icon: LucideIcon
    desc: string
    color: string
}
