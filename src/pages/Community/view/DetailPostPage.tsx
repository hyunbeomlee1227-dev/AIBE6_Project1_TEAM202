import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { posts } from '../../../data/mockData'
import { CommentInput } from '../components/commentInput'
import { CommentList } from '../components/commentList'
import { PostContent } from '../components/postContent'

export const DetailPostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>()
    const post = posts.find((p) => p.id === postId)
    const [comment, setComment] = useState('')

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

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            // TODO: 댓글 제출 로직
            setComment('')
        }
    }

    return (
        <div>
            <div className="p-6">
                <PostContent post={post} />
                <CommentList comments={post.comments} commentCount={post.commentCount} />
            </div>

            <CommentInput comment={comment} onCommentChange={setComment} onSubmit={handleCommentSubmit} />
        </div>
    )
}
