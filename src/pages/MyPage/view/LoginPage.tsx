import { motion } from 'framer-motion'
import { ChevronLeftIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from ?? '/'
    const { loginWithKakao, isAuthenticated, isLoading } = useAuth()

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/my')
        }
    }, [isAuthenticated, isLoading, navigate])

    const handleKakaoLogin = async () => {
        try {
            await loginWithKakao()
        } catch (error) {
            console.error('카카오 로그인 실패:', error)
        }
    }

    return (
        <div className="min-h-full bg-background flex flex-col">
            {/* 뒤로가기 */}
            <div className="p-4 flex items-center">
                <button
                    type="button"
                    onClick={() => navigate(from)}
                    className="p-2 -ml-2 text-text-muted hover:text-text transition-colors"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 px-6 flex flex-col justify-center pb-20"
            >
                {/* 헤더 */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-soft flex items-center justify-center mx-auto mb-6 text-4xl">
                        👋
                    </div>

                    <h1 className="text-2xl font-bold text-text mb-2">여행을 시작해 볼까요?</h1>

                    <p className="text-text-muted text-sm">카카오로 간편하게 시작해보세요</p>
                </div>

                {/* 카카오 로그인 버튼 */}
                <button
                    type="button"
                    onClick={handleKakaoLogin}
                    className="w-full py-4 bg-[#FEE500] text-black rounded-2xl font-bold text-base shadow-md hover:opacity-90 active:scale-95 transition"
                >
                    카카오로 시작하기
                </button>

                {/* 안내 문구 */}
                <p className="mt-6 text-xs text-text-muted text-center">
                    로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의한 것으로 간주됩니다.
                </p>
            </motion.div>
        </div>
    )
}
