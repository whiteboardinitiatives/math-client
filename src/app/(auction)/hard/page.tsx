import Auction from "@/components/AuctionData";
import PlayerSlider from "@/components/PlayerSlider";
import { Question } from "../questions/page";

const HardAuction = async () => {
  const hardRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/questions?mode=hard`,
    { next: { revalidate: 0 } }
  );

  const hardQuestions: Question[] = await hardRes.json();

  if (!hardQuestions || hardQuestions.length === 0) {
    return (
      <h1 className="font-bold text-6xl text-center my-24">
        No Questions available to auction
      </h1>
    );
  }

  return (
    <div className="">
      <Auction />
      <PlayerSlider questions={hardQuestions} />
    </div>
  );
};

export default HardAuction;
