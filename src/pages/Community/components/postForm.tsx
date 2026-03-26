import React from 'react'

interface PostFormProps {
    title: string
    content: string
    onTitleChange: (value: string) => void
    onContentChange: (value: string) => void
}

export const PostForm: React.FC<PostFormProps> = ({ title, content, onTitleChange, onContentChange }) => {
    return (
        <>
            <div>
                <label className="block text-sm font-bold text-text mb-2">제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="제목을 입력하세요"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm font-medium"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-text mb-2">내용</label>
                <textarea
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    placeholder="여행 이야기를 들려주세요..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm resize-none min-h-[150px]"
                    required
                />
            </div>
        </>
    )
}
