import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"
import { Profile } from "@/types/user"

interface UserAvatarProps extends AvatarProps {
    profile: Profile
}

export function UserAvatar({ profile, ...props }: UserAvatarProps) {

    return (
        <Avatar {...props}>
            {/* TODO: UPLOAD IMAGE */}
            {false ? (
                <AvatarImage alt="Picture" src={profile.avatar_url} />
            ) : (
                <AvatarFallback>
                    <span className="sr-only">{profile.full_name}</span>
                    <Icons.user className="h-4 w-4" />
                </AvatarFallback>
            )}
        </Avatar>


    )
}