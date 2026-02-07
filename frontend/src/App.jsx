import { useState, useEffect } from 'react'

const AgentCard = ({ agent }) => {
  const statusColors = {
    online: 'bg-green-500',
    coding: 'bg-blue-500',
    idle: 'bg-yellow-500',
    offline: 'bg-gray-500',
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{agent.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[agent.status] || 'bg-gray-500'} text-white capitalize`}>
          {agent.status}
        </span>
      </div>
      <div className="text-gray-300 space-y-2">
        <p><span className="font-semibold text-gray-400">ID:</span> {agent.id}</p>
        <p><span className="font-semibold text-gray-400">Role:</span> {agent.role}</p>
      </div>
    </div>
  )
}

function App() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for initial dev until backend is ready
    const mockData = [
      { id: 'jr', name: 'JR', role: 'Architect', status: 'online' },
      { id: 'tiny', name: 'Tiny', role: 'Frontend', status: 'coding' },
      { id: 'soc', name: 'Son of Claw', role: 'Backend', status: 'coding' }
    ]

    // Simulate fetch delay
    setTimeout(() => {
        setAgents(mockData)
        setLoading(false)
    }, 500)

    // TODO: Uncomment when backend is ready
    /*
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => setAgents(data.agents))
      .catch(err => console.error(err))
    */
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            Claw Swarm Dashboard
          </h1>
          <p className="text-gray-400">Real-time Agent Monitoring & Orchestration</p>
        </header>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Connecting to Swarm...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
