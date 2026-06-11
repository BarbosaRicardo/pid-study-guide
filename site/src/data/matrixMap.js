// Maps chapters to the company skills-matrix (survey) competencies they cover.
// NOTE: PID theory is not a direct line item on either company matrix — this
// guide is supporting theory for the SCADA Operations track. Chapters that
// directly support a survey competency are mapped below; the rest intentionally
// carry no badge (an honest signal of what the survey does and doesn't cover).

export const TRACKS = {
  scada: { label: 'SCADA OPS', color: '#fb923c' },
  rtac: { label: 'RTAC AUTO', color: '#818cf8' },
}

export const MATRIX_MAP = {
  plc: [
    { track: 'scada', week: 3, category: 'Creating & Editing Tags',
      skills: ['Configure scaling, alarms, history & security on tags (supports: loop tags in Ignition)'] },
  ],
  troubleshoot: [
    { track: 'scada', week: 5, category: 'Security, History & Advanced',
      skills: ['Troubleshoot missing or inaccurate history (supports: diagnosing loop data)'] },
  ],
}

export const isOnMatrix = (chapterId) => Boolean(MATRIX_MAP[chapterId]?.length)
