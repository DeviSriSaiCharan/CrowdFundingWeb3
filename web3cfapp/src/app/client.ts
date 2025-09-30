import { constants } from "buffer";
import { createThirdwebClient, defineChain } from "thirdweb";
import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
const contractAdd = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!clientId) {
  throw new Error("No client ID provided");
}

if(!contractAdd) throw new Error("No contract address found");

export const client = createThirdwebClient({
  clientId: clientId,
});


export const contract = getContract({
  client : client,
  chain : defineChain(11155111),
  address : contractAdd
})
