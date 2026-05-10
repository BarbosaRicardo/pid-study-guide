import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import ChapterExercise from '../components/ChapterExercise'
import { QUIZZES } from '../data/quizzes'
import { ANALOGIES } from '../data/chapters'
import { PID_CHAPTER_EXERCISES } from '../data/chapterExercises'

export default function Troubleshoot() {
  const analogy = ANALOGIES.troubleshoot

  return (
    <ChapterLayout
      chapterId="troubleshoot"
      title="Troubleshooting Control Loops"
      emoji="🔍"
      prev="plc"
      next="lab"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        A misbehaving control loop will eventually reveal itself in one of a handful of ways. Once you know the patterns, you can identify the root cause from a trend screen in under five minutes. The hard part isn't the diagnosis — it's resisting the urge to change tuning constants when the problem has nothing to do with tuning.
      </p>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 my-6">
        <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Quote</div>
        <p className="text-slate-700 italic text-sm">"{analogy.text}"</p>
        <p className="text-xs text-slate-400 mt-2">— {analogy.author}</p>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">The Diagnostic Checklist (Before Touching Tuning)</h2>

      <Callout type="key" title="80% of Loop Problems Are NOT Tuning Problems">
        Before you change a single tuning constant, verify: (1) Is the PV transmitter calibrated and responding correctly? (2) Is the control valve stroking freely and linearly? (3) Is the loop in auto mode? (4) Are there mechanical issues (stiction, backlash) in the actuator? (5) Has the process changed (fouling, composition change, load change)? Adjusting Kp to compensate for a stuck valve is treating the symptom. The valve will stick again. Find the root cause.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Symptom: Oscillation</h2>

      <p>
        The PV continuously cycles above and below the setpoint with a regular, repeating period. The CO is also oscillating in sync.
      </p>

      <GifCard gifKey="warning" caption="Oscillation: regular, repeating, and entirely too energetic." side="right" />

      <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-4">
        <div className="font-bold text-red-700 mb-2">Possible Causes — in order of likelihood</div>
        <ol className="list-decimal list-inside space-y-2 text-sm text-red-800">
          <li><strong>Gain (Kp) too high</strong> — reduce Kp by 30–50%, see if oscillation amplitude decreases</li>
          <li><strong>Integral (Ti) too fast / Ki too high</strong> — increase Ti (more integral time = less integral action)</li>
          <li><strong>Derivative too high</strong> — on a noisy signal, D amplifies noise into oscillating output</li>
          <li><strong>Process dynamics changed</strong> — process gain increased (e.g., valve near closed, nonlinear region)</li>
          <li><strong>Valve stiction causing limit cycling</strong> — different symptom pattern (see below)</li>
        </ol>
      </div>

      <p>
        A fast way to diagnose: put the loop in manual and observe the PV. If the PV oscillation stops immediately, the oscillation is controller-induced (too aggressive tuning). If the PV keeps oscillating in manual, the oscillation is coming from the process or an upstream loop.
      </p>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Symptom: Offset (Steady-State Error)</h2>

      <p>
        The loop has settled, the PV is stable, but it's sitting at a value consistently below (or above) the setpoint. The error never reaches zero.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
        <div className="font-bold text-amber-700 mb-2">Possible Causes</div>
        <ul className="list-disc list-inside space-y-1 text-sm text-amber-800">
          <li><strong>Integral action disabled</strong> — P-only controller always has offset</li>
          <li><strong>Integral time too slow</strong> — integral barely accumulating, offset persists</li>
          <li><strong>Output at a limit</strong> — valve fully open and still can't reach SP (under-capacity)</li>
          <li><strong>Wrong controller action</strong> — direct vs reverse misconfigured</li>
          <li><strong>SP/PV scaling mismatch</strong> — engineering units not aligned</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Symptom: Sluggish Response</h2>

      <p>
        After a SP change or a disturbance, the PV slowly creeps toward the setpoint. It takes 10× longer than it should to recover.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4">
        <div className="font-bold text-blue-700 mb-2">Possible Causes</div>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
          <li><strong>Kp too low</strong> — small error produces tiny CO changes</li>
          <li><strong>Integral time too long</strong> — integral barely contributing</li>
          <li><strong>Output rate limiting</strong> — configured too conservatively</li>
          <li><strong>Valve seat binding or mechanical restriction</strong> — CO changes but MV doesn't follow</li>
          <li><strong>Process has changed</strong> — process gain decreased (fouling, composition change)</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Symptom: Limit Cycling (Valve Stiction)</h2>

      <p>
        The PV oscillates with a sawtooth or asymmetric wave pattern. The CO moves steadily in one direction, then jumps suddenly. This is the classic signature of valve stiction (static friction).
      </p>

      <p>
        What happens: the integral is slowly winding up the CO trying to eliminate a small error. The valve is stuck (stiction). Eventually the CO builds enough force that the valve breaks free and jumps past the setpoint. Now the PV overshoots, error reverses, integral starts winding in the opposite direction, stiction holds the valve again...
      </p>

      <Callout type="field" title="Stiction Is a Mechanical Problem, Not a Tuning Problem">
        You cannot tune out valve stiction. Reducing integral action makes the cycle slower, but it doesn't fix the valve. The fix is mechanical: service the valve, replace packing, upgrade the positioner. In the meantime, a workaround is reducing Kp and Ti to minimize the CO force driving the valve — but this degrades control performance. Document the issue and get the valve fixed.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Symptom: Integral Windup After Startup</h2>

      <p>
        After the loop is switched from manual to auto at startup, the PV massively overshoots the setpoint. The overshoot is large (sometimes 50–100% above SP) and takes a long time to recover.
      </p>

      <p>
        Cause: During startup in manual mode, the PV was far below SP for a long time. The integral (if it was running, which some implementations do even in manual) accumulated a large error sum. When switched to auto, the controller output rockets to maximum until the integral unwinds.
      </p>

      <p>
        Fix: (1) Ensure anti-windup is enabled and configured correctly. (2) Use bumpless transfer — initialize the integral accumulator to zero on mode switch. (3) Configure a startup SP ramp that begins at the actual PV value, not the target SP.
      </p>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Reading a Trend to Diagnose a Loop</h2>

      <p>
        When called to troubleshoot a misbehaving loop, the first thing to pull up is a trend showing SP, PV, and CO over the last 24 hours (or longer). Look for:
      </p>

      <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 my-3">
        <li><strong>Correlated oscillations in PV and CO</strong> — tuning or upstream disturbance</li>
        <li><strong>CO moving, PV not following</strong> — mechanical problem (valve, actuator)</li>
        <li><strong>PV moving, CO not responding</strong> — loop in manual or controller failure</li>
        <li><strong>SP changes without corresponding PV response</strong> — integral windup or output limit</li>
        <li><strong>Steady offset with CO below limit</strong> — integral disabled or too slow</li>
        <li><strong>CO sawtooth, PV irregular wave</strong> — valve stiction</li>
      </ul>

      <GifCard gifKey="coffee" caption="Reading trends: the most underrated skill in process control." side="right" />

      <Callout type="pro" title="The Bump Test for Mechanical Verification">
        When you suspect a valve or actuator problem, put the loop in manual and bump the CO by 5% up and then 5% down. Watch the PV. If the PV responds cleanly and proportionally, the valve is probably fine. If the CO changes but PV barely moves (or moves with a delay larger than expected dead time), the valve is binding or the actuator is failing. If CO changes but PV instantly slams to a limit, the valve is failing open or closed. This two-minute test will save you hours of hunting for tuning solutions to mechanical problems.
      </Callout>

      <FunFact index={6} />

      {QUIZZES.troubleshoot && QUIZZES.troubleshoot.length > 0 && (
        <Quiz chapterId="troubleshoot" questions={QUIZZES.troubleshoot} level={1} />
      )}
      <ChapterExercise exercise={PID_CHAPTER_EXERCISES.troubleshoot} />
    </ChapterLayout>
  )
}
