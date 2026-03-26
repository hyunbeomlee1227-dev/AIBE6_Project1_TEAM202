import { BookmarkIcon, HeartIcon, MessageCircleIcon } from 'lucide-react'
import React from 'react'
import { Post, resultTypes } from '../../../data/mockData'

interface PostContentProps {
    post: Post
}

export const PostContent: React.FC<PostContentProps> = ({ post }) => {
    const travelTypeInfo = resultTypes[post.type]

    return (
        <div>
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
        </div>
    )
}
