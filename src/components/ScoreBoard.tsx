import { getTodayDateString } from "@/utils/helper-functions";
import { getScoresByDate } from "../services/scoreService";
import Card from "./Card";

export default async function ScoreBoard() {
  const todayDate = getTodayDateString();
  const resultScores = await getScoresByDate(todayDate);

  if ("error" in resultScores) {
    return (
      <div className="p-4 text-red-500">
        Error loading scores: {resultScores.error?.message}
      </div>
    );
  } else if (!resultScores.data) {
    return <div className="p-4">No scores available.</div>;
  }

  const todayScores = resultScores.data;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Daily Smartass Scoreboard</h2>
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Today&apos;s Scores ({todayDate})
        </h3>
        {todayScores && todayScores.length > 0 ? (
          <div className="space-y-2">
            {todayScores.map((scoreEntry, index: number) => (
              <Card key={scoreEntry.id}>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-gray-500">
                      #{index + 1}
                    </span>
                    <span className="font-medium">{scoreEntry.playerName}</span>
                  </div>
                  <span className="text-xl font-bold text-pink-500">
                    {scoreEntry.time}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No scores yet today. Be the first to play!
          </p>
        )}
      </div>
    </div>
  );
}
