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

export default function Tuning() {
  const analogy = ANALOGIES.tuning

  return (
    <ChapterLayout
      chapterId="tuning"
      title="Tuning Methods"
      emoji="🎛️"
      prev="pid"
      next="process"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        PID tuning is the process of selecting Kp, Ki, and Kd so that the loop responds quickly to setpoint changes and disturbances without oscillating. There is no universal answer — the right tuning depends entirely on the process. A temperature loop and a flow loop tuned identically will behave completely differently because the processes themselves are different.
      </p>

      <Callout type="key" title="Tuning Objective">
        A well-tuned loop: reaches setpoint quickly (fast rise time), doesn't overshoot excessively (&lt;5-10% typically), settles without prolonged oscillation (settles within 2–3 cycles), and rejects disturbances by returning to SP quickly. The tradeoff: faster response generally means more aggressive tuning, which means less stability margin. You pick your point on that curve based on what the process can tolerate.
      </Callout>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Step 1: The Open-Loop Step Test</h2>

      <p>
        Before tuning, you need to know what you're working with. The open-loop step test characterizes the process so you can calculate tuning constants from first principles.
      </p>

      <p>
        <strong>Procedure:</strong>
      </p>
      <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4 my-3">
        <li>Put the controller in <strong>manual mode</strong> (open-loop — no feedback correction).</li>
        <li>Let the process reach <strong>steady state</strong> (PV stable, no changes).</li>
        <li>Make a <strong>step change</strong> in the CO (e.g., bump it from 40% to 50%). Record the initial CO value, the step size, and the exact time of the step.</li>
        <li><strong>Record the PV response</strong> over time until it reaches a new steady state.</li>
        <li>From the trend, identify three key parameters.</li>
      </ol>

      <div className="bg-white/4 border border-white/8 rounded-xl p-4 my-4">
        <div className="font-bold text-slate-100 mb-3">What to Extract from the Step Test</div>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3">
            <span className="font-bold text-mblue-600 w-6">K</span>
            <div><strong>Process Gain:</strong> ΔPV / ΔCO. If CO stepped 10% and PV moved 8% of span, K = 0.8. Unitless (if both in %). High K = sensitive process.</div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-amber-500 w-6">τ</span>
            <div><strong>Time Constant:</strong> The time for PV to reach 63.2% of its total change after dead time. Characterizes how fast the process responds once it starts moving.</div>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-morange-500 w-6">θ</span>
            <div><strong>Dead Time (θ):</strong> The delay between the CO step and the first detectable PV movement. This is the enemy. Dead time makes control hard.</div>
          </div>
        </div>
      </div>

      <p>
        This gives you the FOPDT model: <code>G(s) = K·e^(−θs) / (τs + 1)</code>. Every classical tuning method uses K, τ, and θ.
      </p>

      <GifCard gifKey="nerd" caption="Extracting K, τ, θ from a step test. The math is worth it." side="right"
      />

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Ziegler-Nichols Tuning (Closed-Loop Method)</h2>

      <p>
        The Ziegler-Nichols closed-loop (ultimate gain) method was published in 1942 and remains widely referenced today. It requires deliberately oscillating the loop, which makes plant operators nervous — for good reason.
      </p>

      <p>
        <strong>Procedure:</strong>
      </p>
      <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4 my-3">
        <li>Set Ki = 0 and Kd = 0 (P-only control).</li>
        <li>Starting with a low Kp, increase it slowly while making small SP changes.</li>
        <li>Continue until the loop oscillates with <strong>sustained, constant-amplitude oscillations</strong> — neither growing nor decaying. This Kp is the <strong>ultimate gain (Ku)</strong>.</li>
        <li>Measure the <strong>period of oscillation (Tu)</strong> in seconds.</li>
        <li>Calculate tuning constants from the Ziegler-Nichols table.</li>
      </ol>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy-700 text-white">
              <th className="p-3 text-left rounded-tl-xl">Controller Type</th>
              <th className="p-3 text-center">Kp</th>
              <th className="p-3 text-center">Ti</th>
              <th className="p-3 text-center rounded-tr-xl">Td</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-500/100/10">
              <td className="p-3 font-medium">P only</td>
              <td className="p-3 text-center font-mono">0.5·Ku</td>
              <td className="p-3 text-center text-slate-400">—</td>
              <td className="p-3 text-center text-slate-400">—</td>
            </tr>
            <tr className="bg-white/5">
              <td className="p-3 font-medium">PI</td>
              <td className="p-3 text-center font-mono">0.45·Ku</td>
              <td className="p-3 text-center font-mono">Tu / 1.2</td>
              <td className="p-3 text-center text-slate-400">—</td>
            </tr>
            <tr className="bg-blue-500/100/10 rounded-b-xl">
              <td className="p-3 font-medium rounded-bl-xl">PID</td>
              <td className="p-3 text-center font-mono">0.6·Ku</td>
              <td className="p-3 text-center font-mono">Tu / 2</td>
              <td className="p-3 text-center font-mono rounded-br-xl">Tu / 8</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="warning" title="Ziegler-Nichols Produces Aggressive Tuning">
        The Z-N closed-loop method is known for producing aggressive (fast, somewhat oscillatory) tuning. Many engineers apply a detuning factor of 0.5–0.7 to the resulting Kp before commissioning. The method was designed for quarter-amplitude decay (25% overshoot), which is too aggressive for most process plants. Use Z-N as a starting point, then detune to taste.
      </Callout>

      <div className="rounded-2xl p-5 my-6" style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)' }}>
        <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Quote</div>
        <p className="text-slate-300 italic text-sm">"{analogy.text}"</p>
        <p className="text-xs text-slate-400 mt-2">— {analogy.author}</p>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Lambda Tuning (IMC-Based)</h2>

      <p>
        Lambda tuning (also called IMC or Internal Model Control tuning) is the preferred method for most process engineers. The key innovation: you pick the desired closed-loop response time λ (lambda), and the tuning equations calculate the appropriate constants. You're directly specifying "I want this loop to respond in 30 seconds" instead of working backwards from oscillation behavior.
      </p>

      <p>
        <strong>Requires open-loop step test results:</strong> K (process gain), τ (time constant), θ (dead time).
      </p>

      <div className="rounded-xl p-4 my-4 font-mono text-sm space-y-2" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
        <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-2">Lambda PI Tuning Equations</div>
        <div><span className="text-mblue-600">Kp</span> = τ / (K · (λ + θ))</div>
        <div><span className="text-amber-400">Ti</span> = τ   <span className="text-slate-500 font-sans text-xs ml-2">(integral time = process time constant)</span></div>
        <div className="text-xs text-slate-500 mt-2">λ = desired closed-loop time constant (your choice). Rule of thumb: λ ≥ θ. Conservative: λ = 2–4θ.</div>
      </div>

      <p>
        Lambda tuning is robust because it explicitly accounts for dead time. A loop with a lot of dead time gets conservative tuning automatically. Choosing λ = 2θ is a good starting point for most self-regulating processes. Choosing λ = θ gives tighter control with less stability margin — use only when you need fast response and the measurement is clean.
      </p>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Cohen-Coon (Open-Loop Method)</h2>

      <p>
        Cohen-Coon is another open-loop step test method, designed specifically for processes with significant dead time relative to the time constant (θ/τ &gt; 0.1). It tends to produce more aggressive tuning than Lambda but less aggressive than Ziegler-Nichols.
      </p>

      <div className="bg-white/4 border border-white/8 rounded-xl p-4 my-4 font-mono text-xs space-y-1">
        <div className="font-bold text-slate-100 mb-2">Cohen-Coon PI Tuning</div>
        <div>Kp = (1/K) · (τ/θ) · (0.9 + θ/12τ)</div>
        <div>Ti = θ · (30 + 3θ/τ) / (9 + 20θ/τ)</div>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Rule-of-Thumb Starting Points</h2>

      <p>
        When you have no time for a step test and the process needs to be running in five minutes:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="p-3 text-left rounded-tl-xl">Loop Type</th>
              <th className="p-3 text-center">Kp Start</th>
              <th className="p-3 text-center">Ti Start (min)</th>
              <th className="p-3 text-center rounded-tr-xl">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white/4"><td className="p-3">Flow</td><td className="p-3 text-center font-mono">0.3–0.5</td><td className="p-3 text-center font-mono">0.05–0.2</td><td className="p-3 text-xs text-slate-500">Noisy, fast — avoid D</td></tr>
            <tr className="bg-white/5"><td className="p-3">Liquid Pressure</td><td className="p-3 text-center font-mono">0.5–2</td><td className="p-3 text-center font-mono">0.05–0.5</td><td className="p-3 text-xs text-slate-500">Fast process, very noisy</td></tr>
            <tr className="bg-white/4"><td className="p-3">Liquid Level</td><td className="p-3 text-center font-mono">1–3</td><td className="p-3 text-center font-mono">5–30</td><td className="p-3 text-xs text-slate-500">Often P-only or PI</td></tr>
            <tr className="bg-white/5"><td className="p-3">Temperature</td><td className="p-3 text-center font-mono">1–5</td><td className="p-3 text-center font-mono">2–10</td><td className="p-3 text-xs text-slate-500">Slow, D often helpful</td></tr>
            <tr className="bg-white/4 rounded-b-xl"><td className="p-3 rounded-bl-xl">Gas Pressure</td><td className="p-3 text-center font-mono">2–5</td><td className="p-3 text-center font-mono">0.5–3</td><td className="p-3 text-xs text-slate-500 rounded-br-xl">Compressible, can be fast</td></tr>
          </tbody>
        </table>
      </div>

      <Callout type="pro" title="The Tuning Iteration Loop">
        Good tuning is iterative. Make a SP step of 5–10%, watch the response, adjust, repeat. Increase Kp until you see slight overshoot, then back off 20%. Set Ti to eliminate offset without adding oscillation. Add Td only if overshoot is a problem and the signal is clean. Log every change. If you don't log your tuning sessions, you will repeat the same mistakes on the next commissioning job — and the one after that.
      </Callout>

      <FunFact index={1} />

      {QUIZZES.tuning && QUIZZES.tuning.length > 0 && (
        <QuizLevels chapterId="tuning" />
      )}
      <ChapterExercise exercise={PID_CHAPTER_EXERCISES.tuning} />
    </ChapterLayout>
  )
}
