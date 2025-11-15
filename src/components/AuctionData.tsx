"use client";

import { useEffect, useState } from "react";
import socket from "@/app/_lib/socket";

const Auction = () => {
  const [currentBid, setCurrentBid] = useState(0);
  const [currentTeam, setCurrentTeam] = useState<string | null>(null);

  useEffect(() => {
    socket.emit("join-auction");

    const handleCurrentBid = ({
      bid,
      team,
    }: {
      bid: number;
      team: string | null;
    }) => {
      setCurrentBid(bid);
      setCurrentTeam(team);
    };

    socket.on("current-bid", handleCurrentBid);

    return () => {
      socket.off("current-bid", handleCurrentBid);
    };
  }, []);

  const handleReset = () => {
    socket.emit("reset");
  };

  return (
    <div className="fixed top-[60%] left-6 z-40 w-64">
      <div className="border-3 relative border-primary rounded-lg overflow-hidden shadow-2xl">
        <button
          onClick={handleReset}
          className="absolute top-3 hover:opacity-95 transition-all
         right-3 py-1.5 px-4 text-sm font-semibold cursor-pointer rounded-sm bg-secondary text-white z-10"
        >
          reset
        </button>
        <div className="flex flex-col">
          {/* Current bid section */}
          <div className="bg-primary text-white flex p-5 items-center justify-center">
            <div className="text-center">
              <div className="text-xs uppercase font-semibold opacity-80 mb-2">
                Current Bid
              </div>
              <div className="text-5xl font-bold">{currentBid}</div>
            </div>
          </div>

          {/* Team info section */}
          <div className="p-5 bg-white">
            <div>
              <div className="text-xs text-gray-600 uppercase font-medium mb-1">
                Team
              </div>
              <div className="text-2xl font-bold text-primary">
                {currentTeam || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;
