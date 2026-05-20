import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Zap, Award, Clock, ArrowRight, Sliders, TrendingUp, Settings, Activity, CheckCircle2, BarChart2, Layers, Cpu, Monitor, Wrench, FlaskConical } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import { CHAPTERS } from '../data/chapters'
import GifCard from '../components/GifCard'
import TrainingPanel from '../components/TrainingPanel'

const ICON_MAP = {
  BookOpen, Settings, BarChart2, Sliders, TrendingUp, Layers, Cpu, Monitor, Wrench, FlaskConical,
}

const COMMIT_KEY = 'pid_committed'
const LAST_VISIT_KEY = 'pid_last_visit'
const BANNER_SHOWN_KEY = 'pid_banner_shown'

function getFreshStartMessage() {
  const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY) || '0', 10)
  const lastBanner = parseInt(localStorage.getItem(BANNER_SHOWN_KEY) || '0', 10)
  const now = Date.now()
  const daysSince = (now - lastVisit) / 86400000
  const hoursSinceBanner = (now - lastBanner) / 3600000
  if (hoursSinceBanner < 48) return null
  const d = new Date()
  const isMonday = d.getDay() === 1
  const isFirstOfMonth = d.getDate() === 1
  if (daysSince >= 5 || isMonday || isFirstOfMonth) {
    localStorage.setItem(BANNER_SHOWN_KEY, String(now))
    if (isMonday) return "New week — engineers who study consistently tune loops 3× faster."
    if (isFirstOfMonth) return "New month, fresh start — what will you finish before it ends?"
    return "Welcome back — pick up where you left off. Your progress is exactly where you left it."
  }
  return null
}

const STATS = [
  { icon: BookOpen,   label: '10 Chapters', sub: 'Theory to tuning' },
  { icon: Zap,        label: '650+ Quizzes', sub: 'Test yourself' },
  { icon: Clock,      label: '~4 Hours',    sub: 'Total study time' },
  { icon: Award,      label: 'Cert Ready',  sub: 'ISA CCST & CAP' },
]

const HERO_OPTIONS = [
  { id: 'MCZ39lz83o5lC',        caption: `When the control loop finally stops oscillating.`,               tooltip: `PID tuning is part science, part engineering judgment, part field experience. Ziegler-Nichols gives you starting values. Then you adjust in the plant while explaining to the operator why the tank is oscillating. Then it works. Then someone changes the process.` },
  { id: 'lHfxDepSGlzom6f65K',   caption: `Integral windup: accumulating error until everything breaks.`,   tooltip: `Integral windup occurs when the output is saturated but the integrator keeps accumulating error. When saturation clears, all that accumulated integral dumps as a large step output. Anti-windup clamping isn't optional — it's the difference between a controller and a slow-motion disaster.` },
  { id: 'xT9IgzoKnwFNmISR8I',   caption: `Derivative kick: why D should never act on the setpoint.`,      tooltip: `If derivative acts on the error (setpoint minus PV), a sudden setpoint step produces a theoretically infinite derivative spike. Solution: apply D to the process variable only, never to the error. Most modern controllers do this by default. Old ones don't — and you'll know immediately.` },
  { id: 'Rpl1sod1vCXK0L2SUN',   caption: `Cascade control: the inner loop must always be faster.`,         tooltip: `Cascade control nests one PID inside another. Outer loop controls the slow variable — temperature, level, pressure. Inner loop controls the fast actuator. The inner loop must be at least 3 to 5 times faster than the outer or the instability looks like bad tuning but is actually bad architecture.` },
  { id: 'vFKqnCdLPNOKc',        caption: `Dead time: the PID's nemesis that gain tuning cannot fix.`,      tooltip: `Process dead time is the delay between a controller output change and any measurable response. PID degrades rapidly as the dead time to lag ratio increases. When dead time exceeds lag, PID alone can't win — you need a Smith Predictor or model-based control.` },
]
export default function Home() {
  const { overallProgress, getChapterStatus, reset } = useProgress()
  const [heroIdx] = useState(() => Math.floor(Math.random() * HERO_OPTIONS.length))
  const [committed, setCommitted] = useState(() => !!localStorage.getItem(COMMIT_KEY))
  const [freshMsg] = useState(() => getFreshStartMessage())
  const [streak] = useState(() => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
      const lastDate = localStorage.getItem('scadahub_streak_date') || ''
      const cur = parseInt(localStorage.getItem('scadahub_streak') || '0', 10)
      if (lastDate === today) return cur
      const next = lastDate === yesterday ? cur + 1 : 1
      localStorage.setItem('scadahub_streak', String(next))
      localStorage.setItem('scadahub_streak_date', today)
      return next
    } catch { return 1 }
  })
  const prog = overallProgress()

  useState(() => { localStorage.setItem(LAST_VISIT_KEY, String(Date.now())) })

  const chaptersOnly = CHAPTERS.filter(c => c.id !== 'home' && c.id !== 'flashcards')

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  function handleCommit() {
    localStorage.setItem(COMMIT_KEY, '1')
    setCommitted(true)
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto py-10 px-4 space-y-10">

      {/* Fresh Start Effect banner */}
      {freshMsg && (
        <motion.div variants={item}
          className="rounded-xl px-4 py-3 text-sm flex items-center gap-3"
          style={{ background: 'rgba(45,212,191,0.07)', border: '1px solid rgba(45,212,191,0.2)' }}
        >
          <span style={{ color: '#2dd4bf' }}>↺</span>
          <span style={{ color: 'rgba(45,212,191,0.8)' }}>{freshMsg}</span>
        </motion.div>
      )}

      {/* Hero */}
      <motion.div variants={item} className="text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-100 leading-tight mb-4">
              PID Controllers<br />
              <span className="text-mblue-600">Tuned, Not Guessed.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-md">
              The math behind every control loop in every plant. Understand it once
              and you'll be the engineer people call when the loop won't settle.
            </p>
            <div className="flex gap-3 mt-6">
              <Link to="/intro" className="btn-primary flex items-center gap-2">
                {prog.visited > 0 ? 'Continue Learning' : 'Start Learning'} <ArrowRight size={16} />
              </Link>
              {prog.pct > 0 && <Link to="/lab" className="btn-secondary">Practice Lab</Link>}
            </div>

            {/* Commitment CTA — shown only before commit */}
            {!committed && prog.visited === 0 && (
              <button
                onClick={handleCommit}
                className="mt-4 flex items-center gap-2 text-sm transition-all hover:opacity-90"
                style={{ color: 'rgba(192,132,252,0.6)' }}
              >
                <div className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: 'rgba(192,132,252,0.4)' }}>
                </div>
                I commit to finishing this course
              </button>
            )}
            {committed && prog.visited === 0 && (
              <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: 'rgba(192,132,252,0.55)' }}>
                <CheckCircle2 size={14} style={{ color: '#c084fc' }} />
                <span>Committed. Chapter 1 is waiting.</span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <GifCard gifId={HERO_OPTIONS[heroIdx].id} caption={HERO_OPTIONS[heroIdx].caption} tooltip={HERO_OPTIONS[heroIdx].tooltip} side="right" />
          </div>
        </div>
      </motion.div>

      {/* Progress — always shown */}
      <motion.div variants={item} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {streak > 1 && (
          <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span>🔥</span>
            <span className="font-bold text-sm" style={{ color: '#f97316' }}>{streak}-day streak</span>
            <span className="text-xs" style={{ color: 'rgba(249,115,22,0.45)' }}>
              {streak >= 7 ? '— elite consistency' : streak >= 3 ? '— keep the chain going' : "— don't break it"}
            </span>
          </div>
        )}
        {prog.visited === 0 ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-200 mb-1">Your Learning Journey</div>
              <div className="text-sm text-slate-500">10 chapters · ~4 hours · starts with one click</div>
            </div>
            <Link to="/intro" className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
              style={{ background: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.2)' }}>
              Begin Ch 1 <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-100">
                {prog.pct >= 80 ? 'Almost there — keep going' : prog.pct >= 40 ? 'Good momentum — don\'t stop now' : 'You\'ve started — finish what you started'}
              </h3>
              <button onClick={reset} className="text-xs text-slate-600 hover:text-red-400 transition-colors">Reset</button>
            </div>
            <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #2dd4bf, #06b6d4)' }}
                initial={{ width: 0 }} animate={{ width: `${prog.pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{prog.visited}/{prog.total} chapters read</span>
              <span className="font-bold" style={{ color: '#2dd4bf' }}>{prog.pct}% complete</span>
              <span className="text-slate-500">{prog.quizzes}/{prog.total} quizzes passed</span>
            </div>
          </>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div key={i} className="card text-center">
            <div className="w-10 h-10 bg-mblue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
              <s.icon size={20} className="text-mblue-600" />
            </div>
            <div className="font-bold text-slate-100">{s.label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Why it matters */}
      <motion.div variants={item} className="bg-gradient-to-r from-navy-700 to-mblue-700 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Sliders size={20} className="flex-shrink-0" /> Why PID Is the Skill Every Process Engineer Needs</h2>
            <ul className="text-sm text-blue-100 space-y-1 list-none">
              <li className="flex items-center gap-2"><Activity size={13} className="flex-shrink-0" /> Every process industry — oil & gas, power, water, pharma — runs on PID loops</li>
              <li className="flex items-center gap-2"><TrendingUp size={13} className="flex-shrink-0" /> A poorly tuned loop costs energy, product quality, and uptime every single day</li>
              <li className="flex items-center gap-2"><Settings size={13} className="flex-shrink-0" /> PID is in every DCS, PLC, and SCADA system — you'll see it everywhere you work</li>
              <li className="flex items-center gap-2"><Zap size={13} className="flex-shrink-0" /> Engineers who can tune well are the ones plants call first when things go wrong</li>
            </ul>
          </div>
          <div className="flex-shrink-0 text-center">
            <div className="text-5xl font-black text-amber-400">P·I·D</div>
            <div className="text-blue-200 text-sm">Three terms, one loop</div>
            <div className="text-xs text-blue-300 mt-1">Used in every process industry</div>
          </div>
        </div>
      </motion.div>

      {/* Chapter grid — 4-dot progress */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-mblue-600">Chapters</h2>
          {prog.visited > 0 && (
            <span className="text-xs text-slate-500">
              {chaptersOnly.filter(ch => getChapterStatus(ch.id).visited).length} of {chaptersOnly.length} visited
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {chaptersOnly.map((ch) => {
            const ChIcon = ICON_MAP[ch.icon] || BookOpen
            const status = getChapterStatus(ch.id)
            const allFour = status.level1Passed && status.level2Passed && status.level3Passed && status.level4Passed
            return (
              <Link key={ch.id} to={ch.path} className="card flex items-center gap-4 hover:border-mblue-200 hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: allFour ? 'rgba(74,222,128,0.15)' : status.visited ? 'rgba(45,212,191,0.12)' : 'rgba(59,130,246,0.08)',
                  }}>
                  <ChIcon size={20} style={{ color: allFour ? '#4ade80' : status.visited ? '#2dd4bf' : '#60a5fa' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-100 group-hover:text-mblue-600 transition-colors truncate">{ch.label}</div>
                  {status.visited && (
                    <div className="flex items-center gap-1 mt-1">
                      {[
                        { key: 'level1Passed', color: '#34d399' },
                        { key: 'level2Passed', color: '#fbbf24' },
                        { key: 'level3Passed', color: '#f87171' },
                        { key: 'level4Passed', color: '#4ade80' },
                      ].map((dot) => (
                        <div key={dot.key} className="w-1.5 h-1.5 rounded-full"
                          style={{ background: status[dot.key] ? dot.color : 'rgba(255,255,255,0.12)' }} />
                      ))}
                      <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {allFour ? 'complete' : 'in progress'}
                      </span>
                    </div>
                  )}
                </div>
                {allFour
                  ? <CheckCircle2 size={16} style={{ color: '#4ade80' }} className="flex-shrink-0" />
                  : <ArrowRight size={16} className="text-slate-300 group-hover:text-mblue-400 transition-colors flex-shrink-0" />
                }
              </Link>
            )
          })}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <TrainingPanel course="pid" />
      </motion.div>

      {/* Footer — loss framing */}
      <motion.div variants={item} className="text-center py-4">
        {prog.visited > 0 && prog.pct < 100 ? (
          <p className="text-slate-400 text-sm italic">
            "{chaptersOnly.length - prog.visited} chapters left to finish. Don't leave them unread."
          </p>
        ) : prog.pct === 100 ? (
          <p className="text-slate-400 text-sm italic">
            "You finished. That puts you in the top 5% of engineers who formally study PID control."
          </p>
        ) : (
          <p className="text-slate-400 text-sm italic">
            "P makes it go. I makes it stay. D makes it not panic. Mastering all three makes you the engineer people call."
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}
