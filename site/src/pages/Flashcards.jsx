import React, { useState, useEffect, useCallback } from 'react'
import { RotateCcw, Shuffle, ChevronLeft, ChevronRight, Check, X, BookOpen, Keyboard } from 'lucide-react'

const STORAGE_KEY = 'pid_flashcard_v1'

const FLASHCARD_CHAPTERS = [
  { id: 'all', label: 'All Topics' },
  { id: 'fundamentals', label: '🎛️ PID Fundamentals' },
  { id: 'tuning', label: '⚙️ Tuning Methods' },
  { id: 'dynamics', label: '📈 Process Dynamics' },
  { id: 'advanced', label: '🔬 Advanced Control' },
  { id: 'practical', label: '🔧 Practical Implementation' },
]

const FLASHCARDS = [
  // PID FUNDAMENTALS
  { id: 'f01', chapter: 'fundamentals', front: 'Proportional (P) action', back: 'Proportional action produces an output proportional to the current error: u_P = Kp × e(t). It reacts immediately to deviation from setpoint. A larger Kp = faster, more aggressive response, but too large causes oscillation. P-only control always has steady-state offset (non-zero error at equilibrium) because some error is needed to maintain a non-zero output to hold the process.' },
  { id: 'f02', chapter: 'fundamentals', front: 'Integral (I) action', back: 'Integral action accumulates error over time and increases output until steady-state error is eliminated: u_I = Ki × ∫e(t)dt. This eliminates the offset that P-only control cannot remove. The integral time Ti (or reset rate) determines how aggressively past errors influence the output. Slow Ti = slow error correction; fast Ti can cause oscillation. Ki = Kp / Ti.' },
  { id: 'f03', chapter: 'fundamentals', front: 'Derivative (D) action', back: 'Derivative action responds to the rate of change of error: u_D = Kd × de(t)/dt. It anticipates where the process is heading and applies corrective action early — "braking" before the setpoint is reached. Reduces overshoot. Kd = Kp × Td. D action amplifies high-frequency noise; always pair with a derivative filter. Best applied to D-on-PV to avoid derivative kick on setpoint changes.' },
  { id: 'f04', chapter: 'fundamentals', front: 'PID standard form equation', back: 'u(t) = Kp[e(t) + (1/Ti)∫e(t)dt + Td × de(t)/dt]. Where: Kp = proportional gain, Ti = integral time (minutes or seconds), Td = derivative time, e(t) = SP - PV (error). Parallel form: u = Kp×e + Ki×∫e + Kd×(de/dt), where Ki=Kp/Ti and Kd=Kp×Td. Both forms are equivalent but parallel form is more common in PLCs.' },
  { id: 'f05', chapter: 'fundamentals', front: 'Discrete PID equation', back: 'u(k) = Kp×e(k) + Ki×T×Σe(j) + Kd×(e(k)-e(k-1))/T. Where T = sample period, k = current sample, e(k) = current error. The integral term is a running sum (Euler integration). The derivative term is a backward difference approximation. In PLCs, Ki=Kp×T/Ti and Kd=Kp×Td/T. Sample period T must be much smaller than the process time constant for accurate approximation.' },
  { id: 'f06', chapter: 'fundamentals', front: 'Direct acting vs reverse acting', back: 'Direct acting: output increases when PV increases (e.g., cooling valve — higher temperature → more cooling). Error = PV - SP. Reverse acting: output increases when PV decreases (e.g., heating valve — lower temperature → more heat). Error = SP - PV. Choosing wrong action causes positive feedback (loop runs away). Rule: determine what direction the output must move when PV goes up, then set action accordingly.' },
  { id: 'f07', chapter: 'fundamentals', front: 'Steady-state offset with P-only control', back: 'A proportional-only controller cannot drive steady-state error to zero. At equilibrium, some nonzero error is required to produce the non-zero output needed to hold the process at a stable point. The size of the offset depends on Kp: offset = disturbance / (Kp × process gain). Adding integral action eliminates offset by continuing to increase output even as error approaches zero.' },
  { id: 'f08', chapter: 'fundamentals', front: 'Gain margin and phase margin', back: 'Gain margin: how much gain can be increased before the system becomes unstable (at the phase crossover frequency where phase = -180°). Phase margin: how much additional phase lag can be tolerated before instability (at the gain crossover frequency where |G(jω)|=1). Both from Bode plot analysis. Typical design targets: gain margin > 6 dB, phase margin > 45°. Smaller margins = faster response but less robustness.' },
  { id: 'f09', chapter: 'fundamentals', front: 'Closed-loop vs open-loop', back: 'Open-loop: controller output is set without feedback from the process (no PV measurement). Cannot correct for disturbances. Closed-loop (feedback): controller continuously compares SP to PV and adjusts output to minimize error. Closed-loop is more robust to disturbances and process changes. Feedforward is open-loop (predictive); most industrial control combines feedback (PID) + feedforward.' },
  { id: 'f10', chapter: 'fundamentals', front: 'Bode plot for PID tuning', back: 'A Bode plot graphs open-loop gain (dB) and phase (degrees) vs frequency (rad/s or Hz). Used to analyze stability margins and frequency response. The gain crossover frequency (where gain=0 dB) and phase crossover frequency (where phase=-180°) define the stability margins. PID adds gain at low frequencies (integral) and phase lead at mid frequencies (derivative). Used in frequency-domain tuning methods.' },
  { id: 'f11', chapter: 'fundamentals', front: 'Setpoint tracking vs disturbance rejection', back: 'Two different performance objectives: Setpoint tracking = how well and how fast the PV follows SP changes. Disturbance rejection = how well the controller suppresses the effect of load disturbances on PV. Ziegler-Nichols tuning optimizes disturbance rejection. Lambda/IMC tuning explicitly sets the setpoint tracking speed. A gain that works well for one may not be optimal for the other.' },
  { id: 'f12', chapter: 'fundamentals', front: 'Error signal definition', back: 'Error e(t) = SP - PV for reverse-acting controllers (most heating/level loops). For direct-acting controllers: e(t) = PV - SP. The sign convention must match the controller action setting. If configured incorrectly, the loop will have positive feedback (output moves PV further from SP) and the controller will rail to its output limits within seconds. Always verify action before enabling auto.' },

  // TUNING METHODS
  { id: 't01', chapter: 'tuning', front: 'Ziegler-Nichols open-loop (reaction curve) method', back: 'Step test procedure: (1) Put controller in manual. (2) Apply a step change to output. (3) Record the process reaction curve. (4) Draw a tangent line at the inflection point. From the tangent: K = process gain (steady-state ΔPV/ΔOutput), θ = dead time (where tangent intersects initial PV baseline), τ = time constant (from θ to where tangent reaches 63.2% of ΔPV). Then: Kp=1.2τ/(K·θ), Ti=2θ, Td=0.5θ.' },
  { id: 't02', chapter: 'tuning', front: 'Ziegler-Nichols closed-loop (ultimate gain) method', back: 'Procedure: (1) Disable I and D. (2) Increase Kp until loop sustains continuous oscillation at ultimate gain Ku. (3) Measure ultimate period Tu (seconds per oscillation cycle). Ziegler-Nichols P-only: Kp=0.5Ku. PI: Kp=0.45Ku, Ti=Tu/1.2. PID: Kp=0.6Ku, Ti=Tu/2, Td=Tu/8. Warning: the plant actually oscillates during this test — not acceptable for some processes. Consider model-based alternatives.' },
  { id: 't03', chapter: 'tuning', front: 'FOPDT model — First Order Plus Dead Time', back: 'FOPDT: G(s) = K·e^(-θs)/(τs+1). Parameters: K = process gain (steady-state PV change / output change), θ = dead time (pure delay before process responds), τ = time constant (time to reach 63.2% of final value after dead time). This model fits the vast majority of industrial processes. Identified from open-loop step test. Drives most tuning formulas.' },
  { id: 't04', chapter: 'tuning', front: '28.3% and 63.2% identification points', back: 'To identify FOPDT parameters from a step response: θ (dead time) is where the response first starts to change. The time constant τ can be estimated using two points: t28.3 (time to reach 28.3% of final value) and t63.2 (time to reach 63.2% of final value). Then: τ = 1.5×(t63.2 - t28.3) and θ = t63.2 - τ. Using two points is more accurate than a single tangent line.' },
  { id: 't05', chapter: 'tuning', front: 'Lambda (IMC) tuning', back: 'Internal Model Control (IMC) tuning uses the desired closed-loop time constant λ (lambda) as the tuning parameter. For FOPDT: Kp = τ / (K×(λ+θ)), Ti = τ, Td = θ/2 (approximately). Choosing λ: larger λ = slower, more robust, less aggressive; smaller λ = faster, less robust. Rule of thumb: λ ≥ θ (dead time) for stability. Gives engineers an intuitive "how fast do you want the loop?" parameter.' },
  { id: 't06', chapter: 'tuning', front: 'Tyreus-Luyben tuning rules', back: 'Modified Ziegler-Nichols closed-loop rules with less aggressive tuning (reduced oscillation). Using ultimate gain Ku and ultimate period Tu: PI: Kp = Ku/3.2, Ti = 2.2×Tu. PID: Kp = Ku/2.2, Ti = 2.2×Tu, Td = Tu/6.3. Tyreus-Luyben produces more damped (less oscillatory) responses than Ziegler-Nichols. Preferred for integrating processes and loops with tight performance requirements.' },
  { id: 't07', chapter: 'tuning', front: 'Cohen-Coon tuning', back: 'Open-loop method using FOPDT parameters. Designed to provide quarter-decay ratio (QDR) response. P: Kp = (τ/Kθ)(1 + θ/3τ). PI: Kp = (τ/Kθ)(0.9 + θ/12τ), Ti = θ(30τ+3θ)/(9τ+20θ). PID: Kp = (τ/Kθ)(4/3 + θ/4τ), Ti = θ(32τ+6θ)/(13τ+8θ), Td = θ·4τ/(11τ+2θ). More accurate than Z-N for processes with large dead time (θ/τ > 0.1).' },
  { id: 't08', chapter: 'tuning', front: 'Quarter decay ratio (QDR)', back: 'A classic tuning objective: the amplitude of each successive oscillation decays to 1/4 of the previous one. Ziegler-Nichols rules target QDR. QDR provides relatively fast disturbance rejection but the loop oscillates several times before settling. Modern practice often targets critically damped (no oscillation) response using lambda tuning. QDR is still referenced in legacy literature and older DCS/PLC documentation.' },
  { id: 't09', chapter: 'tuning', front: 'Auto-tuning in PLCs', back: 'Most modern PLCs (Rockwell, Siemens, Omron) include auto-tune features that automatically perform step tests or relay oscillation tests to identify process parameters. Relay auto-tuning: the controller applies a relay (bang-bang) output to induce controlled oscillation; Ku and Tu are measured from the oscillation. Less disruptive than manual Z-N. Results are then converted to PID parameters. Verify auto-tune results before enabling in auto.' },
  { id: 't10', chapter: 'tuning', front: 'Gain scheduling', back: 'Using different PID parameters (gain sets) depending on operating region. Used when process gain or dynamics change significantly across the operating range. Example: pH control — pH curve is highly nonlinear near neutral. A pH controller near pH=7 needs much lower gain than near pH=4. Implementation: multiple parameter sets stored, a scheduling variable (e.g., PV itself) selects which set is active. Transition between sets must be bumpless.' },

  // PROCESS DYNAMICS
  { id: 'd01', chapter: 'dynamics', front: 'Dead time (θ) effect on control', back: 'Dead time is the pure delay between a change in controller output and any measurable response in PV. During dead time, the controller is "flying blind" — it can\'t see the effect of its last action. Dead time is the primary factor limiting achievable closed-loop performance. Tuning rules typically set Kp proportional to τ/θ — larger dead time forces lower gain. The ratio θ/τ (normalized dead time) determines how difficult a loop is to control.' },
  { id: 'd02', chapter: 'dynamics', front: 'Time constant (τ) definition', back: 'The time constant τ is the time for a first-order process to reach 63.2% of its final value after a step input (after dead time has passed). At t=2τ: 86.5%. At t=3τ: 95%. At t=5τ: 99.3% (essentially settled). A process with τ=60s takes ~5 minutes to reach steady state after a step. Large τ = slow process (easy to control); small τ = fast process (may need derivative, rate limiting). τ and θ together characterize control difficulty.' },
  { id: 'd03', chapter: 'dynamics', front: 'Integrating (ramp) processes', back: 'An integrating process has no self-regulation — it ramps continuously in response to a constant input offset rather than reaching a new steady state. Examples: liquid level in a tank with flow-out ≠ flow-in, position control. G(s) = K/s. For a PI controller: Kp = 0.5/(K×θ), Ti = 4×(θ+τ_apparent). I-only control is often used for pure integrators. P-only causes a ramp in output rather than offset.' },
  { id: 'd04', chapter: 'dynamics', front: 'Underdamped, critically damped, overdamped', back: 'Damping ratio ζ describes closed-loop step response: ζ<1 = underdamped (oscillatory response, overshoots setpoint, settles faster). ζ=1 = critically damped (fastest non-oscillatory response). ζ>1 = overdamped (sluggish, no overshoot). Most industrial loops target ζ=0.7-1.0 (slight overshoot or critically damped). Ziegler-Nichols targets ζ≈0.22 (quarter decay, very oscillatory).' },
  { id: 'd05', chapter: 'dynamics', front: 'Process gain (K) definition', back: 'Process gain K = ΔPV_ss / ΔOutput, where ΔPV_ss is the steady-state change in PV for a given step change in controller output. If a 10% output step causes a 5% change in PV at steady state, K=0.5. High process gain means the process responds strongly to output changes — requires lower controller Kp. Low process gain requires higher Kp. K appears in every tuning formula as a divisor.' },
  { id: 'd06', chapter: 'dynamics', front: 'Inverse response processes', back: 'An inverse response process initially moves in the wrong direction before correcting. Classic example: increasing feedwater to a boiler drum initially shrinks the water level (steam bubbles collapse, measured level drops) before it rises. G(s) has a right-half-plane zero. Very difficult to control. Requires detuned PID (lower gains), derivative often disabled. Model predictive control (MPC) handles inverse response better.' },
  { id: 'd07', chapter: 'dynamics', front: 'Runaway (unstable open-loop) processes', back: 'An open-loop unstable process diverges without control — increasing output causes the process to accelerate away from any equilibrium. Example: exothermic chemical reactor where higher temperature → faster reaction → more heat → higher temperature. Requires active control at all times. PID can stabilize runaway processes, but controller gain must be above a minimum value (opposite of normal stability constraints).' },
  { id: 'd08', chapter: 'dynamics', front: 'Higher-order process approximation', back: 'Real processes are often higher than first-order but can be approximated as FOPDT for tuning purposes. Common approximation: for an nth-order system G(s)=1/(τs+1)^n, the apparent dead time θ_apparent ≈ (n-1)×τ_individual and τ_apparent ≈ τ_individual. This allows standard FOPDT tuning formulas to be applied. Error in approximation increases as the actual order increases.' },
  { id: 'd09', chapter: 'dynamics', front: 'Resonance frequency and natural frequency', back: 'Natural frequency ωn (rad/s) is the frequency of undamped oscillation of the closed-loop system. Resonance frequency ωr = ωn×√(1-2ζ²) (for underdamped systems) is the frequency at which the closed loop peaks in frequency response. Rise time ≈ 1.8/ωn. Settling time (2% criterion) ≈ 4/(ζ×ωn). These relate time-domain performance to frequency-domain design parameters.' },

  // ADVANCED CONTROL
  { id: 'a01', chapter: 'advanced', front: 'Cascade control structure', back: 'Cascade control uses two PID controllers: an outer (primary) controller whose output becomes the setpoint for an inner (secondary) controller. The inner loop must be significantly faster (≥3-5× faster) than the outer loop. Example: flow-to-temperature cascade — outer temperature controller sets a flow setpoint; inner flow controller tracks that setpoint quickly. Inner loop corrects disturbances before they reach the outer process variable.' },
  { id: 'a02', chapter: 'advanced', front: 'Feedforward control', back: 'Feedforward measures a disturbance and corrects for it before it affects the PV — unlike feedback which reacts after the fact. A feedforward gain Kff is calculated as: Kff = -(disturbance gain)/(manipulated variable gain). Feedforward alone cannot handle unmeasured disturbances or model error, so it is always combined with feedback PID. The combination achieves much better disturbance rejection than either alone.' },
  { id: 'a03', chapter: 'advanced', front: 'Anti-windup: clamp method', back: 'Integral windup occurs when the controller output is saturated (at max or min) but the integral keeps accumulating. When the output finally comes off saturation, it overcorrects. Clamp anti-windup: stop integrating when output is at its limits. Simple to implement: if output > max and error > 0, skip integration; if output < min and error < 0, skip integration. Most PLC PID blocks have this built in.' },
  { id: 'a04', chapter: 'advanced', front: 'Anti-windup: back-calculation method', back: 'Back-calculation anti-windup is more sophisticated than clamping. It computes the "tracking error" = actual output - unsaturated output, then feeds this back through a tracking time constant Tt to reduce the integrator state. Result: the integrator "winds down" proportionally rather than stopping abruptly. Provides smoother recovery from saturation. Tt ≈ √(Ti×Td) is a common rule of thumb.' },
  { id: 'a05', chapter: 'advanced', front: 'Derivative on PV vs derivative on error', back: 'Derivative-on-error: Kd×d(SP-PV)/dt. When SP changes as a step, derivative spikes to infinity (derivative kick) — harsh output bump. Derivative-on-PV: Kd×d(-PV)/dt (negative sign because increasing PV → decreasing derivative output for reverse-acting). Eliminates kick on SP changes. PV derivative is smoother and preferred in all modern implementations. Legacy systems sometimes use derivative on error — check documentation.' },
  { id: 'a06', chapter: 'advanced', front: 'Split-range control', back: 'Split-range control sends the controller output to two or more final control elements in sequence. Example: 0-50% output → cooling valve (0-100% open); 50-100% output → heating valve (0-100% open). This handles wide operating ranges where one valve cannot handle both heating and cooling. The controller sees one continuous 0-100% output range; the split-range characterizer divides it to the appropriate actuators.' },
  { id: 'a07', chapter: 'advanced', front: 'Override (select) control', back: 'Override control uses a high select or low select block to choose between two or more controller outputs. High select: outputs the larger of two signals — protects against dangerous HIGH conditions. Low select: outputs the smaller — protects against dangerous LOW conditions. Example: normal flow controller + emergency pressure limiting controller → low select → the pressure limiter overrides flow control when pressure is high.' },
  { id: 'a08', chapter: 'advanced', front: 'Ratio control', back: 'Ratio control maintains a fixed ratio between two process variables. Example: fuel-to-air ratio in a combustion system. The wild flow (fuel, uncontrolled) is measured; the controlled flow (air) setpoint = wild flow × ratio. The ratio can be set by the operator or by an outer controller. Ratio control is a form of feedforward — the air flow tracks the fuel flow without waiting for temperature feedback.' },
  { id: 'a09', chapter: 'advanced', front: 'Model Predictive Control (MPC)', back: 'MPC uses a dynamic model of the process to predict future behavior and compute optimal control moves over a prediction horizon. Handles multivariable systems, input/output constraints, and dead time explicitly. Solves a constrained optimization (QP or LP) at each sample time. Used in refinery distillation, advanced process control. Requires system identification, model maintenance, and significant engineering effort compared to PID.' },
  { id: 'a10', chapter: 'advanced', front: 'Bumpless transfer between auto and manual', back: 'Bumpless transfer ensures no sudden output jump when switching between manual and automatic mode. Technique: when in manual, continuously update the integrator state so that u_auto ≈ u_manual. When switching to auto, the output continues smoothly from the current manual value. Without bumpless transfer, the integral term may have accumulated a value far from the current manual output, causing a large bump on mode switch.' },

  // PRACTICAL IMPLEMENTATION
  { id: 'p01', chapter: 'practical', front: 'Integral windup causes and symptoms', back: 'Windup occurs when: output is at a limit (valve fully open/closed), setpoint is far from PV (large error during startup), controller is in auto during an equipment interlock. Symptoms: slow recovery when process returns to normal range, large overshoot after a long-duration error, PV "chases" past setpoint before correcting. Prevention: anti-windup, output tracking, external reset feedback.' },
  { id: 'p02', chapter: 'practical', front: 'Derivative filter', back: 'Pure derivative amplifies high-frequency noise: any noise in PV appears magnified in the derivative term. Solution: add a first-order filter: D_filtered(s) = Kd×s/(Td_filter×s+1), where Td_filter is typically Td/5 to Td/10. This limits derivative gain at high frequencies. Most PLC PID blocks include this as a "N" parameter: D gain high-frequency limit = Kp×N, with N typically 5-20.' },
  { id: 'p03', chapter: 'practical', front: 'Setpoint rate limiting (setpoint lead-lag)', back: 'Instead of applying a step change to SP, a ramp or rate limiter gradually changes SP over time. This prevents the derivative term from spiking and reduces process stress. A setpoint lead-lag filter shapes how the controller sees SP changes: lag slows down the setpoint; lead adds anticipation. Common in temperature control where sudden large SP changes could cause thermal shock.' },
  { id: 'p04', chapter: 'practical', front: 'Sample period selection for digital PID', back: 'Rule of thumb: sample period T ≤ τ/10 (one-tenth of process time constant) to maintain accuracy of discrete approximation. For dead time: T ≤ θ/10. Too slow: discrete approximation diverges from continuous; effective dead time is increased by T/2. Too fast: noise amplification in derivative term; no accuracy benefit below about T=τ/20. In PLCs, use the fastest available scan rate for fast processes.' },
  { id: 'p05', chapter: 'practical', front: 'PV filtering in PID loops', back: 'Sensor noise corrupts derivative action. A first-order filter on PV: PV_filtered = α×PV_filtered(k-1) + (1-α)×PV(k), where α = τ_filter/(τ_filter + T). Trade-off: more filtering (larger α, larger τ_filter) = less noise → derivative better, but filtering adds effective dead time that can destabilize the loop. Filter time constant should be < θ/5 to avoid significant stability impact.' },
  { id: 'p06', chapter: 'practical', front: 'Output tracking during cascade', back: 'In cascade control, when the inner loop is switched to manual or experiences a fault, the outer controller must track the inner loop\'s actual output (rather than its own SP). Output tracking: the outer controller\'s output matches the inner loop\'s PV. This prevents the outer integrator from winding up to an extreme value while the inner loop is disconnected. Enables bumpless reconnection of cascade.' },
  { id: 'p07', chapter: 'practical', front: 'Velocity form vs position form of discrete PID', back: 'Position form: computes the absolute output u(k) = Kp×e(k) + Ki×T×Σe + Kd×(e(k)-e(k-1))/T — requires integrator state memory; sensitive to integrator windup. Velocity form (incremental): computes Δu(k) = u(k)-u(k-1) = Kp×(e(k)-e(k-1)) + Ki×T×e(k) + Kd×(e(k)-2e(k-1)+e(k-2))/T — naturally bumpless on gain changes; integrator saturation is easier to manage.' },
  { id: 'p08', chapter: 'practical', front: 'PID in Rockwell Logix (PIDE block)', back: 'Rockwell\'s PIDE (Enhanced PID) function block in Studio 5000 uses velocity form. Key parameters: Kp (proportional gain), Ti (integral time in minutes), Td (derivative time in minutes), TiMode (seconds or minutes), CVMaxRaw/CVMinRaw (output limits), PVTracking, WindupHigh/Low. CV = controller output (0-100%). Uses derivative on PV by default. Set DependentGain=0 for independent (parallel) form.' },
  { id: 'p09', chapter: 'practical', front: 'Loop performance metrics', back: 'Common metrics to evaluate loop performance: IAE (Integral of Absolute Error = ∫|e(t)|dt) — total error area, lower is better. ISE (Integral of Squared Error = ∫e(t)²dt) — penalizes large errors more than IAE. ITAE (Integral of Time×Absolute Error = ∫t×|e(t)|dt) — penalizes long-duration errors. Rise time, settling time, overshoot %, steady-state error. Use process historian data to compute these offline.' },
  { id: 'p10', chapter: 'practical', front: 'Troubleshooting oscillating PID loop', back: 'Oscillating loop diagnosis: (1) Is oscillation frequency equal to the resonant frequency (fast cycling)? → Kp too high, reduce Kp first. (2) Slow, large-amplitude oscillation? → Integral too aggressive (Ti too short), increase Ti. (3) Output railing (0% or 100% for long periods)? → Windup or undersized valve. (4) Oscillation only on SP changes? → Derivative kick, switch D-on-PV or reduce Kd. (5) Oscillation even in manual? → External mechanical cause, not tuning.' },
  { id: 'p11', chapter: 'practical', front: 'Troubleshooting sluggish PID loop', back: 'Sluggish loop: PV reaches SP eventually but too slowly, or has large steady-state error. Diagnosis: (1) Large steady-state offset? → No integral action, or Ti too long, decrease Ti. (2) Very slow SP tracking? → Kp too low, increase Kp. (3) Did process gain change (e.g., valve partially blocked)? → Re-identify K, retune. (4) Is valve saturated (physically at limit even though controller says 50%)? → Valve undersized or mechanical problem.' },
  { id: 'p12', chapter: 'practical', front: 'Stiction and stick-slip in control valves', back: 'Stiction (static friction) in control valves causes the valve to stick until enough force builds up, then it jumps — producing "stick-slip" oscillation. A PID controller trying to make small adjustments cannot move a sticky valve. The integral term winds up trying to overcome friction, then the valve suddenly jumps past the setpoint. Diagnosis: plot controller output vs valve position. Fix: valve repair, positioner calibration, or dither signal. PID tuning cannot fix a mechanical problem.' },
]

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function saveProgress(prog) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prog))
}

function seededShuffle(arr, seed) {
  const a = [...arr]
  let s = seed >>> 0
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s ^ (s >>> 15), s | 1) ^ (s + Math.imul(s ^ (s >>> 7), s | 61))) >>> 0
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Flashcards() {
  const [chapter, setChapter] = useState('all')
  const [progress, setProgress] = useState(loadProgress)
  const [shuffled, setShuffled] = useState(false)
  const [seed, setSeed] = useState(Date.now())
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const baseCards = chapter === 'all' ? FLASHCARDS : FLASHCARDS.filter(c => c.chapter === chapter)
  const cards = shuffled ? seededShuffle(baseCards, seed) : baseCards
  const current = cards[index] || null

  const isMastered = current ? !!progress[current.id]?.mastered : false
  const isSeen = current ? !!progress[current.id]?.seen : false
  const seenCount = cards.filter(c => progress[c.id]?.seen).length
  const masteredCount = cards.filter(c => progress[c.id]?.mastered).length
  const pct = cards.length ? Math.round((masteredCount / cards.length) * 100) : 0

  const go = useCallback((dir) => {
    if (animating) return
    setAnimating(true)
    setFlipped(false)
    setTimeout(() => {
      setIndex(i => {
        const next = i + dir
        if (next < 0) return cards.length - 1
        if (next >= cards.length) return 0
        return next
      })
      setAnimating(false)
    }, 200)
  }, [animating, cards.length])

  const flip = useCallback(() => {
    if (animating) return
    setFlipped(f => !f)
    if (current) {
      const p = { ...progress }
      p[current.id] = { ...p[current.id], seen: true }
      setProgress(p)
      saveProgress(p)
    }
  }, [animating, current, progress])

  const markMastered = useCallback(() => {
    if (!current) return
    const p = { ...progress }
    p[current.id] = { ...p[current.id], seen: true, mastered: true }
    setProgress(p)
    saveProgress(p)
    go(1)
  }, [current, progress, go])

  const markNeeds = useCallback(() => {
    if (!current) return
    const p = { ...progress }
    p[current.id] = { ...p[current.id], seen: true, mastered: false }
    setProgress(p)
    saveProgress(p)
    go(1)
  }, [current, progress, go])

  const resetProgress = () => {
    setProgress({})
    saveProgress({})
    setIndex(0)
    setFlipped(false)
  }

  const doShuffle = () => { setSeed(Date.now()); setShuffled(true); setIndex(0); setFlipped(false) }
  const unShuffle = () => { setShuffled(false); setIndex(0); setFlipped(false) }

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); flip() }
      if (e.code === 'ArrowRight' || e.code === 'KeyL') go(1)
      if (e.code === 'ArrowLeft' || e.code === 'KeyH') go(-1)
      if (e.code === 'KeyM') markMastered()
      if (e.code === 'KeyN') markNeeds()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [flip, go, markMastered, markNeeds])

  useEffect(() => { setIndex(0); setFlipped(false) }, [chapter])

  if (!current) return (
    <div className="p-8 text-center text-slate-400">No cards for this category yet.</div>
  )

  return (
    <div className="min-h-screen p-4 lg:p-8" style={{ background: 'linear-gradient(135deg, #060e1a, #0f1e37, #0a1628)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen size={24} style={{ color: '#22d3ee' }} />
              PID Control Flashcards
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">{FLASHCARDS.length} cards · Space to flip · ← → navigate · M mastered · N needs review</p>
          </div>
          <button
            onClick={() => setShowHint(h => !h)}
            className="p-2 rounded-xl text-slate-400 transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            title="Keyboard shortcuts"
          >
            <Keyboard size={20} />
          </button>
        </div>

        {showHint && (
          <div className="mb-4 p-4 rounded-2xl text-xs text-slate-500 grid grid-cols-2 gap-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div><kbd className="px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.1)' }}>Space</kbd> Flip card</div>
            <div><kbd className="px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.1)' }}>← →</kbd> Navigate</div>
            <div><kbd className="px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.1)' }}>M</kbd> Mark mastered</div>
            <div><kbd className="px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.1)' }}>N</kbd> Needs review</div>
          </div>
        )}

        {/* Chapter filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FLASHCARD_CHAPTERS.map(ch => (
            <button
              key={ch.id}
              onClick={() => setChapter(ch.id)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
              style={chapter === ch.id
                ? { background: '#0077a8', color: 'white', boxShadow: '0 0 12px rgba(0,180,216,0.4)' }
                : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {ch.label}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-6 p-4 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>{index + 1} / {cards.length} cards</span>
            <div className="flex gap-4">
              <span className="text-amber-500 font-semibold">{seenCount} seen</span>
              <span className="font-semibold" style={{ color: '#34d399' }}>{masteredCount} mastered</span>
              <span className="font-bold" style={{ color: '#22d3ee' }}>{pct}%</span>
            </div>
          </div>
          <div className="h-2 rounded-full overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="absolute left-0 top-0 h-full rounded-full bg-amber-400 transition-all duration-500"
              style={{ width: `${cards.length ? (seenCount / cards.length) * 100 : 0}%` }} />
            <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
              style={{ width: `${cards.length ? (masteredCount / cards.length) * 100 : 0}%`, background: '#34d399' }} />
          </div>
          {cards.length <= 25 && (
            <div className="flex gap-1 mt-2 justify-center flex-wrap">
              {cards.map((c, i) => (
                <button key={c.id} onClick={() => { setIndex(i); setFlipped(false) }}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                  style={{
                    transform: i === index ? 'scale(1.5)' : 'scale(1)',
                    background: i === index ? '#22d3ee' : progress[c.id]?.mastered ? '#34d399' : progress[c.id]?.seen ? '#fbbf24' : 'rgba(255,255,255,0.15)',
                  }} />
              ))}
            </div>
          )}
        </div>

        {/* Card */}
        <div onClick={flip} className="relative cursor-pointer select-none mb-6"
          style={{ perspective: '1200px', minHeight: 300 }}>
          <div className="relative w-full transition-transform duration-500"
            style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', minHeight: 300 }}>

            {/* Front */}
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <div className="h-full min-h-[300px] rounded-3xl p-8 flex flex-col"
                style={{ background: 'rgba(10,22,40,0.95)', border: '2px solid rgba(0,180,216,0.3)', boxShadow: '0 0 40px rgba(0,180,216,0.1)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ background: 'rgba(0,180,216,0.15)', color: '#22d3ee' }}>
                    {FLASHCARD_CHAPTERS.find(c => c.id === current.chapter)?.label || current.chapter}
                  </span>
                  {isMastered && (
                    <span className="px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>
                      <Check size={12} /> Mastered
                    </span>
                  )}
                  {isSeen && !isMastered && (
                    <span className="px-2 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>Review</span>
                  )}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xl font-semibold text-white text-center leading-relaxed">{current.front}</p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 text-sm">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center animate-bounce">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                  </div>
                  <span>Tap to reveal</span>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div className="h-full min-h-[300px] rounded-3xl p-8 flex flex-col"
                style={{ background: 'linear-gradient(135deg, rgba(6,14,26,0.98), rgba(0,40,70,0.95))', border: '2px solid rgba(0,180,216,0.2)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                    {current.front}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Definition</span>
                </div>
                <div className="flex-1 flex items-start justify-center overflow-y-auto">
                  <p className="text-sm leading-relaxed text-left w-full" style={{ color: '#cbd5e1' }}>{current.back}</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={(e) => { e.stopPropagation(); markNeeds() }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                    style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>
                    <X size={16} /> Needs Review
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); markMastered() }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                    style={{ background: 'rgba(52,211,153,0.15)', color: '#6ee7b7' }}>
                    <Check size={16} /> Got It
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button onClick={() => go(-1)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm text-slate-300 transition-all active:scale-95"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronLeft size={18} /> Prev
          </button>

          <div className="flex gap-2">
            <button onClick={shuffled ? unShuffle : doShuffle}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95"
              style={shuffled
                ? { background: '#0077a8', color: 'white', boxShadow: '0 0 12px rgba(0,180,216,0.3)' }
                : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }
              }>
              <Shuffle size={16} /> {shuffled ? 'Shuffled' : 'Shuffle'}
            </button>
            <button onClick={resetProgress}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm text-slate-500 transition-all active:scale-95 hover:text-red-400"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              title="Reset progress">
              <RotateCcw size={16} />
            </button>
          </div>

          <button onClick={() => go(1)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm text-slate-300 transition-all active:scale-95"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
