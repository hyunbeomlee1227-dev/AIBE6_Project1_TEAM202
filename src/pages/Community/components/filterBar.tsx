import React from 'react'
import { TravelType, resultTypes } from '../../../data/mockData'

const filters: { id: TravelType | 'ALL'; label: string }[] = [
    { id: 'ALL', label: '전체' },
    ...(Object.keys(resultTypes) as TravelType[]).map((type) => ({
        id: type,
        label: `${resultTypes[type].emoji} ${resultTypes[type].title.split(' ')[0]}`,
    })),
]

interface FilterBarProps {
    activeFilter: TravelType | 'ALL'
    onFilterChange: (filter: TravelType | 'ALL') => void
}

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
    return (
        <div className="px-6 mb-6 overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 pb-2">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeFilter === filter.id
                                ? 'bg-text text-white'
                                : 'bg-white text-text-muted border border-gray-100 hover:bg-gray-50'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
