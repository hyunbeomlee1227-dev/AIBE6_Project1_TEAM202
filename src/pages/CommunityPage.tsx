import { motion } from 'framer-motion'
import { Edit3Icon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginPromptModal } from '../components/LoginPromptModal'
import { PostCard } from '../components/PostCard'
import { useAuth } from '../contexts/AuthContext'
import { posts, TravelType } from '../data/mockData'

const filters: {
    id: TravelType | 'ALL'
    label: string
}[] = [
    {
        id: 'ALL',
        label: '전체',
    },
    {
        id: 'HEALING',
        label: '🌿 힐링',
    },
    {
        id: 'CITY',
        label: '🏙️ 도시',
    },
    {
        id: 'FOOD',
        label: '🍜 맛집',
    },
    {
        id: 'PHOTO',
        label: '📸 포토',
    },
]

export const CommunityPage: React.FC = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth() // 로그인 여부 확인

    const [allPosts, setAllPosts] = useState(posts)
    const [activeFilter, setActiveFilter] = useState<TravelType | 'ALL'>('ALL') // 게시물 필터 선택 여부
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false) // 로그인 상태확인 후 로그인 유도 모달 표시 여부

    const filteredPosts = activeFilter === 'ALL' ? allPosts : allPosts.filter((post) => post.type === activeFilter) // 출력할 게시물 목록 (전체 또는 선택한 필터에 따라)

    // 좋아요 수 증가 구현 함수
    const handleLikeClick = (postId: string) => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true)
            return
        }

        setAllPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        isLiked: !post.isLiked,
                        likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
                    }
                }
                return post
            }),
        )
    }

    const handleWriteClick = () => {
        // 게시글 작성 버튼 클릭
        if (isAuthenticated) {
            navigate('/create-post') // 게시글 작성 페이지 이동
        } else {
            setIsLoginModalOpen(true) // 로그인 모달 열기
        }
    }
    const handleProtectedAction = () => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true) // 로그인 모달 열기
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

            {/* 게시물 출력 필터링 */}
            <div className="px-6 mb-6 overflow-x-auto hide-scrollbar">
                <div className="flex gap-2 pb-2">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter.id ? 'bg-text text-white' : 'bg-white text-text-muted border border-gray-100 hover:bg-gray-50'}`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 필터링 기반 게시물 출력 */}
            <div className="px-4 space-y-6">
                {filteredPosts.map((post, idx) => (
                    <motion.div
                        key={post.id}
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: idx * 0.1,
                        }}
                    >
                        <Link to={`/community/${post.id}`}>
                            <PostCard
                                post={post}
                                onLikeClick={(e) => {
                                    e.preventDefault()
                                    handleLikeClick(post.id)
                                }}
                                onBookmarkClick={(e) => {
                                    e.preventDefault()
                                    handleProtectedAction()
                                }}
                            />
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* 게시물 등록바로가기 버튼 */}
            <button
                onClick={handleWriteClick}
                className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/40 flex items-center justify-center hover:bg-primary-dark hover:scale-110 transition-all z-40 md:bottom-8 md:right-8"
                aria-label="글쓰기"
            >
                <Edit3Icon className="w-6 h-6" />
            </button>

            {/* 비로그인 시 기능 접근할 때 로그인 유도 모달 */}
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
