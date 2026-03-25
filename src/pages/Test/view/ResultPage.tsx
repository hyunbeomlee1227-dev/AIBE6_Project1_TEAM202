'use client'
import { motion } from 'framer-motion'
import { HomeIcon, RotateCcwIcon, Share2Icon } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { resultTypes, TravelType } from '../../../data/mockData'
import KakaoMap from './Map'

export const ResultPage: React.FC = () => {
    //const [isLoading, setIsLoading] = useState(true)
    const { type } = useParams<{
        type: string
    }>()
    const navigate = useNavigate()
    const result = resultTypes[type as TravelType]
    let recommendedPlaces = [
        {
            name: '제주 서귀포 숲길',
            location: '제주특별자치도 서귀포시',
            description:
                '제주의 아름다운 자연 속에서 복잡한 마음을 비우고 온전히 자신에게 집중할 수 있는 힐링 명소입니다. 고즈넉한 숲길을 걷거나 잔잔한 바다를 바라보며 평화로움을 느껴보세요.',
        },
        {
            name: '경주 황리단길',
            location: '경상북도 경주시',
            description:
                '천년고도의 정취가 가득한 황리단길에서 고즈넉한 감성을 느끼고, 고분 사이를 거닐며 고요한 시간을 보낼 수 있습니다. 역사와 자연이 어우러진 공간에서 마음의 평화를 찾아보세요.',
        },
        {
            name: '강릉 안목해변',
            location: '강원특별자치도 강릉시',
            description:
                '푸른 동해바다를 바라보며 여유로운 시간을 보내고, 개성 넘치는 카페에서 향긋한 커피 한 잔과 함께 감성적인 순간을 만끽할 수 있습니다. 바다 내음을 맡으며 온전한 휴식을 즐겨보세요.',
        },
    ]
    /*useEffect(() => {
        recommendedPlaces = requestGemini(result.title).then(() => {
            setIsLoading(false)
        })

        console.log(geminiAnswer)

        if (!result) {
            navigate('/')
        }
    }, [result, navigate])*/

    //if (isLoading) return <LoadingSpinner />
    if (!result) return null

    //const recommendedPlaces = places.filter((p) => p.type === result.id)

    const handleShare = async () => {
        const shareData = {
            title: '나의 여행 성향 테스트 결과',
            text: `나의 여행 성향은 [${result.title}]! 당신의 성향도 확인해보세요.`,
            url: window.location.href,
        }
        try {
            if (navigator.share) {
                await navigator.share(shareData)
                console.log('공유 성공!')
            } else {
                await navigator.clipboard.writeText(window.location.href)
                alert('링크가 클립보드에 복사되었습니다!')
            }
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error('공유 실패:', error)
                await navigator.clipboard.writeText(window.location.href)
                alert('링크를 복사했습니다.')
            }
        }
    }

    return (
        <div className="min-h-full bg-background pb-24 overflow-y-auto">
            {/* Result Header */}
            <div className={`${result.color} pt-12 pb-8 px-6 rounded-b-[3rem] shadow-sm mb-8 relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="relative z-10 flex flex-col items-center text-center"
                >
                    <span className="text-sm font-bold text-text/60 mb-2 bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        나의 여행 성향은
                    </span>
                    <div className="text-7xl mb-4 drop-shadow-md">{result.emoji}</div>
                    <h1 className="text-3xl font-bold text-text mb-2">{result.title}</h1>
                    <p className="text-text/80 font-medium mb-6">{result.subtitle}</p>

                    <Card className="p-6 text-left bg-white/90 backdrop-blur w-full">
                        <p className="text-text leading-relaxed text-sm">{result.description}</p>
                    </Card>
                </motion.div>
            </div>
            <div className="px-6 space-y-8">
                {/* Actions */}
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.3,
                    }}
                    className="flex gap-3"
                >
                    <Button
                        variant="primary"
                        onClick={handleShare}
                        fullWidth
                        className="gap-2 shadow-md shadow-primary/20"
                    >
                        <Share2Icon className="w-5 h-5" />
                        결과 공유하기
                    </Button>
                    <Button
                        variant="secondary"
                        className="px-4"
                        onClick={() => navigate('/test')}
                        aria-label="다시하기"
                    >
                        <RotateCcwIcon className="w-5 h-5" />
                    </Button>
                </motion.div>

                {/* Recommendations */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.5,
                    }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">✨</span>
                        <h2 className="text-xl font-bold text-text">이런 곳은 어때요?</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {recommendedPlaces!.map((map, index) => (
                            <KakaoMap key={`${map.name}-${index}`} name={map.name} />
                        ))}
                    </div>
                </motion.div>
                <div className="pt-4 pb-8 flex justify-center">
                    <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
                        <HomeIcon className="w-4 h-4" />
                        홈으로 돌아가기
                    </Button>
                </div>
            </div>
        </div>
    )
}

//{recommendedPlaces.map((place) => (
//<PlaceCard key={place.id} place={place} />
