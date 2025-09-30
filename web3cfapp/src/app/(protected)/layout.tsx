"use client"

import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react"

export default function ProtectedLayout({children} : {children : Readonly<React.ReactNode>}) {

    const account = useActiveAccount();
    const router = useRouter();
    const [loading, isLoading] = useState(true);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, [])

    useEffect(() => {
        
        if(!hydrated) return;

        if (account == null) router.replace("/");
        else isLoading(false);


    }, [account, router, hydrated])

    if (loading) return <div>Loading...</div>;

    return (
        <div>  
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    )
}