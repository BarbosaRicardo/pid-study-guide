import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, BookOpen, Home, Settings, BarChart2, Sliders, TrendingUp, Layers, Cpu, Monitor, Wrench, FlaskConical, CreditCard } from 'lucide-react'
import { CHAPTERS } from '../data/chapters'
import { useProgress } from '../hooks/useProgress'

const ICON_MAP = {
  BookOpen, Settings, BarChart2, Sliders, TrendingUp, Layers, Cpu, Monitor, Wrench, FlaskConical, CreditCard,
}

export default function ChapterLayout({ chapterId, title, children, prev, next }) {
  const { markChapterVisited } = useProgress()

  useEffect(() => {
    markChapterVisited(chapterId)
    window.scrollTo(0, 0)
  }, [chapterId])

  const chapter = CHAPTERS.find((c) => c.id === chapterId)
  const ChIcon = ICON_MAP[chapter?.icon] || BookOpen
  const prevChapter = prev ? CHAPTERS.find((c) => c.id === prev) : null
  const nextChapter = next ? CHAPTERS.find((c) => c.id === next) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-3xl mx-auto py-8 px-4"
    >
      {/* Chapter header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: 'rgba(168,85,247,0.75)' }}>
          <span>SCADA Training</span>
          <span className="text-slate-600">›</span>
          <span className="text-slate-500">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(0,210,160,0.2), rgba(6,182,212,0.15))', border: '1px solid rgba(0,210,160,0.3)' }}>
            <ChIcon size={28} style={{ color: '#2dd4bf' }} />
          </div>
          <h1 className="text-3xl font-black text-white leading-tight tracking-tight">{title}</h1>
        </div>
        <div className="mt-4 h-px" style={{ background: 'linear-gradient(90deg, rgba(168,85,247,0.8), rgba(124,58,237,0.4), transparent)' }} />
      </div>

      {/* Content */}
      <div className="space-y-6 text-slate-300 leading-relaxed">
        {children}
      </div>

      {/* Chapter navigation */}
      <div className="flex justify-between items-center mt-12 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {prevChapter ? (
          <Link
            to={prevChapter.path}
            className="flex items-center gap-2 text-sm text-slate-500 transition-colors group"
            style={{ '--hover-color': '#a855f7' }}
            onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
            onMouseLeave={e => e.currentTarget.style.color = ''}
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <div>
              <div className="text-xs text-slate-600">Previous</div>
              <div className="font-medium">{prevChapter.label}</div>
            </div>
          </Link>
        ) : <div />}

        {nextChapter ? (
          <Link
            to={nextChapter.path}
            className="flex items-center gap-2 text-sm text-slate-500 transition-colors text-right group"
            onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
            onMouseLeave={e => e.currentTarget.style.color = ''}
          >
            <div>
              <div className="text-xs text-slate-600">Next Up</div>
              <div className="font-medium">{nextChapter.label}</div>
            </div>
            <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : <div />}
      </div>
    </motion.div>
  )
}
