import { Suspense, useEffect, useState } from 'react'

export default function AuditStreamingList() {
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const eventSource = new EventSource('/api/audit/stream')
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setResults(prev => [...prev, data])
    }
    
    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
    }
    
    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={index} className="bg-slate-800/50 border border border-slate-700 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{result.title}</h3>
              <p className="text-gray-300 mt-2">{result.description}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              result.status === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {result.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
