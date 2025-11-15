import { FileQuestionIcon } from "lucide-react";
import Link from "next/link";

export default function AllPlayers() {
  return (
    <main className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Welcome to Math Maestros
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/easy" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="h-32 bg-primary flex items-center justify-center text-white">
                <FileQuestionIcon className="h-16 w-16" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Easy Auction
                </h2>
                <p className="text-gray-600 mb-4">
                  Browse and bid on easy questions.
                </p>
                <button className="w-full cursor-pointer bg-[#e08a42] hover:bg-[#d07a32] text-white py-2 rounded-md font-medium transition-colors">
                  Start Auction
                </button>
              </div>
            </div>
          </Link>

          <Link href="/medium" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="h-32 bg-primary flex items-center justify-center text-white">
                <FileQuestionIcon className="h-16 w-16" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Medium Auction
                </h2>
                <p className="text-gray-600 mb-4">
                  Browse and bid on medium questions.
                </p>
                <button className="w-full cursor-pointer bg-[#e08a42] hover:bg-[#d07a32] text-white py-2 rounded-md font-medium transition-colors">
                  Start Auction
                </button>
              </div>
            </div>
          </Link>

          <Link href="/hard" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="h-32 bg-primary flex items-center justify-center text-white">
                <FileQuestionIcon className="h-16 w-16" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Hard Auction
                </h2>
                <p className="text-gray-600 mb-4">
                  Browse and bid on hard questions.
                </p>
                <button className="w-full cursor-pointer bg-[#e08a42] hover:bg-[#d07a32] text-white py-2 rounded-md font-medium transition-colors">
                  Start Auction
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
