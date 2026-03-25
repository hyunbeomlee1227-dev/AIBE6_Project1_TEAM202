import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../../components/ui/Card'
import { questions, TravelType } from '../../../data/mockData'
import { ProgressBar } from '../component/ProgressBar'
//리엑트 함수형 컴포넌트 선언
export const TestPage: React.FC = () => {
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<TravelType[]>([])
    const [direction, setDirection] = useState(1)
    const currentQuestion = questions[currentIndex]

    //사용자가 클릭했을 때 답변 처리
    const handleAnswer = (type: TravelType) => {
        const newAnswers = [...answers, type]
        setAnswers(newAnswers)
        if (currentIndex < questions.length - 1) {
            setDirection(1)
            setCurrentIndex(currentIndex + 1)
        } else {
            // 결과 계산 답변들의 개수를 카운트한다.
            const counts = newAnswers.reduce(
                (acc, curr) => {
                    acc[curr] = (acc[curr] || 0) + 1
                    return acc
                },
                {} as Record<TravelType, number>,
            )
            //가장 많은 답변을 가진 여행 타입 찾기(결과 공유하기 로직)
            const resultType = Object.keys(counts).reduce((a, b) =>
                counts[a as TravelType] > counts[b as TravelType] ? a : b,
            ) as TravelType
            navigate(`/result/${resultType}`, {
                replace: true,
            })
        }
    }
    // 뒤로가기 처리 로직
    const handleBack = () => {
        if (currentIndex > 0) {
            setDirection(-1)
            setCurrentIndex(currentIndex - 1)
            setAnswers(answers.slice(0, -1))
        } else {
            navigate(-1)
        }
    }
    // 화면전환 시 애니메이션 설정
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    }
    return (
        <div className="min-h-full bg-background flex flex-col pt-6 px-6 pb-12">
            <div className="flex items-center mb-6">
                <button onClick={handleBack} className="p-2 -ml-2 text-text-muted hover:text-text transition-colors">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <div className="flex-1 px-4">
                    <ProgressBar current={currentIndex + 1} total={questions.length} />
                </div>
                <div className="w-10" /> {/* Spacer for balance */}
            </div>

            <div className="flex-1 relative flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                        }}
                        className="w-full"
                    >
                        <h2 className="text-2xl font-bold text-text mb-10 text-center text-balance leading-relaxed">
                            {currentQuestion.text}
                        </h2>

                        <div className="space-y-4">
                            {currentQuestion.options.map((option, idx) => (
                                <Card
                                    key={idx}
                                    hoverable
                                    onClick={() => handleAnswer(option.type)}
                                    className="p-5 cursor-pointer border border-transparent hover:border-primary-light hover:bg-primary/5 transition-all active:scale-95"
                                >
                                    <p className="text-center font-medium text-text">{option.text}</p>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
