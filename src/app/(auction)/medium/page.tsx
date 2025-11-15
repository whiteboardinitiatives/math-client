import Auction from "@/components/AuctionData";
import PlayerSlider from "@/components/PlayerSlider";
import { Question } from "../questions/page";

const MediumAuction = async () => {
  const mediumRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/questions?mode=medium`,
    { next: { revalidate: 0 } }
  );

  const mediumQuestions: Question[] = await mediumRes.json();

  if (!mediumQuestions || mediumQuestions.length === 0) {
    return (
      <h1 className="font-bold text-6xl text-center my-24">
        No Questions available to auction
      </h1>
    );
  }

  return (
    <div className="">
      <Auction />
      <PlayerSlider questions={mediumQuestions} />
    </div>
  );
};

export default MediumAuction;
