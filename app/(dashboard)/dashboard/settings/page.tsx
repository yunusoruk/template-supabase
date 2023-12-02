
import { redirect } from "next/navigation"

import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { useUser } from "@/hooks/use-user"

export const metadata = {
    title: "Settings",
    description: "Manage account and website settings.",
}

export default async function SettingsPage() {

    // const { user } = useUser()

    // if (!user) {
    //     redirect("/")
    // }

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Settings"
                text="Manage account and website settings."
            />
            <div className="grid gap-10">
                {/* <UserSettingsForm user={{ id: user.id, name: user.name || "" }} /> */}
            </div>
        </DashboardShell>
    )
}