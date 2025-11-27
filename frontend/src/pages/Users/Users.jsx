import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])
  const [followingIds, setFollowingIds] = useState([])
  const [error, setError] = useState('')
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null

  useEffect(() => {
    const load = async () => {
      setError('')
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Failed to load users')
        } else {
          const list = Array.isArray(data) ? data : []
          setUsers(list.filter(u => String(u.id) !== String(userId)))
        }
      } catch {
        setError('Network error')
      }
      if (userId) {
        const fr = await fetch(`/api/users/${userId}/following`).catch(() => null)
        if (fr) {
          const fd = await fr.json()
          if (fr.ok) setFollowingIds((Array.isArray(fd) ? fd : []).map(u => u.id))
        }
      }
    }
    load()
  }, [userId])

  const toggleFollow = async (targetId, isFollowing) => {
    if (!userId) return
    const url = `/api/users/${userId}/follow/${targetId}`
    const res = await fetch(url, { method: isFollowing ? 'DELETE' : 'POST' }).catch(() => null)
    if (!res) return
    if (res.ok) {
      setFollowingIds(prev => {
        const idStr = String(targetId)
        const has = prev.map(String).includes(idStr)
        if (has && isFollowing) return prev.filter(id => String(id) !== idStr)
        if (!has && !isFollowing) return [...prev, targetId]
        return prev
      })
    }
  }

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Users</h1>
        <p className="text-gray-400">Discover and follow other listeners</p>
      </div>

      {error && <div className="bg-red-600 text-white p-3 rounded-md text-sm mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(u => {
          const isFollowing = followingIds.map(String).includes(String(u.id))
          return (
            <div key={u.id} className="bg-gray-900 p-6 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">{u.firstName} {u.lastName}</p>
                <p className="text-gray-400 text-sm">{u.email}</p>
              </div>
              <button
                onClick={() => toggleFollow(u.id, isFollowing)}
                className={`px-4 py-2 rounded-lg font-medium ${isFollowing ? 'bg-gray-700 text-white' : 'bg-spotify-green text-black'} hover:opacity-90`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Users
