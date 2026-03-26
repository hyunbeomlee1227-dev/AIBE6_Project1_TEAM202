import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { PostCard } from '../../../../components/shared/PostCard'
import { Post } from '../../../../data/mockData'

interface PostFeedProps {
    posts: Post[]
    onLikeClick: (postId: string) => void
    onBookmarkClick: (postId: string) => void
}

export const PostFeed: React.FC<PostFeedProps> = ({ posts, onLikeClick, onBookmarkClick }) => {
    return (
        <div className="px-4 space-y-6">
            {posts.map((post, idx) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <Link to={`/community/${post.id}`}>
                        <PostCard
                            post={post}
                            onLikeClick={(e) => {
                                e.preventDefault()
                                onLikeClick(post.id)
                            }}
                            onBookmarkClick={(e) => {
                                e.preventDefault()
                                onBookmarkClick(post.id)
                            }}
                        />
                    </Link>
                </motion.div>
            ))}
        </div>
    )
}
