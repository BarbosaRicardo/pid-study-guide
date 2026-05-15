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

export default function CascadeControl() {
  const analogy = ANALOGIES.cascade

  return (
    <ChapterLayout
      chapterId="cascade"
      title="Cascade & Advanced Control"
      emoji="🔗"
      prev="process"
      next="digital"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        A single PID loop is the workhorse of process control. But some processes have disturbances that arrive faster than the primary loop can see and correct them. Some have multiple interacting variables. Some have dynamics that a single loop simply can't handle well. This is where cascade control and other advanced single-loop strategies come in.
      </p>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Cascade Control — Two Loops in Series</h2>

      <p>
        Cascade control uses two controllers — one inside the other. The <strong>primary (outer) loop</strong> measures the main process variable you care about (e.g., reactor temperature) and its output becomes the <strong>setpoint for the secondary (inner) loop</strong>. The secondary loop controls a faster, intermediate variable (e.g., jacket flow or jacket temperature).
      </p>

      <div className="rounded-2xl p-5 my-6" style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)' }}>
        <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Quote</div>
        <p className="text-slate-300 italic text-sm">"{analogy.text}"</p>
        <p className="text-xs text-slate-400 mt-2">— {analogy.author}</p>
      </div>

      <div className="bg-navy-700 rounded-2xl p-5 my-6 font-mono text-sm">
        <div className="text-mcyan-400 text-xs uppercase tracking-widest mb-3">Cascade Structure</div>
        <pre className="text-green-400 text-xs whitespace-pre">{`SP_primary ──► [Primary PID] ──► SP_secondary ──► [Secondary PID] ──► Valve ──► Process
                   ▲                                      ▲
                   │                                      │
              PV_primary (slow)                    PV_secondary (fast)`}</pre>
      </div>

      <Callout type="key" title="The Golden Rule of Cascade Control">
        The inner (secondary) loop must be 3 to 5 times faster than the outer (primary) loop. If they operate at similar speeds, cascade makes things worse, not better — the loops interact and fight each other. Tune the inner loop first (with the outer loop in manual), then tune the outer loop with the inner loop in auto.
      </Callout>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Classic Cascade Example: Heat Exchanger</h2>

      <p>
        A shell-and-tube heat exchanger heats process fluid using steam. You want the process fluid outlet temperature at 180°F (primary PV). Steam pressure in the shell is the intermediate variable (secondary PV). The steam control valve is the manipulated variable.
      </p>

      <p>
        <strong>Without cascade:</strong> Temperature loop → steam valve directly. If steam supply pressure fluctuates, the temperature loop has to wait for the temperature change to propagate through the exchanger (which has significant dead time) before it detects the problem and starts correcting.
      </p>

      <p>
        <strong>With cascade:</strong> Temperature loop → steam pressure setpoint → steam pressure loop → steam valve. A fluctuation in steam supply pressure is immediately detected by the fast pressure loop, which corrects the valve position before the temperature even has time to respond. The temperature loop only needs to trim the steam pressure setpoint slightly.
      </p>

      <GifCard gifKey="hot" caption="Cascade: the inner loop handles fast disturbances before they reach the primary." side="right" />

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">When to Use Cascade</h2>

      <p>
        Cascade is worth implementing when:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 my-3">
        <li>The primary loop has significant dead time or lag</li>
        <li>There are frequent disturbances in an intermediate variable that can be measured</li>
        <li>That intermediate variable responds much faster than the primary variable</li>
        <li>The process has two natural control points (e.g., temperature and flow)</li>
      </ul>

      <p>
        Cascade is <em>not</em> the right answer when the inner and outer loops have similar time constants, or when the inner loop is very nonlinear. If the flow loop (inner) has dead time comparable to the temperature loop (outer), you've added complexity without benefit.
      </p>

      <Callout type="field" title="Field Gotcha: Cascade Saturation">
        When the primary loop requests an inner-loop setpoint outside the inner loop's achievable range — say, the temperature loop demands a flow setpoint of 120% — the inner loop is saturated. The outer loop doesn't know this and keeps winding up its integral. When the saturation condition clears, the outer loop has accumulated a massive integral error and will overshoot severely. Anti-windup on the outer loop must be configured to track the inner loop's actual setpoint, not its requested setpoint.
      </Callout>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Feedforward Control</h2>

      <p>
        Feedforward is a fundamentally different approach: instead of waiting for an error to appear and then reacting, feedforward <em>anticipates</em> disturbances and applies a corrective action in advance.
      </p>

      <p>
        If you know that an increase in feed flow rate will increase the heat load in an exchanger, you can measure the feed flow and automatically adjust the steam valve in proportion — before the temperature controller sees any error. This is feedforward: disturbance measured → compensation applied directly.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4">
        <div className="font-bold text-slate-100 mb-2">Feedforward + Feedback Combined</div>
        <p className="text-sm text-slate-400">
          Pure feedforward requires a perfect model to work — any mismatch between your feedforward model and reality creates permanent offset. In practice, feedforward is always paired with a feedback loop. Feedforward handles the large, known disturbances quickly. Feedback trims out any remaining error from model mismatch.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Ratio Control</h2>

      <p>
        Ratio control maintains a fixed ratio between two process streams. Classic applications: fuel-to-air ratio in a burner (combustion control), reactant ratio in a chemical reactor, blend ratio in a mixing station.
      </p>

      <p>
        Implementation: measure the "wild" (uncontrolled) stream flow. Multiply by the desired ratio to generate a setpoint for the "controlled" stream's flow controller. The controlled stream's flow loop tracks this dynamic setpoint.
      </p>

      <Callout type="pro" title="Ratio Control Safety">
        In burner management, the fuel-to-air ratio is safety-critical. Too much fuel (rich mixture) → unburned fuel accumulation → explosion risk. Too little air (lean mixture) → incomplete combustion → CO generation. Ratio control must be configured with limits that prevent unsafe ratios, and the ratio controller must account for density changes (temperature, pressure corrections) if the fuel composition varies.
      </Callout>

      <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3">Split-Range Control</h2>

      <p>
        Split-range control uses one controller to drive two (or more) final control elements at different parts of the output range. Example: a temperature controller with CO 0–50% driving a cooling valve (0% CO = fully open, 50% CO = closed) and CO 50–100% driving a heating valve (50% CO = closed, 100% CO = fully open). The controller doesn't need to know about the split — it just sees one output signal.
      </p>

      <FunFact index={8} />

      <Callout type="warning" title="Interaction Between Loops: Pairing Matters">
        In processes with multiple inputs and outputs (multi-variable processes), loops can interact — a change in one loop's MV affects another loop's PV. Choosing the wrong pairing (which CO controls which PV) leads to loops fighting each other. A simple test: the Relative Gain Array (RGA) quantifies how much each output affects each input and helps identify the right pairing. Incorrect pairing is a common cause of "mysteriously oscillating" multi-loop systems.
      </Callout>

      {QUIZZES.cascade && QUIZZES.cascade.length > 0 && (
        <QuizLevels chapterId="cascade" />
      )}
      <ChapterExercise exercise={PID_CHAPTER_EXERCISES.cascade} />
    </ChapterLayout>
  )
}
