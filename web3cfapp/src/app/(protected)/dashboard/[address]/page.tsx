"use client";

import { contract } from "@/app/client";
import Campaign from "@/components/campaign";
import CreateCampaign from "@/components/create-campaign";
import TierCard from "@/components/tier-card";
import { useParams } from "next/navigation";
import { useState } from "react";
import { TransactionButton, useReadContract } from "thirdweb/react";

export default function Dashboard() {

    const address = useParams().address;
    const [isOpen, setIsOpen] = useState(false);

    const {data : campaigns, isPending : isLoadingCampaigns} = useReadContract({
        contract,
        method : "function getUsersCampaing(address _user) view returns ((address campaignAddress, address owner, string name, uint256 createdTime)[])",
        params: [address as string],
    })

    return (
        <div className="w-4/5 mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1><span className="text-2xl font-semibold">Wallet Address: </span> {address}</h1>
                <button 
                onClick={() => setIsOpen(true)}
                className="bg-white text-black py-2 px-6 rounded-md text-xs font-semibold">Create New Campaign</button>
            </div>
            <div>
                <h2 className="text-xl font-semibold mt-6 mb-4">Your Campaigns</h2>
                {
                    campaigns && campaigns.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {campaigns.map((campaign : any, index : number) => (
                                <Campaign key={index} campaign={campaign} />
                            ))}
                        </div>
                    ) : <p className="text-zinc-500">You haven't created any campaigns yet.</p>
                }

                {isOpen && <CreateCampaign onClose={() => setIsOpen(false)} />}
            </div>
        </div>
    )
}