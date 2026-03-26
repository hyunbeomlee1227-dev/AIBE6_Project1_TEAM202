import { motion } from 'framer-motion'
import { ChevronLeftIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { useAuth } from '../../../contexts/AuthContext'
import { TravelType } from '../../../data/mockData'
import { ImageUploader } from '../components/imageUploader'
import { PostForm } from '../components/postForm'
import { TravelTypeSelector } from '../components/travelTypeSelector'

export const CreatePostPage: React.FC = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectedType, setSelectedType] = useState<TravelType>('HEALING')
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setImagePreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (title && content) {
            navigate('/community')
        }
    }

    return (
        <div className="min-h-full bg-background flex flex-col pb-safe">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-gray-100">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-text hover:text-primary transition-colors"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold text-text">게시글 작성</h1>
                <div className="w-10" />
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 p-6">
                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-full">
                    <ImageUploader
                        imagePreview={imagePreview}
                        onImageChange={handleImageChange}
                        onImageRemove={() => setImagePreview(null)}
                    />

                    <PostForm title={title} content={content} onTitleChange={setTitle} onContentChange={setContent} />

                    <TravelTypeSelector selectedType={selectedType} onTypeChange={setSelectedType} />

                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 pb-safe">
                        <Button type="submit" fullWidth className="shadow-lg shadow-primary/20">
                            게시하기
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
