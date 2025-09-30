"use client"

import { client } from "@/app/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { defineChain, getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";

export default function CreateTier({ onClose }: { onClose: () => void}) {

    const walletAddress = useActiveAccount();
    const address = useParams().address;
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const { mutate: sendTransaction } = useSendTransaction();

    const contract  = getContract({
        client : client,
        address : address as string,
        chain : defineChain(11155111)
    })

    const handleTransaction = async (e : React.FormEvent) => {
        e.preventDefault();

        try{
            const transaction = prepareContractCall({
                contract : contract,
                method: "function addTier(string _name, uint256 _amount)",
                params: [name, BigInt(amount)],
            })
            sendTransaction(transaction);
            alert("Tier added successfully");
        }
        catch(err){
            alert("Error adding tier: " + err);
            return;
        }
        finally{
            setName("");
            setAmount("");
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-black backdrop-blur-sm  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg p-6 w-full max-w-md border border-zinc-800">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold mb-4">Create New Tier</h2>
                    <button type="button" onClick={onClose} className="x-2 text-xs border hover:bg-zinc-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-red-800 hover:text-red-700">X</button>
                </div>
                <form onSubmit={handleTransaction}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Tier Name</label>
                        <input type="text" required
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-900 rounded px-3 py-1" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Amount (Wei)</label>
                        <input type="number" required
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-900 rounded px-3 py-1" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">Add Tier</button>
                    </div>
                </form> 
            </div>
        </div>
    )
}