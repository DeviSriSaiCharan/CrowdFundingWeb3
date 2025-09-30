

export type CampaignType = {
  campaignAddress: string;
  owner: string;
  name: string;
  createdTime: bigint;
};


export enum CampaignStatus {
  Active = 0,
  Successful,
  Failed,
}