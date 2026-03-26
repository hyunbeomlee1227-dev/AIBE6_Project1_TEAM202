import React from 'react'
import { TravelType, resultTypes } from '../../../data/mockData'

interface TravelTypeSelectorProps {
    selectedType: TravelType
    onTypeChange: (type: TravelType) => void
}

export const TravelTypeSelector: React.FC<TravelTypeSelectorProps> = ({ selectedType, onTypeChange }) => {
    return (
        <div className="pb-20">
            <label className="block text-sm font-bold text-text mb-2">여행 스타일 태그</label>
            <div className="grid grid-cols-2 gap-2">
                {(Object.keys(resultTypes) as TravelType[]).map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => onTypeChange(type)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-all ${
                            selectedType === type
                                ? 'bg-text text-white shadow-md'
                                : 'bg-white border border-gray-200 text-text-muted hover:bg-gray-50'
                        }`}
                    >
                        <span>{resultTypes[type].emoji}</span>
                        {resultTypes[type].title.split(' ')[0]}
                    </button>
                ))}
            </div>
        </div>
    )
}
