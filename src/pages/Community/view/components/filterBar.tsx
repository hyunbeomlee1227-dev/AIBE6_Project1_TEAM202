import React from 'react'
import { TravelType } from '../../../../data/mockData'

const filters: { id: TravelType | 'ALL'; label: string }[] = [
    { id: 'ALL', label: '전체' },
    { id: 'HEALING', label: '🌿 힐링' },
    { id: 'FOOD', label: '🍜 맛집' },
    { id: 'PHOTO', label: '📸 포토' },
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
