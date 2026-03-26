import type { LucideIcon } from 'lucide-react'

export type TravelTypeId = 'healing' | 'shopping' | 'foodie' | 'photo' | 'calm' | 'explorer'

export interface TravelType {
    id: TravelTypeId
    title: string
    emoji: string
    icon: LucideIcon
    desc: string
    color: string
}
