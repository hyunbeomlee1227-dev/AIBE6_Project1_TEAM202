import { createClient } from '@supabase/supabase-js'

/**
 * Vite에서는 환경변수를 import.meta.env로 접근함
 * VITE_ prefix가 붙은 변수만 사용 가능
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

/**
 * Supabase 클라이언트 생성
 * 이후 모든 인증/DB 요청은 이 객체를 통해 처리
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
