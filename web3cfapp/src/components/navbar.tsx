"use client"


import { client } from "@/app/client";
import Link from "next/link"
import { darkTheme, lightTheme, useActiveAccount } from "thirdweb/react"
import { ConnectButton } from "thirdweb/react";

const myTheme = darkTheme();

export default function Navbar() {

    const account = useActiveAccount();

    return (
        <nav className="border-b border-b-zinc-800 w-full py-4">
            <div className="w-4/5 mx-auto flex items-center justify-between">
                <ul className="flex gap-8">
                    <li>
                        <Link href={"/"} className="outline-none">
                            <p>Campaigns</p>
                        </Link>
                    </li>
                    {
                        account && 
                        <li>
                            <Link href={`/dashboard/${account?.address}`} className="outline-none">
                                <p>Dashboard</p>
                            </Link>
                        </li>
                    }
                </ul>
                <div>
                    <ConnectButton
                        client={client}
                        theme={myTheme}
                    />
                </div>
            </div>
        </nav>
    )
}