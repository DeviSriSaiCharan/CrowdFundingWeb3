import { CampaignStatus } from "@/utils/types";


export default function Badge({ status } : { status : number}) {
    return (
        <div className={`px-4 h-7 py-1 rounded-full text-sm font-medium
        ${status === CampaignStatus.Active ? 'bg-green-400 text-green-800 font-semibold' : ''}
        ${status === CampaignStatus.Successful ? 'bg-blue-400 text-blue-800 font-semibold' : ''}
        ${status === CampaignStatus.Failed ? 'bg-red-400 text-red-800 font-semibold' : ''}
        `}>
            {status === CampaignStatus.Active && 'Active'}
            {status === CampaignStatus.Successful && 'Successful'}
            {status === CampaignStatus.Failed && 'Failed'}
        </div>
    )
}