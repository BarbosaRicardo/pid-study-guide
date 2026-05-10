import { useState } from 'react'

const REPORT_KEY = 'quiz_submissions_v1'

export function recordQuizSubmission({ chapter, level, score, total, attempt }) {
  try {
    const existing = JSON.parse(localStorage.getItem(REPORT_KEY) || '[]')
    existing.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      ts: Date.now(),
      chapter,
      level,
      score,
      total,
      pct: Math.round((score / total) * 100),
      passed: score / total >= 0.7,
      attempt,
    })
    localStorage.setItem(REPORT_KEY, JSON.stringify(existing))
  } catch {}
}

export function useQuizReport() {
  const [submissions, setSubmissions] = useState(() => {
    try { return JSON.parse(localStorage.getItem(REPORT_KEY) || '[]') } catch { return [] }
  })

  const refresh = () => {
    try { setSubmissions(JSON.parse(localStorage.getItem(REPORT_KEY) || '[]')) } catch {}
  }

  const clearAll = () => {
    localStorage.removeItem(REPORT_KEY)
    setSubmissions([])
  }

  return { submissions, refresh, clearAll }
}
