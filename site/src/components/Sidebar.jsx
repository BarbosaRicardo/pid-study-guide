import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Zap, BookOpen, BarChart2, Home } from 'lucide-react'
import { CHAPTERS } from '../data/chapters'
import { useProgress } from '../hooks/useProgress'
import QuizReport from './QuizReport'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const { getChapterStatus, overallProgress } = useProgress()
  const location = useLocation()
  const prog = overallProgress()

  const NavItem = ({ ch }) => {
    const status = getChapterStatus(ch.id)
    return (
      <NavLink
        to={ch.path}
        onClick={() => setOpen(false)}
        className={({ isActive }) => `chapter-nav-item ${isActive ? 'active' : ''}`}
      >
        <span className="text-lg leading-none">{ch.emoji}</span>
        <span className="flex-1 truncate">{ch.label}</span>
        <div className="flex gap-0.5 flex-shrink-0">
          <div className={`w-1.5 h-1.5 rounded-full transition-all ${status.level1Passed ? 'bg-emerald-400 shadow-glow-green' : status.visited ? 'bg-amber-400' : 'bg-white/10'}`} />
          <div className={`w-1.5 h-1.5 rounded-full transition-all ${status.level2Passed ? 'bg-amber-400' : 'bg-white/10'}`} />
          <div className={`w-1.5 h-1.5 rounded-full transition-all ${status.level3Passed ? 'bg-rose-400' : 'bg-white/10'}`} />
        </div>
      </NavLink>
    )
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 20px rgba(168,85,247,0.45)' }}>
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div className="font-black text-white text-sm tracking-wide leading-tight">PID</div>
            <div className="text-xs font-medium" style={{ color: '#a855f7' }}>Study Guide</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500">Overall Progress</span>
            <span className="font-bold" style={{ color: '#a855f7' }}>{prog.pct}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="progress-bar h-full" style={{ width: `${prog.pct}%` }} />
          </div>
          <div className="mt-2 flex gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />L1: {prog.l1 || 0}</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />L2: {prog.l2 || 0}</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" />L3: {prog.l3 || 0}</span>
            <span className="ml-auto text-slate-600">{prog.visited} read</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {CHAPTERS.map((ch) => (
          <NavItem key={ch.id} ch={ch} />
        ))}

      </nav>

      {/* Footer */}
      <div className="p-4 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <a
          href="https://barbosaricardo.github.io/scada-hub/"
          className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
          style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.25)',
            color: '#c4b5fd',
          }}
        >
          <Home size={13} />
          SCADA Hub
        </a>
        <button
          onClick={() => { setOpen(false); setReportOpen(true) }}
          className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
          style={{
            background: 'rgba(34,211,238,0.08)',
            border: '1px solid rgba(34,211,238,0.2)',
            color: '#67e8f9',
          }}
        >
          <BarChart2 size={13} />
          Quiz Report
        </button>
        <a
          href={`${import.meta.env.BASE_URL}study_guide.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.18), rgba(124,58,237,0.12))',
            border: '1px solid rgba(168,85,247,0.35)',
            color: '#a855f7',
            boxShadow: '0 0 12px rgba(168,85,247,0.15)',
          }}
        >
          <BookOpen size={13} />
          Download Study Guide PDF
        </a>
        <p className="text-xs text-slate-600 text-center">
          SCADA Automation Engineering · PID Controllers · May 2026
        </p>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 text-white rounded-xl flex items-center justify-center shadow-lg"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 h-screen sticky top-0 overflow-hidden glass">
        <SidebarContent />
      </aside>

      <aside className={`lg:hidden fixed left-0 top-0 h-full w-72 z-50 shadow-2xl glass transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {reportOpen && <QuizReport onClose={() => setReportOpen(false)} />}
    </>
  )
}
