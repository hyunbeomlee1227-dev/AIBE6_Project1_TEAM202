import { GoogleGenAI } from '@google/genai'
import createPlacecPrompt from '../prompt'
import { mockTestCount } from './mockData'
import { TestCountResponse } from './types'

export const getTestCount = async (): Promise<TestCountResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ count: mockTestCount })
        }, 300)
    })
}

export async function requestGemini(request: string) {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY! })
    const prompt = createPlacecPrompt(request)

    const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    })

    if (result !== undefined) return JSON.parse(result.text!)
    else return console.log('AI 응답 실패')
}
