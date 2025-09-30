"use client"

import { contract } from "@/app/client"
import { useReadContract } from "thirdweb/react"
import Campaign from "./campaign"


export default function CampaignsSection() {

    const { data : campaigns, isPending } = useReadContract({
        contract,
        method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 createdTime)[])",
        params: [],
    })

    if(isPending) return <div className="w-4/5 mx-auto">Loading....</div>

    return (
        <div className="w-4/5 mx-auto">
            <h1 className="text-3xl font-medium">Campaigns</h1>
            <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    !isPending && campaigns && (
                        campaigns.length > 0 ?
                        campaigns.map((campaign) => <Campaign campaign={campaign} key={campaign.campaignAddress} />)
                        : (
                            <p>No campaigns found</p>
                        )
                    ) 
                }
            </div>
        </div>
    )
}