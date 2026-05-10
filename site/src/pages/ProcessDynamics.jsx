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

export default function ProcessDynamics() {
  const analogy = ANALOGIES.process

  return (
    <ChapterLayout
      chapterId="process"
      title="Process Dynamics"
      emoji="📈"
      prev="tuning"
      next="cascade"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Before you can control a process, you need to understand how it behaves when you poke it. Process dynamics describes how the process variable responds to changes in the manipulated variable. Two processes can require identical PID configurations in the PLC and yet respond completely differently — because their underlying dynamics are different.
      </p>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">The FOPDT Model</h2>

      <p>
        Most process loops in industrial plants can be approximated by the First-Order Plus Dead Time (FOPDT) model. It's not perfect, but it's accurate enough to calculate tuning constants, predict loop behavior, and explain why some loops are harder to control than others.
      </p>

      <div className="bg-navy-700 rounded-2xl p-5 my-6 font-mono text-sm">
        <div className="text-mcyan-400 text-xs uppercase tracking-widest mb-3">FOPDT Transfer Function</div>
        <div className="text-green-400 text-base">G(s) = K · e<sup>−θs</sup> / (τs + 1)</div>
        <div className="mt-3 space-y-1 text-xs text-slate-400">
          <div><span className="text-mcyan-400">K</span> — Process gain: how much PV changes per unit of CO change (at steady state)</div>
          <div><span className="text-amber-400">τ</span> — Time constant: time for PV to reach 63.2% of its final value (after dead time)</div>
          <div><span className="text-orange-400">θ</span> — Dead time: delay before PV starts moving after CO changes</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Process Gain (K)</h2>

      <p>
        Process gain describes the sensitivity of the PV to changes in the CO. A high-gain process responds aggressively to small CO changes — easy to overshoot. A low-gain process requires large CO moves to produce small PV changes — sluggish.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4 font-mono text-sm">
        <span className="text-mblue-600 font-bold">K = ΔPV / ΔCO</span>
        <div className="text-xs text-slate-500 mt-1">Both in percentage of instrument span for dimensionless gain</div>
      </div>

      <p>
        Example: if you step the CO from 40% to 50% (ΔCO = 10%) and the PV moves from 60% to 68% (ΔPV = 8%), then K = 8/10 = 0.8. This is a normal, well-behaved process gain. K &gt; 2 is high gain; K &lt; 0.3 is low gain.
      </p>

      <GifCard gifKey="hot" caption="High process gain: even a small change creates a large effect." side="right" />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Time Constant (τ)</h2>

      <p>
        The time constant τ describes how quickly the process responds. After the initial dead time, a first-order process will reach 63.2% of its total change in one time constant, 86.5% in two time constants, and 95% in three.
      </p>

      <p>
        A large τ means a slow process — temperature loops on large vessels often have τ of several minutes or even hours. A small τ means a fast process — flow loops typically have τ of seconds. The time constant is determined by the physical capacitance of the process (thermal mass, liquid volume, etc.) and the resistance to change.
      </p>

      <Callout type="key" title="Why τ/θ Ratio Matters">
        The ratio of time constant to dead time (τ/θ) is one of the most important indicators of how controllable a loop is. High τ/θ (e.g., 10:1) = easy to control. The loop has time to respond and correct before the dead time causes problems. Low τ/θ (e.g., 1:1 or worse) = difficult to control. Dead time dominates, and the loop is constantly chasing a target it can't see yet. Loops with θ/τ &gt; 0.5 require conservative tuning or advanced control strategies.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Dead Time (θ) — The Enemy of Control</h2>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 my-6">
        <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Quote</div>
        <p className="text-slate-700 italic text-sm">"{analogy.text}"</p>
        <p className="text-xs text-slate-400 mt-2">— {analogy.author}</p>
      </div>

      <p>
        Dead time is the pure delay between when you change the CO and when the PV starts to respond at all. During dead time, the controller is flying blind — it's making changes to the process but has no feedback on whether those changes are working.
      </p>

      <p>
        Sources of dead time in industrial processes:
      </p>
      <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4 my-3">
        <li><strong>Transport delay:</strong> Product flowing through a long pipe before reaching a sensor</li>
        <li><strong>Mixing lag:</strong> Time for a reagent to mix uniformly in a vessel</li>
        <li><strong>Sampling delay:</strong> Analyzer samples taken once per minute — 60-second dead time</li>
        <li><strong>Cascade delays:</strong> One loop controlling another, each adding lag</li>
        <li><strong>Instrument lag:</strong> Slow-responding sensors (e.g., thermowell mass)</li>
      </ul>

      <Callout type="field" title="Dead Time Can't Be Controlled Away">
        No amount of tuning overcomes dead time. During the dead time period, the controller cannot detect the effect of its last move. The only way to reduce dead time is to physically change the process — move the sensor closer to where the manipulated variable acts, use a faster analyzer, reduce pipeline length. This is a process design problem, not a tuning problem.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Self-Regulating vs Integrating Processes</h2>

      <p>
        This distinction fundamentally changes how you tune a loop.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="font-bold text-mgreen-500 mb-2">Self-Regulating</div>
          <p className="text-sm text-slate-600">If you fix the CO at a constant value, the PV will eventually find a new steady state and stop moving. The process naturally "self-regulates." Temperature, pressure, and flow loops are typically self-regulating. Example: set a heating valve at 50% open and the temperature will eventually stabilize at some value — not drifting forever.</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="font-bold text-amber-600 mb-2">Integrating (Non-Self-Regulating)</div>
          <p className="text-sm text-slate-600">If you fix the CO at a constant value, the PV will ramp up or down indefinitely unless the CO exactly matches the load. Tank level is the classic example. If the inlet valve is 40% open and the outlet load requires 50% to hold level constant, the level will fall — forever — until you change the valve position or the tank empties.</p>
        </div>
      </div>

      <Callout type="warning" title="Tuning Integrating Processes Differently">
        For an integrating process (level, position), integral action in the PID controller creates a double-integrator. Two integrators stacked means the loop will be naturally oscillatory and hard to stabilize with a standard PI controller. Many level loops use P-only control — the process itself acts as the integrator, so the controller only needs P action. Adding I to a level loop is a common source of persistent oscillation that baffles new engineers.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Second-Order Processes and Underdamped Systems</h2>

      <p>
        Some processes have second-order dynamics — they exhibit overshoot and oscillation in their natural step response, even before the controller does anything. A flexible mechanical system, a pressure vessel with a resonant mode, a level in a sealed vessel — these can have underdamped natural dynamics.
      </p>

      <p>
        The key parameter is the damping ratio ζ (zeta):
      </p>
      <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4 my-3">
        <li><strong>ζ &gt; 1 (overdamped):</strong> Slow, no overshoot. Returns to steady state sluggishly.</li>
        <li><strong>ζ = 1 (critically damped):</strong> Fastest possible response without overshoot.</li>
        <li><strong>0 &lt; ζ &lt; 1 (underdamped):</strong> Oscillates before settling. Common in fast electro-hydraulic systems.</li>
        <li><strong>ζ = 0 (undamped):</strong> Oscillates forever. Something has gone wrong.</li>
      </ul>

      <FunFact index={5} />

      <Callout type="pro" title="Always Identify Process Type Before Tuning">
        Run an open-loop step test before touching any tuning constants. Watch the PV response. Does it settle to a new steady state (self-regulating) or does it keep ramping (integrating)? Does it overshoot even in open loop (underdamped second-order)? The shape of the open-loop step response tells you everything about the tuning approach. An engineer who tunes without doing a step test first is guessing — and will still be guessing on the third loop re-tune.
      </Callout>

      {QUIZZES.process && QUIZZES.process.length > 0 && (
        <Quiz chapterId="process" questions={QUIZZES.process} level={1} />
      )}
      <ChapterExercise exercise={PID_CHAPTER_EXERCISES.process} />
    </ChapterLayout>
  )
}
