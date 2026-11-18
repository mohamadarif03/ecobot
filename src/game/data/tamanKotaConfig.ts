export const TAMAN_KOTA_CONFIG = {
  // Arena Boundaries (Plane 40x40 units, from -20 to 20)
  map: {
    size: 40,
    halfSize: 19.2, // Safety clamp for player bounds
    spawnPoint: { x: 0, y: 0, z: -15 }, // Near entrance gate
    fountainCenter: { x: 0, y: 0, z: 2 },
    fountainRadius: 3.2,
  },

  // Player movement
  player: {
    baseSpeed: 5.8, // units/sec
    speedMultiplierPerShoeLevel: 0.15, // +15% per upgrade level
    rotationSmoothSpeed: 14, // slerp responsiveness
    collisionRadius: 0.42,
  },

  // Camera Settings
  camera: {
    radius: 9.5, // distance behind player
    height: 6.8, // height above player
    targetOffset: { x: 0, y: 1.2, z: 0 },
    lerpSpeed: 6.5,
  },

  // Upgrades & Inventory
  upgrades: {
    bagCapacityPerLevel: {
      0: 3,
      1: 3,
      2: 5,
      3: 8,
    } as Record<number, number>,
    grabberDistanceBonus: 0.8, // Bonus distance if grabber owned
  },

  // Interaction
  interaction: {
    baseDistance: 1.8,
    actionCooldownMs: 250,
    idleHintSeconds: 10,
  },

  // Bins layout (Near entrance gate, arranged neatly)
  bins: [
    { id: "bin-organik", category: "organik", name: "Tong Organik", label: "ORGANIK", colorHex: "#22C55E", position: { x: -3.5, y: 0, z: -11.5 } },
    { id: "bin-anorganik", category: "anorganik", name: "Tong Anorganik", label: "ANORGANIK", colorHex: "#EAB308", position: { x: 0, y: 0, z: -11.5 } },
    { id: "bin-b3", category: "b3", name: "Tong B3", label: "B3", colorHex: "#EF4444", position: { x: 3.5, y: 0, z: -11.5 } },
  ],

  // 12 Fixed Candidate Spawn Points for Trash across the park
  trashSpawnCandidatePoints: [
    { x: -11.0, y: 0.2, z: -8.0 },  // Near west benches
    { x: 12.0, y: 0.2, z: -6.5 },   // Near east flowerbed
    { x: -7.5, y: 0.2, z: -1.5 },   // Beside circular walkway
    { x: 8.0, y: 0.2, z: 1.0 },     // East walkway
    { x: -13.0, y: 0.2, z: 6.0 },   // West playground edge
    { x: 13.5, y: 0.2, z: 8.5 },    // East tree cluster
    { x: -5.0, y: 0.2, z: 9.5 },    // North-west bench
    { x: 5.5, y: 0.2, z: 10.5 },    // North-east picnic zone
    { x: 0.0, y: 0.2, z: 14.5 },    // Far north monument
    { x: -10.5, y: 0.2, z: -13.0 }, // Near west fence
    { x: 9.5, y: 0.2, z: -12.5 },  // Near east entrance garden
    { x: 0.0, y: 0.2, z: -5.0 },    // Approach path to fountain
  ],

  // Scoring & Rewards
  scoring: {
    correctPoints: 10,
    correctXp: 5,
    wrongPointsPenalty: 2, // -2 poin (no XP penalty)
  },

  // Star accuracy rules (PRD 7.6)
  stars: {
    threeStarAccuracyPct: 90,
    twoStarAccuracyPct: 75,
  },
};
