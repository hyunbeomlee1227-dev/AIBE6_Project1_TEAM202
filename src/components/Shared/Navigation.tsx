import { CompassIcon, HomeIcon, UserIcon, UsersIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

export const BottomNav: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, isAuthenticated } = useAuth()
    const [navProfileImage, setNavProfileImage] = useState<string | null>(null)

    const hiddenPaths = ['/test', '/login', '/signup', '/create-post']
    const shouldHideNav = hiddenPaths.some((path) => location.pathname.startsWith(path))

    useEffect(() => {
        const fetchNavProfileImage = async () => {
            if (!user) {
                setNavProfileImage(null)
                return
            }

            const { data, error } = await supabase.from('users').select('avatar_url').eq('id', user.id).single()

            if (error) {
                console.error('하단 프로필 이미지 조회 실패:', error)
                return
            }

            setNavProfileImage(data?.avatar_url ?? null)
        }

        fetchNavProfileImage()
    }, [user, location.pathname])

    if (shouldHideNav) return null

    const navItems = [
        {
            path: '/',
            icon: HomeIcon,
            label: '홈',
        },
        {
            path: '/test',
            icon: CompassIcon,
            label: '테스트',
        },
        {
            path: '/community',
            icon: UsersIcon,
            label: '커뮤니티',
        },
        {
            path: '/my',
            icon: UserIcon,
            label: '마이',
        },
    ]

    const handleNavigate = (path: string) => {
        if (path === '/my' && !isAuthenticated) {
            navigate('/login', {
                state: { from: location.pathname + location.search },
            })
            return
        }

        navigate(path)
    }

    return (
        <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 px-6 py-3 pb-safe flex justify-around items-center z-50">
            {navItems.map((item) => {
                const isActive =
                    location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))

                if (item.path === '/my' && isAuthenticated && user) {
                    return (
                        <button
                            key={item.path}
                            onClick={() => handleNavigate(item.path)}
                            className="flex flex-col items-center p-2 transition-colors"
                        >
                            <div
                                className={`w-6 h-6 mb-1 rounded-full overflow-hidden border-2 transition-colors ${
                                    isActive ? 'border-primary' : 'border-transparent'
                                }`}
                            >
                                <img
                                    src={navProfileImage || 'https://i.pravatar.cc/100?img=12'}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://i.pravatar.cc/100?img=12'
                                    }}
                                />
                            </div>
                            <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                                {item.label}
                            </span>
                        </button>
                    )
                }

                return (
                    <button
                        key={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className={`flex flex-col items-center p-2 transition-colors ${
                            isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-primary/20' : ''}`} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                )
            })}
        </div>
    )
}
