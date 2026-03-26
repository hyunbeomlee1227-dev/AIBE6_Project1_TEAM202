import type { TravelType } from '../mockData'

export type ScoreMap = Partial<Record<TravelType, number>>

export type AnswerOption = {
    text: string
    score: ScoreMap
}

export interface Question {
    id: number
    question: string
    imageUrl: string
    options: AnswerOption[]
}

export interface ResultType {
    id: TravelType
    title: string
    subtitle: string
    description: string
    emoji: string
    color: string
}
