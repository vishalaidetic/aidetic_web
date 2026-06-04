import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export interface MeetingRequestInput {
  name: string
  email: string
  phone?: string
  organization: string
  purpose: string
}

export interface MeetingRequest {
  id: string
  name: string
  email: string
  phone?: string | null
  organization: string
  purpose: string
  created_at: string
}

export async function insertMeetingRequest(data: MeetingRequestInput) {
  const { data: result, error } = await supabase
    .from('meeting_requests')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error inserting meeting request:', error)
    throw new Error(error.message)
  }

  return result
}

export async function getMeetingRequests(): Promise<MeetingRequest[]> {
  const { data, error } = await supabase
    .from('meeting_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching meeting requests:', error)
    throw new Error(error.message)
  }

  return data || []
}
