import { ImageIcon, XIcon } from 'lucide-react'
import React from 'react'

interface ImageUploaderProps {
    imagePreview: string | null
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onImageRemove: () => void
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    imagePreview,
    onImageChange,
    onImageRemove,
}) => {
    return (
        <div>
            <label className="block text-sm font-bold text-text mb-2">사진 업로드</label>
            {imagePreview ? (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={onImageRemove}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
                    >
                        <XIcon className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center aspect-video w-full rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-500">사진을 선택해주세요</span>
                    <input type="file" accept="image/*" className="hidden" onChange={onImageChange} />
                </label>
            )}
        </div>
    )
}
