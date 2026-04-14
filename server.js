const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================
// DATA LAYER — In-memory simulated stadium data
// ============================================================

const gates = [
  { id: 'gate-n1', name: 'North Gate A', zone: 'North', currentQueue: 42, openLanes: 3, avgProcessTime: 7, status: 'moderate', coords: { x: 40, y: 5 } },
  { id: 'gate-n2', name: 'North Gate B', zone: 'North', currentQueue: 18, openLanes: 4, avgProcessTime: 6, status: 'low', coords: { x: 60, y: 5 } },
  { id: 'gate-e1', name: 'East Gate A', zone: 'East', currentQueue: 65, openLanes: 2, avgProcessTime: 8, status: 'high', coords: { x: 95, y: 35 } },
  { id: 'gate-e2', name: 'East Gate B', zone: 'East', currentQueue: 30, openLanes: 3, avgProcessTime: 7, status: 'moderate', coords: { x: 95, y: 65 } },
  { id: 'gate-s1', name: 'South Gate A', zone: 'South', currentQueue: 88, openLanes: 3, avgProcessTime: 9, status: 'critical', coords: { x: 60, y: 95 } },
  { id: 'gate-s2', name: 'South Gate B', zone: 'South', currentQueue: 12, openLanes: 4, avgProcessTime: 5, status: 'low', coords: { x: 40, y: 95 } },
  { id: 'gate-w1', name: 'West Gate A', zone: 'West', currentQueue: 55, openLanes: 2, avgProcessTime: 8, status: 'high', coords: { x: 5, y: 35 } },
  { id: 'gate-w2', name: 'West Gate B', zone: 'West', currentQueue: 25, openLanes: 5, avgProcessTime: 6, status: 'low', coords: { x: 5, y: 65 } },
];

const foodStalls = [
  { id: 'food-1', name: 'Stadium Burgers', category: 'Fast Food', rating: 4.2, totalRatings: 156, ratingSum: 655.2, currentCrowd: 'moderate', estimatedWait: 8, zone: 'North Stand', priceRange: '$$', popular: 'Classic Smash Burger' },
  { id: 'food-2', name: 'Naan & Curry House', category: 'Indian', rating: 4.6, totalRatings: 203, ratingSum: 933.8, currentCrowd: 'high', estimatedWait: 15, zone: 'East Stand', priceRange: '$$', popular: 'Butter Chicken Naan' },
  { id: 'food-3', name: 'Pizza Zone', category: 'Italian', rating: 3.8, totalRatings: 89, ratingSum: 338.2, currentCrowd: 'low', estimatedWait: 5, zone: 'North Stand', priceRange: '$', popular: 'Margherita Slice' },
  { id: 'food-4', name: 'Sushi Express', category: 'Japanese', rating: 4.4, totalRatings: 67, ratingSum: 294.8, currentCrowd: 'moderate', estimatedWait: 10, zone: 'West Stand', priceRange: '$$$', popular: 'Salmon Nigiri Set' },
  { id: 'food-5', name: 'Taco Fiesta', category: 'Mexican', rating: 4.1, totalRatings: 134, ratingSum: 549.4, currentCrowd: 'high', estimatedWait: 12, zone: 'South Stand', priceRange: '$$', popular: 'Al Pastor Tacos' },
  { id: 'food-6', name: 'Crispy Wings Bar', category: 'American', rating: 4.5, totalRatings: 178, ratingSum: 801.0, currentCrowd: 'high', estimatedWait: 14, zone: 'East Stand', priceRange: '$$', popular: 'Buffalo Wings Bucket' },
  { id: 'food-7', name: 'Fresh Bowls', category: 'Healthy', rating: 4.3, totalRatings: 45, ratingSum: 193.5, currentCrowd: 'low', estimatedWait: 4, zone: 'West Stand', priceRange: '$$', popular: 'Açaí Power Bowl' },
  { id: 'food-8', name: 'Gelato Paradise', category: 'Desserts', rating: 4.7, totalRatings: 212, ratingSum: 996.4, currentCrowd: 'moderate', estimatedWait: 6, zone: 'North Stand', priceRange: '$', popular: 'Pistachio Gelato' },
  { id: 'food-9', name: 'Craft Beer Garden', category: 'Beverages', rating: 4.0, totalRatings: 310, ratingSum: 1240.0, currentCrowd: 'high', estimatedWait: 18, zone: 'South Stand', priceRange: '$$$', popular: 'IPA Draft' },
  { id: 'food-10', name: 'Chai & Samosa', category: 'Indian Snacks', rating: 4.8, totalRatings: 95, ratingSum: 456.0, currentCrowd: 'moderate', estimatedWait: 3, zone: 'East Stand', priceRange: '$', popular: 'Masala Chai + Samosa Combo' },
  { id: 'food-11', name: 'Wok Station', category: 'Asian', rating: 4.1, totalRatings: 78, ratingSum: 319.8, currentCrowd: 'low', estimatedWait: 7, zone: 'South Stand', priceRange: '$$', popular: 'Chicken Fried Rice' },
  { id: 'food-12', name: 'Hydration Hub', category: 'Beverages', rating: 3.9, totalRatings: 420, ratingSum: 1638.0, currentCrowd: 'low', estimatedWait: 2, zone: 'West Stand', priceRange: '$', popular: 'Electrolyte Cooler' },
];

const washrooms = [
  { id: 'wash-1', name: 'North Stand — Level 1', zone: 'North', currentQueue: 12, totalStalls: 10, occupiedStalls: 8, status: 'moderate' },
  { id: 'wash-2', name: 'North Stand — Level 2', zone: 'North', currentQueue: 3, totalStalls: 8, occupiedStalls: 4, status: 'low' },
  { id: 'wash-3', name: 'East Stand — Level 1', zone: 'East', currentQueue: 22, totalStalls: 12, occupiedStalls: 11, status: 'high' },
  { id: 'wash-4', name: 'South Stand — Level 1', zone: 'South', currentQueue: 8, totalStalls: 10, occupiedStalls: 6, status: 'moderate' },
  { id: 'wash-5', name: 'West Stand — Level 1', zone: 'West', currentQueue: 2, totalStalls: 8, occupiedStalls: 3, status: 'low' },
  { id: 'wash-6', name: 'West Stand — Level 2', zone: 'West', currentQueue: 18, totalStalls: 6, occupiedStalls: 6, status: 'high' },
];

const friends = new Map(); // code -> { name, zone, section, seat, message, lastUpdated }

// ============================================================
// SIMULATION ENGINE — makes data feel alive
// ============================================================

function calculateGateWait(gate) {
  if (gate.openLanes === 0) return 9999;
  return Math.round((gate.currentQueue / gate.openLanes) * gate.avgProcessTime);
}

function getGateStatus(waitSeconds) {
  if (waitSeconds <= 60) return 'low';
  if (waitSeconds <= 180) return 'moderate';
  if (waitSeconds <= 360) return 'high';
  return 'critical';
}

function getWashroomStatus(washroom) {
  const waitMin = getWashroomWait(washroom);
  if (waitMin <= 3) return 'low';
  if (waitMin <= 8) return 'moderate';
  return 'high';
}

function getWashroomWait(washroom) {
  const freeStalls = washroom.totalStalls - washroom.occupiedStalls;
  if (freeStalls <= 0) return Math.round((washroom.currentQueue / washroom.totalStalls) * 2.5);
  return Math.round((washroom.currentQueue / Math.max(freeStalls, 1)) * 1.5);
}

function getCrowdLevel(wait) {
  if (wait <= 5) return 'low';
  if (wait <= 12) return 'moderate';
  return 'high';
}

function fluctuate(val, min, max, delta) {
  const change = Math.floor(Math.random() * (delta * 2 + 1)) - delta;
  return Math.min(max, Math.max(min, val + change));
}

function simulationTick() {
  // Fluctuate gate queues
  gates.forEach(gate => {
    gate.currentQueue = fluctuate(gate.currentQueue, 0, 120, 8);
    gate.openLanes = fluctuate(gate.openLanes, 1, 6, 1);
    const wait = calculateGateWait(gate);
    gate.estimatedWait = wait;
    gate.status = getGateStatus(wait);
  });

  // Fluctuate food stalls
  foodStalls.forEach(stall => {
    stall.estimatedWait = fluctuate(stall.estimatedWait, 1, 25, 2);
    stall.currentCrowd = getCrowdLevel(stall.estimatedWait);
  });

  // Fluctuate washrooms
  washrooms.forEach(wr => {
    wr.currentQueue = fluctuate(wr.currentQueue, 0, 35, 3);
    wr.occupiedStalls = fluctuate(wr.occupiedStalls, 0, wr.totalStalls, 2);
    wr.status = getWashroomStatus(wr);
  });

  // Clean up old friend codes (older than 2 hours)
  const cutoff = Date.now() - 2 * 60 * 60 * 1000;
  for (const [code, data] of friends) {
    if (data.lastUpdated < cutoff) friends.delete(code);
  }
}

// Initial calculation
gates.forEach(gate => {
  gate.estimatedWait = calculateGateWait(gate);
  gate.status = getGateStatus(gate.estimatedWait);
});

// Run simulation every 10 seconds
setInterval(simulationTick, 10000);

// ============================================================
// API ROUTES
// ============================================================

// --- Gates ---
app.get('/api/gates', (req, res) => {
  const gatesData = gates.map(g => ({
    ...g,
    estimatedWait: calculateGateWait(g),
  }));

  // Find recommended gate (lowest estimated wait)
  const sorted = [...gatesData].sort((a, b) => a.estimatedWait - b.estimatedWait);
  const recommended = sorted[0];

  res.json({
    gates: gatesData,
    recommended: {
      id: recommended.id,
      name: recommended.name,
      estimatedWait: recommended.estimatedWait,
      reason: `Fastest entry — only ~${Math.ceil(recommended.estimatedWait / 60)} min wait with ${recommended.openLanes} lanes open`,
    },
    timestamp: new Date().toISOString(),
  });
});

// --- Food ---
app.get('/api/food', (req, res) => {
  const { sort, zone } = req.query;
  let data = [...foodStalls];

  if (zone && zone !== 'all') {
    data = data.filter(s => s.zone.toLowerCase().includes(zone.toLowerCase()));
  }

  if (sort === 'rating') data.sort((a, b) => b.rating - a.rating);
  else if (sort === 'wait') data.sort((a, b) => a.estimatedWait - b.estimatedWait);
  else if (sort === 'crowd') {
    const order = { low: 0, moderate: 1, high: 2 };
    data.sort((a, b) => order[a.currentCrowd] - order[b.currentCrowd]);
  }

  res.json({ stalls: data, timestamp: new Date().toISOString() });
});

app.post('/api/food/:id/rate', (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  const stall = foodStalls.find(s => s.id === id);
  if (!stall) return res.status(404).json({ error: 'Stall not found' });

  stall.ratingSum += rating;
  stall.totalRatings += 1;
  stall.rating = Math.round((stall.ratingSum / stall.totalRatings) * 10) / 10;

  res.json({ success: true, newRating: stall.rating, totalRatings: stall.totalRatings });
});

// --- Washrooms ---
app.get('/api/washrooms', (req, res) => {
  const data = washrooms.map(wr => ({
    ...wr,
    estimatedWait: getWashroomWait(wr),
    status: getWashroomStatus(wr),
    availableStalls: wr.totalStalls - wr.occupiedStalls,
  }));

  // Sort by estimated wait
  data.sort((a, b) => a.estimatedWait - b.estimatedWait);

  res.json({ washrooms: data, timestamp: new Date().toISOString() });
});

// --- Friends ---
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

app.post('/api/friends/share', (req, res) => {
  const { name, zone, section, seat, message } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  let code = generateCode();
  while (friends.has(code)) code = generateCode();

  friends.set(code, {
    name,
    zone: zone || 'Unknown',
    section: section || 'Unknown',
    seat: seat || 'Unknown',
    message: message || '',
    lastUpdated: Date.now(),
  });

  res.json({ code, expiresIn: '2 hours' });
});

app.get('/api/friends/:code', (req, res) => {
  const { code } = req.params;
  const friend = friends.get(code.toUpperCase());
  if (!friend) return res.status(404).json({ error: 'Code not found or expired' });

  res.json({
    ...friend,
    lastUpdated: new Date(friend.lastUpdated).toISOString(),
  });
});

// --- Dashboard summary ---
app.get('/api/dashboard', (req, res) => {
  const avgGateWait = Math.round(gates.reduce((s, g) => s + calculateGateWait(g), 0) / gates.length);
  const totalInQueue = gates.reduce((s, g) => s + g.currentQueue, 0);
  const avgFoodWait = Math.round(foodStalls.reduce((s, f) => s + f.estimatedWait, 0) / foodStalls.length);
  const avgWashroomWait = Math.round(washrooms.reduce((s, w) => s + getWashroomWait(w), 0) / washrooms.length);

  res.json({
    gateStats: { avgWait: avgGateWait, totalInQueue, gatesOpen: gates.length },
    foodStats: { avgWait: avgFoodWait, stallsOpen: foodStalls.length },
    washroomStats: { avgWait: avgWashroomWait, zones: washrooms.length },
    activeFriendCodes: friends.size,
    timestamp: new Date().toISOString(),
  });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🏟️  CrowdSense server running on port ${PORT}`);
  console.log(`   Open http://localhost:${PORT}`);
});
