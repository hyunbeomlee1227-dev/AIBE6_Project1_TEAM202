import { Edit3Icon } from 'lucide-react'
import React from 'react'

interface WriteButtonProps {
    onClick: () => void
}

export const WriteButton: React.FC<WriteButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="
                fixed bottom-24 
                left-1/2 translate-x-[-50%]
                w-full max-w-md
                flex justify-end px-6
                pointer-events-none
                z-40
            "
            aria-label="글쓰기"
        >
            <div
                className="
                    w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/40 
                    flex items-center justify-center 
                    hover:bg-primary-dark hover:scale-110 transition-all
                    pointer-events-auto
                "
            >
                <Edit3Icon className="w-6 h-6" />
            </div>
        </button>
    )
}
