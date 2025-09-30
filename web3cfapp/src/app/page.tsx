"use client";

import CampaignsSection from "@/components/campaigns-section";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-[100vh] flex flex-col">
      <Navbar/>
      <div className="py-10 flex-grow">
        <CampaignsSection/>
      </div>
    </main>
  );
}

