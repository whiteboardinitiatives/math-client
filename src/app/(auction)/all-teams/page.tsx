import { FileQuestionIcon } from "lucide-react";
import { Question } from "../questions/page";
import TeamCard from "@/components/TeamCard";

export type Team = {
  _id: string;
  name: string;
  secondary: string;
  senior: string;
  junior: string;
  email: string;
  balance: number;
  questions: Question[];
};

const AllTeams = async () => {
  const teamRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams`,
    { next: { revalidate: 0 } }
  );
  const teams: Team[] = await teamRes.json();

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Teams</h1>

        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
              <FileQuestionIcon className="h-5 w-5 mr-2" />
              All Teams
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teams.map((team) => (
                <TeamCard key={team._id} team={team} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTeams;
