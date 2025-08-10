import { useState, useEffect } from "react";

export function generateDeterministicPositions(count: number, seed = 0) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    // Use a simple deterministic formula based on index and seed
    const x = ((i * 17 + seed * 13) % 100).toFixed(2);
    const y = ((i * 23 + seed * 7) % 100).toFixed(2);
    const rotation = ((i * 31 + seed * 11) % 360).toFixed(2);
    positions.push({ x, y, rotation });
  }
  return positions;
}

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
