"use client";

import { useEffect, useState } from "react";

import { useMounted } from "@/hooks/use-mounted";
import AuthModal from "../modals/auth-modal";

interface ModalProviderProps {
}

const ModalProvider: React.FC<ModalProviderProps> = ({
}) => {

    useMounted()

    return (
        <>
            <AuthModal />
        </>
    );
}

export default ModalProvider;