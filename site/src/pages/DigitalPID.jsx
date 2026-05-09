import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'
import { ANALOGIES } from '../data/chapters'

export default function DigitalPID() {
  const analogy = ANALOGIES.digital

  return (
    <ChapterLayout
      chapterId="digital"
      title="Digital PID Implementation"
      emoji="💻"
      prev="cascade"
      next="plc"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Every PID controller in a PLC or DCS is a digital implementation of a continuous-time algorithm. The math was originally derived in continuous time (differential equations, Laplace transforms). Digital controllers approximate this with discrete samples taken at a fixed scan rate. This approximation works well — when you understand the tradeoffs.
      </p>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 my-6">
        <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Quote</div>
        <p className="text-slate-700 italic text-sm">"{analogy.text}"</p>
        <p className="text-xs text-slate-400 mt-2">— {analogy.author}</p>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">The Sampling Period (T)</h2>

      <p>
        A digital PID controller executes its algorithm once per scan cycle — every T seconds. Between samples, the controller is blind. It sent out a CO at t=0 and won't check the result until t=T. During that interval, the process is running open-loop.
      </p>

      <p>
        Rules of thumb for sampling period:
      </p>
      <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4 my-3">
        <li>T should be 10–20x smaller than the dominant process time constant τ</li>
        <li>T should be at least 4–5x smaller than the dead time θ</li>
        <li>For flow loops: T = 0.1–0.5 seconds</li>
        <li>For temperature loops: T = 1–10 seconds</li>
        <li>For level loops: T = 1–5 seconds</li>
      </ul>

      <Callout type="warning" title="Sampling Too Slow Degrades Performance">
        If T is too large relative to the process dynamics, the digital PID approximation breaks down. The controller misses rapid changes in the PV, the integral approximation accumulates error, and the derivative term becomes meaningless. A rule: if T &gt; θ/2, you are likely introducing sampling-induced instability. In practice, most PLCs run fast enough that this is only an issue for very fast loops (gas flow, some pressure loops) or when someone has configured the PID in a slow task.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Position vs Velocity Algorithm</h2>

      <p>
        Digital PID can be implemented in two fundamentally different ways:
      </p>

      <div className="space-y-4 my-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="font-bold text-navy-700 mb-2">Position Algorithm (Absolute Form)</div>
          <div className="bg-white rounded-lg p-3 font-mono text-xs text-mblue-600 mb-2">
            u[k] = Kp·e[k] + Ki·T·∑e[j] + Kd·(e[k] - e[k-1])/T
          </div>
          <p className="text-sm text-slate-600">
            Outputs the absolute value of the CO. The integral is the sum of all past errors. This means: if power cycles mid-operation or the controller reinitializes, you lose the accumulated integral and the CO jumps to an incorrect value. Requires anti-windup because the integral sum can grow without bound.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="font-bold text-navy-700 mb-2">Velocity (Incremental) Algorithm</div>
          <div className="bg-white rounded-lg p-3 font-mono text-xs text-mgreen-500 mb-2">
            Δu[k] = Kp·(e[k] - e[k-1]) + Ki·T·e[k] + Kd·(e[k] - 2·e[k-1] + e[k-2])/T
          </div>
          <p className="text-sm text-slate-600">
            Outputs the <em>change</em> in CO each cycle. The actuator integrates these increments to its actual position. Natural anti-windup: when output saturates, increments stop having effect but don't accumulate. Bumpless transfer is easier — just initialize Δu = 0. Preferred for many industrial applications.
          </p>
        </div>
      </div>

      <GifCard gifKey="nerd" caption="Position vs velocity — choosing your implementation defines your integration behavior." side="right" />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Anti-Windup</h2>

      <p>
        Anti-windup prevents the integral term from accumulating beyond the limits of the controller output. Two common methods:
      </p>

      <div className="space-y-3 my-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="font-bold text-navy-700 mb-1">Clamping (Conditional Integration)</div>
          <p className="text-sm text-slate-600">Stop accumulating the integral when the output is saturated AND the error is in the direction that would further saturate it. Simple to implement. Effective.</p>
          <div className="font-mono text-xs text-morange-500 mt-2">if (u[k] &gt; u_max) and (e[k] &gt; 0): skip integral accumulation</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="font-bold text-navy-700 mb-1">Back-Calculation (Tracking)</div>
          <p className="text-sm text-slate-600">When the output saturates, the integral is backed off by a feedback term proportional to the difference between the desired and actual (saturated) output. Provides smooth, controlled reduction of windup. More complex, but produces better transient behavior when exiting saturation.</p>
          <div className="font-mono text-xs text-mblue-600 mt-2">integral += Ki·e[k]·T + (u_actual - u_desired)·(T/Tt)</div>
        </div>
      </div>

      <Callout type="field" title="Field Gotcha: Windup on Process Start-Up">
        The most dangerous windup scenario is process startup. The setpoint is 300°F but the process starts at 70°F. Large error × long time = massive integral accumulation. When the temperature finally reaches 300°F, the integral is so loaded that the controller drives the temperature to 340°F or higher before backing off. For startup, many engineers put the loop in manual initially and ramp to setpoint manually, then switch to auto. Or they configure a SP ramp rate. Windup on startup has triggered safety shutdowns on critical equipment.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Derivative Filtering</h2>

      <p>
        Raw derivative action amplifies any noise in the PV signal. A measurement that fluctuates ±0.1% at 10 Hz will produce large derivative spikes that drive the control valve crazy. In practice, derivative is almost always filtered:
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4 font-mono text-xs">
        <div className="text-amber-700 font-bold mb-2">First-Order Filtered Derivative</div>
        <div className="text-amber-600">D_filtered[k] = α·D_filtered[k-1] + (1-α)·Kd·(PV[k] - PV[k-1])/T</div>
        <div className="text-xs text-slate-500 mt-1 font-sans">α ≈ 0.5 to 0.9 — filter coefficient (higher = more filtering, more lag)</div>
      </div>

      <p>
        Typical derivative filter: N = Td/Tf where N is typically 5–20. Larger N = less filtering. For noisy processes, N = 5 or even lower. For clean processes (after filtering at the transmitter level), N = 10–20 is reasonable.
      </p>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Output Rate Limiting</h2>

      <p>
        Some applications require limiting how fast the controller output can change — protecting slow actuators, preventing process upsets, or protecting equipment. Output rate limiting clamps the maximum CO change per scan cycle.
      </p>

      <Callout type="pro" title="Rate Limiting vs Derivative">
        Output rate limiting is NOT the same as derivative action. Rate limiting prevents the CO from changing faster than a physical rate limit — it's about protecting the actuator or process. Derivative changes the computed output based on PV rate of change — it's about predictive control. You can have both, neither, or either independently. Confusing them is a common mistake.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Tustin (Bilinear) Discretization</h2>

      <p>
        When converting a continuous-time PID design to discrete time, the discretization method matters. The simplest method (Euler forward) can cause instability. The preferred method for control applications is the <strong>Tustin (bilinear) transform</strong>, which substitutes:
      </p>

      <div className="bg-navy-700 rounded-xl p-4 my-4 font-mono text-sm text-green-400">
        s → 2/T · (z-1)/(z+1)
      </div>

      <p>
        Tustin maps the entire left-half s-plane (stable) into the inside of the unit circle in the z-plane (stable). It preserves stability, unlike Euler forward which can map stable continuous poles to unstable discrete ones at large T. Most PLC PID function blocks use Tustin internally — but this matters if you're implementing your own custom algorithm.
      </p>

      <FunFact index={10} />

      {QUIZZES.digital && QUIZZES.digital.length > 0 && (
        <Quiz chapterId="digital" questions={QUIZZES.digital} level={1} />
      )}
    </ChapterLayout>
  )
}
