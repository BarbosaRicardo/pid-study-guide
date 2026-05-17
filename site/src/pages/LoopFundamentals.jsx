import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import GifCard from '../components/GifCard'
import QuizLevels from '../components/QuizLevels'
import ChapterExercise from '../components/ChapterExercise'
import { QUIZZES } from '../data/quizzes'
import { ANALOGIES } from '../data/chapters'
import { PID_CHAPTER_EXERCISES } from '../data/chapterExercises'

export default function LoopFundamentals() {
  const analogy = ANALOGIES.loop

  return (
    <ChapterLayout
      chapterId="loop"
      title="Control Loop Fundamentals"
      emoji="⚙️"
      prev="intro"
      next="pid"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Before you tune a single loop, you need to speak the language. SP, PV, CO, MV, error, disturbance — these aren't just acronyms. Each one represents a specific physical quantity in the control loop, and confusing them in a conversation with a controls engineer will get you corrected in front of your peers.
      </p>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">The Core Variables</h2>

      <div className="space-y-4 my-6">
        <div className="rounded-xl p-4" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-mblue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">SP</span>
            </div>
            <div>
              <div className="font-bold text-slate-100">Setpoint (SP)</div>
              <p className="text-sm text-slate-600 mt-1">The target value you want the process variable to reach and maintain. Set by the operator, recipe, or an outer control loop. Examples: 150°F, 45 PSI, 60% level. The SP is what you want. Everything else is about getting there.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-mgreen-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">PV</span>
            </div>
            <div>
              <div className="font-bold text-slate-100">Process Variable (PV)</div>
              <p className="text-sm text-slate-600 mt-1">The measured value of what the process is actually doing right now. Comes from a transmitter — temperature, pressure, flow, level sensor. This is reality. The controller is continuously comparing PV to SP and computing how wrong things are.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-mred-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">e</span>
            </div>
            <div>
              <div className="font-bold text-slate-100">Error (e = SP − PV)</div>
              <p className="text-sm text-slate-600 mt-1">The difference between setpoint and process variable. Positive error means PV is below SP (need to increase output). Negative error means PV is above SP (need to decrease output). The entire PID algorithm exists to drive error to zero.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-amber-500/100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">CO</span>
            </div>
            <div>
              <div className="font-bold text-slate-100">Controller Output (CO)</div>
              <p className="text-sm text-slate-600 mt-1">The signal the PID algorithm sends to the final control element. Typically 0–100% or 4–20 mA. This is the computed answer to: "Given this error, what should I tell the valve to do?" The CO drives the MV.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-purple-500/100/100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">MV</span>
            </div>
            <div>
              <div className="font-bold text-slate-100">Manipulated Variable (MV)</div>
              <p className="text-sm text-slate-600 mt-1">The physical quantity being adjusted to control the PV. Often the same as CO in practice, but technically the MV is the actual physical position/flow/power — what the valve, VFD, or heater is actually doing in response to the CO signal.</p>
            </div>
          </div>
        </div>
      </div>

      <GifCard gifKey="robot" caption="The controller, working tirelessly to eliminate error." side="right"
        body="A closed-loop controller runs continuously: sample PV, compute error, compute controller output, send output to actuator, repeat. On a PLC, this happens every scan cycle — typically 10 to 100 milliseconds. The controller never stops; even when process conditions are stable, it's continuously re-computing and re-issuing the output. The 'I' term keeps accumulating until the error is truly zero."
      />

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Disturbances: The Reason Feedback Exists</h2>

      <p>
        A <strong>disturbance</strong> is any external influence on the process that changes the PV without the controller doing anything. Disturbances are why open-loop control fails and why closed-loop control was invented.
      </p>

      <p>
        Examples of disturbances:
      </p>
      <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4 my-3">
        <li>Ambient temperature changes affecting a heat exchanger</li>
        <li>Feed composition changes in a reactor</li>
        <li>Upstream pressure changes affecting downstream flow</li>
        <li>Fouling on a heat transfer surface changing the process gain</li>
        <li>Other loops making changes that affect this one</li>
        <li>A pump changing speed due to cavitation</li>
      </ul>

      <p>
        When a disturbance hits a closed-loop system, the PV moves away from SP, error increases, the controller responds with a corrective CO, and the loop drives error back toward zero. This is the entire purpose of feedback. No disturbance model required — just measure, compute, correct, repeat.
      </p>

      <Callout type="key" title="The Feedback Loop Sequence">
        Measure PV → Compute error (SP − PV) → Calculate CO → Apply CO to final control element → Process responds → New PV measured → Repeat. This cycle runs continuously — in PLCs, typically every scan cycle (10–100 ms). Each iteration, the controller is asking: "How wrong am I right now?" and adjusting accordingly.
      </Callout>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">The Block Diagram in Words</h2>

      <p>
        A feedback control loop block diagram looks complex on paper but represents a simple idea. Starting from the left:
      </p>

      <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4 my-3">
        <li><strong>SP enters the comparator</strong> (the summing junction, often drawn as a circle with a + and −)</li>
        <li><strong>PV feeds back into the comparator</strong> with a negative sign (this is why it's called negative feedback)</li>
        <li><strong>The comparator outputs error</strong> = SP − PV</li>
        <li><strong>Error enters the controller</strong> (the PID algorithm)</li>
        <li><strong>The controller outputs CO</strong> to the final control element</li>
        <li><strong>The final control element</strong> (valve, VFD, heater) physically changes the process</li>
        <li><strong>The process responds</strong>, producing a new PV</li>
        <li><strong>The transmitter measures PV</strong> and feeds it back to the comparator</li>
        <li>Loop repeats</li>
      </ol>

      <div className="bg-navy-700 text-green-400 font-mono text-sm rounded-xl p-4 my-4 overflow-x-auto">
        <pre className="whitespace-pre">{`         ┌─────────────────────────────────────────────┐
         │                                             │
SP ──►[Σ]──► PID Controller ──► Valve ──► Process ──►┤── PV (output)
       ▲  e                                           │
       │                                             │
       └────────────────── Transmitter ──────────────┘
                           (measures PV)`}</pre>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Direct vs Reverse Acting</h2>

      <p>
        Controller <strong>action</strong> (direct vs reverse) is one of the most commonly misconfigured settings on a PID controller, and getting it wrong will make the loop do the exact opposite of what you want.
      </p>

      <p>
        <strong>Reverse acting (most common):</strong> When PV increases above SP (positive error flips negative from the controller's perspective), the CO decreases. Example: a temperature controller on a heater. When temp rises above setpoint, the controller reduces heat output.
      </p>

      <p>
        <strong>Direct acting:</strong> When PV increases, CO increases. Example: a cooling water valve on a heat exchanger. When temperature rises, the cooling water valve opens more.
      </p>

      <Callout type="field" title="Field Gotcha: Wrong Action = Positive Feedback">
        If the controller action is set backwards, the loop will have <em>positive</em> feedback instead of negative. PV rises → error increases → CO increases → PV rises faster → error increases more → CO increases more... The loop will slam to one limit or the other in seconds. This is called "running away" and it looks exactly like severely aggressive tuning. Check the action setting before touching the tuning constants.
      </Callout>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Steady State, Transient Response, and Offset</h2>

      <p>
        <strong>Steady state</strong> is when the PV has stabilized at a constant value and the error is no longer changing. A properly tuned loop with integral action reaches steady state at exactly SP (zero offset). A P-only loop reaches steady state with a non-zero offset — the error required to produce enough CO to hold the process in balance.
      </p>

      <p>
        <strong>Transient response</strong> is the behavior of the PV between when a disturbance or SP change occurs and when steady state is reached. Good transient response is typically: fast rise time, minimal overshoot, and quick settling. Bad transient response is: slow, oscillatory, or underdamped — meaning the PV crosses the setpoint repeatedly before settling.
      </p>

      <p>
        <strong>Offset (steady-state error)</strong> is the residual error remaining after the loop has settled. P-only controllers always have offset. Adding integral action eliminates it — because integral keeps increasing the CO as long as any error exists, until eventually the output is exactly right to hold PV = SP.
      </p>

      <FunFact index={1} />

      <div className="rounded-2xl p-5 my-6" style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)' }}>
        <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Quote</div>
        <p className="text-slate-300 italic text-sm">"{analogy.text}"</p>
        <p className="text-xs text-slate-400 mt-2">— {analogy.author}</p>
      </div>

      <Callout type="pro" title="Pro Tip: Name Your Variables Correctly">
        In a conversation with another engineer, never say "the loop output" when you mean "the controller output" or "the valve position." Always use SP, PV, CO, and MV explicitly. Ambiguity in naming causes real errors — an operator who says "the output is at 85%" could mean the CO is 85% or the valve is 85% open, and those are different things if the valve is not linear.
      </Callout>

      {QUIZZES.loop && QUIZZES.loop.length > 0 && (
        <QuizLevels chapterId="loop" />
      )}
      <ChapterExercise exercise={PID_CHAPTER_EXERCISES.loop} />
    </ChapterLayout>
  )
}
