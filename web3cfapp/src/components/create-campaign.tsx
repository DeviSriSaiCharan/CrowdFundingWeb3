import { client, contract } from "@/app/client";
import { useState } from "react";
import { defineChain, prepareContractCall } from "thirdweb";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { deployPublishedContract } from "thirdweb/deploys"



export default function CreateCampaign({ onClose, isEdit = false}: { onClose: () => void, isEdit?: boolean }) {
  const account = useActiveAccount();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [days, setDays] = useState("");
  const [isDeploying, setIsDploying] = useState(false);
  const  { mutate : sendTransaction } = useSendTransaction();

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      setIsDploying(true);
      const contractAddress = await deployPublishedContract({
        client : client,
        chain : defineChain(11155111),
        account : account!,
        contractId : "CrowdFunding",
        contractParams : {
          _name: name,
          _description: description,
          _goal: goal,
          _durationInDays: days,
        },
        publisher : "0x6fC9E306fe1237A289D8C454e8d3a29E14fe0552",
        version : "1.0.1"
      }) 

      alert("Contract deployed at: " + contractAddress);
    }
    catch(err){
      alert("Error creating campaign: " + err);
      return;
    }
    finally {
      setIsDploying(false);
      setName("");
      setDescription("");
      setGoal("");
      setDays("");
      onClose();
    }

    // const transaction = prepareContractCall({
    //   contract : contract,
    //    method : "function createCampaign(string _name, string _description, uint256 _goal, uint256 _durationInDays)",
    //   params: [name, description, BigInt(goal), BigInt(days)],
    // })
    // sendTransaction(transaction);

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border border-zinc-800 rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Create Campaign</h2>
          <button
            type="button"
            onClick={onClose}
            className="px-2 text-xs border hover:bg-zinc-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-red-800 hover:text-red-700"
          >
            X
          </button>
        </div>
        <form onSubmit={handleCreateCampaign} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Goal (Wei)</label>
            <input
              type="number"
              value={goal}
              min={1}
              onChange={(e) => setGoal(e.target.value)}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Duration (Days)</label>
            <input
              type="number"
              value={days}
              min={1}
              max={90}
              onChange={(e) => setDays(e.target.value)}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1"
              required
            />
          </div>

          <div className="">
            
            <button
              type="submit"
              disabled={isDeploying}
              className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {!isDeploying ? "Create" : "Creating..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
