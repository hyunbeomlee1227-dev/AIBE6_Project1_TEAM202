import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import React from 'react'
import { Card } from '../../../components/ui/Card'
import { fadeInUp } from '../../../core/constants/animation'

interface TravelTypeCardProps {
    title: string
    color: string
    icon: LucideIcon
    onClick: () => void
}

export const TravelTypeCard: React.FC<TravelTypeCardProps> = ({ title, color, icon: Icon, onClick }) => {
    return (
        <motion.div variants={fadeInUp}>
            <Card
                onClick={onClick}
                className="h-full border border-gray-50 p-4 text-center transition hover:-translate-y-1 hover:shadow-md"
            >
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-text">{title}</h3>
            </Card>
        </motion.div>
    )
}
