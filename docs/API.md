# API Contract v1

## Base URL
`http://localhost:3000/api`

## Endpoints

### GET /health
Returns the health of the swarm.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-06T12:00:00Z",
  "uptime": 120
}
```

### GET /agents
Returns the list of active agents in the swarm.

**Response:**
```json
{
  "agents": [
    {
      "id": "jr",
      "name": "JR",
      "role": "Architect",
      "status": "online"
    },
    {
      "id": "tiny",
      "name": "Tiny",
      "role": "Frontend",
      "status": "coding"
    },
    {
      "id": "soc",
      "name": "Son of Claw",
      "role": "Backend",
      "status": "coding"
    }
  ]
}
```

