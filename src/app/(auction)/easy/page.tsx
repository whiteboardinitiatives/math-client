import Auction from "@/components/AuctionData";
import PlayerSlider from "@/components/PlayerSlider";
import { Question } from "../questions/page";

const EasyAuction = async () => {
  const easyRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/questions?mode=easy`,
    { next: { revalidate: 0 } }
  );

  const easyQuestions: Question[] = await easyRes.json();

  if (!easyQuestions || easyQuestions.length === 0) {
    return (
      <h1 className="font-bold text-6xl text-center my-24">
        No Questions available to auction
      </h1>
    );
  }

  return (
    <div className="">
      <Auction />
      <PlayerSlider questions={easyQuestions} />
    </div>
  );
};

export default EasyAuction;
