"use server";

import { db } from "@/lib/db";

export interface Game {
  id?: string;
  title: string;
  description: string;
  websiteUrl: string;
  imageUrl: string;
}

export const getAllGames = async (): Promise<Game[]> => {
  const gamesSnapshot = await db.collection("games").get();
  const games: Game[] = [];
  gamesSnapshot.forEach((doc) => {
    games.push({ id: doc.id, ...(doc.data() as Game) });
  });
  return games;
};
