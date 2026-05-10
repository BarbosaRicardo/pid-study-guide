import React, { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, ChevronDown, ChevronUp, Lock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

// Safe sandbox runner — captures console.log, returns test results
function runSandbox(userCode, testRunner) {
  const logs = []
  const fakeConsole = {
    log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
    error: (...args) => logs.push('ERROR: ' + args.join(' ')),
    warn: (...args) => logs.push('WARN: ' + args.join(' ')),
  }
  try {
    // eslint-disable-next-line no-new-func
    const wrapped = new Function('console', `
      "use strict";
      ${userCode}
      return (${testRunner.toString()})(typeof solution !== "undefined" ? solution : undefined);
    `)
    const result = wrapped(fakeConsole)
    return { success: true, logs, result }
  } catch (e) {
    return { success: false, logs, error: e.message, result: null }
  }
}

const LEVEL_META = {
  1: { label: 'Level 1 — Foundations', color: '#22d3ee', bg: 'rgba(34,211,238,0.06)', border: 'rgba(34,211,238,0.25)', emoji: '🟢' },
  2: { label: 'Level 2 — Applied',     color: '#fbbf24', bg: 'rgba(251,191,36,0.06)',  border: 'rgba(251,191,36,0.25)',  emoji: '🟡' },
  3: { label: 'Level 3 — Expert',      color: '#f87171', bg: 'rgba(248,113,113,0.06)', border: 'rgba(248,113,113,0.25)', emoji: '🔴' },
}

function TestResult({ test, result }) {
  const passed = result?.passed
  const icon = passed
    ? <CheckCircle2 size={14} style={{ color: '#34d399' }} />
    : <XCircle size={14} style={{ color: '#f87171' }} />
  return (
    <div className="flex items-start gap-2 py-1.5 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <span className="flex-shrink-0 mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-mono text-slate-300">{test.description}</div>
        {!passed && result?.expected !== undefined && (
          <div className="text-xs font-mono mt-0.5" style={{ color: '#f87171' }}>
            Expected: {JSON.stringify(result.expected)} · Got: {JSON.stringify(result.actual)}
          </div>
        )}
        {!passed && result?.error && (
          <div className="text-xs font-mono mt-0.5" style={{ color: '#f87171' }}>{result.error}</div>
        )}
      </div>
    </div>
  )
}

function ExerciseCard({ ex, locked }) {
  const [code, setCode] = useState(ex.starter)
  const [output, setOutput] = useState(null)
  const [open, setOpen] = useState(false)
  const meta = LEVEL_META[ex.level]

  const run = () => {
    const { success, logs, result, error } = runSandbox(code, ex.testRunner)
    if (!success) {
      setOutput({ type: 'error', error, logs })
      return
    }
    const passed = result?.every(r => r.passed)
    setOutput({ type: 'result', results: result, logs, passed })
  }

  const reset = () => {
    setCode(ex.starter)
    setOutput(null)
  }

  const allPassed = output?.passed

  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ border: `1px solid ${open ? meta.border : 'rgba(255,255,255,0.07)'}`, background: 'rgba(255,255,255,0.02)' }}>

      {/* Header */}
      <button
        onClick={() => !locked && setOpen(o => !o)}
        className="w-full text-left px-4 py-3 flex items-center gap-3 transition-all"
        style={{ cursor: locked ? 'not-allowed' : 'pointer', opacity: locked ? 0.45 : 1,
          background: open ? `linear-gradient(135deg, rgba(6,14,26,0.95), rgba(15,30,55,0.95))` : 'transparent' }}
      >
        <span className="text-lg leading-none flex-shrink-0">{locked ? '🔒' : allPassed ? '✅' : meta.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm" style={{ color: open ? 'white' : '#94a3b8' }}>{ex.title}</div>
          <div className="text-xs mt-0.5" style={{ color: open ? meta.color : '#475569' }}>{meta.label}</div>
        </div>
        {!locked && (open ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-slate-600 flex-shrink-0" />)}
        {locked && <Lock size={13} className="text-slate-600 flex-shrink-0" />}
      </button>

      {/* Body */}
      {!locked && open && (
        <div style={{ borderTop: `1px solid ${meta.border}` }}>
          {/* Scenario */}
          <div className="px-4 pt-4 pb-2">
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{ex.scenario}</div>
            {ex.hint && (
              <div className="mt-3 px-3 py-2 rounded-lg text-xs text-slate-400 leading-relaxed"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                💡 {ex.hint}
              </div>
            )}
          </div>

          {/* Editor */}
          <div className="mx-4 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between px-3 py-1.5" style={{ background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs font-mono text-slate-500">JavaScript</span>
              <button onClick={reset} className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                <RotateCcw size={11} /> Reset
              </button>
            </div>
            <Editor
              height="280px"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={v => { setCode(v || ''); setOutput(null) }}
              options={{
                fontSize: 13,
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                wordWrap: 'on',
                tabSize: 2,
                automaticLayout: true,
                padding: { top: 10, bottom: 10 },
              }}
            />
          </div>

          {/* Run button */}
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={run}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: `linear-gradient(135deg, ${meta.color}cc, ${meta.color})`, boxShadow: `0 0 16px ${meta.color}30` }}
            >
              <Play size={14} /> Run Code
            </button>
            {allPassed && <span className="text-sm font-semibold" style={{ color: '#34d399' }}>✓ All tests passing</span>}
          </div>

          {/* Output */}
          {output && (
            <div className="mx-4 mb-4 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Console logs */}
              {output.logs?.length > 0 && (
                <div className="px-3 py-2 font-mono text-xs text-slate-400 leading-relaxed"
                  style={{ background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {output.logs.map((l, i) => <div key={i}><span style={{ color: '#475569' }}>&gt; </span>{l}</div>)}
                </div>
              )}

              {/* Error */}
              {output.type === 'error' && (
                <div className="px-3 py-2 flex items-start gap-2" style={{ background: 'rgba(239,68,68,0.08)' }}>
                  <AlertCircle size={14} style={{ color: '#f87171', marginTop: 2 }} className="flex-shrink-0" />
                  <span className="text-xs font-mono" style={{ color: '#f87171' }}>{output.error}</span>
                </div>
              )}

              {/* Test results */}
              {output.type === 'result' && output.results && (
                <div className="px-3 py-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Test Results</div>
                  {output.results.map((r, i) => (
                    <TestResult key={i} test={ex.tests[i]} result={r} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function CodeLab({ exercises }) {
  // Level 1 always open, level 2 unlocks after level 1 passed, level 3 unlocks after level 2 passed
  const [passedLevels, setPassedLevels] = useState({ 1: false, 2: false, 3: false })

  // Track completions to unlock next level
  const checkUnlock = (level, passed) => {
    if (passed) setPassedLevels(prev => ({ ...prev, [level]: true }))
  }

  const byLevel = [1, 2, 3].map(l => exercises.filter(e => e.level === l))

  return (
    <div className="my-8 space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Code Lab</span>
        <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>
      {byLevel.map((exs, li) => {
        const level = li + 1
        const locked = level > 1 && !passedLevels[level - 1]
        return exs.map((ex, i) => (
          <ExerciseCard
            key={ex.id}
            ex={ex}
            locked={locked}
          />
        ))
      })}
    </div>
  )
}
