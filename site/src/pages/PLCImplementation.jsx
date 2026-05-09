import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import GifCard from '../components/GifCard'
import { QUIZZES } from '../data/quizzes'
import { ANALOGIES } from '../data/chapters'

export default function PLCImplementation() {
  const analogy = ANALOGIES.plc

  return (
    <ChapterLayout
      chapterId="plc"
      title="PID in PLCs & SCADA"
      emoji="🏭"
      prev="digital"
      next="troubleshoot"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Every PLC vendor ships a PID function block. The underlying math is the same; the parameter names, scaling conventions, and configuration options are vendor-specific enough that an engineer moving from one platform to another will spend the first week re-learning what all the parameters mean. This chapter covers the concepts that apply everywhere, and the platform-specific gotchas for the most common systems.
      </p>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 my-6">
        <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">Quote</div>
        <p className="text-slate-700 italic text-sm">"{analogy.text}"</p>
        <p className="text-xs text-slate-400 mt-2">— {analogy.author}</p>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">IEC 61131-3 CTRL_PID Function Block</h2>

      <p>
        The IEC 61131-3 standard defines a CTRL_PID function block used in many European and IEC-compliant systems (CODESYS, Beckhoff TwinCAT, many Siemens implementations). The standard parameters:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy-700 text-white">
              <th className="p-3 text-left rounded-tl-xl">Parameter</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left rounded-tr-xl">Typical Units</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-slate-50"><td className="p-3 font-mono">ACTUAL</td><td className="p-3">Process variable input (PV)</td><td className="p-3 font-mono">REAL (0.0–100.0%)</td></tr>
            <tr className="bg-white"><td className="p-3 font-mono">SET_POINT</td><td className="p-3">Setpoint input</td><td className="p-3 font-mono">REAL (0.0–100.0%)</td></tr>
            <tr className="bg-slate-50"><td className="p-3 font-mono">KP</td><td className="p-3">Proportional gain</td><td className="p-3 font-mono">REAL</td></tr>
            <tr className="bg-white"><td className="p-3 font-mono">TI</td><td className="p-3">Integral time</td><td className="p-3 font-mono">TIME (seconds)</td></tr>
            <tr className="bg-slate-50"><td className="p-3 font-mono">TD</td><td className="p-3">Derivative time</td><td className="p-3 font-mono">TIME (seconds)</td></tr>
            <tr className="bg-white"><td className="p-3 font-mono">MAN_IN</td><td className="p-3">Manual output value</td><td className="p-3 font-mono">REAL (0.0–100.0%)</td></tr>
            <tr className="bg-slate-50"><td className="p-3 font-mono">AUTO</td><td className="p-3">TRUE = Auto mode, FALSE = Manual</td><td className="p-3 font-mono">BOOL</td></tr>
            <tr className="bg-white"><td className="p-3 font-mono">OUT</td><td className="p-3">Controller output (CO)</td><td className="p-3 font-mono">REAL (0.0–100.0%)</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Allen-Bradley (Rockwell) PID Instruction</h2>

      <p>
        Rockwell's Studio 5000 PLC (ControlLogix/CompactLogix) uses the <code>PID</code> instruction. Key parameter differences from the IEC standard:
      </p>

      <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 my-3">
        <li><strong>Kp, Ki, Kd</strong> — Rockwell uses <em>independent gains</em> (parallel form), not Ti and Td</li>
        <li><strong>PV scaling</strong> — set Min/Max EU (engineering units) for the PV range</li>
        <li><strong>Control Action</strong> — E = PV − SP (direct) or E = SP − PV (reverse)</li>
        <li><strong>CVH/CVL</strong> — output high/low limits</li>
        <li><strong>CVEU</strong> — output in engineering units (e.g., 4–20 mA), not necessarily 0–100%</li>
        <li><strong>Derivative of PV</strong> vs derivative of error — configurable bit in the control word</li>
      </ul>

      <div className="bg-navy-700 rounded-2xl p-5 my-6 font-mono text-xs text-green-400">
        <div className="text-mcyan-400 text-xs uppercase tracking-widest mb-2">Rockwell PID Instruction — Ladder Logic</div>
        <pre className="whitespace-pre">{`PID
  PID Control Block: MyPID
  Process Variable: Temperature_PV    (REAL tag, scaled)
  Tieback:          Flow_Actual        (actual valve position)
  Control Variable: TempValve_CO      (output, 0-100%)

  PID.SP  := 180.0     // setpoint: 180°F
  PID.Kp  := 2.5       // proportional gain
  PID.Ki  := 0.15      // integral gain (repeats/min)
  PID.Kd  := 0.0       // derivative (usually 0 for temp)
  PID.CVH := 100.0     // output high limit
  PID.CVL := 0.0       // output low limit`}</pre>
      </div>

      <Callout type="field" title="Field Gotcha: Rockwell Ki Units">
        In Rockwell's PID instruction, Ki is in <em>repeats per minute</em>, not 1/Ti (seconds). Ki = 1/Ti_minutes. A Ki of 0.1 means the integral repeats the proportional output once every 10 minutes. This is completely different from the IEC Ti parameter (seconds) and from the parallel form Ki (1/s). Applying Ziegler-Nichols Ti (in minutes) directly as Rockwell's Ki will give wildly wrong integral action. Convert: Rockwell Ki = 1 / Ti_minutes.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Auto/Manual Mode and Bumpless Transfer</h2>

      <p>
        Every industrial PID has two operating modes:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="font-bold text-navy-700 mb-2">Auto Mode</div>
          <p className="text-sm text-slate-600">The PID algorithm computes and applies the CO based on the error between SP and PV. The loop is closed. Feedback is active. The controller is doing its job.</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="font-bold text-navy-700 mb-2">Manual Mode</div>
          <p className="text-sm text-slate-600">The operator sets the CO directly. The PID algorithm is bypassed. The loop is open. Used for commissioning, troubleshooting, or when the process needs direct operator control.</p>
        </div>
      </div>

      <p>
        <strong>Bumpless transfer</strong> means the CO doesn't jump when you switch between manual and auto modes. Without bumpless transfer, switching from manual (CO = 45%) to auto (where the algorithm would compute CO = 72% based on current error) causes an immediate step change in the valve — a "bump" that can upset the process.
      </p>

      <p>
        Bumpless transfer is achieved by initializing the PID internal state before the mode switch:
      </p>
      <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4 my-3">
        <li>When switching to auto: set the integral accumulator so the computed CO equals the current manual CO</li>
        <li>When switching to manual: immediately set the manual CO to the last auto CO value</li>
      </ul>

      <GifCard gifKey="checkmark" caption="Smooth mode transfer: the process never knew the operator switched." side="right" />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">PID Faceplate Design in SCADA/HMI</h2>

      <p>
        A PID faceplate is the standard HMI interface element that exposes loop parameters to operators. Every DCS and most SCADA systems have a standardized faceplate. Key elements:
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-4">
        <div className="font-bold text-navy-700 mb-3">Standard PID Faceplate Elements</div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="font-semibold text-mblue-600">SP field</div>
            <div className="text-slate-600">Numeric entry for setpoint — operator-configurable</div>
          </div>
          <div>
            <div className="font-semibold text-mgreen-500">PV display</div>
            <div className="text-slate-600">Current process variable — read-only, often with trend</div>
          </div>
          <div>
            <div className="font-semibold text-amber-600">CO bar</div>
            <div className="text-slate-600">Controller output — read in auto, editable in manual</div>
          </div>
          <div>
            <div className="font-semibold text-morange-500">Mode button</div>
            <div className="text-slate-600">Auto / Manual / Cascade toggle</div>
          </div>
          <div>
            <div className="font-semibold text-navy-700">Deviation alarm</div>
            <div className="text-slate-600">Alert when |PV - SP| exceeds configured threshold</div>
          </div>
          <div>
            <div className="font-semibold text-red-600">Hi/Lo limits</div>
            <div className="text-slate-600">SP limits operators can configure vs. hard process limits</div>
          </div>
        </div>
      </div>

      <Callout type="pro" title="Operator Access Levels">
        In a properly designed HMI, operators can change SP and mode. They should NOT be able to change tuning constants (Kp, Ki, Kd) from the operator interface. Tuning changes require engineer-level access. This isn't just best practice — in many regulated industries (pharmaceutical, nuclear), tuning constant changes require change management procedures and documentation.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-3">Loop Configuration Best Practices</h2>

      <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 my-3">
        <li>Configure SP limits to prevent operators from entering physically impossible or unsafe setpoints</li>
        <li>Set CO limits to prevent valve over-travel (typically 0–100%, but some valves have mechanical stops at 95%)</li>
        <li>Configure a SP ramp rate to prevent large steps from causing process upsets</li>
        <li>Set up deviation alarms: alert when |PV − SP| &gt; acceptable threshold for &gt; N seconds</li>
        <li>Configure manual fallback behavior: what CO to output if the PV signal fails (often hold last value or go to safe position)</li>
        <li>Document the tuning constants and the date they were last changed — future you will thank past you</li>
      </ul>

      <FunFact index={7} />
    </ChapterLayout>
  )
}
