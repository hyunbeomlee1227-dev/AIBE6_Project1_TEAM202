import { BookmarkIcon, HeartIcon, MessageCircleIcon, Send } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { posts, resultTypes } from '../../../data/mockData'

export const DetailPostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>()
    const navigate = useNavigate()

    // url에서 받은 id와 일치하는 게시물 찾기
    const post = posts.find((p) => p.id === postId)

    // 댓글 입력을 위한 state 함수
    const [comment, setComment] = useState('')

    // 게시물이 없을 경우
    if (!post) {
        return (
            <div className="min-h-full bg-background pb-24 pt-6 relative">
                <div className="px-6 mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-text mb-1">게시물을 찾을 수 없습니다.</h1>
                        <p className="text-sm text-text-muted">존재하지 않는 게시물입니다.</p>
                    </div>
                </div>
            </div>
        )
    }

    const travelTypeInfo = resultTypes[post.type]

    return (
        <div>
            <div className="p-6">
                {/* 작성자 정보 */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <img
                            src={post.author.avatar}
                            alt={post.author.nickname}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <div className="font-bold text-text">{post.author.nickname}</div>
                            <div className="text-xs text-text-muted flex items-center gap-1">
                                <span>{travelTypeInfo.emoji}</span>
                                {travelTypeInfo.title}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 게시글 내용 */}
                <h1 className="text-2xl font-bold text-text mb-4">{post.title}</h1>
                <p className="text-text leading-relaxed mb-6 whitespace-pre-wrap">{post.content}</p>
                {/* 이미지 영역 */}
                {post.image && (
                    <div className="rounded-2xl overflow-hidden mb-6 bg-gray-100">
                        <img src={post.image} alt="게시글 이미지" className="w-full h-auto object-cover" />
                    </div>
                )}
                {/* 하단 인터랙션 바 */}
                <div className="flex items-center justify-between py-4 border-y border-gray-100">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-1.5 text-text">
                            <HeartIcon className={`w-6 h-6 ${post.isLiked ? 'fill-primary text-primary' : ''}`} />
                            <span className="font-medium">{post.likeCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-text">
                            <MessageCircleIcon className="w-6 h-6" />
                            <span className="font-medium">{post.commentCount}</span>
                        </div>
                    </div>
                    <BookmarkIcon className={`w-6 h-6 ${post.isBookmarked ? 'fill-primary text-primary' : ''}`} />
                </div>
                {/* 댓글 영역 */}
                <div className="px-6 py-6 bg-gray-50 min-h-[300px]">
                    <h3 className="font-bold text-text mb-4">댓글 {post.commentCount}</h3>
                    <div className="space-y-4">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                                <img
                                    src={comment.author.avatar}
                                    alt={comment.author.nickname}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                        <p className="text-xs font-bold text-gray-900 mb-1">
                                            {comment.author.nickname}
                                        </p>
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
                {/* 하단 댓글 입력창 */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
                    <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 flex items-center">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="댓글을 입력해주세요..."
                            className="bg-transparent flex-1 text-sm outline-none"
                        />
                    </div>
                    <button
                        disabled={!comment.trim()}
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white disabled:bg-gray-200 transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
