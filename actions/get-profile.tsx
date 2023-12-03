import { Profile } from "@/types/user"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getProfile = async (): Promise<Profile> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    })

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession()

    const user = session?.user

    const { data, error } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

    if (error) {
        console.log(error);
        return {}
    }

    if (!data) {
        return {}
    }

    return data
}

export default getProfile