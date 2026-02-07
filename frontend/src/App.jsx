import { useState, useEffect } from 'react'

const AgentCard = ({ agent }) => {
  const statusColors = {
    online: 'bg-green-500',
    coding: 'bg-blue-500',
    idle: 'bg-yellow-500',
    offline: 'bg-gray-500',
  }

  const statusDot = {
    online: 'bg-green-400',
    coding: 'bg-blue-400',
    idle: 'bg-yellow-400',
    offline: 'bg-gray-400',
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 transition-transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {agent.name}
        </h3>
        <div className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
          <span className={`w-2 h-2 rounded-full ${statusDot[agent.status] || 'bg-gray-500'} animate-pulse`}></span>
          <span className="text-xs font-semibold text-gray-300 capitalize">
            {agent.status}
          </span>
        </div>
      </div>
      <div className="text-gray-300 space-y-2">
        <p className="flex justify-between border-b border-gray-700 pb-2">
          <span className="font-semibold text-gray-400">ID</span> 
          <span className="font-mono text-sm">{agent.id}</span>
        </p>
        <p className="flex justify-between pt-1">
          <span className="font-semibold text-gray-400">Role</span> 
          <span className="text-blue-300">{agent.role}</span>
        </p>
      </div>
    </div>
  )
}

function App() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Attempt to fetch from backend, fallback to mock if failed (for dev resilience)
    fetch('/api/agents')
      .then(res => {
        if (!res.ok) throw new Error('Backend unavailable')
        return res.json()
      })
      .then(data => {
        setAgents(data.agents)
        setLoading(false)
      })
      .catch(err => {
        console.warn('Backend fetch failed, using mock data:', err)
        setAgents([
          { id: 'jr', name: 'JR', role: 'Architect', status: 'online' },
          { id: 'tiny', name: 'Tiny', role: 'Frontend', status: 'coding' },
          { id: 'soc', name: 'Son of Claw', role: 'Backend', status: 'coding' }
        ])
        setError('Backend unavailable - showing mock data')
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 tracking-tight">
            Claw Swarm
          </h1>
          <p className="text-gray-400 text-lg">Real-time Agent Orchestration & Status</p>
          {error && (
            <div className="mt-4 inline-block px-4 py-1 bg-red-900/50 border border-red-500/50 rounded text-red-200 text-sm">
              ⚠️ {error}
            </div>
          )}
        </header>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Syncing with Swarm...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
