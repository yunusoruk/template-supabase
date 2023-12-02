"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {
    useSessionContext,
    useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import useAuthModal from '@/hooks/use-auth';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTheme } from 'next-themes';



const AuthModal = () => {

    const { theme } = useTheme()

    const { session } = useSessionContext();
    const router = useRouter();

    const { onClose, isOpen } = useAuthModal();
    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const handleClose = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className='max-w-[440px]'>
                <DialogHeader>
                    <DialogTitle>Todo app</DialogTitle>
                    <DialogDescription>
                        Welcome
                    </DialogDescription>
                </DialogHeader>
                <Auth
                    supabaseClient={supabaseClient}
                    providers={['github']}
                    magicLink={true}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#e21d48',
                                    brandAccent: 'darkred',
                                }
                            }
                        }
                    }}
                    theme={theme === 'dark' ? 'dark' : 'default'}
                />
            </DialogContent>
        </Dialog>
    );
}

export default AuthModal;