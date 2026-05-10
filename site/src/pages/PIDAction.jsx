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

export default function PIDAction() {
  const analogy = ANALOGIES.pid

  return (
    <ChapterLayout
      chapterId="pid"
      title="P, I, and D — What Each Does"
      emoji="📊"
      prev="loop"
      next="tuning"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        The PID algorithm has three terms, each doing a completely different job. Proportional responds to current error. Integral responds to accumulated past error. Derivative responds to the rate of change. Used together, they produce a controller output that is almost always better than any single term alone. Each one has a superpower — and a weakness that will destroy you if you're not paying attention.
      </p>

      <div className="bg-navy-700 rounded-2xl p-5 my-6 font-mono text-sm">
        <div className="text-mcyan-400 text-xs uppercase tracking-widest mb-3">The PID Equation</div>
        <div className="text-green-400 text-base">
          u(t) = K<sub className="text-mcyan-400">p</sub>·e(t) + K<sub className="text-amber-400">i</sub>·∫e(τ)dτ + K<sub className="text-orange-400">d</sub>·de/dt
        </div>
        <div className="mt-3 space-y-1 text-xs text-slate-400">
          <div><span className="text-mcyan-400">Kp·e(t)</span> — proportional term: error right now</div>
          <div><span className="text-amber-400">Ki·∫e(τ)dτ</span> — integral term: accumulated past error</div>
          <div><span className="text-orange-400">Kd·de/dt</span> — derivative term: rate of change of error</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">P — Proportional Action</h2>

      <p>
        Proportional action is the simplest: the controller output is proportional to the current error. Double the error, double the output. Zero error, zero proportional contribution.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4 font-mono text-sm">
        <span className="text-mblue-600 font-bold">P output = Kp × e(t)</span>
        <div className="text-xs text-slate-500 mt-1">Where Kp is proportional gain, e(t) is current error</div>
      </div>

      <p>
        Increasing Kp makes the controller more aggressive — larger response to the same error. This speeds up the response but also introduces oscillation if taken too far. Some engineers think of Kp as "how jumpy is the controller."
      </p>

      <p>
        <strong>Proportional band (PB)</strong> is the inverse of Kp, expressed as a percentage: PB = 100/Kp. A proportional band of 50% means the CO goes from 0 to 100% over a PV span of 50% of the instrument range. Smaller PB = higher gain = more aggressive.
      </p>

      <Callout type="warning" title="The P-Only Problem: Offset">
        A proportional-only controller will <em>always</em> have steady-state offset. Why? Because when the PV reaches SP, error = 0, and the P term = 0. But the process needs a non-zero CO to hold PV at SP (e.g., the valve needs to be 40% open to maintain the flow). Without integral, the only way to produce that 40% CO is to have a non-zero error — so the loop settles with a permanent offset. Adding integral action eliminates this.
      </Callout>

      <GifCard gifKey="math" caption="Proportional: direct, immediate, and brutally honest about error." side="right" />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">I — Integral Action</h2>

      <p>
        Integral action accumulates error over time. If the PV is sitting slightly below SP — even a tiny amount — the integral term keeps increasing the CO until the error is truly zero. It's the controller's "grudge" against any non-zero error.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4 font-mono text-sm">
        <span className="text-amber-600 font-bold">I output = Ki × ∫₀ᵗ e(τ) dτ</span>
        <div className="text-xs text-slate-500 mt-1">Integral of error over time — accumulates as long as error exists</div>
      </div>

      <p>
        Integral is sometimes described in terms of <strong>reset rate</strong> (repeats per minute) or <strong>integral time</strong> (Ti, in minutes). Reset rate = 1/Ti. Higher reset rate = more integral action = faster elimination of offset, but also a faster path to oscillation.
      </p>

      <Callout type="field" title="Field Gotcha: Integral Windup">
        When the controller output is saturated (stuck at 0% or 100%) and the error persists — because the valve is fully open but the PV still hasn't reached SP — the integral term keeps accumulating. It "winds up" to an enormous value. When the process finally responds and the error starts shrinking, the integrator is so loaded that it keeps driving the CO far past what's needed. The result: massive overshoot, long recovery time, and sometimes a process trip. Anti-windup mechanisms (clamping or back-calculation) prevent this.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">D — Derivative Action</h2>

      <p>
        Derivative action responds to the <em>rate of change</em> of error. If the PV is moving rapidly toward the SP, derivative action starts reducing the CO before the error reaches zero — damping the response and reducing overshoot. Think of it as predictive braking.
      </p>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 my-4 font-mono text-sm">
        <span className="text-morange-500 font-bold">D output = Kd × de(t)/dt</span>
        <div className="text-xs text-slate-500 mt-1">Rate of change of error — responds to how fast the error is changing</div>
      </div>

      <p>
        Derivative time (Td) is how far ahead the derivative "looks." A larger Td means more derivative action. In practice, D is often set to zero on noisy processes — because derivative amplifies noise. If your PV signal has any measurement noise, the derivative term will see rapid oscillations in the error signal and inject corresponding spikes into the controller output.
      </p>

      <Callout type="field" title="Field Gotcha: Derivative Kick">
        If derivative is applied to <em>error</em> (not PV), then every time an operator changes the setpoint, the derivative sees a step change in error — which produces an instantaneous infinite rate of change, resulting in a huge spike in the CO. This is called "derivative kick." It can slam a valve from 40% to 100% in one scan cycle. Most modern PID blocks apply derivative to PV (not error) to eliminate this: when SP steps, PV hasn't changed yet so D = 0. Always verify which mode your block uses.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">How the Three Terms Work Together</h2>

      <p>
        Think of tuning a shower:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 my-3">
        <li><strong>P (reflexes):</strong> The water is freezing cold. You immediately crank the hot water knob hard. Proportional to how wrong things are.</li>
        <li><strong>I (grudges):</strong> The water is still slightly cooler than you want, even though you've made a dozen adjustments. You keep making tiny incremental corrections until it's exactly right. Integral won't stop until the error is truly zero.</li>
        <li><strong>D (anxiety):</strong> The water temperature is rising fast and is about to overshoot. You start pulling back on the hot water before you actually reach your target temperature. Derivative sees the rapid change and preemptively damps it.</li>
      </ul>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 my-6">
        <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Quote</div>
        <p className="text-slate-700 italic text-sm">"{analogy.text}"</p>
        <p className="text-xs text-slate-400 mt-2">— {analogy.author}</p>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Parallel vs Series (Ideal vs Standard) Form</h2>

      <p>
        PID controllers can be implemented in different forms, and the tuning constants mean different things in each:
      </p>

      <div className="space-y-3 my-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="font-bold text-navy-700 mb-1">Parallel (ISA) Form</div>
          <div className="font-mono text-sm text-mblue-600">u = Kp·e + Ki·∫e dt + Kd·de/dt</div>
          <p className="text-sm text-slate-600 mt-1">Three independent gains. Changing Kp doesn't affect the I or D terms. Most common in modern controllers. Ki = Kp/Ti, Kd = Kp·Td.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="font-bold text-navy-700 mb-1">Series (Classical) Form</div>
          <div className="font-mono text-sm text-amber-600">u = Kp·[e + (1/Ti)·∫e dt] × [1 + Td·de/dt]</div>
          <p className="text-sm text-slate-600 mt-1">The P, I, and D terms interact. Changing Kp scales all three. Common in older analog and pneumatic controllers. Tuning rules designed for series form don't translate directly to parallel.</p>
        </div>
      </div>

      <Callout type="warning" title="Know Your Form Before Applying Tuning Rules">
        Ziegler-Nichols and most other classical tuning methods were derived for the series (ideal) PID form. If your controller uses parallel form, the constants you calculate need to be converted. Many textbooks don't mention this. Many engineers don't know which form their PLC uses. Check the documentation — or better yet, check the source code of the function block.
      </Callout>

      <FunFact index={3} />

      <Callout type="pro" title="When to Use PI vs PID">
        For most flow loops and most liquid temperature loops: PI is sufficient. Flow measurement is inherently noisy — adding D turns every measurement fluctuation into a valve twitch. For slow, smooth processes with little noise (large vessel temperature, pH) where overshoot is costly: PID with careful D tuning helps. For integrating processes (pure level): P or PD, no I needed. If in doubt, start with PI. Adding D before you've mastered P and I tuning is how you create loops that oscillate for reasons you can't explain.
      </Callout>

      {QUIZZES.pid && QUIZZES.pid.length > 0 && (
        <QuizLevels chapterId="pid" />
      )}
      <ChapterExercise exercise={PID_CHAPTER_EXERCISES.pid} />
    </ChapterLayout>
  )
}
