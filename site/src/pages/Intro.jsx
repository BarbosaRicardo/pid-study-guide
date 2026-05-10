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

export default function Intro() {
  const analogy = ANALOGIES.intro

  return (
    <ChapterLayout
      chapterId="intro"
      title="What Is Closed-Loop Control?"
      emoji="🔄"
      next="loop"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Every process in an industrial plant has one job: stay at the target value. Temperature, pressure, flow, level — pick one. The question is whether you want the process to <em>stay there automatically</em>, or whether you want to manually chase it every time a disturbance blows through and moves it off target.
      </p>

      <p>
        Open-loop control is like driving with your eyes closed. You set the throttle to a fixed position before entering the highway, then hope nothing changes — no wind, no grade, no traffic. It works great in a vacuum. In a real plant, it fails the moment any disturbance appears, because there's no feedback mechanism telling the controller that its output isn't achieving the desired result.
      </p>

      <Callout type="key" title="The Core Idea">
        Closed-loop control measures the <strong>actual output</strong> of the process, compares it to the <strong>desired output</strong>, and uses the <strong>difference</strong> to continuously adjust the manipulated variable. This is feedback. Without it, you're guessing.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Open-Loop vs Closed-Loop</h2>

      <p>
        An <strong>open-loop system</strong> applies a control action based purely on a predetermined input — no measurement of what actually happened. A toaster is open-loop. You set the timer and pull the lever. Whether the bread is frozen or stale, it gets the same heat for the same duration. If the toast burns, the toaster doesn't know and doesn't care.
      </p>

      <p>
        A <strong>closed-loop system</strong> measures the result and adjusts accordingly. Your car's cruise control is closed-loop. When you go uphill, the speed drops, the controller detects the error, and increases throttle. When you crest the hill and start going downhill, it detects overspeed and reduces throttle. The controller is continuously working to keep error near zero.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 my-6">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Comparison</div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-bold text-morange-500 mb-2">Open-Loop</div>
            <ul className="space-y-1 text-slate-600">
              <li>• No feedback path</li>
              <li>• Output not measured</li>
              <li>• Can't correct disturbances</li>
              <li>• Simple, cheap</li>
              <li>• Examples: toaster, sprinkler timer, conveyor belt speed</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-mgreen-500 mb-2">Closed-Loop</div>
            <ul className="space-y-1 text-slate-600">
              <li>• Feedback continuously measured</li>
              <li>• Automatically corrects error</li>
              <li>• Rejects disturbances</li>
              <li>• More complex, requires sensor</li>
              <li>• Examples: thermostat, cruise control, tank level control</li>
            </ul>
          </div>
        </div>
      </div>

      <GifCard gifKey="thinking" caption="Feedback: the process telling the controller how wrong it is." side="right" />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Real Industrial Examples</h2>

      <p>
        <strong>Thermostat (temperature control):</strong> The room temperature is measured by a sensor (PV). You set 72°F (SP). The controller computes the error (SP − PV) and turns the furnace on or off. When the room reaches 72°F, error = 0 and the furnace shuts off. When it drifts below, error becomes positive and the furnace fires again.
      </p>

      <p>
        <strong>Tank level control:</strong> A level transmitter measures the liquid level in a vessel (PV). The desired level is the setpoint (SP). A control valve on the inlet adjusts flow to maintain level. If a downstream pump starts pulling product out faster, the level drops, the controller detects the error, and opens the inlet valve further to compensate. All of this happens automatically, continuously, without an operator touching anything.
      </p>

      <p>
        <strong>Boiler drum pressure:</strong> Pressure is measured (PV), compared to setpoint (SP), and a fuel valve is adjusted to control firing rate. If steam demand increases and pressure drops, the controller opens the fuel valve. If demand decreases and pressure rises, it throttles back. The feedback loop keeps the boiler from over-pressuring or losing steam to the header.
      </p>

      <Callout type="warning" title="When Open-Loop Is Acceptable">
        Open-loop control is only appropriate when: (1) the process is extremely stable and predictable, (2) disturbances are negligible, and (3) the cost of a sensor + controller exceeds the cost of occasional off-spec output. In a real plant, this is rare. If someone is proposing open-loop for a critical process variable, ask them what happens when a disturbance hits.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">The Feedback Loop Structure</h2>

      <p>
        Every closed-loop control system has the same basic structure, regardless of what's being controlled:
      </p>

      <div className="bg-navy-700 text-green-400 font-mono text-sm rounded-xl p-4 my-4 overflow-x-auto">
        <pre className="whitespace-pre">{`SP ──►[Σ]──► Controller ──► Final Control Element ──► Process ──► PV
       ▲                                                            │
       └────────────────── Feedback (measurement) ─────────────────┘`}</pre>
      </div>

      <ul className="space-y-2 text-slate-700 ml-4">
        <li><strong>SP (Setpoint):</strong> The target value — what you want the process variable to be.</li>
        <li><strong>[Σ] (Summer/Comparator):</strong> Subtracts PV from SP to compute error: e = SP − PV.</li>
        <li><strong>Controller:</strong> Processes the error and computes a controller output (CO) — typically a PID algorithm.</li>
        <li><strong>Final Control Element:</strong> The actuator — usually a control valve, VFD, or heater — that physically changes the process.</li>
        <li><strong>Process:</strong> The physical system being controlled — a tank, heat exchanger, reactor, etc.</li>
        <li><strong>PV (Process Variable):</strong> The measured output of the process — temperature, pressure, level, flow.</li>
      </ul>

      <Callout type="field" title="Field Gotcha: Open-Loop Creep">
        In the field, the most dangerous open-loop situation is a loop that is technically closed-loop on paper but is running in manual mode with a fixed output. Operators sometimes put loops in manual to "stabilize" a problem and then forget to put them back in auto. The loop is no longer self-correcting. The next shift inherits a process running blind. This is called "open-loop by negligence" and it causes more incidents than actual control system failures.
      </Callout>

      <FunFact index={0} />

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 my-6">
        <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Quote</div>
        <p className="text-slate-700 italic text-sm">"{analogy.text}"</p>
        <p className="text-xs text-slate-400 mt-2">— {analogy.author}</p>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Why Feedback Changes Everything</h2>

      <p>
        Without feedback, you must model the process perfectly — every disturbance, every nonlinearity, every environmental factor — to calculate the right output. That model is never perfect. Feedback doesn't require a perfect model. It measures reality and continuously corrects for whatever the model got wrong.
      </p>

      <p>
        This is the reason PID controllers have dominated process control for 80+ years: they don't need a model. They need a measurement and a setpoint. The integral term will find the right output eventually, regardless of how poorly you understand the underlying process. It's not elegant, but it works in the real world — where processes are nonlinear, instrumentation drifts, and something unexpected always happens.
      </p>

      <Callout type="pro" title="Pro Tip: Understand the Process First">
        Before tuning any loop, understand what you're controlling. Is it self-regulating (will it naturally find a new steady state if you hold the valve position constant) or integrating (will it ramp up or down forever)? The answer determines everything about how you tune the controller. A P-only controller will perform very differently on a self-regulating level loop versus an integrating level loop.
      </Callout>

      {QUIZZES.intro && QUIZZES.intro.length > 0 && (
        <Quiz chapterId="intro" questions={QUIZZES.intro} level={1} />
      )}
      <ChapterExercise exercise={PID_CHAPTER_EXERCISES.intro} />
    </ChapterLayout>
  )
}
