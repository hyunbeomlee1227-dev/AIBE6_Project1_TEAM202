import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import { supabase } from '../../../lib/supabase'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'

type Profile = {
    id: string
    nickname: string | null
    avatar_url: string | null
    created_at: string
}

export const EditProfile: React.FC = () => {
    const navigate = useNavigate()
    const { user, isAuthenticated, isLoading } = useAuth()

    const [profile, setProfile] = useState<Profile | null>(null)
    const [nicknameInput, setNicknameInput] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, isLoading, navigate])

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return

            setIsFetching(true)

            const { data, error } = await supabase
                .from('users')
                .select('id, nickname, avatar_url, created_at')
                .eq('id', user.id)
                .single()

            if (error) {
                console.error('프로필 조회 실패:', error)
                setIsFetching(false)
                return
            }

            setProfile(data)
            setNicknameInput(data?.nickname || '')
            setIsFetching(false)
        }

        fetchProfile()
    }, [user])

    const handleSave = async () => {
        if (!user) return

        const trimmedNickname = nicknameInput.trim()

        if (!trimmedNickname) {
            alert('닉네임을 입력해주세요.')
            return
        }

        try {
            setIsSaving(true)

            const { error } = await supabase.from('users').update({ nickname: trimmedNickname }).eq('id', user.id)

            if (error) {
                console.error('닉네임 저장 실패:', error)
                alert('닉네임 저장에 실패했습니다.')
                return
            }

            alert('닉네임이 저장되었습니다.')
            navigate('/my')
        } catch (error) {
            console.error('닉네임 저장 중 오류:', error)
            alert('닉네임 저장 중 오류가 발생했습니다.')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading || isFetching) {
        return (
            <div className="min-h-full flex items-center justify-center">
                <p className="text-sm text-text-muted">프로필 정보를 불러오는 중...</p>
            </div>
        )
    }

    if (!user) {
        return null
    }

    const avatarSrc = profile?.avatar_url || 'https://i.pravatar.cc/150?img=12'

    return (
        <div className="min-h-full bg-background pb-24">
            <div className="px-6 pt-8">
                <button
                    type="button"
                    onClick={() => navigate('/my')}
                    className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    뒤로가기
                </button>
            </div>

            <div className="px-6 pt-4">
                <Card className="p-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={avatarSrc} alt="프로필 이미지" className="w-full h-full object-cover" />
                        </div>

                        <h1 className="mt-4 text-2xl font-bold text-text">프로필 수정</h1>
                        <p className="mt-1 text-sm text-text-muted">닉네임을 변경할 수 있어요.</p>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-text mb-2">닉네임</label>
                        <input
                            type="text"
                            value={nicknameInput}
                            onChange={(e) => setNicknameInput(e.target.value)}
                            placeholder="닉네임을 입력하세요"
                            maxLength={20}
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
                        />
                        <p className="mt-2 text-xs text-text-muted">20자 이내로 입력해주세요.</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button variant="secondary" fullWidth className="py-3 text-sm" onClick={() => navigate('/my')}>
                            취소
                        </Button>

                        <Button
                            variant="primary"
                            fullWidth
                            className="py-3 text-sm"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? '저장 중...' : '저장'}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
