import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { Comment, getComments, getPostById, Post, saveComment } from '../../../services/testPostApi'
import { CommentInput } from '../components/commentInput'
import { CommentList } from '../components/commentList'
import { PostContent } from '../components/postContent'

interface LocalComment {
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
    const { user, displayName, profileImage } = useAuth()
    const [post, setPost] = useState<Post | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [comment, setComment] = useState('')
    const [localComments, setLocalComments] = useState<LocalComment[]>([])

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

    useEffect(() => {
        const fetchComments = async () => {
            if (!postId) return
            const data = await getComments(postId)
            const converted: LocalComment[] = data.map((c: Comment) => ({
                id: c.id,
                content: c.content,
                createdAt: c.created_at,
                author: { nickname: '작성자', avatar: '' },
            }))
            setLocalComments(converted)
        }
        fetchComments()
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

    const handleCommentSubmit = async () => {
        if (!comment.trim() || !user?.id || !postId) return
        try {
            const newComment = await saveComment(postId, user.id, comment)
            if (newComment) {
                setLocalComments((prev) => [
                    ...prev,
                    {
                        id: newComment.id,
                        content: newComment.content,
                        createdAt: newComment.created_at,
                        author: {
                            nickname: displayName || '나',
                            avatar: profileImage || '',
                        },
                    },
                ])
            }
            setComment('')
        } catch (error) {
            console.error('댓글 저장 실패:', error)
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
