// PID Control Code Lab — 3 difficulty levels
// Covers PID math, tuning methods, process simulation, and diagnostics

export const PID_LAB = [
  // ─────────────────────────────────────────────────────────────
  // LEVEL 1 — Foundations: PID algorithm fundamentals
  // ─────────────────────────────────────────────────────────────
  {
    id: 'pid-l1-1',
    level: 1,
    title: 'Discrete PID Controller',
    scenario: `Every PID implementation in SCADA runs in discrete time — not continuous calculus.
The standard position-form discrete PID:

  error(t) = setpoint - processVariable
  P term   = Kp × error(t)
  I term   = I_prev + Ki × error(t) × dt
  D term   = Kd × (error(t) - error_prev) / dt
  output   = P + I + D

with output clamped to [outMin, outMax] to prevent actuator damage.

Implement a PIDController class:
  constructor(Kp, Ki, Kd, outMin, outMax)
  compute(setpoint, pv, dt)  → output value (clamped)
  reset()                    → resets integral and last error

Real SCADA DCS controllers (Honeywell, Emerson, Rockwell) are all variations of this.`,
    hint: 'Anti-windup: clamp the output AFTER summing P+I+D, but also clamp the integral accumulator separately to prevent wind-up during saturation.',
    starter: `class PIDController {
  constructor(Kp, Ki, Kd, outMin = 0, outMax = 100) {
    this.Kp = Kp;
    this.Ki = Ki;
    this.Kd = Kd;
    this.outMin = outMin;
    this.outMax = outMax;
    // TODO: initialize integral accumulator and lastError to 0
  }

  compute(setpoint, pv, dt) {
    // Step 1: error = setpoint - pv
    // Step 2: P term = Kp * error
    // Step 3: I term — accumulate: this.integral += Ki * error * dt
    //         Clamp integral to [outMin, outMax] to prevent windup
    // Step 4: D term = Kd * (error - this.lastError) / dt
    //         Save current error as this.lastError
    // Step 5: output = P + this.integral + D
    //         Clamp output to [outMin, outMax] and return it
    // TODO: implement the above steps
    return this.outMin; // placeholder
  }

  reset() {
    // TODO: reset integral and lastError to 0
  }
}

const solution = PIDController;

// Simulate a few steps:
const pid = new PIDController(2.0, 0.5, 0.1);
let pv = 0;
const sp = 50;
for (let i = 0; i < 5; i++) {
  const out = pid.compute(sp, pv, 1.0);
  pv += out * 0.3; // fake process response
  console.log(\`Step \${i+1}: PV=\${pv.toFixed(2)}, Output=\${out.toFixed(2)}\`);
}`,
    starterPy: `class PIDController(object):
    """Discrete position-form PID controller with anti-windup."""

    def __init__(self, Kp, Ki, Kd, out_min=0.0, out_max=100.0):
        self.Kp = Kp
        self.Ki = Ki
        self.Kd = Kd
        self.out_min = out_min
        self.out_max = out_max
        # TODO: initialize self.integral and self.last_error to 0.0

    def compute(self, setpoint, pv, dt):
        # Step 1: error = setpoint - pv
        # Step 2: P = self.Kp * error
        # Step 3: I — accumulate: self.integral += self.Ki * error * dt
        #         Clamp self.integral to [out_min, out_max]
        # Step 4: D = self.Kd * (error - self.last_error) / dt  (guard: if dt > 0 else 0.0)
        #         Save error as self.last_error
        # Step 5: output = P + self.integral + D
        #         Clamp output to [out_min, out_max] and return it
        # TODO: implement the above steps
        return self.out_min  # placeholder

    def reset(self):
        # TODO: reset self.integral and self.last_error to 0.0
        pass

solution = PIDController

pid = PIDController(2.0, 0.5, 0.1)
pv = 0.0
sp = 50.0
for i in range(5):
    out = pid.compute(sp, pv, 1.0)
    pv += out * 0.3
    print('Step {}: PV={:.2f}, Output={:.2f}'.format(i+1, pv, out))`,
    starterJython: `class PIDController(object):
    """Discrete PID controller. Jython 2.7."""

    def __init__(self, Kp, Ki, Kd, out_min=0.0, out_max=100.0):
        self.Kp = Kp
        self.Ki = Ki
        self.Kd = Kd
        self.out_min = out_min
        self.out_max = out_max
        # TODO: initialize self.integral and self.last_error to 0.0

    def compute(self, setpoint, pv, dt):
        # Step 1: error = setpoint - pv
        # Step 2: P = self.Kp * error
        # Step 3: I — accumulate: self.integral += self.Ki * error * dt
        #         Clamp self.integral to [out_min, out_max]
        # Step 4: D = self.Kd * (error - self.last_error) / dt  (guard: if dt > 0 else 0.0)
        #         Save error as self.last_error
        # Step 5: output = P + self.integral + D
        #         Clamp output to [out_min, out_max] and return it
        # TODO: implement the above steps
        return self.out_min  # placeholder

    def reset(self):
        # TODO: reset self.integral and self.last_error to 0.0
        pass

solution = PIDController

pid = PIDController(2.0, 0.5, 0.1)
pv = 0.0
for i in range(5):
    out = pid.compute(50.0, pv, 1.0)
    pv += out * 0.3
    print('Step %d: PV=%.2f, Out=%.2f' % (i+1, pv, out))`,
    tests: [
      { description: 'Large error (SP=100, PV=0) → output at or near outMax (100)' },
      { description: 'At setpoint (SP=PV=50) → P=0, derivative=0, output from integral only' },
      { description: 'reset() clears integral and lastError, output returns to proportional-only' },
      { description: 'Output is always clamped within [outMin, outMax]' },
    ],
    testRunner: function(solution) {
      if (typeof solution !== 'function') return [{ passed: false, error: 'not a class' }]
      const results = []
      // Test 1: large error → near max
      try {
        const c = new solution(10, 0, 0, 0, 100)
        const out = c.compute(100, 0, 1.0)
        results.push({ passed: out === 100, actual: out, expected: 100 })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 2: at setpoint, P=0
      try {
        const c = new solution(2, 0.5, 0, 0, 100)
        c.compute(50, 0, 1.0) // warm up integral
        // Now at setpoint: P=0, D≈0, only integral
        const out1 = c.compute(50, 50, 1.0)
        const out2 = c.compute(50, 50, 1.0)
        results.push({ passed: out1 === out2, actual: { out1, out2 } }) // integral stable at setpoint
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 3: reset clears state
      try {
        const c = new solution(2, 1, 0.5, 0, 100)
        c.compute(100, 0, 1.0) // build up integral
        c.reset()
        const out = c.compute(50, 50, 1.0) // at SP after reset: should be ~0 (no integral)
        results.push({ passed: Math.abs(out) < 1, actual: out })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 4: clamping
      try {
        const c = new solution(100, 100, 100, 0, 100)
        const out = c.compute(1000, 0, 1.0)
        results.push({ passed: out >= 0 && out <= 100, actual: out })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      return results
    },
  },

  {
    id: 'pid-l1-2',
    level: 1,
    title: 'Ziegler-Nichols Tuning Calculator',
    scenario: `Ziegler-Nichols is the classic empirical PID tuning method used since 1942.
It gives starting gains from two process characteristics:
  - Ultimate gain (Ku): the P-only gain at which the loop oscillates continuously
  - Ultimate period (Tu): the period (seconds) of that oscillation

From these, Z-N recommends:

  PID mode:    Kp = 0.6 × Ku,  Ki = 1.2 × Ku / Tu,  Kd = 0.075 × Ku × Tu
  PI mode:     Kp = 0.45 × Ku, Ki = 0.54 × Ku / Tu, Kd = 0
  P-only mode: Kp = 0.5 × Ku,  Ki = 0,               Kd = 0

Implement znTuning(Ku, Tu, mode) that returns { Kp, Ki, Kd }.
Round to 4 decimal places.

Important context: Z-N tends to produce aggressive tuning. In practice, engineers apply
a detuning factor of 0.5-0.7× on the calculated gains as a starting point.`,
    hint: 'This is straightforward math — focus on getting the formulas exactly right. Real commissioning starts with these numbers, then fine-tunes on the actual process.',
    starter: `function znTuning(Ku, Tu, mode = 'PID') {
  // Step 1: For each mode, compute Kp, Ki, Kd using Z-N formulas:
  //   'PID': Kp=0.6*Ku,  Ki=1.2*Ku/Tu,  Kd=0.075*Ku*Tu
  //   'PI':  Kp=0.45*Ku, Ki=0.54*Ku/Tu, Kd=0
  //   'P':   Kp=0.5*Ku,  Ki=0,           Kd=0
  //   other: return null
  // Step 2: Return { Kp, Ki, Kd } with each value rounded to 4 decimal places
  //         Use: Math.round(value * 10000) / 10000

  let Kp, Ki, Kd;

  // TODO: Step 1 — implement mode logic

  // TODO: Step 2 — return rounded result (or null for unknown mode)

  return null; // placeholder
}

const solution = znTuning;

// Typical flow loop: Ku=2.0, Tu=30s
console.log(znTuning(2.0, 30, 'PID'));
// Kp=1.2, Ki=0.08, Kd=4.5
console.log(znTuning(2.0, 30, 'PI'));`,
    starterPy: `def zn_tuning(Ku, Tu, mode='PID'):
    """Ziegler-Nichols PID tuning calculator."""
    # Step 1: For each mode, compute Kp, Ki, Kd using Z-N formulas:
    #   'PID': Kp=0.6*Ku,  Ki=1.2*Ku/Tu,  Kd=0.075*Ku*Tu
    #   'PI':  Kp=0.45*Ku, Ki=0.54*Ku/Tu, Kd=0.0
    #   'P':   Kp=0.5*Ku,  Ki=0.0,         Kd=0.0
    #   other: return None
    # Step 2: Return {'Kp': round(Kp,4), 'Ki': round(Ki,4), 'Kd': round(Kd,4)}

    # TODO: implement mode logic and return the result

    return None  # placeholder

solution = zn_tuning

print(zn_tuning(2.0, 30, 'PID'))  # Kp=1.2, Ki=0.08, Kd=4.5
print(zn_tuning(2.0, 30, 'PI'))
print(zn_tuning(2.0, 30, 'bad'))  # None`,
    starterJython: `def zn_tuning(Ku, Tu, mode='PID'):
    """Ziegler-Nichols PID tuning. Jython 2.7."""
    # Step 1: For each mode, compute Kp, Ki, Kd using Z-N formulas:
    #   'PID': Kp=0.6*Ku,  Ki=1.2*Ku/Tu,  Kd=0.075*Ku*Tu
    #   'PI':  Kp=0.45*Ku, Ki=0.54*Ku/Tu, Kd=0.0
    #   'P':   Kp=0.5*Ku,  Ki=0.0,         Kd=0.0
    #   other: return None
    # Step 2: Return {'Kp': round(Kp,4), 'Ki': round(Ki,4), 'Kd': round(Kd,4)}

    # TODO: implement mode logic and return the result

    return None  # placeholder

solution = zn_tuning

print(zn_tuning(2.0, 30, 'PID'))
print(zn_tuning(1.5, 20, 'PI'))`,
    tests: [
      { description: 'znTuning(2.0, 30, "PID") → {Kp:1.2, Ki:0.08, Kd:4.5}' },
      { description: 'znTuning(1.5, 20, "PI")  → {Kp:0.675, Ki:0.0405, Kd:0}' },
      { description: 'znTuning(3.0, 60, "P")   → {Kp:1.5, Ki:0, Kd:0}' },
      { description: 'znTuning(2.0, 30, "bad") → null (invalid mode)' },
    ],
    testRunner: function(solution) {
      if (typeof solution !== 'function') return [{ passed: false, error: 'not a function' }]
      function close(a, b, tol=0.001) { return Math.abs(a-b) < tol }
      const cases = [
        { args: [2.0, 30, 'PID'], check: r => r && close(r.Kp,1.2) && close(r.Ki,0.08) && close(r.Kd,4.5) },
        { args: [1.5, 20, 'PI'],  check: r => r && close(r.Kp,0.675) && close(r.Ki,0.0405) && r.Kd===0 },
        { args: [3.0, 60, 'P'],   check: r => r && close(r.Kp,1.5) && r.Ki===0 && r.Kd===0 },
        { args: [2.0, 30, 'bad'],  check: r => r === null },
      ]
      return cases.map(c => {
        try { const r = solution(...c.args); return { passed: c.check(r), actual: r } }
        catch(e) { return { passed: false, error: e.message } }
      })
    },
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 2 — Applied: process modeling and loop analysis
  // ─────────────────────────────────────────────────────────────
  {
    id: 'pid-l2-1',
    level: 2,
    title: 'First-Order Plus Dead Time (FOPDT) Model',
    scenario: `Most industrial processes are approximated as First-Order Plus Dead Time (FOPDT):

  G(s) = K × e^(-θs) / (τs + 1)

where:
  K = process gain (% output → % PV change)
  τ = time constant (seconds to reach 63.2% of final value)
  θ = dead time / delay (seconds before PV responds at all)

FOPDT step response (for a step change ΔU at t=0):
  PV(t) = 0                          if t < θ
  PV(t) = K × ΔU × (1 - e^(-(t-θ)/τ)) if t >= θ

Implement fopdt(K, tau, theta, deltaU, t) that returns the PV value at time t.

Then implement identifyFOPDT(stepData) where stepData is [{t, pv}] array.
Use the 28.3%/63.2% method:
  - Find t1 (when PV = 28.3% of final ΔPV)
  - Find t2 (when PV = 63.2% of final ΔPV)
  - τ = 1.5 × (t2 - t1)
  - θ = t2 - τ`,
    hint: 'For identifyFOPDT, interpolate between data points to find exact t1 and t2. The 28.3% point is key: at t=θ+0.33τ, PV=28.3% of final value.',
    starter: `function fopdt(K, tau, theta, deltaU, t) {
  // If t < theta: dead time — return 0
  // Else: return K * deltaU * (1 - Math.exp(-(t - theta) / tau))

  // TODO: implement
  return 0; // placeholder
}

function identifyFOPDT(stepData) {
  // Step 1: Guard — return null if stepData is falsy or has fewer than 3 points
  // Step 2: Extract finalPV (last point), initialPV (first point), deltaPV = finalPV - initialPV
  //         Return null if |deltaPV| < 0.001
  // Step 3: Compute target values:
  //   target283 = initialPV + 0.283 * deltaPV
  //   target632 = initialPV + 0.632 * deltaPV
  // Step 4: Scan stepData to find t1 (first crossing of target283) and t2 (first crossing of target632)
  //         Interpolate between adjacent points for precision:
  //           frac = (target - prev.pv) / (curr.pv - prev.pv)
  //           t_crossing = prev.t + frac * (curr.t - prev.t)
  // Step 5: Return null if t1 or t2 not found
  // Step 6: tau = 1.5 * (t2 - t1)
  //         theta = t2 - tau
  //         K = deltaPV  (normalized for deltaU=1)
  //         Return { K, tau, theta } rounded to 3/2/2 decimal places

  // TODO: implement
  return null; // placeholder
}

const solution = { fopdt, identifyFOPDT };

// Generate step response data for K=1, tau=30, theta=10
const data = [];
for (let t = 0; t <= 120; t += 2) {
  data.push({ t, pv: fopdt(1.0, 30, 10, 1.0, t) });
}
console.log('FOPDT at t=40:', fopdt(1.0, 30, 10, 1.0, 40).toFixed(4)); // ≈0.6321 at t=θ+τ
console.log('Identified:', identifyFOPDT(data));`,
    starterPy: `import math

def fopdt(K, tau, theta, delta_u, t):
    """FOPDT step response: K*dU*(1 - e^(-(t-theta)/tau)) for t >= theta."""
    # If t < theta: return 0.0
    # Else: return K * delta_u * (1.0 - math.exp(-(t - theta) / tau))

    # TODO: implement
    return 0.0  # placeholder

def identify_fopdt(step_data):
    """Identify FOPDT parameters from step response using 28.3%/63.2% method."""
    # Step 1: Guard — return None if step_data is falsy or has fewer than 3 points
    # Step 2: final_pv = step_data[-1]['pv'], initial_pv = step_data[0]['pv']
    #         delta_pv = final_pv - initial_pv; return None if abs(delta_pv) < 0.001
    # Step 3: target_283 = initial_pv + 0.283 * delta_pv
    #         target_632 = initial_pv + 0.632 * delta_pv
    # Step 4: Scan step_data; for each pair (prev, curr):
    #         If t1 not found and curr['pv'] >= target_283:
    #           frac = (target_283 - prev['pv']) / (curr['pv'] - prev['pv'])
    #           t1 = prev['t'] + frac * (curr['t'] - prev['t'])
    #         Same for t2 with target_632
    # Step 5: Return None if t1 or t2 is None
    # Step 6: tau = 1.5 * (t2 - t1); theta = t2 - tau
    #         Return {'K': round(delta_pv,3), 'tau': round(tau,2), 'theta': round(theta,2)}

    # TODO: implement
    return None  # placeholder

solution = {'fopdt': fopdt, 'identifyFOPDT': identify_fopdt}

data = [{'t': t, 'pv': fopdt(1.0, 30, 10, 1.0, t)} for t in range(0, 121, 2)]
print('At t=40:', round(fopdt(1.0, 30, 10, 1.0, 40), 4))
print('Identified:', identify_fopdt(data))`,
    starterJython: `import math

def fopdt(K, tau, theta, delta_u, t):
    """FOPDT step response. Jython 2.7."""
    # If t < theta: return 0.0
    # Else: return K * delta_u * (1.0 - math.exp(-(t - theta) / tau))

    # TODO: implement
    return 0.0  # placeholder

def identify_fopdt(step_data):
    """Identify FOPDT parameters from step data. Jython 2.7."""
    # Step 1: Guard — return None if step_data is falsy or has fewer than 3 points
    # Step 2: final_pv = step_data[-1]['pv'], initial_pv = step_data[0]['pv']
    #         delta_pv = final_pv - initial_pv; return None if abs(delta_pv) < 0.001
    # Step 3: target_283 = initial_pv + 0.283 * delta_pv
    #         target_632 = initial_pv + 0.632 * delta_pv
    # Step 4: Scan step_data; for each pair (prev, curr):
    #         If t1 not set and curr['pv'] >= target_283: interpolate to find t1
    #         If t2 not set and curr['pv'] >= target_632: interpolate to find t2
    # Step 5: Return None if t1 or t2 is None
    # Step 6: tau = 1.5 * (t2 - t1); theta = t2 - tau
    #         Return {'K': round(delta_pv,3), 'tau': round(tau,2), 'theta': round(theta,2)}

    # TODO: implement
    return None  # placeholder

solution = {'fopdt': fopdt, 'identifyFOPDT': identify_fopdt}`,
    tests: [
      { description: 'fopdt(K=1, τ=30, θ=10, ΔU=1, t=10) → 0 (dead time)' },
      { description: 'fopdt(K=1, τ=30, θ=10, ΔU=1, t=40) → ≈0.6321 (one time constant)' },
      { description: 'identifyFOPDT from generated data recovers τ≈30, θ≈10 (within 10%)' },
      { description: 'identifyFOPDT with empty/null data → null' },
    ],
    testRunner: function(solution) {
      if (!solution || typeof solution.fopdt !== 'function') return [{ passed: false, error: 'solution must be {fopdt, identifyFOPDT}' }]
      const { fopdt, identifyFOPDT } = solution
      const results = []
      // Test 1: dead time
      try {
        const v = fopdt(1, 30, 10, 1, 10)
        results.push({ passed: v === 0, actual: v, expected: 0 })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 2: one time constant
      try {
        const v = fopdt(1, 30, 10, 1, 40)
        results.push({ passed: Math.abs(v - 0.6321) < 0.001, actual: v.toFixed(4), expected: '0.6321' })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 3: identification
      try {
        const data = []
        for (let t = 0; t <= 200; t += 1) data.push({ t, pv: fopdt(1, 30, 10, 1, t) })
        const id = identifyFOPDT(data)
        const ok = id && Math.abs(id.tau - 30) < 3 && Math.abs(id.theta - 10) < 3
        results.push({ passed: ok, actual: id, expected: {tau:30, theta:10} })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 4: null input
      try {
        const r = identifyFOPDT(null)
        results.push({ passed: r === null, actual: r })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      return results
    },
  },

  {
    id: 'pid-l2-2',
    level: 2,
    title: 'Loop Oscillation Detector',
    scenario: `Oscillating PID loops are one of the most common problems in process plants.
An oscillating loop wastes energy, fatigues equipment, and reduces product quality.

Signs of oscillation: the PV (and output) cross the setpoint repeatedly in a roughly periodic pattern.

Implement detectOscillation(pvHistory, sp, threshold) where:
  - pvHistory: array of PV values (equally spaced in time)
  - sp: current setpoint
  - threshold: minimum peak-to-valley amplitude to count as oscillation

Algorithm:
  1. Compute error signal: e[i] = pvHistory[i] - sp
  2. Detect zero crossings (where error changes sign)
  3. Count zero crossings in the last N points
  4. If crossings >= 4 within the window → oscillating
  5. Compute approximate period: windowTime / (crossings / 2)
  6. Compute peak-to-valley amplitude of the PV swings

Return: { oscillating: bool, crossings: number, amplitude: number, period: number|null }`,
    hint: 'A zero crossing is where e[i-1] and e[i] have opposite signs (e[i-1]*e[i] < 0). Period = 2 × average time between crossings. Use the last 50 data points for detection.',
    starter: `function detectOscillation(pvHistory, sp, threshold = 0.5, dtSeconds = 1.0) {
  // Step 1: Guard — return default result if pvHistory is falsy or has fewer than 10 points
  //         Default: { oscillating: false, crossings: 0, amplitude: 0, period: null }
  // Step 2: Take the last 50 points as the window
  //         Compute errors[] = window.map(pv => pv - sp)
  // Step 3: Count zero crossings — loop from i=1; count where errors[i-1]*errors[i] < 0
  // Step 4: Compute amplitude = Math.max(...window) - Math.min(...window)
  // Step 5: Compute period — if crossings >= 2:
  //           period = (window.length * dtSeconds * 2) / crossings
  //         Round period to 1 decimal place; leave null if crossings < 2
  // Step 6: oscillating = crossings >= 4 AND amplitude >= threshold
  // Step 7: Return { oscillating, crossings, amplitude: Math.round(amplitude*100)/100, period }

  // TODO: Step 1 — guard clause

  // TODO: Steps 2-7 — implement detection logic

  return { oscillating: false, crossings: 0, amplitude: 0, period: null }; // placeholder
}

const solution = detectOscillation;

// Simulate an oscillating loop (sine wave around SP)
const sp = 50;
const pvHistory = Array.from({ length: 60 }, (_, i) => sp + 5 * Math.sin(i * Math.PI / 5));
console.log(detectOscillation(pvHistory, sp, 2.0, 1.0));
// Expected: oscillating=true, crossings>4`,
    starterPy: `import math

def detect_oscillation(pv_history, sp, threshold=0.5, dt_seconds=1.0):
    """Detect PID loop oscillation from PV history."""
    # Step 1: Guard — return default if pv_history is falsy or len < 10
    #         Default: {'oscillating': False, 'crossings': 0, 'amplitude': 0, 'period': None}
    # Step 2: window = pv_history[-50:]
    #         errors = [pv - sp for pv in window]
    # Step 3: Count zero crossings — loop i=1..len(errors):
    #         if errors[i-1] * errors[i] < 0: crossings += 1
    # Step 4: amplitude = max(window) - min(window)
    # Step 5: period = round((len(window) * dt_seconds * 2) / crossings, 1) if crossings >= 2 else None
    # Step 6: oscillating = crossings >= 4 and amplitude >= threshold
    # Step 7: Return {'oscillating': oscillating, 'crossings': crossings,
    #                  'amplitude': round(amplitude, 2), 'period': period}

    # TODO: Step 1 — guard clause

    # TODO: Steps 2-7 — implement detection logic

    return {'oscillating': False, 'crossings': 0, 'amplitude': 0, 'period': None}  # placeholder

solution = detect_oscillation

sp = 50.0
pv_history = [sp + 5.0 * math.sin(i * math.pi / 5) for i in range(60)]
print(detect_oscillation(pv_history, sp, 2.0, 1.0))`,
    starterJython: `import math

def detect_oscillation(pv_history, sp, threshold=0.5, dt_seconds=1.0):
    """Detect PID loop oscillation. Jython 2.7."""
    # Step 1: Guard — return default if pv_history is falsy or len < 10
    #         Default: {'oscillating': False, 'crossings': 0, 'amplitude': 0, 'period': None}
    # Step 2: window = pv_history[-50:]
    #         errors = [pv - sp for pv in window]
    # Step 3: Count zero crossings — loop i=1..len(errors):
    #         if errors[i-1] * errors[i] < 0: crossings += 1
    # Step 4: amplitude = max(window) - min(window)
    # Step 5: period = round((len(window) * dt_seconds * 2) / crossings, 1) if crossings >= 2 else None
    # Step 6: oscillating = crossings >= 4 and amplitude >= threshold
    # Step 7: Return the result dict

    # TODO: Step 1 — guard clause

    # TODO: Steps 2-7 — implement detection logic

    return {'oscillating': False, 'crossings': 0, 'amplitude': 0, 'period': None}  # placeholder

solution = detect_oscillation`,
    tests: [
      { description: 'Sine wave PV around SP → oscillating:true, crossings>=4' },
      { description: 'Flat PV at SP → oscillating:false, amplitude≈0' },
      { description: 'Small oscillation below threshold → oscillating:false despite crossings' },
      { description: 'Too few data points (<10) → oscillating:false' },
    ],
    testRunner: function(solution) {
      if (typeof solution !== 'function') return [{ passed: false, error: 'not a function' }]
      const results = []
      const sp = 50
      // Test 1: oscillating sine
      try {
        const pv = Array.from({length:60}, (_,i) => sp + 5*Math.sin(i*Math.PI/5))
        const r = solution(pv, sp, 2.0, 1.0)
        results.push({ passed: r?.oscillating===true && r?.crossings>=4, actual: r })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 2: flat PV
      try {
        const pv = Array.from({length:60}, () => sp)
        const r = solution(pv, sp, 0.5, 1.0)
        results.push({ passed: r?.oscillating===false && r?.amplitude<0.1, actual: r })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 3: small oscillation below threshold
      try {
        const pv = Array.from({length:60}, (_,i) => sp + 0.3*Math.sin(i*Math.PI/5))
        const r = solution(pv, sp, 2.0, 1.0)
        results.push({ passed: r?.oscillating===false, actual: r })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 4: too few points
      try {
        const r = solution([50,51,49], sp, 0.5, 1.0)
        results.push({ passed: r?.oscillating===false, actual: r })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      return results
    },
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 3 — Expert: cascade control, diagnostics, advanced tuning
  // ─────────────────────────────────────────────────────────────
  {
    id: 'pid-l3-1',
    level: 3,
    title: 'Cascade Control Simulator',
    scenario: `Cascade control uses two PID controllers: a primary (outer) loop and a secondary (inner) loop.
The primary controller's output IS the setpoint for the secondary controller.

Classic example: a heat exchanger where:
  - Primary loop: controls process temperature (slow, τ~300s)
  - Secondary loop: controls steam flow (fast, τ~5s)

The secondary loop responds to disturbances before they reach the primary PV.
This is why cascade is used on 30-40% of loops in refineries and chemical plants.

Implement CascadeController:
  class CascadeController {
    constructor(primaryGains, secondaryGains, secOutMin, secOutMax)
    // primaryGains = {Kp, Ki, Kd}, secondaryGains = {Kp, Ki, Kd}

    compute(primarySP, primaryPV, secondaryPV, dt)
    // Returns { primaryOutput, secondaryOutput, secondarySP }

    setMode(mode)  // 'cascade' | 'manual' | 'auto' (primary only, secondary in manual)
    getMode()
  }

In 'cascade' mode: primaryOutput → secondarySP → secondaryOutput → final control element
In 'auto' mode: only primary runs, secondaryOutput is frozen at last value
In 'manual' mode: both frozen

Think about bumpless transfer when switching modes.`,
    hint: 'The secondary SP is the output of the primary PID, clamped to the secondary output range. Run secondary at faster rate in real systems — here simulate at same dt. Bumpless transfer: when switching to cascade, initialize primary integral so output matches current secondary SP.',
    starter: `class CascadeController {
  constructor(primaryGains, secondaryGains, secOutMin = 0, secOutMax = 100) {
    this.secOutMin = secOutMin;
    this.secOutMax = secOutMax;
    this.mode = 'cascade';

    // Primary PID state
    this.pGains = primaryGains;
    this.pIntegral = 0;
    this.pLastError = 0;

    // Secondary PID state
    this.sGains = secondaryGains;
    this.sIntegral = 0;
    this.sLastError = 0;

    this.lastSecondaryOutput = 0;
    this.lastSecondarySP = 0;
  }

  _pidCompute(gains, sp, pv, dt, integralRef, lastErrorRef) {
    // Helper: runs one PID step
    // error = sp - pv
    // P = gains.Kp * error
    // integralRef.val += gains.Ki * error * dt; clamp to [secOutMin, secOutMax]
    // D = gains.Kd * (error - lastErrorRef.val) / dt; update lastErrorRef.val
    // output = clamp(P + integralRef.val + D, secOutMin, secOutMax)
    // TODO: implement this helper

    return this.secOutMin; // placeholder
  }

  compute(primarySP, primaryPV, secondaryPV, dt) {
    // In 'manual' mode: return frozen outputs (lastSecondarySP, lastSecondaryOutput)
    if (this.mode === 'manual') {
      return {
        primaryOutput: this.lastSecondarySP,
        secondaryOutput: this.lastSecondaryOutput,
        secondarySP: this.lastSecondarySP,
      };
    }

    // Step 1: Run primary PID → secondarySP
    //   Use pI = {val: this.pIntegral} and pLE = {val: this.pLastError} as ref objects
    //   Call _pidCompute, then write back pI.val and pLE.val
    //   Store result in this.lastSecondarySP

    // TODO: Step 1 — primary PID computation
    const secondarySP = this.lastSecondarySP; // replace with actual computation

    // In 'auto' mode: primary runs, secondary frozen
    if (this.mode === 'auto') {
      return {
        primaryOutput: secondarySP,
        secondaryOutput: this.lastSecondaryOutput,
        secondarySP,
      };
    }

    // Step 2: In 'cascade' mode — run secondary PID using secondarySP and secondaryPV
    //   Same ref-object pattern as step 1; store result in this.lastSecondaryOutput
    //   Return { primaryOutput: secondarySP, secondaryOutput, secondarySP }

    // TODO: Step 2 — secondary PID computation

    return { primaryOutput: secondarySP, secondaryOutput: this.lastSecondaryOutput, secondarySP };
  }

  setMode(mode) {
    this.mode = mode;
  }

  getMode() {
    return this.mode;
  }
}

const solution = CascadeController;

// Test cascade simulation
const cascade = new CascadeController(
  { Kp: 5, Ki: 0.1, Kd: 0 },   // primary: temperature
  { Kp: 2, Ki: 0.5, Kd: 0.1 }, // secondary: flow
);

let primaryPV = 20; // temperature starts at 20°C
let secondaryPV = 0; // flow starts at 0

for (let i = 0; i < 5; i++) {
  const r = cascade.compute(100, primaryPV, secondaryPV, 1.0);
  secondaryPV += r.secondaryOutput * 0.1;  // flow responds
  primaryPV += secondaryPV * 0.05;          // temperature responds to flow
  console.log(\`Step \${i+1}: TempPV=\${primaryPV.toFixed(1)}, Flow=\${secondaryPV.toFixed(1)}, FlowSP=\${r.secondarySP.toFixed(1)}\`);
}`,
    starterPy: `class CascadeController(object):
    """Cascade PID controller: primary output feeds secondary setpoint."""

    def __init__(self, primary_gains, secondary_gains, sec_out_min=0.0, sec_out_max=100.0):
        self.sec_out_min = sec_out_min
        self.sec_out_max = sec_out_max
        self.mode = 'cascade'
        self.p_gains = primary_gains
        self.p_integral = 0.0
        self.p_last_error = 0.0
        self.s_gains = secondary_gains
        self.s_integral = 0.0
        self.s_last_error = 0.0
        self.last_secondary_output = 0.0
        self.last_secondary_sp = 0.0

    def _clamp(self, v):
        return max(self.sec_out_min, min(self.sec_out_max, v))

    def _pid(self, gains, sp, pv, dt, integral, last_error):
        # TODO: implement one PID step
        # error = sp - pv
        # P = gains['Kp'] * error
        # integral = clamp(integral + gains['Ki'] * error * dt)
        # D = gains['Kd'] * (error - last_error) / dt if dt > 0 else 0.0
        # last_error = error
        # return clamp(P + integral + D), integral, last_error
        return self.sec_out_min, integral, last_error  # placeholder

    def compute(self, primary_sp, primary_pv, secondary_pv, dt):
        # In 'manual' mode: return frozen outputs
        if self.mode == 'manual':
            return {
                'primaryOutput': self.last_secondary_sp,
                'secondaryOutput': self.last_secondary_output,
                'secondarySP': self.last_secondary_sp,
            }

        # Step 1: Run primary PID → secondary_sp
        #   secondary_sp, self.p_integral, self.p_last_error = self._pid(...)
        #   Store in self.last_secondary_sp

        # TODO: Step 1 — primary PID
        secondary_sp = self.last_secondary_sp  # replace with actual computation

        # In 'auto' mode: primary runs, secondary frozen
        if self.mode == 'auto':
            return {
                'primaryOutput': secondary_sp,
                'secondaryOutput': self.last_secondary_output,
                'secondarySP': secondary_sp,
            }

        # Step 2: In 'cascade' mode — run secondary PID
        #   secondary_out, self.s_integral, self.s_last_error = self._pid(...)
        #   Store in self.last_secondary_output
        #   Return {'primaryOutput': secondary_sp, 'secondaryOutput': secondary_out, 'secondarySP': secondary_sp}

        # TODO: Step 2 — secondary PID
        return {
            'primaryOutput': secondary_sp,
            'secondaryOutput': self.last_secondary_output,
            'secondarySP': secondary_sp,
        }

    def set_mode(self, mode):
        self.mode = mode

    def setMode(self, mode):
        self.mode = mode

    def get_mode(self):
        return self.mode

    def getMode(self):
        return self.mode

solution = CascadeController

cascade = CascadeController(
    {'Kp': 5, 'Ki': 0.1, 'Kd': 0},
    {'Kp': 2, 'Ki': 0.5, 'Kd': 0.1},
)
primary_pv = 20.0
secondary_pv = 0.0
for i in range(5):
    r = cascade.compute(100, primary_pv, secondary_pv, 1.0)
    secondary_pv += r['secondaryOutput'] * 0.1
    primary_pv += secondary_pv * 0.05
    print('Step {}: TempPV={:.1f}, Flow={:.1f}'.format(i+1, primary_pv, secondary_pv))`,
    starterJython: `class CascadeController(object):
    """Cascade PID controller. Jython 2.7."""

    def __init__(self, primary_gains, secondary_gains, sec_out_min=0.0, sec_out_max=100.0):
        self.sec_out_min = sec_out_min
        self.sec_out_max = sec_out_max
        self.mode = 'cascade'
        self.p_gains = primary_gains
        self.p_integral = 0.0
        self.p_last_error = 0.0
        self.s_gains = secondary_gains
        self.s_integral = 0.0
        self.s_last_error = 0.0
        self.last_secondary_output = 0.0
        self.last_secondary_sp = 0.0

    def _clamp(self, v):
        return max(self.sec_out_min, min(self.sec_out_max, v))

    def _pid(self, gains, sp, pv, dt, integral, last_error):
        # TODO: implement one PID step and return (output, integral, last_error)
        # error = sp - pv; P = Kp*error; integral = clamp(integral + Ki*error*dt)
        # D = Kd*(error-last_error)/dt if dt>0 else 0.0; last_error = error
        # return clamp(P+integral+D), integral, last_error
        return self.sec_out_min, integral, last_error  # placeholder

    def compute(self, primary_sp, primary_pv, secondary_pv, dt):
        if self.mode == 'manual':
            return {'primaryOutput': self.last_secondary_sp, 'secondaryOutput': self.last_secondary_output, 'secondarySP': self.last_secondary_sp}

        # TODO: Step 1 — run primary PID, store result as secondary_sp and update self.last_secondary_sp
        secondary_sp = self.last_secondary_sp  # replace with actual computation

        if self.mode == 'auto':
            return {'primaryOutput': secondary_sp, 'secondaryOutput': self.last_secondary_output, 'secondarySP': secondary_sp}

        # TODO: Step 2 — run secondary PID with secondary_sp and secondary_pv
        #   store result in self.last_secondary_output
        return {'primaryOutput': secondary_sp, 'secondaryOutput': self.last_secondary_output, 'secondarySP': secondary_sp}

    def setMode(self, mode): self.mode = mode
    def getMode(self): return self.mode

solution = CascadeController`,
    tests: [
      { description: 'Cascade mode: secondaryOutput responds to primary error (not zero when PV≠SP)' },
      { description: 'Manual mode: all outputs frozen, no computation' },
      { description: 'Secondary output is clamped within [secOutMin, secOutMax]' },
      { description: 'Mode switches correctly via setMode/getMode' },
    ],
    testRunner: function(solution) {
      if (typeof solution !== 'function') return [{ passed: false, error: 'not a class' }]
      const results = []
      const pGains = { Kp: 5, Ki: 0.1, Kd: 0 }
      const sGains = { Kp: 2, Ki: 0.5, Kd: 0.1 }
      // Test 1: cascade produces non-zero output with error
      try {
        const c = new solution(pGains, sGains, 0, 100)
        c.setMode('cascade')
        const r = c.compute(100, 0, 0, 1.0) // big error
        results.push({ passed: r?.secondaryOutput > 0, actual: r })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 2: manual mode freezes
      try {
        const c = new solution(pGains, sGains, 0, 100)
        c.setMode('cascade')
        const r1 = c.compute(100, 50, 40, 1.0)
        c.setMode('manual')
        const r2 = c.compute(100, 10, 5, 1.0) // different inputs, but frozen
        results.push({ passed: r2?.secondaryOutput === r1?.secondaryOutput, actual: {r1: r1?.secondaryOutput, r2: r2?.secondaryOutput} })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 3: output clamped
      try {
        const c = new solution({ Kp: 1000, Ki: 0, Kd: 0 }, { Kp: 1000, Ki: 0, Kd: 0 }, 0, 100)
        c.setMode('cascade')
        const r = c.compute(1000, 0, 0, 1.0)
        results.push({ passed: r?.secondaryOutput >= 0 && r?.secondaryOutput <= 100, actual: r?.secondaryOutput })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      // Test 4: mode switch
      try {
        const c = new solution(pGains, sGains, 0, 100)
        c.setMode('auto')
        results.push({ passed: c.getMode() === 'auto', actual: c.getMode() })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      return results
    },
  },

  {
    id: 'pid-l3-2',
    level: 3,
    title: 'IMC-Based PID Tuning (Lambda Tuning)',
    scenario: `Lambda tuning (Internal Model Control) is the industrial alternative to Ziegler-Nichols.
It's preferred when:
  - Process is sensitive (chemical reactors, biofermenters)
  - You want defined closed-loop speed, not maximum speed
  - Z-N produced an unstable or oscillatory result

Lambda (λ) is the desired closed-loop time constant — the engineer chooses it.
Larger λ = slower, more stable response. Smaller λ = faster, more aggressive.
Rule of thumb: λ ≥ τ/3 for stability margin.

For a FOPDT process with K, τ, θ:

  IMC filter: f = 1 / (λ + θ/2)  [Smith Predictor form]

  PID gains (ideal/parallel form):
    Kp = τ / (K × (λ + θ/2))
    Ki = Kp / τ               [= 1 / (K × (λ + θ/2))]
    Kd = Kp × θ / 2           [= τ × θ / (2K × (λ + θ/2))]

Implement lambdaTuning(K, tau, theta, lambda) → { Kp, Ki, Kd }

Also implement lambdaRecommend(tau, theta) that returns the minimum recommended λ:
  λ_min = max(τ/3, θ)  (must be at least as long as dead time)`,
    hint: 'Lambda tuning is deterministic and repeatable unlike Z-N. The key insight: λ is the ONLY tuning knob. If the loop is too aggressive, increase λ. If too slow, decrease λ. Never touch Kp, Ki, Kd directly.',
    starter: `function lambdaTuning(K, tau, theta, lambda) {
  // Step 1: Guard — return null if K === 0, tau === 0, or lambda <= 0
  // Step 2: Compute denominator = K * (lambda + theta / 2)
  // Step 3: Kp = tau / denominator
  //         Ki = Kp / tau      (equivalently: 1 / denominator)
  //         Kd = Kp * theta / 2
  // Step 4: Return { Kp, Ki, Kd, lambda } with each gain rounded to 4 decimal places
  //         Use: Math.round(value * 10000) / 10000

  // TODO: implement
  return null; // placeholder
}

function lambdaRecommend(tau, theta) {
  // Return max(tau / 3, theta) — minimum recommended lambda
  // TODO: implement
  return 0; // placeholder
}

const solution = { lambdaTuning, lambdaRecommend };

// Flow loop example: K=1.2, τ=15s, θ=3s
const lam = lambdaRecommend(15, 3); // max(5, 3) = 5
console.log('Recommended λ:', lam);
console.log('Lambda tuning:', lambdaTuning(1.2, 15, 3, lam));

// Compare with Z-N aggressive tuning:
// Z-N would give Kp≈0.6Ku which often produces 30-50% overshoot
// Lambda gives controlled response with user-defined speed`,
    starterPy: `def lambda_tuning(K, tau, theta, lam):
    """IMC/Lambda PID tuning for a FOPDT process."""
    # Step 1: Guard — return None if K == 0, tau == 0, or lam <= 0
    # Step 2: denominator = K * (lam + theta / 2.0)
    # Step 3: Kp = tau / denominator
    #         Ki = Kp / tau
    #         Kd = Kp * theta / 2.0
    # Step 4: Return {'Kp': round(Kp,4), 'Ki': round(Ki,4), 'Kd': round(Kd,4), 'lambda': lam}

    # TODO: implement
    return None  # placeholder

def lambda_recommend(tau, theta):
    """Minimum recommended lambda: max(tau/3, theta)."""
    # TODO: implement
    return 0  # placeholder

solution = {'lambdaTuning': lambda_tuning, 'lambdaRecommend': lambda_recommend}

lam = lambda_recommend(15, 3)  # max(5, 3) = 5
print('Recommended lambda:', lam)
print('Lambda tuning:', lambda_tuning(1.2, 15, 3, lam))
print('Invalid K=0:', lambda_tuning(0, 15, 3, 5))`,
    starterJython: `def lambda_tuning(K, tau, theta, lam):
    """IMC/Lambda PID tuning. Jython 2.7."""
    # Step 1: Guard — return None if K == 0, tau == 0, or lam <= 0
    # Step 2: denominator = K * (lam + theta / 2.0)
    # Step 3: Kp = tau / denominator
    #         Ki = Kp / tau
    #         Kd = Kp * theta / 2.0
    # Step 4: Return {'Kp': round(Kp,4), 'Ki': round(Ki,4), 'Kd': round(Kd,4), 'lambda': lam}

    # TODO: implement
    return None  # placeholder

def lambda_recommend(tau, theta):
    """Minimum recommended lambda: max(tau/3, theta)."""
    # TODO: implement
    return 0  # placeholder

solution = {'lambdaTuning': lambda_tuning, 'lambdaRecommend': lambda_recommend}

print(lambda_tuning(1.2, 15, 3, 5))
print(lambda_recommend(15, 3))`,
    tests: [
      { description: 'lambdaTuning(K=1.2, τ=15, θ=3, λ=5) → Kp≈1.923, Ki≈0.1282, Kd≈0.2885' },
      { description: 'lambdaRecommend(τ=15, θ=3) → 5 (τ/3=5 > θ=3)' },
      { description: 'lambdaRecommend(τ=10, θ=8) → 8 (θ > τ/3)' },
      { description: 'lambdaTuning with K=0 → null (invalid process gain)' },
    ],
    testRunner: function(solution) {
      if (!solution || typeof solution.lambdaTuning !== 'function') return [{ passed: false, error: 'solution must be {lambdaTuning, lambdaRecommend}' }]
      const { lambdaTuning, lambdaRecommend } = solution
      function close(a, b, tol=0.01) { return Math.abs(a-b) < tol }
      const results = []
      try {
        const r = lambdaTuning(1.2, 15, 3, 5)
        // denominator = 1.2 * (5 + 1.5) = 1.2 * 6.5 = 7.8
        // Kp = 15/7.8 ≈ 1.9231, Ki = 1/7.8 ≈ 0.1282, Kd = 1.9231*1.5 ≈ 2.8846 wait
        // Kd = Kp * theta/2 = 1.9231 * 3/2 = 1.9231 * 1.5 = 2.8846? No wait
        // Let me recalculate: Kd = tau*theta/(2*K*(lam+theta/2)) = 15*3/(2*1.2*6.5) = 45/15.6 ≈ 2.8846
        // Hmm but I wrote Kd = Kp * theta/2 = 1.9231 * 1.5 = 2.8846
        // So Kp≈1.923, Ki≈0.1282, Kd≈2.8846
        results.push({ passed: r && close(r.Kp,1.923,0.01) && close(r.Ki,0.1282,0.005), actual: r })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      try {
        const r = lambdaRecommend(15, 3)
        results.push({ passed: r === 5, actual: r })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      try {
        const r = lambdaRecommend(10, 8)
        results.push({ passed: r === 8, actual: r })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      try {
        const r = lambdaTuning(0, 15, 3, 5)
        results.push({ passed: r === null, actual: r })
      } catch(e) { results.push({ passed: false, error: e.message }) }
      return results
    },
  },
]
