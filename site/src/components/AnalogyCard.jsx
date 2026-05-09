import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, ChevronDown, ChevronUp } from 'lucide-react'
import GifCard from './GifCard'

function parseMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: '#a78bfa' }}>{part.slice(2, -2)}</strong>
    }
    return part.split('\n').map((line, j) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < part.split('\n').length - 1 && <br />}
      </span>
    ))
  })
}

export default function AnalogyCard({ analogy }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden my-6"
      style={{
        background: 'rgba(139,92,246,0.06)',
        border: `1px solid ${open ? 'rgba(139,92,246,0.45)' : 'rgba(139,92,246,0.2)'}`,
        boxShadow: open ? '0 8px 32px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.04)' : '0 4px 16px rgba(0,0,0,0.2)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-5 text-left transition-colors"
        style={{ background: open ? 'rgba(139,92,246,0.08)' : 'transparent' }}
      >
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', boxShadow: '0 0 16px rgba(139,92,246,0.4)' }}
        >
          <Zap size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#a78bfa' }}>Analogy</div>
          <div className="font-semibold text-white">{analogy.title}</div>
          <div className="text-xs text-slate-500">Concept: {analogy.concept}</div>
        </div>
        {open
          ? <ChevronUp size={18} style={{ color: '#a78bfa' }} />
          : <ChevronDown size={18} style={{ color: '#a78bfa' }} />
        }
      </button>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-5 pb-5"
        >
          <div className="h-px mb-4" style={{ background: 'rgba(139,92,246,0.2)' }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="md:col-span-2">
              <p className="text-sm leading-relaxed" style={{ color: '#c4b5fd' }}>
                {parseMarkdown(analogy.analogy)}
              </p>
            </div>
            {analogy.gif && (
              <div className="flex justify-center">
                <GifCard gifKey={analogy.gif} side="right" />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
