import Card from "@/components/Card";
import GameCard from "@/components/GameCard";
import { getAllGames } from "@/services/gameService";

export default async function Home() {
  const games = await getAllGames();

  return (
    <>
      <Card>
        <h2>Welcome to the Daily Smartass Scoreboard!</h2>
        <p>Get ready to test your wits and have some fun!</p>
      </Card>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            description={game.description}
            link={game.websiteUrl}
            imageUrl={game.imageUrl}
          />
        ))}
      </div>
    </>
  );
}
