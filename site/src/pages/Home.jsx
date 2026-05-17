import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Zap, Award, Clock, ArrowRight, Sliders, TrendingUp, Settings, Activity } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import { CHAPTERS } from '../data/chapters'
import GifCard from '../components/GifCard'
import TrainingPanel from '../components/TrainingPanel'

const STATS = [
  { icon: BookOpen,   label: '10 Chapters', sub: 'Theory to tuning' },
  { icon: Zap,        label: '650+ Quizzes', sub: 'Test yourself' },
  { icon: Clock,      label: '~4 Hours',    sub: 'Total study time' },
  { icon: Award,      label: 'Cert Ready',  sub: 'ISA CCST & CAP' },
]

const HERO_OPTIONS = [
  { id: 'MCZ39lz83o5lC',        caption: `When the control loop finally stops oscillating.`,               tooltip: `PID tuning is part science, part engineering judgment, part field experience. Ziegler-Nichols gives you starting values. Then you adjust in the plant while explaining to the operator why the tank is oscillating. Then it works. Then someone changes the process.` },
  { id: 'lHfxDepSGlzom6f65K',   caption: `Integral windup: accumulating error until everything breaks.`,   tooltip: `Integral windup occurs when the output is saturated but the integrator keeps accumulating error. When saturation clears, all that accumulated integral dumps as a large step output. Anti-windup clamping isn't optional — it's the difference between a controller and a slow-motion disaster.` },
  { id: 'xT0xeJpnrWC4XWblEk',   caption: `Derivative kick: why D should never act on the setpoint.`,      tooltip: `If derivative acts on the error (setpoint minus PV), a sudden setpoint step produces a theoretically infinite derivative spike. Solution: apply D to the process variable only, never to the error. Most modern controllers do this by default. Old ones don't — and you'll know immediately.` },
  { id: '3oEjHFOscgNwdSRRDy',   caption: `Cascade control: the inner loop must always be faster.`,         tooltip: `Cascade control nests one PID inside another. Outer loop controls the slow variable — temperature, level, pressure. Inner loop controls the fast actuator. The inner loop must be at least 3 to 5 times faster than the outer or the instability looks like bad tuning but is actually bad architecture.` },
  { id: 'feqkVgjJpYtjy',        caption: `Dead time: the PID's nemesis that gain tuning cannot fix.`,      tooltip: `Process dead time is the delay between a controller output change and any measurable response. PID degrades rapidly as the dead time to lag ratio increases. When dead time exceeds lag, PID alone can't win — you need a Smith Predictor or model-based control.` },
]
export default function Home() {
  const { overallProgress, reset } = useProgress()
  const [heroIdx] = useState(() => Math.floor(Math.random() * HERO_OPTIONS.length))
  const prog = overallProgress()

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto py-10 px-4 space-y-10">

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
                Start Learning <ArrowRight size={16} />
              </Link>
              {prog.pct > 0 && <Link to="/lab" className="btn-secondary">Practice Lab</Link>}
            </div>
          </div>
          <div className="flex-shrink-0">
            <GifCard gifId={HERO_OPTIONS[heroIdx].id} caption={HERO_OPTIONS[heroIdx].caption} tooltip={HERO_OPTIONS[heroIdx].tooltip} side="right" />
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      {prog.pct > 0 && (
        <motion.div variants={item} className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-100">Your Progress</h3>
            <button onClick={reset} className="text-xs text-slate-400 hover:text-red-400 transition-colors">Reset</button>
          </div>
          <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div className="h-full bg-mblue-600 rounded-full" initial={{ width: 0 }} animate={{ width: `${prog.pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>{prog.visited}/{prog.total} chapters read</span>
            <span className="font-bold text-mblue-600">{prog.pct}% complete</span>
            <span>{prog.quizzes}/{prog.total} quizzes passed</span>
          </div>
        </motion.div>
      )}

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

      {/* Chapter grid */}
      <motion.div variants={item}>
        <h2 className="text-xl font-bold text-mblue-600 mb-4">Chapters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHAPTERS.filter(c => c.id !== 'home' && c.id !== 'flashcards').map((ch) => (
            <Link key={ch.id} to={ch.path} className="card flex items-center gap-4 hover:border-mblue-200 hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-mblue-50 flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} className="text-mblue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-100 group-hover:text-mblue-600 transition-colors">{ch.label}</div>
              </div>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-mblue-400 transition-colors" />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Training */}
      <motion.div variants={item}>
        <TrainingPanel course="pid" />
      </motion.div>

      {/* Footer */}
      <motion.div variants={item} className="text-center py-4">
        <p className="text-slate-400 text-sm italic">
          "P makes it go. I makes it stay. D makes it not panic. Mastering all three makes you the engineer people call."
        </p>
      </motion.div>
    </motion.div>
  )
}
