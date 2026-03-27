import { supabase } from '../lib/supabase'

export interface CreatePostInput {
    title: string
    content: string
    image_url?: string | null
    travel_type: string
    user_id?: string | null
}

export interface Post {
    id: string
    title: string
    content: string
    image_url: string | null
    travel_type: string
    like_count: number
    comment_count: number
    user_id: string | null
    created_at: string
}

export const getCurrentUserId = async (): Promise<string | null> => {
    const {
        data: { session },
    } = await supabase.auth.getSession()
    const userId = session?.user?.id ?? null
    console.log('getCurrentUserId:', userId)
    return userId
}

// posts 테이블 레코드 수 확인
export const getPostCount = async () => {
    const { count, error } = await supabase.from('posts').select('*', { count: 'exact', head: true })

    if (error) {
        console.error('getPostCount error:', error)
        throw error
    }

    console.log('getPostCount count:', count)
    return { count: count ?? 0 }
}

// posts 테이블에 게시글 저장
export const savePost = async (post: CreatePostInput) => {
    const { data, error } = await supabase
        .from('posts')
        .insert({
            title: post.title,
            content: post.content,
            image_url: post.image_url ?? null,
            travel_type: post.travel_type,
            like_count: 0,
            comment_count: 0,
            user_id: post.user_id ?? null,
        })
        .select()

    if (error) {
        throw error
    }

    return data
}

// posts 테이블 전체 조회 (저장 확인용)
export const getPosts = async (): Promise<Post[]> => {
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (error) {
        console.error('getPosts error:', error)
        throw error
    }
    return data ?? []
}

// 이미지를 Storage에 업로드하고 URL 반환
export const uploadPostImage = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from('posts').upload(fileName, file)
    if (error) {
        console.error('uploadPostImage error:', error)
        throw error
    }
    const { data } = supabase.storage.from('posts').getPublicUrl(fileName)
    return data.publicUrl
}

// 단건조회
export const getPostById = async (postId: string): Promise<Post | null> => {
    const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single()

    if (error) {
        console.error('getPostById error:', error)
        return null
    }
    return data
}
