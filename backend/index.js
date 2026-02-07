const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET /health
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// GET /agents
app.get('/agents', (req, res) => {
  res.json({
    agents: [
      {
        id: "jr",
        name: "JR",
        role: "Architect",
        status: "online"
      },
      {
        id: "tiny",
        name: "Tiny",
        role: "Frontend",
        status: "coding"
      },
      {
        id: "soc",
        name: "Son of Claw",
        role: "Backend",
        status: "coding"
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Swarm Backend running on http://localhost:${PORT} 🐾`);
});
