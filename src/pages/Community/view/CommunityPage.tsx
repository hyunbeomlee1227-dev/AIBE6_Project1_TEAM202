import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginPromptModal } from '../../../components/shared/LoginPromptModal'
import { useAuth } from '../../../contexts/AuthContext'
import { posts, TravelType } from '../../../data/mockData'
import { FilterBar } from '../components/filterBar'
import { PostFeed } from '../components/postFeed'
import { WriteButton } from '../components/writeButton'
import { supabase } from '../../../lib/supabase'

export const CommunityPage: React.FC = () => {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth()
    const [activeFilter, setActiveFilter] = useState<TravelType | 'ALL'>('ALL')
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [allPosts, setAllPosts] = useState(posts)
    const [bookmarkPlaceNames, setBookmarkPlaceNames] = useState<string[]>([])

    const filteredPosts = activeFilter === 'ALL' ? allPosts : allPosts.filter((post) => post.type === activeFilter)
    const feedPosts = filteredPosts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        image_url: post.image,
        travel_type: post.type,
        like_count: post.likeCount,
        comment_count: post.commentCount,
        user_id: post.author.id,
        created_at: post.createdAt,
    }))

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!user) return

            const { data, error } = await supabase.from('bookmarks').select('place_name').eq('user_id', user.id)

            if (error) {
                console.error('북마크 목록 조회 실패:', error)
                return
            }

            const names = (data ?? []).map((item) => item.place_name)
            setBookmarkPlaceNames(names)

            setAllPosts((prevPosts) =>
                prevPosts.map((post) => ({
                    ...post,
                    isBookmarked: names.includes(post.title),
                })),
            )
        }

        fetchBookmarks()
    }, [user])

    const handleLikeClick = (postId: string) => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true)
            return
        }

        setAllPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          isLiked: !post.isLiked,
                          likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
                      }
                    : post,
            ),
        )
    }

    const handleBookmarkClick = async (postId: string) => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true)
            return
        }

        if (!user) return

        const targetPost = allPosts.find((p) => p.id === postId)
        if (!targetPost) return

        try {
            const { data: existing, error: findError } = await supabase
                .from('bookmarks')
                .select('id')
                .eq('user_id', user.id)
                .eq('place_name', targetPost.title)
                .maybeSingle()

            if (findError) {
                console.error('북마크 조회 실패:', {
                    message: findError.message,
                    details: findError.details,
                    hint: findError.hint,
                    code: findError.code,
                })
                alert('북마크 조회 실패')
                return
            }

            if (existing) {
                const { error: deleteError } = await supabase.from('bookmarks').delete().eq('id', existing.id)

                if (deleteError) {
                    console.error('북마크 삭제 실패:', {
                        message: deleteError.message,
                        details: deleteError.details,
                        hint: deleteError.hint,
                        code: deleteError.code,
                    })
                    alert('북마크 삭제 실패')
                    return
                }

                setBookmarkPlaceNames((prev) => prev.filter((name) => name !== targetPost.title))

                setAllPosts((prevPosts) =>
                    prevPosts.map((post) => (post.id === postId ? { ...post, isBookmarked: false } : post)),
                )

                return
            }

            const { error: insertError } = await supabase.from('bookmarks').insert({
                user_id: user.id,
                place_name: targetPost.title,
            })

            if (insertError) {
                console.error('북마크 저장 실패:', {
                    message: insertError.message,
                    details: insertError.details,
                    hint: insertError.hint,
                    code: insertError.code,
                })
                alert('북마크 저장 실패')
                return
            }

            setBookmarkPlaceNames((prev) => [...prev, targetPost.title])

            setAllPosts((prevPosts) =>
                prevPosts.map((post) => (post.id === postId ? { ...post, isBookmarked: true } : post)),
            )
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

    return (
        <div className="min-h-full bg-background pb-24 pt-6 relative">
            <div className="px-6 mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-text mb-1">여행자 커뮤니티</h1>
                    <p className="text-sm text-text-muted">다른 여행러들의 이야기를 만나보세요</p>
                </div>
            </div>

            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            <PostFeed posts={feedPosts} onLikeClick={handleLikeClick} onBookmarkClick={handleBookmarkClick} />

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
