import { motion } from 'framer-motion'
import { BookmarkIcon, LogOutIcon, MapPinIcon, PencilIcon, UserIcon } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { useAuth } from '../../../contexts/AuthContext'
import { supabase } from '../../../lib/supabase'

type Profile = {
    id: string
    nickname: string | null
    avatar_url: string | null
    created_at: string
}

export const MyPage: React.FC = () => {
    const navigate = useNavigate()
    const { user, logout, isAuthenticated, isLoading, displayName, profileImage } = useAuth()

    const [activeTab, setActiveTab] = useState<'bookmarks' | 'posts'>('bookmarks')
    const [profile, setProfile] = useState<Profile | null>(null)

    const mockBookmarks = useMemo(
        () => [
            { id: 1, title: '제주도 협재 해변', subtitle: '맑은 바다와 여유로운 풍경' },
            { id: 2, title: '강릉 안목해변', subtitle: '카페거리와 바다가 함께' },
        ],
        [],
    )

    const mockPosts = useMemo(
        () => [
            { id: 1, title: '혼자 다녀온 부산 여행 후기' },
            { id: 2, title: '제주 렌터카 없이 여행하는 법' },
        ],
        [],
    )

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, isLoading, navigate])

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return

            const { data, error } = await supabase
                .from('users')
                .select('id, nickname, avatar_url, created_at')
                .eq('id', user.id)
                .single()

            if (error) {
                console.error('프로필 조회 실패:', error)
                return
            }

            setProfile(data)
        }

        fetchProfile()
    }, [user])

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
        } catch (error) {
            console.error('로그아웃 실패:', error)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-full flex items-center justify-center">
                <p className="text-sm text-text-muted">사용자 정보를 불러오는 중...</p>
            </div>
        )
    }

    if (!user) {
        return null
    }

    const email = user.email ?? '이메일 정보 없음'
    const nickname = profile?.nickname || displayName
    const avatarSrc = profile?.avatar_url || profileImage || 'https://i.pravatar.cc/150?img=12'

    return (
        <div className="min-h-full bg-background pb-24">
            <div className="px-6 pt-8 pb-6">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4"
                >
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        <img src={avatarSrc} alt={nickname} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-text truncate">{nickname}</h1>

                            <button
                                type="button"
                                onClick={() => navigate('/my/edit-profile')}
                                className="shrink-0 inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-text hover:bg-gray-50 transition-colors"
                            >
                                <PencilIcon className="w-3.5 h-3.5" />
                                수정
                            </button>
                        </div>

                        <p className="text-sm text-text-muted truncate">{email}</p>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 mt-3">
                            <UserIcon className="w-4 h-4 text-text-muted" />
                            <span className="text-sm font-bold text-text">여행 성향 준비 중</span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <Button
                        variant="primary"
                        fullWidth
                        className="py-2.5 text-sm"
                        onClick={() => {
                            const savedResult = localStorage.getItem('testResult')
                            if (savedResult) {
                                navigate(`/result/${savedResult}`)
                            } else {
                                navigate('/test')
                            }
                        }}
                    >
                        내 결과 보기
                    </Button>

                    <Button variant="secondary" fullWidth className="py-2.5 text-sm" onClick={handleLogout}>
                        로그아웃
                    </Button>
                </div>
            </div>

            <div className="px-6 mb-4">
                <div className="grid grid-cols-2 bg-gray-100 rounded-2xl p-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab('bookmarks')}
                        className={`py-2.5 rounded-xl text-sm font-bold transition-colors ${
                            activeTab === 'bookmarks' ? 'bg-white text-text shadow-sm' : 'text-text-muted'
                        }`}
                    >
                        저장한 장소
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('posts')}
                        className={`py-2.5 rounded-xl text-sm font-bold transition-colors ${
                            activeTab === 'posts' ? 'bg-white text-text shadow-sm' : 'text-text-muted'
                        }`}
                    >
                        내 게시글
                    </button>
                </div>
            </div>

            <div className="px-6 space-y-3">
                {activeTab === 'bookmarks' &&
                    mockBookmarks.map((item) => (
                        <Card key={item.id} className="p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                                    <BookmarkIcon className="w-5 h-5 text-text-muted" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-text">{item.title}</h3>
                                    <p className="text-sm text-text-muted mt-1">{item.subtitle}</p>
                                </div>
                            </div>
                        </Card>
                    ))}

                {activeTab === 'posts' &&
                    mockPosts.map((item) => (
                        <Card key={item.id} className="p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                                    <MapPinIcon className="w-5 h-5 text-text-muted" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-text">{item.title}</h3>
                                    <p className="text-sm text-text-muted mt-1">
                                        실제 게시글 데이터 연결 전 임시 영역입니다.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
            </div>

            <div className="px-6 mt-8">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-red-500 bg-white border border-red-100 rounded-2xl hover:bg-red-50 transition-colors"
                >
                    <LogOutIcon className="w-4 h-4" />
                    로그아웃
                </button>
            </div>
        </div>
    )
}
