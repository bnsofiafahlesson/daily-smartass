"use client";

import { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "../lib/db";

// Generic hook for real-time Firestore data
export const useFirestoreCollection = <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];

        setData(documents);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, constraints]);

  return { data, loading, error };
};

// Specific hook for scores
export const useScores = (constraints: QueryConstraint[] = []) => {
  return useFirestoreCollection("scores", constraints);
};

// Specific hook for players
export const usePlayers = (constraints: QueryConstraint[] = []) => {
  return useFirestoreCollection("players", constraints);
};
