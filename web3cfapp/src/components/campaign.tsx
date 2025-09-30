"use client"


import { CampaignType } from "@/utils/types"
import { useActiveAccount, useReadContract } from "thirdweb/react";
import Progress from "./progress-bar";
import { defineChain, getContract } from "thirdweb";
import { client } from "@/app/client";
import Link from "next/link";

interface CampaignProps {
    campaign : CampaignType 
}

export default function Campaign({campaign} : CampaignProps) {
    const { campaignAddress, owner, name, createdTime } = campaign;
    const account = useActiveAccount();

    const contract = getContract({
        address : campaignAddress,
        chain : defineChain(11155111),
        client : client
    });

    const formattedDate = new Date(Number(createdTime) * 1000).toLocaleDateString();

    const { data : goalAmount, isPending : isLoadinGoal } = useReadContract({
        contract,
        method: "function goalAmount() view returns (uint256)",
        params: [],
    });

    const { data : balance, isPending : isLoadingBalance } = useReadContract({
        contract,
        method: "function getBalance() view returns (uint256)",
        params: [],
    });

    const { data : description } = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: [],
    });

    return (
        <div className="border border-zinc-800 shadow-zinc-800 p-4 mb-4 rounded-lg shadow-sm flex flex-col justify-between h-[220px]">
            <Progress max={goalAmount!} value={balance!} />
            <div className="">
                <h2 className="text-xl font-semibold mt-1">{name}</h2>
                <p className="text-sm text-gray-500 text-wrap my-1">{description?.slice(0, 100) + "..."}</p>
            </div>
            <p className="text-sm text-gray-500">Created on: {formattedDate}</p>
            <button className="bg-white text-black rounded-md font-semibold w-1/2 text-sm p-2">
                <Link href={`/campaign/${campaignAddress}`}>View Campaign</Link>
            </button>
        </div>
    )
}