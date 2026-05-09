export const QUIZZES = {
  intro: [
    {
      id: 'intro1',
      type: 'mcq',
      question: 'Which of the following is an example of an open-loop control system?',
      options: ['Cruise control on a car', 'A household thermostat', 'A toaster with a timer', 'A level controller on a tank'],
      answer: 2,
      explanation: 'A toaster with a timer is open-loop — it runs for a fixed time regardless of whether your bread is incinerated or still cold. No feedback, no measurement, no mercy. Closed-loop systems like thermostats actually check the result and adjust accordingly.'
    },
    {
      id: 'intro2',
      type: 'mcq',
      question: 'What is the primary advantage of a closed-loop control system over an open-loop system?',
      options: [
        'It is simpler to design',
        'It uses less energy',
        'It automatically compensates for disturbances using feedback',
        'It never requires tuning'
      ],
      answer: 2,
      explanation: 'Closed-loop control measures what actually happened and corrects for it. Disturbances — feed changes, ambient temperature swings, your operator bumping the valve — get corrected automatically. Open-loop just blindly executes and hopes for the best.'
    },
    {
      id: 'intro3',
      type: 'mcq',
      question: 'In control terminology, the Setpoint (SP) refers to:',
      options: [
        'The current measured value of the process',
        'The desired value the controller tries to maintain',
        'The output signal sent to the valve',
        'The error between measurement and output'
      ],
      answer: 1,
      explanation: 'The Setpoint is the target — what you want. The Process Variable is what you have. The controller spends its entire existence trying to make those two numbers agree. It is the sisyphean task of automation.'
    },
    {
      id: 'intro4',
      type: 'fill',
      question: 'The formula for control error is e = ___ − ___.',
      answer: 'SP - PV',
      hint: 'Desired value minus measured value',
      explanation: 'Error = SP − PV. Positive error means the process is below setpoint; negative error means it is above. The controller acts to drive this error toward zero — which in practice means it oscillates around zero forever if you tune it poorly enough.'
    },
    {
      id: 'intro5',
      type: 'mcq',
      question: 'Negative feedback in a control loop:',
      options: [
        'Amplifies deviations and causes instability',
        'Reduces deviations and stabilizes the process',
        'Has no effect on stability',
        'Is used only in open-loop systems'
      ],
      answer: 1,
      explanation: 'Negative feedback subtracts the measured value from the setpoint to get error, then drives the process back toward setpoint. It is the foundation of all stable control. Positive feedback does the opposite — it amplifies errors and produces the kind of runaway behavior that features in incident reports.'
    },
    {
      id: 'intro6',
      type: 'mcq',
      question: 'The Controller Output (CO) is best described as:',
      options: [
        'The measured process variable',
        'The desired setpoint value',
        'The signal sent to the final control element (e.g., valve)',
        'The difference between SP and PV'
      ],
      answer: 2,
      explanation: 'The CO is what the controller tells the final control element to do — typically a 4–20 mA signal to a control valve or VFD. The PV tells you where the process is. The CO is what you do about it. Confusing these two is a rite of passage for new engineers.'
    },
    {
      id: 'intro7',
      type: 'mcq',
      question: 'A cruise control system is a classic example of closed-loop control because:',
      options: [
        'It applies a fixed throttle regardless of road grade',
        'It measures vehicle speed and adjusts throttle to maintain the set speed',
        'It uses the driver\'s input directly to control speed',
        'It only works on flat roads with no disturbances'
      ],
      answer: 1,
      explanation: 'Cruise control measures actual speed (PV), compares it to the set speed (SP), and adjusts throttle (CO) continuously. Going uphill? It opens the throttle. Downhill? It backs off. No feedback = no hill compensation = you accelerating into a ditch.'
    },
    {
      id: 'intro8',
      type: 'mcq',
      question: 'Which scenario demonstrates positive feedback — and why is it dangerous?',
      options: [
        'A thermostat that turns the heater off when temperature reaches setpoint',
        'A level controller that opens the inlet valve when level rises — causing more rise',
        'A flow controller that closes a valve when flow exceeds setpoint',
        'A pressure controller that reduces compressor speed at high pressure'
      ],
      answer: 1,
      explanation: 'Positive feedback amplifies the error instead of correcting it. A level controller that opens the inlet when level rises will fill the tank until it overflows. This is how minor deviations become catastrophic failures. Negative feedback is your friend. Positive feedback is the reason for process hazard analyses.'
    },
  ],

  loop: [
    {
      id: 'loop1',
      type: 'mcq',
      question: 'In a feedback control loop, what is the correct order of signal flow?',
      options: [
        'CO → Process → PV → Controller → CO',
        'PV → SP → Error → CO → Process',
        'Measure PV → Compute error → Controller computes CO → CO drives MV → Affects process → New PV',
        'SP → CO → Error → MV → PV'
      ],
      answer: 2,
      explanation: 'The loop goes: measure PV, subtract from SP to get error, controller calculates CO, CO drives the final control element (MV), which changes the process, which produces a new PV. Round and round it goes. This is why it\'s called a loop.'
    },
    {
      id: 'loop2',
      type: 'fill',
      question: 'The Manipulated Variable (MV) is the physical quantity the controller changes — for example, the ___ position on a control valve.',
      answer: 'stem',
      hint: 'The mechanical part that moves inside a valve',
      explanation: 'The MV is what gets physically moved — valve stem position, pump speed, heater power. The Controller Output (CO) commands it. Don\'t confuse MV (the physical thing that moves) with CO (the signal that tells it to move). They are related but distinct, especially with positioners in the loop.'
    },
    {
      id: 'loop3',
      type: 'mcq',
      question: 'A disturbance in a control loop is best defined as:',
      options: [
        'A change in the setpoint made by the operator',
        'An uncontrolled input that affects the process variable',
        'The derivative action of the PID controller',
        'The steady-state offset caused by P-only control'
      ],
      answer: 1,
      explanation: 'Disturbances are anything that upsets the process that the controller didn\'t cause and can\'t directly control. Feed temperature change, ambient conditions, upstream pressure variations — these are disturbances. The controller\'s job is to reject them. If it does it slowly, that\'s bad. If it overreacts, that\'s also bad.'
    },
    {
      id: 'loop4',
      type: 'mcq',
      question: 'A setpoint change and a load disturbance are both upsets a controller must handle. What distinguishes them?',
      options: [
        'A setpoint change affects only the PV; a load disturbance affects only the CO',
        'A setpoint change is operator-initiated at the SP; a load disturbance is an uncontrolled process input',
        'Load disturbances always cause more oscillation than setpoint changes',
        'They are functionally identical from the controller\'s perspective'
      ],
      answer: 1,
      explanation: 'A setpoint change is intentional — the operator wants a new target. A load disturbance is uninvited — the process gets kicked by something external. Controllers often need different tuning philosophies depending on which type of upset dominates. Aggressive SP tracking can cause oscillation on load disturbances and vice versa.'
    },
    {
      id: 'loop5',
      type: 'mcq',
      question: 'In a standard feedback loop, where is the error signal computed?',
      options: [
        'At the transmitter',
        'At the final control element',
        'At the summing junction (comparator) in the controller',
        'In the process itself'
      ],
      answer: 2,
      explanation: 'The error is computed at the summing junction — the point where SP and PV are compared (SP − PV = e). In a physical controller or PLC, this calculation happens inside the controller logic, not in the field. The transmitter just reports PV; the field device just executes CO.'
    },
    {
      id: 'loop6',
      type: 'mcq',
      question: 'Which component in a control loop is typically the "final control element"?',
      options: [
        'The transmitter',
        'The setpoint station',
        'A control valve or variable-frequency drive (VFD)',
        'The PLC CPU'
      ],
      answer: 2,
      explanation: 'The final control element is the device that physically changes something in the process — most commonly a control valve (for flow, pressure, temperature) or a VFD (for pump/motor speed). The controller thinks; the valve acts. One bad actuator can defeat the most perfectly-tuned PID.'
    },
    {
      id: 'loop7',
      type: 'fill',
      question: 'If the setpoint is 75°F and the process variable is 80°F, the error e = ___.',
      answer: '-5',
      hint: 'e = SP − PV',
      explanation: 'e = 75 − 80 = −5. Negative error means the process is above setpoint. For a heating controller, this means reduce heat. For a cooling controller, this means increase cooling. The sign of the error determines the direction of the controller action — getting this backwards is a fast path to a runaway.'
    },
    {
      id: 'loop8',
      type: 'mcq',
      question: 'Why is it important to understand feedback vs feedforward control?',
      options: [
        'Feedforward control measures the PV and reacts after the fact',
        'Feedforward control anticipates disturbances using a model, while feedback reacts to error after it occurs',
        'Feedforward eliminates the need for a setpoint',
        'Feedback and feedforward are identical in industrial practice'
      ],
      answer: 1,
      explanation: 'Feedforward is predictive — it measures a disturbance upstream and compensates before the PV is affected. Feedback is reactive — it waits for the error to show up and then corrects it. Combined feedforward-feedback is best. Pure feedforward with a bad model is worse than nothing.'
    },
    {
      id: 'loop9',
      type: 'mcq',
      question: 'What is "direct acting" control action?',
      options: [
        'CO increases when PV increases (PV↑ → CO↑)',
        'CO increases when error increases (e↑ → CO↑)',
        'CO decreases when PV increases (PV↑ → CO↓)',
        'CO is fixed regardless of PV'
      ],
      answer: 0,
      explanation: 'Direct acting: as PV goes up, CO goes up. Example: a cooling valve controller — higher temperature means more cooling valve opening. Reverse acting: as PV goes up, CO goes down. Example: a heating controller — higher temperature means reduce heat. Configuring the wrong action causes positive feedback and an immediate bad day.'
    },
    {
      id: 'loop10',
      type: 'mcq',
      question: 'In a closed-loop block diagram, the transmitter\'s function is to:',
      options: [
        'Compare SP and PV to generate the error signal',
        'Convert the physical process variable into a standardized signal (e.g., 4–20 mA)',
        'Amplify the controller output before it reaches the valve',
        'Set the desired operating point for the process'
      ],
      answer: 1,
      explanation: 'The transmitter measures a physical quantity (pressure, temperature, flow, level) and converts it to a standardized electrical signal — typically 4–20 mA or a digital value. Without an accurate transmitter, the controller is flying blind. Calibration drift in the transmitter shows up as a mysterious offset that drives operators insane.'
    },
  ],

  pid: [
    {
      id: 'pid1',
      type: 'mcq',
      question: 'The Proportional term of a PID controller produces an output that is:',
      options: [
        'Proportional to the integral of the error over time',
        'Proportional to the rate of change of the error',
        'Proportional to the current error',
        'Proportional to the setpoint value'
      ],
      answer: 2,
      explanation: 'P = Kp × e(t). Simple, immediate, direct. Large error → large correction. The problem? Once the error shrinks, so does the correction — which means it never quite reaches zero. That\'s called offset, and it\'s Proportional control\'s original sin.'
    },
    {
      id: 'pid2',
      type: 'mcq',
      question: 'Proportional Band (PB%) is related to proportional gain (Kp) by:',
      options: [
        'PB% = Kp × 100',
        'PB% = 100 / Kp',
        'PB% = Kp / 100',
        'PB% = 100 − Kp'
      ],
      answer: 1,
      explanation: 'PB% = 100 / Kp. A PB of 20% means a 20% change in error drives a 100% change in output — which is a high gain (Kp = 5). A PB of 200% is low gain (Kp = 0.5) — sluggish but stable. Old pneumatic controllers used PB. Modern digital controllers use Kp. Know both.'
    },
    {
      id: 'pid3',
      type: 'mcq',
      question: 'P-only control always results in steady-state offset unless:',
      options: [
        'The setpoint is zero',
        'The process has integrating (non-self-regulating) behavior',
        'The proportional gain is set to exactly 1.0',
        'The process has no dead time'
      ],
      answer: 1,
      explanation: 'With P-only, the output is zero when error is zero — which means you need some steady-state error to maintain any finite controller output. The one exception is integrating processes (like liquid level), which will reach setpoint under P-only because they integrate the output themselves. For self-regulating processes, offset is inevitable. That\'s what I is for.'
    },
    {
      id: 'pid4',
      type: 'mcq',
      question: 'The Integral term eliminates steady-state offset by:',
      options: [
        'Reacting proportionally to the current error magnitude',
        'Anticipating future error based on its rate of change',
        'Accumulating error over time and increasing output until error reaches zero',
        'Filtering high-frequency noise from the PV signal'
      ],
      answer: 2,
      explanation: 'Integral keeps adding to the output as long as any error exists. Even a tiny persistent error will eventually drive the integrator to the output needed to eliminate it. This is why I eliminates offset. It\'s also why it causes windup when the output saturates — it keeps integrating even though the valve is already wide open.'
    },
    {
      id: 'pid5',
      type: 'fill',
      question: 'Integral windup occurs when the controller output saturates at its limit while the ___ continues to accumulate.',
      answer: 'integrator',
      hint: 'The I term keeps adding even when nothing is moving',
      explanation: 'When the output hits 100% (or 0%), the valve can\'t open any further — but if there\'s still error, the integrator keeps accumulating. When the condition clears and the error reverses, the controller has a massive integrator value to unwind before it can respond normally. This causes a slow, sloppy recovery. Anti-windup logic prevents this.'
    },
    {
      id: 'pid6',
      type: 'mcq',
      question: 'Integral time Ti (in minutes/repeat) — a larger Ti value means:',
      options: [
        'Faster integral action (more aggressive)',
        'Slower integral action (less aggressive)',
        'No integral action at all',
        'Doubled proportional gain'
      ],
      answer: 1,
      explanation: 'Ti is the inverse of integral rate. Larger Ti = fewer repeats per minute = slower integration = less aggressive integral action. If Ti is too small, the integrator winds up fast and causes oscillation. If Ti is too large, offset correction is glacially slow. Some vendors express this as Ki (repeats/minute = 1/Ti) which is backwards-confusing on purpose, apparently.'
    },
    {
      id: 'pid7',
      type: 'mcq',
      question: 'The Derivative term acts on:',
      options: [
        'The accumulated sum of past errors',
        'The current error magnitude',
        'The rate of change of error (or PV)',
        'The difference between CO and SP'
      ],
      answer: 2,
      explanation: 'D = Kd × d(e)/dt — it acts on how fast the error is changing. If error is growing rapidly, D kicks in early to slow the response before the error gets large. It\'s predictive. It also amplifies every noise spike on your PV signal, which is why derivative filtering is not optional in noisy industrial environments.'
    },
    {
      id: 'pid8',
      type: 'mcq',
      question: 'Why is "derivative on measurement" preferred over "derivative on error" in most industrial controllers?',
      options: [
        'It provides faster setpoint tracking',
        'It avoids derivative kick when the operator makes a setpoint change',
        'It eliminates the need for integral action',
        'It reduces the effect of process dead time'
      ],
      answer: 1,
      explanation: 'When you change the setpoint, the error jumps instantaneously. If D is applied to error, you get a massive derivative spike — a "kick" — that slams the valve. Applying D to the PV instead (which changes slowly) avoids this. The setpoint change still gets handled by P and I, just without the whiplash.'
    },
    {
      id: 'pid9',
      type: 'mcq',
      question: 'The full parallel PID equation is:',
      options: [
        'u(t) = Kp × e(t) only',
        'u(t) = Kp[e(t) + (1/Ti)∫e dt + Td·de/dt]',
        'u(t) = Kp × e(t) + Ki × e(t) + Kd × e(t)',
        'u(t) = (1/Ti) × ∫e dt'
      ],
      answer: 1,
      explanation: 'u(t) = Kp[e(t) + (1/Ti)∫e dt + Td·de/dt]. This is the ideal PID form. The bracketed quantity sums proportional, integral, and derivative actions, all scaled by Kp. Some formulations use Kp, Ki, Kd independently (parallel form). They\'re equivalent with different parameter relationships — a fact that causes maximum confusion during commissioning.'
    },
    {
      id: 'pid10',
      type: 'mcq',
      question: 'Which PID mode is most susceptible to amplifying sensor noise?',
      options: [
        'Proportional (P)',
        'Integral (I)',
        'Derivative (D)',
        'All three equally'
      ],
      answer: 2,
      explanation: 'Derivative amplifies the rate of change — which is exactly what noise looks like. A small high-frequency noise signal has a large derivative. High D gain on a noisy PV signal turns the controller output into a jackhammer. This is why derivative filters (low-pass) are standard practice, not optional.'
    },
    {
      id: 'pid11',
      type: 'fill',
      question: 'In a P-only controller with Kp = 4 and error e = 3%, the controller output contribution from P is ___.',
      answer: '12',
      hint: 'CO_P = Kp × e',
      explanation: 'CO_P = 4 × 3 = 12% (above the bias). The bias is typically 50% or whatever output is needed to maintain steady state. Proportional action adds/subtracts from this bias based on current error. Set Kp too high and a 3% error produces a 12% kick — which may be appropriate or catastrophic depending on your process.'
    },
    {
      id: 'pid12',
      type: 'mcq',
      question: 'A controller with only Integral action (I-only) would:',
      options: [
        'Respond instantly and eliminate offset',
        'Respond slowly and eventually eliminate offset, but with significant lag and potential instability',
        'Be equivalent to P-only control',
        'Never reach the setpoint'
      ],
      answer: 1,
      explanation: 'I-only integrates error over time. At startup with no error, the output is zero — so it takes time to build up output. The response is slow and prone to oscillation because there\'s no proportional "backbone" to anchor it. I-only is almost never used alone in process control. It exists mainly as a cautionary tale.'
    },
    {
      id: 'pid13',
      type: 'mcq',
      question: 'When would you typically use PD control (no integral) rather than full PID?',
      options: [
        'When you need to eliminate steady-state offset',
        'When the process already has integrating behavior and offset is not a concern',
        'When derivative action is causing instability',
        'When the process has significant dead time'
      ],
      answer: 1,
      explanation: 'Integrating processes (like liquid level) already have a natural integrator — adding an I term to the controller doubles up the integration and causes oscillation. PD control on an integrating process gives you stable, offset-free control without the instability risk. This is a nuance that bites people who apply the same template to every loop.'
    },
    {
      id: 'pid14',
      type: 'mcq',
      question: 'The proportional term causes "proportional droop" (offset). This means:',
      options: [
        'The CO drifts to zero over time',
        'At steady state with a load, the PV settles below (or above) SP by a finite amount',
        'The PV oscillates continuously',
        'The integral term takes over and eliminates offset'
      ],
      answer: 1,
      explanation: 'With P-only, the controller needs nonzero error to maintain a nonzero output. At steady state under load, the PV is NOT at SP — it sits offset by whatever error is needed to hold the output. More load → more error needed → more droop. It\'s not a bug, it\'s a mathematical consequence of proportional-only control.'
    },
    {
      id: 'pid15',
      type: 'mcq',
      question: 'Which combination of PID terms provides the best overall performance for most self-regulating industrial processes?',
      options: [
        'P-only',
        'I-only',
        'PI (Proportional + Integral)',
        'PD (Proportional + Derivative)'
      ],
      answer: 2,
      explanation: 'PI is the workhorse of process control. P gives fast initial response; I eliminates the inevitable offset. Derivative is often skipped because most process signals are too noisy to use D effectively without careful filtering. Full PID is reserved for processes with significant lag that benefit from predictive derivative action. When in doubt, start with PI.'
    },
  ],

  tuning: [
    {
      id: 'tune1',
      type: 'mcq',
      question: 'In an open-loop step test, what three parameters are estimated from the PV response?',
      options: [
        'Kp, Ti, Td',
        'K (process gain), τ (time constant), θ (dead time)',
        'Ku (ultimate gain), Pu (ultimate period), PB%',
        'SP, PV, CO'
      ],
      answer: 1,
      explanation: 'The open-loop step test gives you the FOPDT model parameters: K = steady-state gain (ΔPVSS / ΔCO), τ = time constant (time to reach 63.2% of total change after dead time ends), θ = dead time (lag before anything happens). These three numbers are everything you need to calculate initial PID tuning. Mess up the test and your tuning is garbage from the start.'
    },
    {
      id: 'tune2',
      type: 'mcq',
      question: 'Ziegler-Nichols closed-loop tuning requires finding:',
      options: [
        'The process gain K and time constant τ from a step test',
        'The ultimate gain Ku and ultimate period Pu by increasing Kp until sustained oscillation',
        'The lambda parameter λ and dead time θ',
        'The integral time Ti and derivative time Td independently'
      ],
      answer: 1,
      explanation: 'Z-N closed-loop: run the controller in P-only, increase Kp until the PV oscillates with constant amplitude (neither growing nor dying) — that\'s Ku. Measure the period of those oscillations — that\'s Pu. Then use the Z-N lookup table to get Kp = 0.6Ku, Ti = Pu/2, Td = Pu/8. This works, but the resulting tuning is famously aggressive. Have your hand on the manual override.'
    },
    {
      id: 'tune3',
      type: 'fill',
      question: 'For Ziegler-Nichols PID tuning: Kp = 0.6 × Ku, Ti = Pu / ___, Td = Pu / ___.',
      answer: '2, 8',
      hint: 'Classic Z-N fractions',
      explanation: 'Z-N PID: Kp = 0.6Ku, Ti = Pu/2, Td = Pu/8. These formulas are designed for good disturbance rejection but produce a response with roughly 25% overshoot. If that\'s too aggressive (and it usually is for process control), detune by reducing Kp by 20–30% and lengthening Ti.'
    },
    {
      id: 'tune4',
      type: 'mcq',
      question: 'Lambda (λ) tuning sets the desired closed-loop response by specifying:',
      options: [
        'The ultimate gain of the process',
        'The desired closed-loop time constant — how fast the closed-loop responds',
        'The maximum allowable overshoot percentage',
        'The proportional band in percent'
      ],
      answer: 1,
      explanation: 'Lambda tuning (IMC-based) sets λ as the desired closed-loop time constant. Larger λ = slower, more robust response. Smaller λ = faster, more aggressive. The math maps λ directly to Kp and Ti based on the FOPDT model. It\'s more systematic than Z-N and gives you a tuning knob that actually makes physical sense.'
    },
    {
      id: 'tune5',
      type: 'mcq',
      question: 'The "robustness vs. performance" tradeoff in PID tuning means:',
      options: [
        'Faster response always produces better control quality',
        'Slower response is always safer and should always be chosen',
        'More aggressive tuning improves speed but reduces stability margin; more conservative tuning is stable but slow',
        'Robustness and performance can both be maximized simultaneously'
      ],
      answer: 2,
      explanation: 'Every PID loop lives on this tradeoff. Crank up the gains: fast response, but one bad disturbance and you\'re oscillating. Back off the gains: rock-solid stable, but upsets take forever to recover from. The right answer is process-dependent and operator-tolerance-dependent. Neither extreme is universally correct.'
    },
    {
      id: 'tune6',
      type: 'mcq',
      question: 'When conducting an open-loop step test, the step change in CO should be:',
      options: [
        'As large as possible to get a clear signal',
        'Large enough to produce a measurable PV response above noise, typically 5–15% of CO range',
        'Exactly 50% of the CO range for accurate results',
        'Made while the process is starting up from zero'
      ],
      answer: 1,
      explanation: 'Too small a step and the PV response drowns in noise; too large and you upset the process or drive it into nonlinear territory. 5–15% is the practical sweet spot. Also: perform the test at the expected operating point, not at startup. A process gain identified at startup may be completely wrong at operating conditions.'
    },
    {
      id: 'tune7',
      type: 'mcq',
      question: 'What does the θ/τ ratio tell you about a process?',
      options: [
        'The steady-state gain of the process',
        'The ratio of dead time to lag — higher ratios are harder to control',
        'The optimal proportional gain for PID tuning',
        'The number of oscillations before the loop stabilizes'
      ],
      answer: 1,
      explanation: 'θ/τ is the controllability ratio. When θ/τ < 0.5, control is relatively easy — there\'s plenty of lag after dead time ends for the controller to react. When θ/τ > 1.0, you\'re in trouble — dead time dominates and the controller is mostly flying blind. Dead time is the enemy. You cannot control what hasn\'t happened yet.'
    },
    {
      id: 'tune8',
      type: 'mcq',
      question: 'The correct order for adding PID terms during initial tuning is:',
      options: [
        'Add D first, then P, then I last',
        'Add I first to eliminate offset, then P for response speed, then D',
        'Start with Kp low, then add I slowly, then add D last if needed',
        'Set all three simultaneously using the Z-N table'
      ],
      answer: 2,
      explanation: 'Start with just P — get the speed approximately right. Then add I slowly (large Ti first, decrease gradually) to eliminate offset. Add D last, and only if needed — it amplifies noise and causes more problems than it solves on most process loops. Resist the urge to tune all three at once. That\'s how you end up with a loop that nobody can characterize.'
    },
    {
      id: 'tune9',
      type: 'fill',
      question: 'In an open-loop step test, τ is defined as the time for the PV to reach ___% of its total change after the dead time ends.',
      answer: '63.2',
      hint: '1 - 1/e ≈ this percentage',
      explanation: '63.2% — the first-order time constant. For a perfect FOPDT process, at t = θ + τ the PV has moved 63.2% of the way to its new steady state. Graphically, draw a tangent to the steepest part of the response — where it intersects the initial and final values gives you θ and τ. Most processes are not perfect FOPDT. This is an approximation. Use it anyway.'
    },
    {
      id: 'tune10',
      type: 'mcq',
      question: 'Process gain K in an open-loop step test is calculated as:',
      options: [
        'K = ΔCO / ΔPV',
        'K = ΔPVSS / ΔCO',
        'K = τ / θ',
        'K = Ku × 0.6'
      ],
      answer: 1,
      explanation: 'K = ΔPVSS / ΔCO — the ratio of the steady-state PV change to the CO step size, both in engineering units or percent. If a 10% CO step causes a 30% PV change at steady state, K = 3. High gain = sensitive process. Low gain = sluggish process. Knowing K lets you avoid over- or under-sizing your proportional action.'
    },
    {
      id: 'tune11',
      type: 'mcq',
      question: 'Which statement best describes Lambda/IMC tuning compared to Ziegler-Nichols?',
      options: [
        'Lambda tuning is always more aggressive than Z-N',
        'Lambda tuning requires oscillating the process to find Ku',
        'Lambda tuning is model-based and lets you explicitly trade off speed vs. robustness via the λ parameter',
        'Lambda tuning only works for integrating processes'
      ],
      answer: 2,
      explanation: 'Lambda tuning uses the FOPDT model (K, τ, θ) from a step test — no need to oscillate the loop. You pick λ to set the closed-loop speed, which translates directly to Kp and Ti. Conservative λ (large) gives robust, slow control. Aggressive λ (small, typically λ ≥ θ) gives fast control but less margin. It\'s the grown-up alternative to Z-N.'
    },
    {
      id: 'tune12',
      type: 'mcq',
      question: 'After tuning, your loop has a 30% overshoot on setpoint changes. To reduce overshoot WITHOUT slowing load disturbance rejection, you should:',
      options: [
        'Reduce Kp significantly',
        'Increase Ti to reduce integral action',
        'Apply setpoint filtering or setpoint ramping',
        'Increase Td to predict the overshoot'
      ],
      answer: 2,
      explanation: 'Setpoint filtering (ramping or first-order filtering the SP signal) smooths the apparent setpoint change, reducing the P-kick on large SP steps. This reduces overshoot without weakening the feedback gains that handle load disturbances. It\'s a classic trick: tune for disturbances, filter for setpoint changes. Two different problems, two different solutions.'
    },
  ],

  process: [
    {
      id: 'proc1',
      type: 'mcq',
      question: 'FOPDT stands for:',
      options: [
        'First-Order Proportional Dead Time',
        'First-Order Plus Dead Time',
        'Full-Output PID Derivative Term',
        'Frequency-Offset Process Delay Transfer'
      ],
      answer: 1,
      explanation: 'First-Order Plus Dead Time: the standard model for most single-loop process control applications. It captures the three key dynamics: steady-state gain (K), lag (τ), and pure delay (θ). Elegant and wrong in exactly the right way — it\'s simple enough to tune from and accurate enough to be useful.'
    },
    {
      id: 'proc2',
      type: 'mcq',
      question: 'A self-regulating process is one that:',
      options: [
        'Continues changing indefinitely until the controller acts',
        'Reaches a new steady state on its own after a disturbance, without controller action',
        'Requires derivative action to remain stable',
        'Has zero process gain'
      ],
      answer: 1,
      explanation: 'Self-regulating processes have natural equilibrium — like a heat exchanger temperature. Apply more steam → temperature rises until heat loss to the cold side balances the heat input → new steady state. The process self-limits. These are easier to control than integrating processes, which have no natural equilibrium and will drift forever without a controller.'
    },
    {
      id: 'proc3',
      type: 'mcq',
      question: 'An integrating (non-self-regulating) process is best exemplified by:',
      options: [
        'A heat exchanger controlling outlet temperature',
        'A pressure controller on a gas vessel with a relief valve',
        'A liquid level in a tank where inflow and outflow are both flow-controlled independently',
        'A pH neutralization system'
      ],
      answer: 2,
      explanation: 'When both inflow and outflow are set independently, the level has no natural equilibrium — any imbalance causes the tank to fill or drain indefinitely. The tank integrates the flow imbalance into level. Without the level controller actively balancing flows, the process runs away. This is the defining characteristic of an integrating process.'
    },
    {
      id: 'proc4',
      type: 'fill',
      question: 'Dead time θ is the period of ___ delay at the start of a step response — during this time the PV does not respond at all.',
      answer: 'pure',
      hint: 'Nothing moves during this time, regardless of CO',
      explanation: 'Dead time is a pure, irrecoverable delay — the transportation lag, the analyzer sample time, the physical delay of material moving through a pipe. During dead time, nothing the controller does has any effect on the PV yet. It is the fundamental limit on control performance. You cannot control what hasn\'t happened yet, and dead time is the universe\'s way of rubbing that in.'
    },
    {
      id: 'proc5',
      type: 'mcq',
      question: 'In a FOPDT model, if τ = 0, the model becomes:',
      options: [
        'A pure integrator',
        'A pure dead time element only',
        'An ideal proportional controller',
        'An unstable process'
      ],
      answer: 1,
      explanation: 'No lag + pure delay = step in, wait θ, then instantaneous response. This is the "pure dead time" process. It\'s extremely difficult to control well — there\'s no gradual response for the controller to read; you just get a delayed cliff edge. Smith Predictor control structures were invented specifically to deal with this case.'
    },
    {
      id: 'proc6',
      type: 'mcq',
      question: 'Why is a high θ/τ ratio considered difficult to control?',
      options: [
        'High dead time relative to lag means the controller spends most of the transient flying blind',
        'High θ/τ means the process gain is very large',
        'High θ/τ eliminates the need for integral action',
        'High θ/τ causes the process to become integrating'
      ],
      answer: 0,
      explanation: 'When θ ≈ τ or θ > τ, most of the dynamic response is dead time — and during dead time, the controller gets zero useful feedback. It fires a correction, waits, waits, waits, then sees the PV change — by which point it may have already over- or under-shot and the whole cycle starts over. Controllers on high dead-time processes must be detuned significantly, at the cost of slow recovery.'
    },
    {
      id: 'proc7',
      type: 'mcq',
      question: 'Process gain K > 1 means:',
      options: [
        'The process is integrating',
        'The PV change is larger than the CO change (amplifying process)',
        'The PV change is smaller than the CO change (attenuating process)',
        'The process has zero dead time'
      ],
      answer: 1,
      explanation: 'K > 1: a 10% CO step produces more than 10% PV change — the process amplifies the input. This makes the controller more sensitive; high Kp will cause oscillation faster. K < 1: the process attenuates. K = 1 is neutral. High-gain processes need lower Kp; low-gain processes can tolerate higher Kp.'
    },
    {
      id: 'proc8',
      type: 'mcq',
      question: 'For a liquid level process with a pumped outlet (constant flow out, variable flow in), the correct process model is:',
      options: [
        'Self-regulating FOPDT',
        'Integrating process (ramp response to step input)',
        'Underdamped second-order process',
        'Pure dead time process'
      ],
      answer: 1,
      explanation: 'Constant outflow + variable inflow = the level integrates the difference. A step change in inlet flow causes level to ramp linearly — not settle to a new steady state. This is the integrating process model. Gravity-drained tanks with variable head are approximately self-regulating; pumped-out tanks with level-independent flow are integrating. This distinction changes the correct tuning approach fundamentally.'
    },
    {
      id: 'proc9',
      type: 'fill',
      question: 'The time constant τ is defined as the time for a first-order process to reach ___% of its final value after dead time ends.',
      answer: '63.2',
      hint: 'Same as 1 - e^(-1)',
      explanation: '63.2% — the standard first-order time constant definition. Two time constants: 86.5%. Three: 95%. Five: 99.3%. Engineers conventionally say "settled" at 5τ. If you\'re waiting for 99.3% of response, you have patience. Most processes drift enough in that time that the model is questionable anyway.'
    },
    {
      id: 'proc10',
      type: 'mcq',
      question: 'A heat exchanger controlling outlet temperature is typically modeled as:',
      options: [
        'An integrating process',
        'A pure dead time process',
        'A self-regulating FOPDT process',
        'An unstable process'
      ],
      answer: 2,
      explanation: 'Heat exchangers are the canonical FOPDT self-regulating process. Open more steam valve → temperature starts rising (dead time first, then first-order lag) → settles to a new higher temperature. Classic, textbook, well-behaved. Or it would be, if the steam header pressure weren\'t varying and the process flow weren\'t constantly changing.'
    },
    {
      id: 'proc11',
      type: 'mcq',
      question: 'Which process characteristic makes pH control particularly challenging?',
      options: [
        'pH processes have very long dead times',
        'The pH titration curve is highly nonlinear — small reagent additions near neutrality cause large pH swings',
        'pH processes are always integrating',
        'pH control does not require feedback'
      ],
      answer: 1,
      explanation: 'The titration curve is the villain. Far from the neutrality point, you can dump in reagent and barely move the pH. Near neutrality, a fraction of a milliliter causes pH to swing from 4 to 10. The effective process gain changes by orders of magnitude across the operating range. This is why pH control is the hazing ritual of process control engineers.'
    },
    {
      id: 'proc12',
      type: 'mcq',
      question: 'Transportation lag (dead time) in a pipeline is caused by:',
      options: [
        'Heat transfer resistance between fluid and pipe wall',
        'The time required for fluid to travel physically from one point to another',
        'Instrument response time in the transmitter',
        'Chemical reaction kinetics in the process fluid'
      ],
      answer: 1,
      explanation: 'Transportation lag = pipe volume / flow rate. The fluid takes time to travel from the injection point to the measurement point. During that time, any correction is already in the pipe but hasn\'t arrived yet. Longer pipes, lower flows, larger pipe diameters all increase dead time. Moving the measurement point upstream — if physically possible — directly reduces dead time.'
    },
  ],

  cascade: [
    {
      id: 'casc1',
      type: 'mcq',
      question: 'In a cascade control system, the primary (outer) loop controller output serves as:',
      options: [
        'The final signal to the control valve',
        'The setpoint for the secondary (inner) loop controller',
        'The measured process variable for the secondary loop',
        'A feedforward signal to the primary process'
      ],
      answer: 1,
      explanation: 'The primary controller computes what the secondary process should be doing and commands it by setting the secondary\'s setpoint. The secondary controller then drives the actual valve. The primary loop never touches the valve directly. This is the defining feature of cascade: a controller controlling a controller.'
    },
    {
      id: 'casc2',
      type: 'mcq',
      question: 'The inner (secondary) loop in cascade control must be how much faster than the outer (primary) loop?',
      options: [
        '1–2× faster',
        '3–10× faster',
        'Exactly the same speed',
        '100× faster'
      ],
      answer: 1,
      explanation: '3–10× faster is the rule of thumb. The inner loop must respond fast enough that the primary loop perceives it as essentially instantaneous — otherwise the two controllers fight each other and the whole thing oscillates. If your inner loop is a flow controller, it should settle in seconds; your outer temperature loop can then operate on a minute timescale.'
    },
    {
      id: 'casc3',
      type: 'mcq',
      question: 'What is the primary benefit of cascade control over single-loop control?',
      options: [
        'It eliminates the need for integral action',
        'The inner loop rejects disturbances before they propagate to and affect the primary variable',
        'It allows the use of a simpler PID with no derivative',
        'It doubles the speed of both loops simultaneously'
      ],
      answer: 1,
      explanation: 'A steam pressure disturbance hits the inner flow loop first. The inner flow controller corrects it immediately — long before the temperature (primary PV) has time to notice. Without cascade, that disturbance travels all the way through the process and shows up as a temperature error the slow outer loop must then correct. Cascade cuts the disturbance off at the source.'
    },
    {
      id: 'casc4',
      type: 'mcq',
      question: 'In a heat exchanger cascade (temperature → flow), what are the primary and secondary PVs?',
      options: [
        'Primary: steam flow; Secondary: outlet temperature',
        'Primary: outlet temperature; Secondary: steam flow',
        'Primary: inlet temperature; Secondary: steam pressure',
        'Primary: steam pressure; Secondary: outlet temperature'
      ],
      answer: 1,
      explanation: 'Temperature is slow and is what you ultimately care about — it\'s the primary (outer) loop. Steam flow is fast and controllable — it\'s the secondary (inner) loop. The temperature controller says "I need more heat" → sets a higher steam flow setpoint → the flow controller responds immediately. The temperature controller never touches the steam valve directly.'
    },
    {
      id: 'casc5',
      type: 'fill',
      question: 'In cascade control, you should tune the ___ loop first before tuning the ___ loop.',
      answer: 'inner (secondary), outer (primary)',
      hint: 'Start with the fast loop',
      explanation: 'Always tune the inner loop first, independently. Get it fast and stable. Then tune the outer loop with the inner loop in cascade/auto. If you try to tune both simultaneously, you have no stable reference and the interactions make it nearly impossible to tell what\'s causing what.'
    },
    {
      id: 'casc6',
      type: 'mcq',
      question: 'When should you NOT use cascade control?',
      options: [
        'When the inner loop variable is measurable and controllable',
        'When the inner loop responds at least 3× faster than the outer loop',
        'When the inner and outer loop dynamics are similar in speed, or the inner loop is slower',
        'When the outer loop variable is temperature'
      ],
      answer: 2,
      explanation: 'If the inner and outer loops respond at similar speeds, cascade makes things worse — the two controllers will interact, fight, and oscillate. Cascade only helps when the inner loop is significantly faster. If adding an inner loop doesn\'t actually speed up disturbance rejection, you\'ve added complexity for no benefit.'
    },
    {
      id: 'casc7',
      type: 'mcq',
      question: 'When the cascade system is in "manual" at the outer loop but "auto" at the inner loop, the operator:',
      options: [
        'Controls the valve position directly',
        'Sets the secondary loop setpoint directly (inner loop still controls)',
        'Overrides both controllers simultaneously',
        'Has no control over the process'
      ],
      answer: 1,
      explanation: 'This is "semi-cascade" or inner-loop auto only. The operator manually sets the secondary setpoint (e.g., steam flow rate) while the inner flow controller holds that flow. This is useful during commissioning or when the outer loop is being tuned — you can manually adjust inner SP and watch the primary PV respond.'
    },
    {
      id: 'casc8',
      type: 'mcq',
      question: 'Valve positioners on control valves effectively create what type of internal control structure?',
      options: [
        'A cascade controller with position as the inner loop',
        'A feedforward controller for flow',
        'A Smith Predictor for dead time compensation',
        'An override controller for pressure limiting'
      ],
      answer: 0,
      explanation: 'A valve positioner is a miniature cascade loop: the position controller (inner) takes the CO signal as its setpoint and drives the valve stem to that exact position regardless of friction, pressure differentials, or stiction. The process controller (outer) sets what position it wants. Positioners dramatically improve valve linearity and reject mechanical disturbances — which is why stiction is less of a problem with positioners.'
    },
    {
      id: 'casc9',
      type: 'mcq',
      question: 'What happens to cascade control performance if the secondary measurement transmitter fails?',
      options: [
        'The primary loop takes over automatically with no degradation',
        'The inner loop loses its feedback and may drive the valve open or shut; the primary loop degrades severely',
        'The cascade automatically switches to feedforward control',
        'Only the secondary loop is affected; the primary loop continues normally'
      ],
      answer: 1,
      explanation: 'If the inner loop\'s transmitter fails, the secondary controller no longer has valid feedback and will drive the output to a limit — taking the valve with it. The primary loop will see a wild PV response and try to correct, but with no inner loop, it\'s now fighting the process directly. Transmitter failures in cascade loops cascade (pun intended) through the whole system.'
    },
    {
      id: 'casc10',
      type: 'mcq',
      question: 'Which real-world application is the most classic example of cascade control?',
      options: [
        'Level control on a single tank with one valve',
        'Temperature control on a heat exchanger with steam flow as the inner loop',
        'Pressure control using a relief valve',
        'pH control using a single reagent pump'
      ],
      answer: 1,
      explanation: 'Temperature → steam flow cascade on a heat exchanger is the textbook cascade example. It shows up in every controls textbook, every training course, and every control system design template. If you can explain this example clearly — outer: temperature, inner: steam flow, inner loop 5-10× faster, inner loop rejects steam pressure disturbances — you\'ve got cascade control.'
    },
  ],

  digital: [
    {
      id: 'dig1',
      type: 'mcq',
      question: 'The Nyquist sampling theorem requires that the sampling frequency be:',
      options: [
        'Equal to the highest frequency in the signal',
        'At least twice the highest significant frequency in the signal',
        'At least 10× the process time constant',
        'Exactly matched to the process oscillation frequency'
      ],
      answer: 1,
      explanation: 'Nyquist: sample at ≥ 2× the highest significant frequency. For practical PID control, sampling period T ≤ τ/10 is a common rule of thumb — much more conservative than minimum Nyquist because aliasing in control causes instability, not just signal distortion. Sample too slowly and your derivative calculation is meaningless, your controller is sluggish, and strange things happen at 3 AM.'
    },
    {
      id: 'dig2',
      type: 'mcq',
      question: 'The Position Algorithm in a digital PID controller calculates:',
      options: [
        'The change in output (ΔCO) from the previous sample',
        'The absolute controller output value (CO) directly',
        'Only the proportional component of the output',
        'The valve position feedback signal'
      ],
      answer: 1,
      explanation: 'The Position Algorithm outputs the absolute CO value each scan. It needs to track the integral sum across samples. The Velocity (Incremental) Algorithm instead computes ΔCO — the change from last scan — and adds it to the actual actuator position. Velocity form is less susceptible to integral windup and makes bumpless transfer easier, because ΔCO = 0 when there\'s no change.'
    },
    {
      id: 'dig3',
      type: 'mcq',
      question: 'Bumpless transfer (manual-to-auto) requires that:',
      options: [
        'The setpoint is ramped up from zero when entering auto mode',
        'The integral is initialized to the current output value so the CO doesn\'t jump when auto is engaged',
        'Derivative action is disabled during the transfer',
        'The output is set to 50% before engaging auto mode'
      ],
      answer: 1,
      explanation: 'When switching from manual to auto, the controller must not jerk the output to whatever its integrator thinks is right. Bumpless transfer initializes the integrator so the first auto scan produces the same CO as the manual value. Without it, engaging auto causes an immediate step change in CO — a "bump" — that disturbs the process. In a live plant, that bump can trip equipment.'
    },
    {
      id: 'dig4',
      type: 'mcq',
      question: 'Anti-windup by "clamping" works by:',
      options: [
        'Limiting the rate of change of the CO output',
        'Stopping further integration when the output hits its limit (holding the integrator fixed at the limit)',
        'Back-calculating the integrator value from the actual output',
        'Increasing Ti automatically when output saturates'
      ],
      answer: 1,
      explanation: 'Clamping: when CO hits max (or min), stop accumulating the integral — freeze it at the limit. Simple to implement, effective. Back-calculation (the more sophisticated method) feeds the difference between the saturated output and the unsaturated calculation back into the integrator, pulling it back to the saturation boundary continuously. Both work; back-calculation recovers slightly faster.'
    },
    {
      id: 'dig5',
      type: 'fill',
      question: 'In a digital PID, the derivative term is typically computed as Td / T × (___ − ___).',
      answer: 'PVn - PVn-1',
      hint: 'Current minus previous measurement',
      explanation: 'D ≈ Td/T × (PVn − PVn-1), where T is the scan period. This is "derivative on measurement" — using the change in PV, not error, to avoid derivative kick on SP changes. The scan time T appears because derivative is a rate (change per time). If T doubles, D halves — which is why changing scan rates requires retuning derivative gain.'
    },
    {
      id: 'dig6',
      type: 'mcq',
      question: 'A derivative filter with parameter N in the form N×Td/(N×s+1) — what does increasing N do?',
      options: [
        'Increases derivative filtering (more smoothing, slower D response)',
        'Decreases derivative filtering (less smoothing, more noise passes through)',
        'Sets the derivative time constant to N',
        'Has no effect on noise rejection'
      ],
      answer: 1,
      explanation: 'Higher N = less filtering = more raw derivative = more noise amplification. N = 5 is conservative (aggressive filtering). N = 20 is aggressive (light filtering). N → ∞ gives pure derivative with no filtering. Typical industrial range is N = 5 to 20. If your PV signal is clean and your process needs quick D action, use higher N. If your PV is noisy, use lower N or disable D entirely.'
    },
    {
      id: 'dig7',
      type: 'mcq',
      question: 'Output rate limiting in a digital PID controller:',
      options: [
        'Limits the absolute maximum and minimum CO values',
        'Limits how fast the CO can change per scan (maximum ΔCO/scan)',
        'Filters the PV input signal',
        'Sets the minimum controller scan period'
      ],
      answer: 1,
      explanation: 'Rate limiting caps ΔCO per time — e.g., no more than 10% CO change per second. This protects mechanical equipment (valves, compressors) from sudden step changes that cause wear, water hammer, or process upsets. It also slows the controller during large setpoint changes. The tradeoff: rate limiting slows response to disturbances too.'
    },
    {
      id: 'dig8',
      type: 'mcq',
      question: 'The Velocity (Incremental) Algorithm computes:',
      options: [
        'The absolute CO required at each scan',
        'The change in CO (ΔCO) that should be added to the current actuator position',
        'The velocity of the process variable',
        'The rate of change of the setpoint'
      ],
      answer: 1,
      explanation: 'Velocity algorithm: ΔCO = Kp×(Δe) + Ki×e×T + Kd×(ΔPV change) — the controller produces an increment to add to the current output. This means if nothing is changing, ΔCO = 0 and the output holds. The integrator windup problem is reduced because the integrator is implicit in the accumulated output. Bumpless transfer is natural: zero change in steady state means zero bump when engaging auto.'
    },
    {
      id: 'dig9',
      type: 'mcq',
      question: 'What is aliasing in digital control, and why does it matter?',
      options: [
        'A naming convention for controller parameters in different software platforms',
        'High-frequency signal components appearing as false low-frequency components when sampled too slowly, potentially causing instability',
        'The process of copying a PID configuration from one controller to another',
        'An alternative name for dead time in digital systems'
      ],
      answer: 1,
      explanation: 'Sample a 10 Hz signal at 12 Hz and you\'ll see a false 2 Hz signal that doesn\'t exist in reality — that\'s aliasing. In process control, aliased noise can appear as a low-frequency disturbance that the controller tries to correct, causing oscillation. Anti-aliasing filters (low-pass hardware filters before the ADC) prevent this. Skipping them to save cost is a reliable way to create mysterious loop instability.'
    },
    {
      id: 'dig10',
      type: 'mcq',
      question: 'If you increase the PLC scan time from 100ms to 1000ms for a PID loop, the effective derivative gain:',
      options: [
        'Increases by 10×',
        'Decreases by 10×',
        'Remains unchanged',
        'Becomes infinite'
      ],
      answer: 1,
      explanation: 'D ≈ Td/T × ΔPVT. If T increases 10×, the computed derivative decreases 10× for the same PV change rate. Slowing the scan reduces effective derivative gain. It also reduces integral rate and slows the overall controller response. Changing scan time is a hidden parameter change that requires reviewing all PID gains. Many a mystery oscillation has been traced to a scan time change made "just for testing."'
    },
  ],

  plc: [
    {
      id: 'plc1',
      type: 'mcq',
      question: 'The IEC 61131-3 standard CTRL_PID function block typically accepts which inputs?',
      options: [
        'Only SP and PV',
        'SP, PV, manual output, Kp, Ti, Td, output limits, and mode',
        'Only Kp, Ti, and Td gain parameters',
        'PV and CO only, computing SP internally'
      ],
      answer: 1,
      explanation: 'A full CTRL_PID block takes: SP (setpoint), PV (process variable), manual output value (for manual mode), all three gains (Kp/Ti/Td), output limits (high/low), mode selection (auto/manual), and typically anti-windup and derivative filter parameters. Every vendor implements a slightly different version. The first thing you do with any new PLC is read the PID instruction manual. The second thing is read it again.'
    },
    {
      id: 'plc2',
      type: 'mcq',
      question: 'In Auto mode on a PLC PID block, the output is:',
      options: [
        'Set directly by the operator from the HMI',
        'Calculated by the PID algorithm based on SP, PV, and tuning parameters',
        'Held at the last manual value',
        'Forced to 50% as a safe default'
      ],
      answer: 1,
      explanation: 'Auto mode: the PID algorithm owns the output. Operator sets the SP; controller computes CO. Manual mode: the operator sets CO directly; the PID algorithm is bypassed (but should track for bumpless return to auto). This distinction is fundamental. Operators switching between modes need to understand what they\'re taking control of — and what they\'re giving up.'
    },
    {
      id: 'plc3',
      type: 'mcq',
      question: 'An Allen-Bradley Logix PID instruction parameter "CV" represents:',
      options: [
        'The setpoint (desired value)',
        'The process variable (measured value)',
        'The controller output (control variable — 0 to 100%)',
        'The control variance (error signal)'
      ],
      answer: 2,
      explanation: 'In A-B Logix PID: SP is setpoint, PV is process variable, CV is "Control Variable" — the controller output (0–100%). Confusingly, in process control literature CV often means "Controlled Variable" (= PV). Allen-Bradley uses CV for output. This terminological landmine has caused countless hours of commissioning confusion. When in doubt, check the instruction\'s tag description, not the mnemonic.'
    },
    {
      id: 'plc4',
      type: 'mcq',
      question: 'On a SCADA HMI PID faceplate, which four elements are typically displayed?',
      options: [
        'Kp, Ti, Td, and PB%',
        'SP/PV trend, CO value, mode (auto/manual), and alarm limits',
        'Process gain, dead time, time constant, and ultimate gain',
        'Scan time, sample rate, filter coefficient, and derivative gain'
      ],
      answer: 1,
      explanation: 'The operator faceplate shows: SP and PV (often as a trend), CO (current output %), mode (auto/manual/cascade), and alarm limits (high/low). The operator lives on this faceplate. If they can\'t quickly see whether the loop is tracking, what the output is doing, and whether alarms are active — the HMI design failed. Keep it simple, keep it visible.'
    },
    {
      id: 'plc5',
      type: 'fill',
      question: 'When a PLC PID instruction executes every scan but the process has a much slower time constant, the scan time can be treated as effectively ___ relative to the process dynamics.',
      answer: 'continuous',
      hint: 'The digital approximation becomes equivalent to analog at this limit',
      explanation: 'When T << τ (scan time much less than process time constant), the digital PID approximates a continuous analog PID very closely. As T grows toward τ, the approximation degrades. Rule of thumb: T ≤ τ/10 keeps the digital approximation good. For fast processes (T ≈ τ), you need to account for sample-and-hold effects in your tuning.'
    },
    {
      id: 'plc6',
      type: 'mcq',
      question: 'What does "bumpless transfer" specifically prevent when switching from Manual to Auto?',
      options: [
        'It prevents the PV from exceeding the high alarm limit',
        'It prevents a sudden step change in CO that would disturb the process',
        'It prevents the derivative term from activating immediately',
        'It prevents integral windup during manual operation'
      ],
      answer: 1,
      explanation: 'In manual, the operator has been trimming CO to whatever the process needs. If auto mode starts fresh with its own calculated output, the CO jumps to a different value — a "bump" — which upsets the process. Bumpless transfer initializes the controller\'s internal state (especially the integrator) so the first auto CO equals the last manual CO. The loop takes over smoothly. Operators notice bumps. Engineers get blamed for them.'
    },
    {
      id: 'plc7',
      type: 'mcq',
      question: 'In a PLC PID scan, derivative is calculated as Td/T × (PVn − PVn-1). If the scan time T doubles accidentally due to a CPU load issue:',
      options: [
        'The derivative gain effectively doubles',
        'The derivative gain effectively halves',
        'The derivative gain is unchanged because Td compensates',
        'The controller automatically recalculates derivative to compensate'
      ],
      answer: 1,
      explanation: 'D = Td/T × ΔPVT — longer T means smaller D. If T doubles from 100ms to 200ms, effective derivative action halves. But the integral action also halves (fewer repeats per minute). And the proportional term is unchanged. A CPU overload that slows scan time silently detunes your PID — it becomes more sluggish and less responsive. Monitoring actual scan time is not optional in critical loops.'
    },
    {
      id: 'plc8',
      type: 'mcq',
      question: 'Output limits (CO high and CO low) in a PLC PID instruction serve to:',
      options: [
        'Adjust the proportional gain automatically',
        'Clamp the controller output within the actuator\'s safe operating range and enable anti-windup',
        'Set the alarm thresholds for the process variable',
        'Define the scan time for PID execution'
      ],
      answer: 1,
      explanation: 'Output limits prevent the CO from commanding the actuator beyond its physical or safe range (e.g., don\'t send 110% to a valve that maxes at 100%). They also enable anti-windup: when the output hits a limit, the integrator can be frozen or back-calculated to prevent windup during the clamped period. Skipping output limits is how you get valve actuators driven into hard mechanical stops repeatedly.'
    },
    {
      id: 'plc9',
      type: 'mcq',
      question: 'Which IEC 61131-3 programming language is most commonly used to implement PID logic in industrial PLCs?',
      options: [
        'Instruction List (IL)',
        'Sequential Function Chart (SFC)',
        'Ladder Diagram (LD) or Structured Text (ST) with a PID function block',
        'MATLAB/Simulink'
      ],
      answer: 2,
      explanation: 'Most PLC PID implementations use a pre-built PID function block called from Ladder (one rung, one block) or Structured Text. You don\'t code PID math from scratch — you configure a standard block with your parameters. The underlying math is the same regardless of language. MATLAB/Simulink is for simulation and development, not for production PLC execution (despite what some vendors will tell you).'
    },
    {
      id: 'plc10',
      type: 'mcq',
      question: 'A PID loop configured with "SP tracking" in manual mode means:',
      options: [
        'The SP is automatically increased to track the PV while in manual',
        'The setpoint follows the process variable in manual mode, so that entering auto causes no SP step change',
        'The SP ramps toward the target at a configured rate',
        'The controller tracks the ultimate gain automatically'
      ],
      answer: 1,
      explanation: 'SP tracking: in manual mode, the displayed SP quietly tracks the PV. When the operator switches to auto, SP equals current PV, so there\'s no error at the moment of transfer — no immediate correction, no bump. This is complementary to bumpless transfer on the output side. Together they make manual-to-auto transfers completely smooth. Separately, they\'re only half the solution.'
    },
  ],

  troubleshoot: [
    {
      id: 'ts1',
      type: 'mcq',
      question: 'A PID loop is oscillating continuously with growing amplitude. The most likely cause is:',
      options: [
        'Ti too long (too little integral action)',
        'Kp too high (excessive proportional gain causing instability)',
        'Td too low (insufficient derivative action)',
        'Dead time has decreased'
      ],
      answer: 1,
      explanation: 'Growing oscillation = the loop has insufficient gain margin. The most common cause is Kp too high. The controller is overcorrecting every deviation, which causes a larger deviation in the opposite direction, which causes an even larger correction — and off we go to unstable land. Reduce Kp first. If that doesn\'t fix it, check Ti as well.'
    },
    {
      id: 'ts2',
      type: 'mcq',
      question: 'A control loop shows steady-state offset — the PV stabilizes 5°C below the setpoint and stays there. The most likely cause is:',
      options: [
        'Integral windup',
        'P-only control with no integral action, or integral disabled',
        'Derivative gain too high',
        'Setpoint ramp rate too slow'
      ],
      answer: 1,
      explanation: 'Steady-state offset with no elimination = integral is missing or disabled. P-only control needs error to produce output — at steady state, that error is the offset. Check: is Ti set to an absurdly large number (effectively infinity)? Is integral action disabled in the configuration? Did someone set Ki = 0 "just to see what would happen"? Answer: now you know.'
    },
    {
      id: 'ts3',
      type: 'mcq',
      question: 'After a process disturbance clears, the controller output remains pegged at 100% and the PV recovers very slowly. This is symptomatic of:',
      options: [
        'Derivative action causing output spikes',
        'Integral windup — the integrator accumulated a large value during the disturbance',
        'Kp too low causing sluggish proportional response',
        'A failed transmitter sending a low signal'
      ],
      answer: 1,
      explanation: 'Classic windup recovery: the output was pinned at the limit during the disturbance, and the integrator kept accumulating. When the disturbance clears, the integrator has a massive accumulated value it must first work off before the output can drop below 100%. The PV overshoots and the recovery is slow and sloppy. Anti-windup prevents this. Recognizing it on a trend tells you to add anti-windup to the configuration.'
    },
    {
      id: 'ts4',
      type: 'mcq',
      question: 'High-frequency oscillation of the controller output (short period, small amplitude) is most likely caused by:',
      options: [
        'Ti too long',
        'Kp too low',
        'Td too high or a missing derivative filter',
        'Setpoint too high'
      ],
      answer: 2,
      explanation: 'Derivative amplifies high-frequency noise. Without a filter (or with a filter that\'s too loose), every noise spike on the PV creates a large spike in the derivative output, causing the CO to chatter at the noise frequency. The valve tries to follow — causing wear and eventually failure. Reduce Td, add or tighten the derivative filter, or consider moving to PI (no derivative) if the process allows it.'
    },
    {
      id: 'ts5',
      type: 'mcq',
      question: 'Valve stiction causes what characteristic pattern in a control loop trend?',
      options: [
        'Smooth exponential decay to setpoint',
        'Large irregular oscillations at varying amplitude',
        'Regular limit cycling — constant-amplitude oscillation at a fixed period',
        'Steady-state offset only, no oscillation'
      ],
      answer: 2,
      explanation: 'Stiction (static friction in a valve) causes limit cycling: the controller drives CO higher to overcome friction → valve finally jumps past the setpoint → error reverses → controller drives CO lower → valve sticks again → jumps again. The result is a constant-amplitude, fixed-period oscillation that can\'t be eliminated by tuning alone. The fix is mechanical: repair or replace the valve/actuator, or add a positioner.'
    },
    {
      id: 'ts6',
      type: 'mcq',
      question: 'The PV shows random high-frequency noise but no oscillation from the controller. Your first investigative step should be:',
      options: [
        'Increase Kp to overcome the noise',
        'Check the transmitter, wiring, and grounding for noise sources',
        'Disable integral action to reduce sensitivity',
        'Increase scan time to average out the noise'
      ],
      answer: 1,
      explanation: 'High-frequency PV noise is usually a measurement problem, not a control problem. Bad grounding, nearby VFDs causing electromagnetic interference, loose connections, or a failing transmitter all produce noisy signals. Fix the source before tuning the controller around it. A derivative filter is the right controller-side mitigation, but it\'s treating the symptom. Trace the root cause first.'
    },
    {
      id: 'ts7',
      type: 'mcq',
      question: 'A loop that was well-tuned suddenly becomes oscillatory after no parameter changes. Possible causes include:',
      options: [
        'The tuning parameters degrade over time spontaneously',
        'Process gain, dead time, or time constant changed due to a process change (load, equipment wear, valve wear)',
        'The PLC battery failed, resetting the PID parameters',
        'Tuning parameters are only valid at one operating point'
      ],
      answer: 1,
      explanation: 'Loops go out of tune because the process changes, not because the controller changes (unless someone changed parameters). A heat exchanger fouled (τ changes). A valve seat eroded (gain changes). A pipe clogged (dead time increased). The tuning that was perfect for the clean process is now too aggressive for the fouled one. Trending loop performance over time catches these drift problems early.'
    },
    {
      id: 'ts8',
      type: 'mcq',
      question: 'When troubleshooting a sluggish loop, you examine the trend and see the PV slowly crawling toward SP over many minutes without oscillation. The most likely tuning fix is:',
      options: [
        'Reduce Kp and increase Ti',
        'Increase Kp and/or reduce Ti (decrease integral time, increase integral action)',
        'Enable derivative to speed up response',
        'Enable output rate limiting'
      ],
      answer: 1,
      explanation: 'Sluggish = too conservative tuning. The controller is moving in the right direction but too slowly. Increase Kp to get more initial kick. Reduce Ti to speed up integral action (more repeats per minute, faster windup toward SP). Add D last if the process has enough lag to benefit. Check that you haven\'t accidentally set enormous Ti values — this is surprisingly common when parameters are entered in different units than expected.'
    },
    {
      id: 'ts9',
      type: 'fill',
      question: 'To troubleshoot a PID loop effectively, you should always look at the trend of ___, ___, and ___ together.',
      answer: 'SP, PV, CO',
      hint: 'The three main loop variables',
      explanation: 'SP-PV-CO trending is the diagnostic foundation. SP shows what was commanded. PV shows what happened. CO shows what the controller did about it. The relationships between these three reveal: Is the PV tracking SP? Is the CO responding appropriately to error? Is the output saturating? Is there a delay between CO changes and PV response? You can\'t diagnose what you don\'t trend.'
    },
    {
      id: 'ts10',
      type: 'mcq',
      question: 'A flow control loop has a CO signal at 60% but the actual flow is significantly lower than expected. Without suspecting the controller tuning, your first checks should be:',
      options: [
        'Reduce Ti to add more integral action',
        'Check valve position, valve trim condition, upstream pressure, and flow transmitter calibration',
        'Increase Kp to overcome the flow deficit',
        'Switch to cascade control with a pressure inner loop'
      ],
      answer: 1,
      explanation: 'When CO seems right but PV is wrong, the problem is almost always between them — not in the controller. Check: Is the valve actually responding to CO? (positioner, actuator, I/P converter) Is the valve trim worn or plugged? Is upstream pressure adequate? Is the flow transmitter reading correctly? PID tuning cannot compensate for a partially-failed actuator or a plugged orifice plate.'
    },
    {
      id: 'ts11',
      type: 'mcq',
      question: 'An operator reports that the loop "hunts" around setpoint in manual mode. This means:',
      options: [
        'The PID tuning is too aggressive',
        'The manual mode output oscillates — which cannot be caused by PID tuning; it must be a process or measurement issue',
        'Integral windup is occurring in manual mode',
        'The setpoint is changing automatically'
      ],
      answer: 1,
      explanation: 'In manual mode, the PID algorithm is bypassed — the operator sets CO directly. If the PV still oscillates in manual, the cause is NOT the PID. It\'s either: the process itself is inherently oscillatory at this operating point, there\'s a measurement problem causing apparent oscillation, or something else in the control system is affecting the process. Manual mode is the great isolator for diagnosing PID vs. process problems.'
    },
    {
      id: 'ts12',
      type: 'mcq',
      question: 'What does it mean when a controller shows "output at 100%" but the PV is still falling?',
      options: [
        'The controller is working correctly — it has saturated trying to correct',
        'The integral has wound up to 100%',
        'Something is wrong in the final control element or process — the controller has done all it can and it\'s not enough',
        'The setpoint is set too low'
      ],
      answer: 2,
      explanation: 'CO = 100% and PV still falling = the controller has maxed out its response and it\'s insufficient. The problem is not tuning — it\'s capacity. Is the valve stuck closed despite 100% command? Has the process load exceeded what the control element can supply? Has something failed upstream? At this point, you\'re debugging the physical plant, not the PID algorithm. Check field devices, not parameters.'
    },
  ],

  lab: [
    {
      id: 'lab1',
      type: 'mcq',
      question: 'Which Python library provides PID simulation and step response analysis tools?',
      options: [
        'numpy',
        'pandas',
        'control (pip install control)',
        'scipy.signal only'
      ],
      answer: 2,
      explanation: 'The Python `control` library (pip install control) provides transfer functions, step response, Bode plots, root locus, and closed-loop analysis tools — essentially a free MATLAB Control System Toolbox. scipy.signal has some overlap but lacks the control-specific abstractions. For PID simulation and learning, `control` is the right tool. It runs in Jupyter, which means you can document your analysis alongside the code.'
    },
    {
      id: 'lab2',
      type: 'mcq',
      question: 'For a lab exercise tuning PID on a FOPDT process with K=1, τ=10, θ=2, using the open-loop step test method, what is the θ/τ ratio and what does it indicate?',
      options: [
        'θ/τ = 5; this is a very difficult process to control',
        'θ/τ = 0.2; this is a relatively easy process to control',
        'θ/τ = 2.0; dead time dominates',
        'θ/τ = 10; the process is integrating'
      ],
      answer: 1,
      explanation: 'θ/τ = 2/10 = 0.2 — well below 1.0, meaning lag dominates over dead time. This is a well-behaved, relatively easy-to-control process. Good for a learning exercise because the controller has plenty of dynamic response to work with. You can experiment with aggressive tuning without immediately ending up in an unstable oscillation. Save the θ/τ > 1 processes for after you\'ve built some confidence.'
    },
    {
      id: 'lab3',
      type: 'mcq',
      question: 'A Bode plot is useful for PID tuning because it shows:',
      options: [
        'The time-domain step response of the closed-loop system',
        'Gain and phase as a function of frequency, revealing gain margin and phase margin for stability analysis',
        'The valve travel over time during a tuning test',
        'The integral windup accumulation during a step disturbance'
      ],
      answer: 1,
      explanation: 'The Bode plot shows how the open-loop system\'s gain and phase vary with frequency. Gain margin (how much gain you can add before instability) and phase margin (how much phase lag before instability at unity gain) tell you directly how much stability margin your tuning has. Frequency-domain design lets you specify margins explicitly, rather than hoping empirical tuning has enough margin.'
    },
    {
      id: 'lab4',
      type: 'mcq',
      question: 'In MATLAB Control System Toolbox, which function generates a closed-loop step response plot?',
      options: [
        'openloop(sys)',
        'step(feedback(C*P, 1))',
        'bode(sys, Kp)',
        'pid_response(C, P, SP)'
      ],
      answer: 1,
      explanation: 'step(feedback(C*P, 1)) — multiply the controller transfer function C by the plant P to get the open-loop, wrap it in negative feedback with feedback(·, 1), then call step() on the closed-loop result. This plots the closed-loop step response. feedback(sys, 1) implements unity negative feedback. The pattern is: define C, define P, close the loop, analyze. Every controls textbook uses this workflow.'
    },
    {
      id: 'lab5',
      type: 'mcq',
      question: 'When using a free Excel-based PID simulator for learning, which exercise best illustrates integral windup?',
      options: [
        'Apply a small SP step change and observe the smooth response',
        'Saturate the output at 100% by demanding a very large SP change, then observe slow recovery when the SP is reduced',
        'Set Kp = 0 and observe I-only response',
        'Increase Kd until oscillation begins'
      ],
      answer: 1,
      explanation: 'To see windup: set SP very high so the output saturates at 100% immediately. Let the simulation run for 30+ seconds. Then reduce SP to a reasonable value. Watch the PV slowly recover while the output stays pegged — that\'s the integrator unwinding. Then enable anti-windup and repeat: the recovery is immediate. Seeing both behaviors back-to-back makes the concept permanent.'
    },
    {
      id: 'lab6',
      type: 'mcq',
      question: 'Simulink (MATLAB) is preferred for PID simulation over a simple spreadsheet because:',
      options: [
        'Simulink is free and requires no license',
        'Simulink enables graphical block diagram modeling of complex control structures, nonlinear elements, and dynamic interactions that spreadsheets cannot represent accurately',
        'Simulink automatically tunes PID parameters without user input',
        'Simulink runs faster on older computers'
      ],
      answer: 1,
      explanation: 'Simulink lets you model cascade loops, nonlinear valve characteristics, anti-windup, feedforward, and multi-loop interactions visually and accurately. A spreadsheet approximates simple FOPDT + PID reasonably well but breaks down with anything complex. Simulink also interfaces directly with real hardware via HIL (hardware-in-the-loop) testing. It\'s the difference between sketching a system and engineering it.'
    },
  ],
}
