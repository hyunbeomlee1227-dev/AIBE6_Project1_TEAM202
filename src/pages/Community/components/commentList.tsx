import React from 'react'
import { Comments } from '../../../data/mockData'

interface CommentListProps {
    comments: Comments[]
    commentCount: number
}

export const CommentList: React.FC<CommentListProps> = ({ comments, commentCount }) => {
    return (
        <div className="px-6 py-6 bg-gray-50 min-h-[300px]">
            <h3 className="font-bold text-text mb-4">댓글 {commentCount}</h3>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <img
                            src={comment.author.avatar}
                            alt={comment.author.nickname}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                <p className="text-xs font-bold text-gray-900 mb-1">{comment.author.nickname}</p>
                                <p className="text-sm text-gray-700 leading-snug">{comment.content}</p>
                            </div>
                            <span className="text-[10px] text-gray-400 ml-1 mt-1 block">
                                {new Date(comment.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
