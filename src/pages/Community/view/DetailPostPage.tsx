import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostById, Post } from '../../../services/testPostApi'
import { CommentInput } from '../components/commentInput'
import { CommentList } from '../components/commentList'
import { PostContent } from '../components/postContent'

interface Comment {
    id: string
    content: string
    createdAt: string
    author: {
        nickname: string
        avatar: string
    }
}

export const DetailPostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>()
    const [post, setPost] = useState<Post | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [comment, setComment] = useState('')
    const [localComments, setLocalComments] = useState<Comment[]>([])

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) return
            try {
                const data = await getPostById(postId)
                setPost(data)
            } catch (error) {
                console.error('게시물 불러오기 실패:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPost()
    }, [postId])

    if (isLoading) {
        return (
            <div className="min-h-full bg-background pb-24 pt-6 relative">
                <div className="px-6 mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-text mb-1">로딩 중...</h1>
                    </div>
                </div>
            </div>
        )
    }

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
            const newComment: Comment = {
                id: Date.now().toString(),
                content: comment,
                createdAt: new Date().toISOString(),
                author: {
                    nickname: '나',
                    avatar: '',
                },
            }
            setLocalComments((prev) => [...prev, newComment])
            setComment('')
        }
    }

    return (
        <div>
            <div className="p-6">
                <PostContent post={post} />
                <CommentList comments={localComments} commentCount={localComments.length} />
            </div>

            <CommentInput comment={comment} onCommentChange={setComment} onSubmit={handleCommentSubmit} />
        </div>
    )
}
