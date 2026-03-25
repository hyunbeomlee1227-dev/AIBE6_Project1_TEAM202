import { motion } from 'framer-motion'
import { ChevronLeftIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { useAuth } from '../../../contexts/AuthContext'
export const SignupPage: React.FC = () => {
    const navigate = useNavigate()
    const { signup } = useAuth()
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault()
        if (email && nickname && password) {
            signup(email, nickname)
            navigate('/')
        }
    }
    return (
        <div className="min-h-full bg-background flex flex-col">
            <div className="p-4 flex items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-text-muted hover:text-text transition-colors"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            </div>

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="flex-1 px-6 flex flex-col justify-center pb-12"
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-text mb-2">환영합니다! ✨</h1>
                    <p className="text-text-muted text-sm">간단한 정보 입력 후 바로 시작해보세요</p>
                </div>

                <Card className="p-6 mb-6">
                    <form onSubmit={handleSignup} className="space-y-4">
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
                                    placeholder="hello@poomang.com"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text mb-1.5">닉네임</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="여행러"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                                    required
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
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" fullWidth className="mt-4 shadow-md shadow-primary/20">
                            가입하기
                        </Button>
                    </form>
                </Card>

                <div className="mt-4 text-center">
                    <p className="text-sm text-text-muted">
                        이미 계정이 있으신가요?{' '}
                        <Link to="/login" className="font-bold text-primary hover:underline">
                            로그인
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
