import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "../components/ui/button";

// Define types for the game
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type Snake = Position[];

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState<Snake>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [speed, setSpeed] = useState(100); // milliseconds between moves
  
  // Constants
  const GRID_SIZE = 20; // 20x20 grid
  const CELL_SIZE = 20; // 20px per cell
  const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // 400x400 canvas
  
  // Generate random food position
  const generateFood = useCallback((): Position => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return { x, y };
  }, []);
  
  // Check if position is occupied by snake
  const isPositionOccupied = useCallback((pos: Position, snakeBody: Snake = snake): boolean => {
    return snakeBody.some(segment => segment.x === pos.x && segment.y === pos.y);
  }, [snake]);
  
  // Generate new food position that's not on the snake
  const getNewFoodPosition = useCallback((): Position => {
    let newFood = generateFood();
    while (isPositionOccupied(newFood)) {
      newFood = generateFood();
    }
    return newFood;
  }, [generateFood, isPositionOccupied]);
  
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, direction]);
  
  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const moveSnake = () => {
      setSnake(prevSnake => {
        // Create new head position based on current direction
        const head = { ...prevSnake[0] };
        
        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }
        
        // Check for wall collision
        if (
          head.x < 0 || 
          head.x >= GRID_SIZE || 
          head.y < 0 || 
          head.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }
        
        // Check for self collision (except with the tail that's about to move)
        if (isPositionOccupied(head, prevSnake.slice(0, -1))) {
          setGameOver(true);
          return prevSnake;
        }
        
        // Create new snake body
        const newSnake = [head, ...prevSnake];
        
        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
          // Increase score
          setScore(prev => prev + 10);
          
          // Generate new food
          setFood(getNewFoodPosition());
          
          // Increase speed slightly
          if (speed > 50) setSpeed(prev => prev - 2);
        } else {
          // Remove tail if no food was eaten
          newSnake.pop();
        }
        
        return newSnake;
      });
    };
    
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, direction, food, speed, getNewFoodPosition, isPositionOccupied]);
  
  // Draw game on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw snake
    ctx.fillStyle = '#4CAF50'; // Green snake
    snake.forEach((segment, index) => {
      // Make head a different color
      if (index === 0) ctx.fillStyle = '#388E3C'; // Darker green for head
      
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      
      // Reset to body color after drawing head
      if (index === 0) ctx.fillStyle = '#4CAF50';
    });
    
    // Draw food
    ctx.fillStyle = '#F44336'; // Red food
    ctx.fillRect(
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    
    // Draw grid (optional)
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 0.5;
    
    // Draw vertical lines
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }
    
    // Draw game over text
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      
      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 15);
      
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 15);
    }
  }, [snake, food, gameOver, score]);
  
  const startGame = () => {
    // Reset game state
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setFood(getNewFoodPosition());
    setDirection('RIGHT');
    setSpeed(100);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Snake Game</h2>
        <p className="text-gray-500">Score: {score}</p>
      </div>
      
      <canvas 
        ref={canvasRef} 
        width={CANVAS_SIZE} 
        height={CANVAS_SIZE} 
        className="border border-gray-300"
      />
      
      <div className="mt-4">
        {!gameStarted || gameOver ? (
          <Button onClick={startGame}>{gameOver ? 'Play Again' : 'Start Game'}</Button>
        ) : (
          <Button variant="outline" onClick={() => setGameStarted(false)}>
            Pause Game
          </Button>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Use arrow keys to control the snake
      </div>
    </div>
  );
}