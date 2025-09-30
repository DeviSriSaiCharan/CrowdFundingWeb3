import { prepareContractCall } from "thirdweb";
import { TransactionButton, useActiveAccount } from "thirdweb/react";

export default function TierCard({tier, index, contract, isOwner = false}: {tier: {name: string, amount: bigint, backers: bigint}, index : number, contract : any, isOwner?: boolean}) {
    const account = useActiveAccount();
    const isDisabled = account?.address ? false : true;

    return (
        <div className="border border-zinc-800 p-4 rounded-lg shadow-md hover:bg-zinc-900 transition-shadow">
            <div className="font-semibold text-lg flex justify-between mb-4">
                <p>{tier.name}</p>
                <p>{tier.amount} Wei</p>
            </div>
            <div className="flex justify-between items-center text-xs">
                <p>Total backers: {tier.backers}</p>
                {   !isOwner ? (
                    <TransactionButton
                        transaction = {() => {
                            const transaction = prepareContractCall({
                            contract,
                            method: "function fund(uint256 _tierIndex) payable",
                            params: [BigInt(index)],
                            value: tier.amount,
                            });
                            return transaction
                        }}
                        onTransactionConfirmed={async () => alert("Thank you for your support!")}
                        className={`bg-white text-black rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}

                    >
                        Select
                    </TransactionButton>
                    ) : (
                        <TransactionButton 
                        transaction = {() => {
                            const transaction = prepareContractCall({
                            contract,
                            method: "function removeTier(uint256 _index)",
                            params: [BigInt(index)],
                            });
                            return transaction
                        }}
                        onTransactionConfirmed={async () => alert("Tier removed successfully")}
                        disabled={isDisabled}
                        style={{
                            backgroundColor: "oklch(10.4% 0.191 22.216)",
                            borderColor: "oklch(70.4% 0.191 22.216)",
                            color: "oklch(57.7% 0.245 27.325)",
                        }}
                        >
                            Remove
                        </TransactionButton>
                    ) 
                }
            </div>
        </div>
    )
}