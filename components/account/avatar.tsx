'use client'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { Database } from '@/types/supabase'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Icons } from '../icons'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function UserAvatar({
    uid,
    url,
    size,
    onUpload,
}: {
    uid: string
    url: Profiles['avatar_url']
    size: number
    onUpload: (url: string) => void
}) {
    const supabase = createClientComponentClient<Database>()
    const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        async function downloadImage(path: string) {
            try {
                const { data, error } = await supabase.storage.from('avatars').download(path)
                if (error) {
                    throw error
                }
                console.log(data);

                const url = URL.createObjectURL(data)
                console.log(url);

                setAvatarUrl(url)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
        }

        if (url) downloadImage(url)
    }, [url, supabase])

    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `${uid}-${Math.random()}.${fileExt}`

            let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(filePath)
        } catch (error) {
            alert('Error uploading avatar!')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <label htmlFor="single">
                {
                    uploading ?
                        <Avatar className='w-16 h-16 items-center justify-center'>
                            <AvatarFallback>
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            </AvatarFallback>
                        </Avatar>
                        :
                        <Avatar className='w-16 h-16 '>
                            <AvatarImage src={avatarUrl || ""} alt="avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                }

            </label>

            <div style={{ width: size }}>

                <input
                    style={{
                        visibility: 'hidden',
                        position: 'absolute',
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    )
}