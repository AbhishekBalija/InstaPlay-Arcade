import { Button } from "../ui/button";

export function Navbar() {
  return (
    <nav className="border-b py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">InstaPlay Arcade</div>
        <div className="flex gap-4">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Games</Button>
          <Button variant="ghost">Leaderboard</Button>
          <Button>Sign In</Button>
        </div>
      </div>
    </nav>
  );
}