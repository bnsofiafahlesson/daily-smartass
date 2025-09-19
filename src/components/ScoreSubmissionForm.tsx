"use client";
import { useState } from "react";
import { postScore } from "../services/scoreService";
import { getTodayDateString } from "@/utils/helper-functions";
import Card from "./Card";

const todayDate = getTodayDateString();

export const ScoreSubmissionForm = () => {
  const [playerName, setPlayerName] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || !time.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await postScore({
        playerName: playerName.trim(),
        time: time.trim(),
        gameDate: todayDate,
      });

      if (result.success) {
        // await updatePlayerStats(playerName.trim());

        setPlayerName("");
        setTime("");
      } else {
        alert("Error submitting score. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("Error submitting score. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmitScore}>
        <h3 className="text-lg font-semibold mb-4">Submit Your Score</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Player Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="px-3 py-2 border rounded-md"
            required
          />
          <input
            type="time"
            placeholder="Time (MM:SS)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-3 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Score"}
          </button>
        </div>
      </form>
    </Card>
  );
};
