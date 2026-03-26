import { Edit3Icon } from 'lucide-react'
import React from 'react'

interface WriteButtonProps {
    onClick: () => void
}

export const WriteButton: React.FC<WriteButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/40 flex items-center justify-center hover:bg-primary-dark hover:scale-110 transition-all z-40 md:bottom-8 md:right-8"
            aria-label="글쓰기"
        >
            <Edit3Icon className="w-6 h-6" />
        </button>
    )
}
