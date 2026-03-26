import { mockTestCount } from './mockData'
import { TestCountResponse } from './types'

export const getTestCount = async (): Promise<TestCountResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ count: mockTestCount })
        }, 300)
    })
}
