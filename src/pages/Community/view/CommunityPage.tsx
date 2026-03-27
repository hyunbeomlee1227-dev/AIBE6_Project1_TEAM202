import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginPromptModal } from '../../../components/shared/LoginPromptModal'
import { useAuth } from '../../../contexts/AuthContext'
import { getPosts, Post } from '../../../services/testPostApi'
import { FilterBar } from '../components/filterBar'
import { PostFeed } from '../components/postFeed'
import { WriteButton } from '../components/writeButton'
import { useCommunityFilter } from '../hooks/useCommunityFilter'
import { supabase } from '../../../lib/supabase'

export const CommunityPage: React.FC = () => {
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuth()
    const { activeFilter, setActiveFilter } = useCommunityFilter()
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [allPosts, setAllPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [bookmarkedPostIds, setBookmarkedPostIds] = useState<string[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await getPosts()
                setAllPosts(posts)
            } catch (error) {
                console.error('불러오기 실패:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPosts()
    }, [])

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!user) {
                setBookmarkedPostIds([])
                return
            }

            const { data, error } = await supabase.from('bookmarks').select('post_id').eq('user_id', user.id)

            if (error) {
                console.error('북마크 목록 조회 실패:', error)
                return
            }

            const ids = (data ?? []).map((item) => item.post_id).filter((id): id is string => Boolean(id))

            setBookmarkedPostIds(ids)
        }

        fetchBookmarks()
    }, [user])

    const filteredPosts =
        activeFilter === 'ALL' ? allPosts : allPosts.filter((post) => post.travel_type === activeFilter)

    const handleLikeClick = (postId: string) => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true)
            return
        }
        setAllPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === postId ? { ...post, like_count: post.like_count + 1 } : post)),
        )
    }

    const handleBookmarkClick = async (postId: string) => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true)
            return
        }

        if (!user) return

        const targetPost = allPosts.find((post) => post.id === postId)
        if (!targetPost) return

        const isBookmarked = bookmarkedPostIds.includes(postId)

        try {
            if (isBookmarked) {
                const { error } = await supabase.from('bookmarks').delete().eq('user_id', user.id).eq('post_id', postId)

                if (error) {
                    console.error('북마크 삭제 실패:', error)
                    alert('북마크 삭제 실패')
                    return
                }

                setBookmarkedPostIds((prev) => prev.filter((id) => id !== postId))
                return
            }

            const { error } = await supabase.from('bookmarks').insert({
                user_id: user.id,
                post_id: postId,
                place_name: targetPost.title,
            })

            if (error) {
                console.error('북마크 저장 실패:', error)
                alert('북마크 저장 실패')
                return
            }

            setBookmarkedPostIds((prev) => [...prev, postId])
        } catch (error) {
            console.error('북마크 처리 실패:', error)
        }
    }

    const handleWriteClick = () => {
        if (isAuthenticated) {
            navigate('/create-post')
        } else {
            setIsLoginModalOpen(true)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-full bg-background flex items-center justify-center">
                <p className="text-text-muted">불러오는 중...</p>
            </div>
        )
    }

    return (
        <div className="min-h-full bg-background pb-24 pt-6 relative">
            <div className="px-6 mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-text mb-1">여행자 커뮤니티</h1>
                    <p className="text-sm text-text-muted">다른 여행러들의 이야기를 만나보세요</p>
                </div>
            </div>

            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            <PostFeed posts={filteredPosts} onLikeClick={handleLikeClick} onBookmarkClick={handleBookmarkClick} />

            <WriteButton onClick={handleWriteClick} />

            <LoginPromptModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onConfirm={() => {
                    setIsLoginModalOpen(false)
                    navigate('/login')
                }}
            />
        </div>
    )
}
