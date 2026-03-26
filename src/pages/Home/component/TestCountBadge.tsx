import React from 'react'
import playIcon from '../../../assets/icons/play.png'

interface TestCountBadgeProps {
    count: number
}

export const TestCountBadge: React.FC<TestCountBadgeProps> = ({ count }) => {
    return (
        <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
            <img src={playIcon} alt="play" className="w-4 h-4 object-contain" />
            <span>+{count}</span>
        </div>
    )
}
