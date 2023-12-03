"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import { Command as Logo, X } from 'lucide-react'
import useAuthModal from "@/hooks/use-auth"
import { useUser } from "@/hooks/use-user"
import { Button } from "./ui/button"
import { UserAccountNav } from "./user-account-nav"
import { Profile } from "@/types/user"

interface MainNavProps {
    items?: MainNavItem[]
    children?: React.ReactNode
    profile: Profile
}

export function MainNav({ items, children, profile }: MainNavProps) {
    const segment = useSelectedLayoutSegment()
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

    const { onOpen } = useAuthModal()

    const { user, isLoading } = useUser();

    return (
        <>
            <div className="flex gap-6 md:gap-10">
                <Link href="/" className="hidden items-center space-x-2 md:flex">
                    <Logo />
                    <span className="hidden font-bold sm:inline-block">
                        {siteConfig.name}
                    </span>
                </Link>
                {items?.length ? (
                    <nav className="hidden gap-6 md:flex">
                        {items?.map((item, index) => (
                            <Link
                                key={index}
                                href={item.disabled ? "#" : item.href}
                                className={cn(
                                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                                    item.href.startsWith(`/${segment}`)
                                        ? "text-foreground"
                                        : "text-foreground/60",
                                    item.disabled && "cursor-not-allowed opacity-80"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                ) : null}
                <button
                    className="flex items-center space-x-2 md:hidden"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? <X /> : <Logo />}
                    <span className="font-bold">Menu</span>
                </button>
                {showMobileMenu && items && (
                    <MobileNav items={items}>{children}</MobileNav>
                )}
            </div>
            <div className="">
                {isLoading ? (
                    null
                ) : user ? (
                    <UserAccountNav
                        user={{
                            id: user.id,
                            email: user.email
                        }}
                        profile={profile}
                    />
                ) : (
                    <nav>
                        <Button onClick={() => onOpen()}>
                            Login
                        </Button>
                    </nav>
                )}
            </div>
        </>
    )
}