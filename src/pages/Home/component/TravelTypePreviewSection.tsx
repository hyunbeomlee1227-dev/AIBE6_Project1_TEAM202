import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { fadeInUp, staggerContainer } from '../../../core/constants/animation'
import { travelTypes } from '../../../data/mock/travelTypes'
import { TravelTypeCard } from './TravelTypeCard'

export const TravelTypePreviewSection: React.FC = () => {
    const navigate = useNavigate()
    const handleCardClick = (type: string) => {
        navigate(`/community?type=${type}`)
    }
    return (
        <motion.section className="mb-8" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h2 variants={fadeInUp} className="mb-4 px-2 text-sm font-bold text-text-muted">
                이런 타입들이 있어요 👀
            </motion.h2>

            <div className="grid grid-cols-2 gap-4">
                {travelTypes.map((style) => (
                    <TravelTypeCard
                        key={style.id}
                        title={style.title}
                        color={style.color}
                        icon={style.icon}
                        onClick={() => handleCardClick(style.id)}
                    />
                ))}
            </div>
        </motion.section>
    )
}
