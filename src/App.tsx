import { Navbar } from "./components/layout/Navbar";
import { GameCard } from "./components/GameCard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SnakeGame } from "./games/SnakeGame";

function App() {
  // Sample game data
  const games = [
    {
      id: 1,
      title: "Space Invaders",
      description: "Classic arcade game with a modern twist",
      imageUrl: "https://placehold.co/300x200"
    },
    {
      id: 2,
      title: "Tetris",
      description: "The timeless puzzle game",
      imageUrl: "https://placehold.co/300x200"
    },
    {
      id: 3,
      title: "Snake",
      description: "Navigate and grow your snake",
      imageUrl: "https://placehold.co/300x200"
    }
  ];

  const navigate = useNavigate ? useNavigate() : undefined;

  const handlePlayNow = (gameTitle: string) => {
    if (gameTitle === "Snake") {
      navigate && navigate("/snake");
    }
    // Add more navigation logic for other games if needed
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <section className="py-8">
            <h2 className="text-2xl font-semibold mb-6">Featured Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map(game => (
                <GameCard 
                  key={game.id}
                  title={game.title}
                  description={game.description}
                  imageUrl={game.imageUrl}
                  onPlayNow={() => handlePlayNow(game.title)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          © {new Date().getFullYear()} InstaPlay Arcade. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function AppWithRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/snake" element={<SnakeGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWithRouter;
