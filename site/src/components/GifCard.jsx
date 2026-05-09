import React, { useState } from 'react'
import { GIFS } from '../data/gifs'

export default function GifCard({ gifKey, caption, side = 'right', className = '' }) {
  const [error, setError] = useState(false)
  const id = GIFS[gifKey]

  if (!id || error) return null

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
          <iframe
            src={`https://giphy.com/embed/${id}`}
            width="200"
            height="150"
            style={{ position: 'absolute', top: 0, left: 0, border: 'none' }}
            frameBorder="0"
            allowFullScreen
            title={caption || gifKey}
            onError={() => setError(true)}
          />
        </div>
        {caption && (
          <p className="text-xs text-slate-500 mt-1.5 italic">{caption}</p>
        )}
      </div>
    </div>
  )
}
