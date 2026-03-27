import { motion } from 'framer-motion'
import { ChevronLeftIcon, LockIcon, MailIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { useAuth } from '../../../contexts/AuthContext'

export const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from ?? '/'
    const { loginWithKakao, isAuthenticated, isLoading } = useAuth()

    /**
     * 기존 UI 유지용 state
     * - 현재는 이메일 로그인 미구현이어도 UI는 유지 가능
     */
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /**
     * 사용자에게 보여줄 에러 메시지
     */
    const [errorMessage, setErrorMessage] = useState('')

    /**
     * 이미 로그인 상태면 마이페이지로 이동
     */
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/my')
        }
    }, [isAuthenticated, isLoading, navigate])

    /**
     * 이메일 로그인은 아직 미구현 상태
     * - 요구사항상 카카오 로그인이 우선이므로 메시지만 보여줌
     */
    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('현재는 카카오 로그인만 지원합니다.')
    }

    /**
     * 카카오 로그인 처리
     */
    const handleKakaoLogin = async () => {
        try {
            setErrorMessage('')
            await loginWithKakao()
        } catch (error) {
            console.error('카카오 로그인 실패:', error)
            setErrorMessage('카카오 로그인에 실패했습니다. 다시 시도해주세요.')
        }
    }
    console.log('from:', location.state?.from)
    return (
        <div className="min-h-full bg-background flex flex-col">
            {/* 상단 뒤로가기 */}
            <div className="p-4 flex items-center">
                <button
                    type="button"
                    onClick={() => navigate(from)}
                    className="p-2 -ml-2 text-text-muted hover:text-text transition-colors"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            </div>

            {/* 본문 */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 px-6 flex flex-col justify-center pb-20"
            >
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-soft flex items-center justify-center mx-auto mb-4 text-3xl">
                        👋
                    </div>
                    <h1 className="text-2xl font-bold text-text mb-2">다시 만나서 반가워요!</h1>
                    <p className="text-text-muted text-sm">로그인하고 나만의 여행 스타일을 찾아보세요</p>
                </div>

                {/* 이메일 로그인 UI 유지 */}
                <Card className="p-6 mb-6">
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-text mb-1.5">이메일</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                    <MailIcon className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="hello@example.com"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text mb-1.5">비밀번호</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                    <LockIcon className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                                />
                            </div>
                        </div>

                        <Button type="submit" fullWidth className="mt-2 shadow-md shadow-primary/20">
                            로그인하기
                        </Button>
                    </form>
                </Card>

                {/* 소셜 로그인 */}
                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={handleKakaoLogin}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#FEE500] text-black rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                        카카오로 시작하기
                    </button>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-text rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setErrorMessage('현재는 카카오 로그인만 지원합니다.')}
                    >
                        Google로 시작하기
                    </button>
                </div>

                {/* 실패 메시지 */}
                {errorMessage && <p className="mt-4 text-sm text-red-500 text-center">{errorMessage}</p>}

                {/* 회원가입 링크 */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-text-muted">
                        계정이 없으신가요?{' '}
                        <Link to="/signup" className="font-bold text-primary hover:underline">
                            회원가입
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
