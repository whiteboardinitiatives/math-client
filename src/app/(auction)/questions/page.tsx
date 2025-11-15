import PlayerCard from "@/components/PlayerCard";
import { Users, Users2 } from "lucide-react";

export interface Question {
  _id: string;
  name: string;
  image: string;
  price: number | null;
  isSold: boolean;
  soldTo: string | null;
  mode: string;
  number: number;
}

export default async function PlayersPage() {
  // Fetch ALL questions in a single request
  const questionsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/questions`,
    { next: { revalidate: 0 } }
  );

  const allQuestions: Question[] = await questionsRes.json();

  // Filter on the frontend
  const easyQuestions = allQuestions.filter((q) => q.mode === "easy");
  const mediumQuestions = allQuestions.filter((q) => q.mode === "medium");
  const hardQuestions = allQuestions.filter((q) => q.mode === "hard");

  return (
    <div className="p-6 mx-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Players</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Easy Questions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {easyQuestions.length > 0 &&
                easyQuestions.map((question) => (
                  <PlayerCard key={question._id} player={question} />
                ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
              <Users2 className="h-5 w-5 mr-2" />
              Medium Questions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediumQuestions.length > 0 &&
                mediumQuestions.map((question) => (
                  <PlayerCard key={question._id} player={question} />
                ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
              <Users2 className="h-5 w-5 mr-2" />
              Hard Questions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hardQuestions.length > 0 &&
                hardQuestions.map((question) => (
                  <PlayerCard key={question._id} player={question} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
