import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

/**
 * 프로젝트에서 사용할 인증 사용자 타입
 * - Supabase User를 그대로 쓰되
 * - 화면에서 자주 쓸 display 정보들을 helper로 같이 제공
 */
interface AuthContextType {
    user: User | null
    session: Session | null
    isAuthenticated: boolean
    isLoading: boolean

    /**
     * 표시용 데이터
     */
    displayName: string
    profileImage: string | null

    /**
     * 인증 액션
     */
    loginWithKakao: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * user metadata에서 화면용 이름 추출
 */
const getDisplayName = (user: User | null) => {
    if (!user) return ''

    return (
        user.user_metadata?.nickname ||
        user.user_metadata?.name ||
        user.user_metadata?.full_name ||
        user.user_metadata?.user_name ||
        user.email?.split('@')[0] ||
        '사용자'
    )
}

/**
 * user metadata에서 프로필 이미지 추출
 */
const getProfileImage = (user: User | null) => {
    if (!user) return null

    return user.user_metadata?.avatar_url || user.user_metadata?.picture || user.user_metadata?.profile_image || null
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    /**
     * 현재 세션 / 사용자 / 초기 로딩 상태
     */
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        /**
         * 앱 진입 시 기존 세션 복원
         * - 새로고침해도 로그인 유지되게 하는 핵심
         */
        const initializeAuth = async () => {
            try {
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession()

                if (error) {
                    console.error('세션 조회 실패:', error.message)
                }

                setSession(session)
                setUser(session?.user ?? null)
            } catch (error) {
                console.error('초기 인증 상태 확인 중 오류:', error)
            } finally {
                setIsLoading(false)
            }
        }

        initializeAuth()

        /**
         * 인증 상태 변경 감지
         * - 로그인 성공
         * - 로그아웃
         * - 토큰 갱신
         */
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setIsLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    /**
     * 카카오 OAuth 로그인
     * - 로그인 후 /my 로 이동
     */
    const loginWithKakao = async () => {
        const redirectTo = `${window.location.origin}/my`
        console.log('카카오 로그인 redirectTo:', redirectTo)

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
            options: {
                redirectTo,
            },
        })

        console.log('oauth data:', data)
        console.log('oauth error:', error)

        if (error) {
            console.error('카카오 로그인 실패:', error)
            throw error
        }
    }

    /**
     * 로그아웃
     */
    const logout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            throw error
        }

        setSession(null)
        setUser(null)
    }

    /**
     * 화면에서 자주 쓰는 값은 미리 계산
     */
    const value = useMemo(
        () => ({
            user,
            session,
            isAuthenticated: !!user,
            isLoading,
            displayName: getDisplayName(user),
            profileImage: getProfileImage(user),
            loginWithKakao,
            logout,
        }),
        [user, session, isLoading],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth는 AuthProvider 내부에서 사용해야 합니다.')
    }

    return context
}
