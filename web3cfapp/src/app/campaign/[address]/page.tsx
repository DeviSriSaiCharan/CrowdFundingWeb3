"use client"

import { client } from "@/app/client";
import Badge from "@/components/badge";
import CreateCampaign from "@/components/create-campaign";
import CreateTier from "@/components/create-tier";
import Progress from "@/components/progress-bar";
import TierCard from "@/components/tier-card";
import { CampaignStatus } from "@/utils/types";
import { useParams } from "next/navigation";
import { useState } from "react";
import { defineChain, getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

export default function CampaignPage() {

    const walletAddress = useActiveAccount();
    const address = useParams().address;
    const [isOpen, setIsOpen] = useState(false);

    
    const contract = getContract({
        client : client,
        address : address as string,
        chain : defineChain(11155111)
    });
    
    const { data : name, isPending : isLoadingName } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: [],
    })
    
    const { data : description, isPending : isLoadingDesc } = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: [],
    });
    
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
    
    const { data : deadline, isPending : isLoadingDeadline } = useReadContract({
        contract,
        method: "function deadline() view returns (uint256)",
        params: [],
    });
    
    const { data : tiers, isPending : isLoadingTiers } = useReadContract({
        contract,
        method:
        "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
        params: [],
    });
    
    const dl = new Date(Number(deadline) * 1000).toLocaleDateString();
    
    const { data : owner, isPending : isLoadingOwner } = useReadContract({
        contract,
        method: "function owner() view returns (address)",
        params: [],
    });
    

    const isOwner = walletAddress?.address?.toLowerCase() === owner?.toLowerCase();

    const { data : campaignStatus, isPending : isLoadingStatus } = useReadContract({
        contract,
        method: "function campaignStatus() view returns (uint8)",
        params: [],
    })

    return (
        <div className="w-4/5 mx-auto py-10">
            <div className="flex justify-between items-center mb-6 ">
                <h1 className="text-3xl font-bold " >{name}</h1>
                <div className="flex gap-6 items-center">
                    <Badge status={ campaignStatus as CampaignStatus } />
                    {isOwner && 
                        <>
                            <button 
                            onClick={() => setIsOpen(true)}
                            className="bg-blue-400/20 border border-blue-600/30 text-blue-400 px-4 py-2 rounded-md text-sm font-medium">Add tier</button>
                        </>
                    }
                </div>
            </div>

            <div className="my-2">
                <h2 className="font-medium">Description</h2>
                <p className="text-zinc-500" >{description}</p>
            </div>

            <div className="my-2">
                <h2 className="font-medium">Deadline</h2>
                <p className="text-zinc-500" >{dl}</p>
            </div>

            <div className="my-2">
                <h2 className="font-medium">Campaign Goal: {goalAmount} Wei</h2>
                <Progress max={goalAmount!} value={balance!} />
            </div>

            <div className="my-6">
                <h2 className="font-medium mb-2">Tiers: </h2>
                {
                    tiers && tiers.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tiers.map((tier, index) => (
                                <li key={index} className="my-1">
                                    <TierCard tier={tier} index={index} contract={contract} isOwner={isOwner}/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-zinc-500">No tiers available</p>
                    )
                }
            </div>

            {isOpen && <CreateTier onClose={() => setIsOpen(false)} />}
        </div>
    )
}