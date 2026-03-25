import React from 'react'
import { useParams } from 'react-router-dom'
import { posts } from '../data/mockData'

export const DetailPostPage: React.FC = () => {
    // url에서 ID 가져오기
    const { id } = useParams<{ id: string }>()
    // ID로 게시물 찾기
    const post = posts.find((post) => post.id === id)

    // 게시물이 없을 경우
    if (!post) {
        return <div>게시물을 찾을 수 없습니다.</div>
    }

    return (
        <div className="p-6">
            {/* 게시물 상세 */}
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-gray-500 text-sm mb-4">작성자: {post.author.nickname}</p>
            <img src={post.image} alt={post.title} className="w-full rounded-lg mb-4" />
            <p className="text-lg leading-relaxed">{post.content}</p>

            {/* 댓글 */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">댓글 {post.commentCount}</h2>

                {post.comments.map((comment) => (
                    <div key={comment.id} className="mb-4">
                        <p className="font-bold">{comment.author.nickname}</p>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
