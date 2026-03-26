import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginPromptModal } from '../../../components/shared/LoginPromptModal'
import { useAuth } from '../../../contexts/AuthContext'
import { posts, TravelType } from '../../../data/mockData'
import { FilterBar } from './components/filterBar'
import { PostFeed } from './components/postFeed'
import { WriteButton } from './components/writeButton'

export const CommunityPage: React.FC = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [activeFilter, setActiveFilter] = useState<TravelType | 'ALL'>('ALL')
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [allPosts, setAllPosts] = useState(posts)

    const filteredPosts = activeFilter === 'ALL' ? allPosts : allPosts.filter((post) => post.type === activeFilter)

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

    const handleBookmarkClick = (postId: string) => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true)
            return
        }
        setAllPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)),
        )
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
