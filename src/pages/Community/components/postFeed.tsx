import { motion } from 'framer-motion'
import React from 'react'
import { PostCard } from '../../../components/shared/PostCard'
import { Post } from '../../../services/testPostApi'

interface PostFeedProps {
    posts: Post[]
    onLikeClick: (postId: string) => void
    onBookmarkClick: (postId: string) => void
    onPostClick: (postId: string) => void
}

export const PostFeed: React.FC<PostFeedProps> = ({ posts, onLikeClick, onBookmarkClick, onPostClick }) => {
    return (
        <div className="px-4 space-y-6">
            {posts.map((post, idx) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => onPostClick(post.id)}
                >
                    <PostCard
                        post={post}
                        onLikeClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onLikeClick(post.id)
                        }}
                        onBookmarkClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onBookmarkClick(post.id)
                        }}
                    />
                </motion.div>
            ))}
        </div>
    )
}
