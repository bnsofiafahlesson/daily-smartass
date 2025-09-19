"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
export interface Score {
  id?: string;
  playerName: string;
  time: string; // Format: "MM:SS"
  gameDate: string; // Format: YYYY-MM-DD
  createdAt?: Date;
  updatedAt?: Date;
}

// export interface Player {
//   id?: string;
//   name: string;
//   totalScore: number;
//   gamesPlayed: number;
//   averageScore: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// // Score management functions
// export const addScore = async (
//   scoreData: Omit<Score, "id" | "createdAt" | "updatedAt">
// ) => {
//   return await db
//     .collection("scores")
//     .add({ ...scoreData, createdAt: new Date(), updatedAt: new Date() });
// };

export const getScoresByDate = async (gameDate: string) => {
  return await db
    .collection("scores")
    .where("gameDate", "==", gameDate)
    .orderBy("time", "asc")
    .get()
    .then((querySnapshot) => {
      const scores: Score[] = [];
      querySnapshot.forEach((doc) => {
        scores.push({ id: doc.id, ...(doc.data() as Score) });
      });
      return { success: true, data: scores };
    })
    .catch((error) => {
      console.error("Error getting scores by date:", error);
      return { success: false, error };
    });
};

export const postScore = async (
  scoreData: Omit<Score, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const docRef = await db
      .collection("scores")
      .add({ ...scoreData, createdAt: new Date(), updatedAt: new Date() });
    revalidatePath("/");
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding score:", error);
    return { success: false, error };
  }
};

// export const getTopScores = async (limitCount: number = 10) => {
//   return await db
//     .collection("scores")
//     .orderBy("score", "desc")
//     .limit(limitCount)
//     .get()
//     .then((querySnapshot) => {
//       const scores: Score[] = [];
//       querySnapshot.forEach((doc) => {
//         scores.push({ id: doc.id, ...(doc.data() as Score) });
//       });
//       return { success: true, data: scores };
//     })
//     .catch((error) => {
//       console.error("Error getting top scores:", error);
//       return { success: false, error };
//     });
// };
