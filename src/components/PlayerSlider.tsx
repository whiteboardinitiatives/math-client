"use client";

import { Question } from "@/app/(auction)/questions/page";
import socket from "@/app/_lib/socket";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PlayerSlider({ questions }: { questions: Question[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredQuestions = questions.filter((question) => !question.isSold);
  const [players, setPlayers] = useState<Question[]>(filteredQuestions);
  const [isLoading, setIsLoading] = useState(false);

  const currentPlayer = players[currentIndex];

  const handlePrevious = () => {
    socket.emit("reset");
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    socket.emit("reset");
    setCurrentIndex((prev) => (prev < players.length - 1 ? prev + 1 : prev));
  };

  const handleCloseBid = () => {
    if (!currentPlayer) return;
    setIsLoading(true);

    socket.emit("close-bid", {
      playerId: currentPlayer._id,
      mode: currentPlayer.mode,
    });
  };

  useEffect(() => {
    const handleBidClosed = ({ playerId }: { playerId: string }) => {
      const updatedPlayers = players.filter((p) => p._id !== playerId);
      setPlayers(updatedPlayers);

      if (currentIndex >= updatedPlayers.length) {
        setCurrentIndex(Math.max(0, updatedPlayers.length - 1));
      }

      setIsLoading(false);
    };

    const handleError = (msg: string) => {
      console.error("Close bid error:", msg);
      toast.error("Bid is not placed yet");
      setIsLoading(false);
    };

    socket.on("bid-closed", handleBidClosed);
    socket.on("bid-close-error", handleError);

    return () => {
      socket.off("bid-closed", handleBidClosed);
      socket.off("bid-close-error", handleError);
    };
  }, [players, currentIndex]);

  if (players.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mb-8 p-8 bg-gray-100 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-primary">
          No more players available
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      {/* Main content area */}
      <div className="w-full max-w-[70%] mx-auto">
        {/* Image container - optimized for 16:9 projector display */}
        <div className="w-full relative mb-6">
          <img
            src={
              currentPlayer.image || "/placeholder.svg?height=1280&width=916"
            }
            alt={currentPlayer.name}
            className="w-full h-auto object-contain rounded-sm max-h-[70vh]"
          />
        </div>

        {/* Remaining players counter - positioned below image */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">
            Remaining Questions:{" "}
            <span className="text-primary">{players?.length || "0"}</span>
          </h1>
        </div>

        {/* Navigation Buttons - larger for projector visibility */}
        <div className="flex justify-center gap-6 flex-wrap">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0 || isLoading}
            className={`px-8 py-4 cursor-pointer text-lg font-medium rounded-lg transition ${
              currentIndex === 0 || isLoading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#f5f5f5] text-primary hover:bg-[#e6e6e6]"
            }`}
          >
            ⬅ Previous
          </button>

          <button
            onClick={handleCloseBid}
            disabled={isLoading}
            className={`px-8 py-4 cursor-pointer text-lg font-semibold rounded-lg transition ${
              isLoading
                ? "bg-gray-400 cursor-wait"
                : "bg-[#e08a42] text-white hover:bg-[#cf7933]"
            }`}
          >
            {isLoading ? "Processing..." : "🏁 Close Bid"}
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === players.length - 1 || isLoading}
            className={`cursor-pointer px-8 py-4 text-lg font-medium rounded-lg transition ${
              currentIndex === players.length - 1 || isLoading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#f5f5f5] text-primary hover:bg-[#e6e6e6]"
            }`}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}
