import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Database } from '@/types/supabase'
import AccountForm from '@/components/account/account-form'
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default async function Account() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Settings"
                text="Manage account and website settings."
            />
            <div className="grid gap-10">
                <AccountForm session={session} />
            </div>
        </DashboardShell>
    )
}