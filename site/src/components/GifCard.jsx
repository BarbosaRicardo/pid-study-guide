import React, { useState } from 'react'
import { GIFS } from '../data/gifs'

// Supports Giphy IDs (default) or full URLs
function buildUrl(id) {
  if (!id) return null
  if (id.startsWith('http')) return id
  // Use Tenor embed if id starts with 'tenor:'
  if (id.startsWith('tenor:')) {
    return `https://tenor.com/embed/${id.slice(6)}`
  }
  // Giphy direct media URL — no iframe, proper onError support
  return `https://media1.giphy.com/media/${id}/giphy.gif`
}

export default function GifCard({ gifKey, caption, side = 'right', className = '' }) {
  const [hidden, setHidden] = useState(false)
  const id = GIFS[gifKey]
  const url = buildUrl(id)

  if (!url || hidden) return null

  return (
    <div className={`flex ${side === 'left' ? 'justify-start' : 'justify-end'} my-4 ${className}`}>
      <div className="max-w-xs text-center">
        <div
          style={{
            width: 200,
            height: 150,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px',
            border: '1px solid rgba(59,130,246,0.2)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.1)',
          }}
        >
          <img
            src={url}
            alt={caption || gifKey}
            width="200"
            height="150"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={() => setHidden(true)}
          />
        </div>
        {caption && (
          <p className="text-xs text-slate-500 mt-1.5 italic">{caption}</p>
        )}
      </div>
    </div>
  )
}
