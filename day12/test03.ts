const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
  } as const;
  
  type Direction = typeof  ODirection[keyof typeof ODirection];