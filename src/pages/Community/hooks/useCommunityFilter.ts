import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TravelType } from '../../../data/mockData'

type CommunityFilter = TravelType | 'ALL'

const isTravelType = (value: string | null): value is TravelType => {
    if (!value) return false

    return ['HEALING', 'SHOPPING', 'FOOD', 'PHOTO', 'CALM', 'EXPLORER'].includes(value)
}
export const useCommunityFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const activeFilter = useMemo<CommunityFilter>(() => {
        const type = searchParams.get('type')

        if (!type) return 'ALL'
        if (!isTravelType(type)) return 'ALL'

        return type
    }, [searchParams])

    const setActiveFilter = (filter: CommunityFilter) => {
        if (filter === 'ALL') {
            setSearchParams({})
            return
        }

        setSearchParams({ type: filter })
    }

    return {
        activeFilter,
        setActiveFilter,
    }
}
