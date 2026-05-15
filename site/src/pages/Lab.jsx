import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import GifCard from '../components/GifCard'
import QuizLevels from '../components/QuizLevels'
import CodeLab from '../components/CodeLab'
import { QUIZZES } from '../data/quizzes'
import { ANALOGIES } from '../data/chapters'
import { PID_LAB } from '../data/labExercises'

export default function Lab() {
  const analogy = ANALOGIES.lab

  return (
    <ChapterLayout
      chapterId="lab"
      title="Simulation Lab"
      emoji="🧪"
      prev="troubleshoot"
    >
      <section>
        <h2 className="text-xl font-bold text-white mb-2">PID Code Lab</h2>
        <p className="text-slate-400">
          Six exercises across three levels: implement a discrete PID controller, apply Ziegler-Nichols
          and Lambda tuning formulas, simulate FOPDT process response, detect loop oscillation,
          and build a cascade control system. These are the exact algorithms inside DCS and SCADA controllers.
        </p>
      </section>

      <CodeLab exercises={PID_LAB} />

      <p className="text-lg text-slate-600 leading-relaxed">
        The fastest way to internalize PID tuning is to do it — repeatedly, on different process types, until the patterns become intuitive. You can simulate real process dynamics on a laptop for free. No plant access required. No risk of upsetting a live process. The only cost is the hour it takes to set it up.
      </p>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 my-6">
        <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Quote</div>
        <p className="text-slate-300 italic text-sm">"{analogy.text}"</p>
        <p className="text-xs text-slate-400 mt-2">— {analogy.author}</p>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Free Simulation Tools</h2>

      <div className="space-y-4 my-6">
        <div className="bg-white/5 border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">ML</span>
            </div>
            <div>
              <div className="font-bold text-slate-100">MATLAB/Simulink — Student Edition</div>
              <div className="text-xs text-mblue-600 mb-2">mathworks.com — ~$35/year student license</div>
              <p className="text-sm text-slate-400">The industry standard for control system simulation. Simulink has pre-built PID blocks, process models, and visualization tools. Best choice if you want to match what you'll use professionally. The student edition includes the Control System Toolbox.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">Py</span>
            </div>
            <div>
              <div className="font-bold text-slate-100">Python — control library + scipy</div>
              <div className="text-xs text-mblue-600 mb-2">pip install control — completely free</div>
              <p className="text-sm text-slate-400">The Python <code>control</code> library implements Bode plots, step responses, and PID simulation. Scipy's ODE solver can simulate arbitrary nonlinear process models. If you're comfortable with Python, this is the most flexible free option.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-mgreen-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xs">CAD</span>
            </div>
            <div>
              <div className="font-bold text-slate-100">CADSIM Plus — Free Process Simulator</div>
              <div className="text-xs text-mblue-600 mb-2">cadsim.com — free tier available</div>
              <p className="text-sm text-slate-400">A process simulation tool specifically designed for process control. Includes models for common unit operations, built-in PID controllers, and trend visualization. Good middle ground between the complexity of Simulink and the simplicity of an Excel spreadsheet.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xs">XL</span>
            </div>
            <div>
              <div className="font-bold text-slate-100">Excel PID Simulation Spreadsheet</div>
              <div className="text-xs text-mblue-600 mb-2">Build it yourself — best learning experience</div>
              <p className="text-sm text-slate-400">A discrete-time PID simulation in Excel takes about 30 minutes to build and is the most instructive exercise you can do. When you implement the position algorithm yourself, type in the equations, and watch the plots change as you adjust tuning constants — you internalize the math in a way no textbook achieves.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Exercise 1: Build the Excel Simulator</h2>

      <p>
        This takes 30–45 minutes and teaches more than a week of reading. Build a spreadsheet that simulates a first-order process with dead time (FOPDT) and a discrete PID controller.
      </p>

      <div className="bg-navy-700 rounded-2xl p-5 my-6 font-mono text-xs text-green-400">
        <div className="text-mcyan-400 text-sm uppercase tracking-widest mb-3">Excel PID Simulation Setup</div>
        <pre className="whitespace-pre">{`Column A: Time (0, 0.1, 0.2, ... 600 seconds)
Column B: SP (setpoint — start at 50%, step to 70% at t=60s)
Column C: PV (process variable — calculated from process model)
Column D: Error (= SP - PV)
Column E: P_term (= Kp * Error)
Column F: I_sum (= I_sum[prev] + Ki * Error * T)
Column G: D_term (= Kd * (Error - Error[prev]) / T)
Column H: CO (= P_term + I_sum + D_term, clamped 0-100%)
Column I: PV_new (= FOPDT process model using CO)

Process model (discrete FOPDT):
PV[k] = PV[k-1] + (T/tau) * (K * CO[k-delay_steps] - PV[k-1])`}</pre>
      </div>

      <Callout type="pro" title="What to Experiment With">
        Once your spreadsheet works: (1) Double Kp and observe oscillation increase. (2) Reduce Ti and watch integral windup develop. (3) Add derivative and see overshoot reduce on a clean signal. (4) Add noise to the PV and watch what derivative does to it. (5) Change the process dead time θ and observe how it limits achievable response speed. (6) Try an integrating process model and see why you need different tuning.
      </Callout>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Exercise 2: Python FOPDT Step Response</h2>

      <div className="bg-navy-700 rounded-2xl p-5 my-6 font-mono text-xs text-green-400">
        <div className="text-mcyan-400 text-xs uppercase tracking-widest mb-2">Python — Simulate FOPDT + PID</div>
        <pre className="whitespace-pre">{`import numpy as np
import matplotlib.pyplot as plt

# Process parameters (FOPDT)
K = 1.5    # process gain
tau = 30.0 # time constant (seconds)
theta = 5.0 # dead time (seconds)
T = 0.5    # sampling period (seconds)

# PID tuning (Lambda tuning: lambda = 2*theta)
lam = 2 * theta
Kp = tau / (K * (lam + theta))
Ti = tau
Ki = Kp / Ti

# Simulation
t = np.arange(0, 300, T)
SP = np.where(t >= 30, 70, 50)  # step at t=30s
PV = np.zeros(len(t))
CO = np.zeros(len(t))
integral = 0
delay_steps = int(theta / T)

for k in range(1, len(t)):
    CO_delayed = CO[max(0, k - delay_steps)]
    PV[k] = PV[k-1] + (T/tau) * (K * CO_delayed - PV[k-1])
    error = SP[k] - PV[k]
    integral += Ki * error * T
    integral = np.clip(integral, 0, 100)  # anti-windup
    CO[k] = np.clip(Kp * error + integral, 0, 100)

plt.plot(t, SP, 'b--', label='SP')
plt.plot(t, PV, 'g-', label='PV')
plt.plot(t, CO, 'r-', label='CO', alpha=0.5)
plt.legend(); plt.grid(); plt.show()`}</pre>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Exercise 3: Tuning Competition</h2>

      <p>
        Set up a simulation with fixed process parameters (K=1.5, τ=30s, θ=5s). Goal: tune the PID to achieve the following performance specifications:
      </p>

      <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4 my-3">
        <li>Rise time (0% to 90% of step change): &lt; 45 seconds</li>
        <li>Overshoot: &lt; 10%</li>
        <li>Settling time (within ±2% of SP): &lt; 120 seconds</li>
        <li>Steady-state offset: 0%</li>
      </ul>

      <p>
        Start with Lambda tuning (λ = 2θ = 10s). Record your response. Then try Ziegler-Nichols open-loop. Then try manual tuning by intuition. Compare the results. The exercise reveals why no single tuning method is universally best.
      </p>

      <GifCard gifKey="celebrate" caption="First time all four criteria pass simultaneously." side="right" />

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Exercise 4: Valve Stiction Simulation</h2>

      <p>
        Add stiction to your simulation model: the valve position doesn't change unless the CO signal moves more than a threshold (deadband + stiction). Then observe the limit cycling behavior and compare the PV trend to the oscillation patterns from the troubleshooting chapter. This single exercise will make you permanently better at diagnosing valve stiction in the field.
      </p>

      <Callout type="key" title="The Simulation Loop Is the Study Loop">
        The real learning comes from the cycle: implement a concept → simulate it → break it deliberately → diagnose why it broke → fix it → repeat. A student who has intentionally caused integral windup, oscillation, offset, and valve stiction in simulation — and diagnosed and fixed each one — will outperform a student who only read about these phenomena every single time.
      </Callout>

      <FunFact index={9} />

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-slate-100 mb-3">ISA Certification Prep</h2>
        <p className="text-slate-600 mb-4">
          Two ISA credentials directly validate PID and process control expertise. Both are internationally recognized and required by many industrial employers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-2xl p-5">
            <div className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-full inline-block mb-3">ISA CCST — ~$415</div>
            <h3 className="font-bold text-slate-100 mb-2">Certified Control Systems Technician</h3>
            <p className="text-sm text-slate-600 mb-2">3 experience levels (5/7/13 years). Recertification every 3 years. Exam domains covered by this guide:</p>
            <ul className="text-sm text-slate-300 space-y-1">
              <li><span className="font-semibold">Basic Continuous Control</span> — PID theory, loop tuning, controller modes (Ch. 1–5)</li>
              <li><span className="font-semibold">Advanced Control</span> — Cascade, feedforward, ratio, override (Ch. 8)</li>
              <li><span className="font-semibold">Integration & Software</span> — Modbus, HART, SCADA tag integration</li>
              <li><span className="font-semibold">Deployment & Maintenance</span> — Startup, bump test, troubleshooting (Ch. 9)</li>
            </ul>
            <p className="text-xs text-slate-400 mt-2">isa.org/certification/ccst</p>
          </div>
          <div className="border border-slate-200 rounded-2xl p-5">
            <div className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded-full inline-block mb-3">ISA CAP — ~$500–750</div>
            <h3 className="font-bold text-slate-100 mb-2">Certified Automation Professional</h3>
            <p className="text-sm text-slate-600 mb-2">Engineering-level credential. 175 questions, 4-hour exam. Requires degree + 5 years. Exam domains:</p>
            <ul className="text-sm text-slate-300 space-y-1">
              <li><span className="font-semibold">Domain 1</span> — Basic Continuous Control (PID, DCS)</li>
              <li><span className="font-semibold">Domain 3</span> — Advanced Control (MPC, cascade, feedforward, FOPDT)</li>
              <li><span className="font-semibold">Domain 2</span> — Discrete Control (PLC/PID integration)</li>
              <li><span className="font-semibold">Domain 7</span> — Project lifecycle, commissioning documentation</li>
            </ul>
            <p className="text-xs text-slate-400 mt-2">isa.org/certification/cap</p>
          </div>
        </div>
      </section>

      {QUIZZES.lab && QUIZZES.lab.length > 0 && (
        <QuizLevels chapterId="lab" />
      )}
    </ChapterLayout>
  )
}
