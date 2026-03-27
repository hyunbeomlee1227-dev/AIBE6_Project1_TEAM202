import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../contexts/AuthContext'
import { getPosts, Post } from '../../../services/testPostApi'
import { FilterBar } from '../components/filterBar'
import { LoginModal } from '../components/LoginModal'
import { PostFeed } from '../components/postFeed'
import { WriteButton } from '../components/writeButton'
import { useCommunityFilter } from '../hooks/useCommunityFilter'

export const CommunityPage: React.FC = () => {
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuth()
    const { activeFilter, setActiveFilter } = useCommunityFilter()
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [allPosts, setAllPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)

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

    const handleBookmarkClick = (postId: string) => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true)
            return
        }
        // 북마크는 별도 테이블 연동 전까지 로컬 state만 유지
        console.log('bookmark clicked:', postId)
    }

    const handleWriteClick = () => {
        if (isAuthenticated) {
            navigate('/create-post')
        } else {
            setIsLoginModalOpen(true)
        }
    }

    const handlePostClick = (postId: string) => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true)
            return
        }
        navigate(`/community/${postId}`)
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

            <PostFeed
                posts={filteredPosts}
                onLikeClick={handleLikeClick}
                onBookmarkClick={handleBookmarkClick}
                onPostClick={handlePostClick}
            />

            {isAuthenticated && <WriteButton onClick={handleWriteClick} />}

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onConfirm={() => {
                    setIsLoginModalOpen(false)
                    navigate('/login', {
                        state: { from: '/community' },
                    })
                }}
            />
        </div>
    )
}
