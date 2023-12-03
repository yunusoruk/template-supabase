import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import getProfile from "@/actions/get-profile"


interface MarketingLayoutProps {
    children: React.ReactNode
}

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {
    const profile = await getProfile()

    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav profile={profile} items={marketingConfig.mainNav} />
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    )
}