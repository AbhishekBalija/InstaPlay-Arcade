import { Button } from "./ui/button";

export interface GameCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  onPlayNow?: () => void;
}

export function GameCard({ title, description, imageUrl, onPlayNow }: GameCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {imageUrl && (
        <div className="h-48 bg-gray-200">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 mb-4">{description}</p>
        <Button className="w-full" onClick={onPlayNow}>Play Now</Button>
      </div>
    </div>
  );
}