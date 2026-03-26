import { Send } from 'lucide-react'
import React from 'react'

interface CommentInputProps {
    comment: string
    onCommentChange: (value: string) => void
    onSubmit: () => void
}

export const CommentInput: React.FC<CommentInputProps> = ({ comment, onCommentChange, onSubmit }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 flex items-center">
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => onCommentChange(e.target.value)}
                    placeholder="댓글을 입력해주세요..."
                    className="bg-transparent flex-1 text-sm outline-none"
                />
            </div>
            <button
                onClick={onSubmit}
                disabled={!comment.trim()}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white disabled:bg-gray-200 transition-colors"
            >
                <Send className="w-5 h-5" />
            </button>
        </div>
    )
}
