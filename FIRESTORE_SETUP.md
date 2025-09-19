# Firestore Database Setup

This project uses Firebase Firestore as the database for storing game scores and player statistics.

## Setup Instructions

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Follow the setup wizard to create your project
4. Enable Google Analytics if desired

### 2. Enable Firestore Database

1. In your Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development (you'll secure it later)
4. Select a location close to your users

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web platform (`</>`)
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration values in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
   ```

### 5. Firestore Security Rules (Production)

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to scores and players
    match /scores/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Require authentication for writes
    }

    match /players/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Require authentication for writes
    }
  }
}
```

## Database Collections

### Scores Collection

- **Collection Name**: `scores`
- **Document Structure**:
  ```typescript
  {
    playerName: string;
    score: number;
    gameDate: string; // Format: YYYY-MM-DD
    createdAt: Date;
    updatedAt: Date;
  }
  ```

### Players Collection

- **Collection Name**: `players`
- **Document Structure**:
  ```typescript
  {
    name: string;
    totalScore: number;
    gamesPlayed: number;
    averageScore: number;
    createdAt: Date;
    updatedAt: Date;
  }
  ```

## Usage Examples

### Adding a Score

```typescript
import { addScore, updatePlayerStats } from "./services/scoreService";

const submitScore = async () => {
  const result = await addScore({
    playerName: "John Doe",
    score: 85,
    gameDate: "2024-01-15",
  });

  if (result.success) {
    await updatePlayerStats("John Doe");
    console.log("Score added with ID:", result.id);
  }
};
```

### Getting Today's Scores

```typescript
import { useScores } from "./hooks/useFirestore";
import { where, orderBy } from "firebase/firestore";

const TodayScores = () => {
  const {
    data: scores,
    loading,
    error,
  } = useScores([
    where("gameDate", "==", "2024-01-15"),
    orderBy("score", "desc"),
  ]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {scores.map((score) => (
        <li key={score.id}>
          {score.playerName}: {score.score}
        </li>
      ))}
    </ul>
  );
};
```

## Files Created

- `src/lib/firebase.ts` - Firebase configuration and initialization
- `src/lib/firestore.ts` - Generic Firestore utility functions
- `src/services/scoreService.ts` - Score and player management functions
- `src/hooks/useFirestore.ts` - React hooks for real-time Firestore data
- `src/components/ScoreBoard.tsx` - Example component using Firestore
- `.env.example` - Environment variables template

## Development

Run the development server:

```bash
npm run dev
```

The ScoreBoard component will be available and connected to your Firestore database once you've configured the environment variables.
