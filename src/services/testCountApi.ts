import { supabase } from '../lib/supabase'

export const getTestCount = async () => {
    const { count, error } = await supabase.from('test_results').select('*', { count: 'exact', head: true })

    if (error) {
        console.error('getTestCount error:', error)
        throw error
    }

    console.log('getTestCount count:', count)
    return { count: count ?? 0 }
}

export const saveTestResult = async (resultType: string, userId?: string | null) => {
    const { data, error } = await supabase
        .from('test_results')
        .insert({
            result_type: resultType,
            user_id: userId ?? null,
        })
        .select()

    console.log('saveTestResult resultType:', resultType)
    console.log('saveTestResult userId:', userId)
    console.log('saveTestResult data:', data)
    console.log('saveTestResult error:', error)

    if (error) {
        throw error
    }

    return data
}
