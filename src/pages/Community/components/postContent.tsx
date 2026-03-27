import { BookmarkIcon, HeartIcon, MessageCircleIcon } from 'lucide-react'
import React from 'react'
import { resultTypes } from '../../../data/mockData'
import { Post } from '../../../services/testPostApi'

interface PostContentProps {
    post: Post
    isLiked: boolean
    isBookmarked: boolean
    onLikeClick: (e: React.MouseEvent) => void
    onBookmarkClick: (e: React.MouseEvent) => void
}

export const PostContent: React.FC<PostContentProps> = ({
    post,
    isLiked,
    isBookmarked,
    onLikeClick,
    onBookmarkClick,
}) => {
    const travelTypeInfo = resultTypes[post.travel_type as keyof typeof resultTypes]

    return (
        <div>
            {/* 작성자 정보 - author 없으므로 travel_type으로 대체 */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                        {travelTypeInfo?.emoji ?? '✈️'}
                    </div>
                    <div>
                        <div className="text-xs text-text-muted flex items-center gap-1">
                            <span>{travelTypeInfo?.emoji}</span>
                            {travelTypeInfo?.title}
                        </div>
                    </div>
                </div>
            </div>

            {/* 게시글 내용 */}
            <h1 className="text-2xl font-bold text-text mb-4">{post.title}</h1>
            <p className="text-text leading-relaxed mb-6 whitespace-pre-wrap">{post.content}</p>

            {/* 이미지 영역 */}
            {post.image_url && (
                <div className="rounded-2xl overflow-hidden mb-6 bg-gray-100">
                    <img src={post.image_url} alt="게시글 이미지" className="w-full h-auto object-cover" />
                </div>
            )}

            {/* 하단 인터랙션 바 */}
            <div className="flex items-center justify-between py-4 border-y border-gray-100">
                <div className="flex gap-6">
                    <div className="flex items-center gap-1.5 text-text">
                        <button
                            onClick={onLikeClick}
                            className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-primary' : 'text-text hover:text-primary'}`}
                        >
                            <HeartIcon className={`w-6 h-6 ${isLiked ? 'fill-primary' : ''}`} />
                            <span className="font-medium">{post.like_count}</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-1.5 text-text">
                        <MessageCircleIcon className="w-6 h-6" />
                        <span className="font-medium">{post.comment_count}</span>
                    </div>
                </div>
                <button
                    onClick={onBookmarkClick}
                    className={`transition-colors ${isBookmarked ? 'text-primary' : 'text-text hover:text-primary'}`}
                >
                    <BookmarkIcon className={`w-6 h-6 ${isBookmarked ? 'fill-primary' : ''}`} />
                </button>
            </div>
        </div>
    )
}
