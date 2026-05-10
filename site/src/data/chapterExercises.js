// Chapter exercises for the PID Study Guide
// One exercise per content chapter, embedded at the end via ChapterExercise component.

export const PID_CHAPTER_EXERCISES = {

  // ─── Ch 1: Closed-Loop Control ─────────────────────────────────────────────
  intro: {
    id: 'pid-ch1-ex',
    title: 'Calculate Loop Error',
    scenario: `The first calculation in any PID controller is the error — the difference between what you want and what you have.
  error = SP − PV

Given a setpoint (SP) and a process variable (PV), return an object:
  { error: <number>, direction: 'above'|'below'|'at' }

Where direction describes the PV relative to the setpoint:
  • 'above'  — PV > SP (process is running above target)
  • 'below'  — PV < SP (process is running below target)
  • 'at'     — PV === SP (exactly on target)

Round error to 4 decimal places.`,
    hint: `error = SP - PV. Compare PV to SP for direction. Use Math.round(value * 10000) / 10000 for rounding.`,
    starter: `function calcError(setpoint, pv) {
  // error = setpoint - pv
  // direction: 'above' if pv > sp, 'below' if pv < sp, 'at' if equal
  // Round error to 4 decimal places

  // TODO: Step 1 — compute error = setpoint - pv
  // TODO: Step 2 — round to 4 decimal places
  // TODO: Step 3 — determine direction
  // TODO: Return { error, direction }

  return { error: 0, direction: '' }; // replace with real values
}
const solution = calcError;

console.log(calcError(100, 95));   // { error: 5, direction: 'below' }
console.log(calcError(100, 105));  // { error: -5, direction: 'above' }
console.log(calcError(72, 72));    // { error: 0, direction: 'at' }`,
    starterPy: `def calc_error(setpoint, pv):
    # error = setpoint - pv
    # direction: 'above' if pv > sp, 'below' if pv < sp, 'at' if equal
    # Round error to 4 decimal places

    # TODO: compute error
    # TODO: round to 4 decimal places
    # TODO: determine direction
    # TODO: return {'error': ..., 'direction': ...}

    return {'error': 0, 'direction': ''}

solution = calc_error`,
    starterJython: `def calc_error(setpoint, pv):
    # error = setpoint - pv
    # direction: 'above' if pv > sp, 'below' if pv < sp, 'at' if equal
    # Round error to 4 decimal places — use round(value, 4)

    # TODO: implement

    return {'error': 0, 'direction': ''}

solution = calc_error`,
    tests: [
      { description: "calcError(100, 95) → { error: 5, direction: 'below' }" },
      { description: "calcError(100, 105) → { error: -5, direction: 'above' }" },
      { description: "calcError(72, 72) → { error: 0, direction: 'at' }" },
      { description: "calcError(50, 49.9999) → error rounded to 4 decimal places" },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: [100, 95],      expected: { error: 5,      direction: 'below' } },
        { input: [100, 105],     expected: { error: -5,     direction: 'above' } },
        { input: [72,  72],      expected: { error: 0,      direction: 'at' } },
        { input: [50,  49.9999], expected: { error: 0.0001, direction: 'below' } },
      ]
      return cases.map(c => {
        try {
          const actual = solution(...c.input)
          const passed = actual &&
            actual.error === c.expected.error &&
            actual.direction === c.expected.direction
          return { passed: !!passed, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 2: Loop Fundamentals ───────────────────────────────────────────────
  loop: {
    id: 'pid-ch2-ex',
    title: 'Calculate Process Gain',
    scenario: `Process gain (Kp) describes how much the process variable changes per unit change in controller output:
  Kp = ΔPV / ΔCO

Given a change in controller output (deltaCO) and the resulting change in process variable (deltaPV), return the process gain as a number rounded to 4 decimal places.

Edge case: if deltaCO is zero, return null (cannot divide by zero — the process wasn't actually moved).`,
    hint: `Kp = deltaPV / deltaCO. Guard against division by zero first. Round to 4 decimal places.`,
    starter: `function calcProcessGain(deltaCO, deltaPV) {
  // Process gain Kp = deltaPV / deltaCO
  // If deltaCO === 0, return null (undefined — no step was made)
  // Round result to 4 decimal places

  // TODO: Step 1 — guard clause: if deltaCO is 0, return null
  // TODO: Step 2 — compute Kp = deltaPV / deltaCO
  // TODO: Step 3 — round to 4 decimal places and return

  return 0; // replace with real result
}
const solution = calcProcessGain;

console.log(calcProcessGain(10, 15));   // 1.5 (15% PV rise per 10% CO)
console.log(calcProcessGain(20, -5));   // -0.25 (inverse-acting)
console.log(calcProcessGain(0, 10));    // null (no step made)`,
    starterPy: `def calc_process_gain(delta_co, delta_pv):
    # Kp = delta_pv / delta_co
    # If delta_co == 0, return None
    # Round to 4 decimal places

    # TODO: guard clause
    # TODO: compute and return Kp

    return 0

solution = calc_process_gain`,
    starterJython: `def calc_process_gain(delta_co, delta_pv):
    # Kp = delta_pv / delta_co
    # If delta_co == 0, return None
    # Round to 4 decimal places — use round(value, 4)
    # Note: in Jython 2.7, integer division truncates: use float(delta_pv) / delta_co

    # TODO: guard clause
    # TODO: compute and return Kp

    return 0

solution = calc_process_gain`,
    tests: [
      { description: 'calcProcessGain(10, 15) === 1.5' },
      { description: 'calcProcessGain(20, -5) === -0.25' },
      { description: 'calcProcessGain(0, 10) === null (division by zero guard)' },
      { description: 'calcProcessGain(7, 10) rounds to 4 decimal places' },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: [10,  15], expected: 1.5 },
        { input: [20,  -5], expected: -0.25 },
        { input: [0,   10], expected: null },
        { input: [7,   10], expected: Math.round(10/7 * 10000) / 10000 },
      ]
      return cases.map(c => {
        try {
          const actual = solution(...c.input)
          return { passed: actual === c.expected, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 3: P, I, and D Action ─────────────────────────────────────────────
  pid: {
    id: 'pid-ch3-ex',
    title: 'Describe PID Action Dominance',
    scenario: `Given the tuning parameters Kp, Ki (integral gain), and Kd (derivative gain), determine which term will dominate the controller response and return a description object:
  { dominant: 'P'|'I'|'D', reason: <string> }

Dominance rules:
  • 'I'  — if Ki is the largest of the three (integral will grind the error down over time)
  • 'D'  — if Kd is the largest (derivative will react strongly to rate of change)
  • 'P'  — otherwise (proportional is the main driver)

Reason should be a short human-readable string explaining why that term dominates.`,
    hint: `Compare the three absolute values. The largest wins. Write a descriptive reason string for each case.`,
    starter: `function describePIDAction(Kp, Ki, Kd) {
  // Compare magnitudes of Kp, Ki, Kd (use absolute values)
  // Return { dominant: 'P'|'I'|'D', reason: 'short explanation' }

  // TODO: Step 1 — take absolute values of all three
  // TODO: Step 2 — find which is largest
  // TODO: Step 3 — set dominant letter and reason string
  // TODO: return { dominant, reason }

  return { dominant: '', reason: '' }; // replace with real values
}
const solution = describePIDAction;

console.log(describePIDAction(1, 0.5, 0.1));  // P dominant
console.log(describePIDAction(0.2, 2.0, 0.3)); // I dominant
console.log(describePIDAction(0.1, 0.1, 5.0)); // D dominant`,
    starterPy: `def describe_pid_action(kp, ki, kd):
    # Compare abs(kp), abs(ki), abs(kd) — largest wins
    # Return {'dominant': 'P'|'I'|'D', 'reason': str}

    # TODO: implement

    return {'dominant': '', 'reason': ''}

solution = describe_pid_action`,
    starterJython: `def describe_pid_action(kp, ki, kd):
    # Compare abs(kp), abs(ki), abs(kd) — largest wins
    # Return {'dominant': 'P'|'I'|'D', 'reason': str}

    # TODO: implement

    return {'dominant': '', 'reason': ''}

solution = describe_pid_action`,
    tests: [
      { description: "describePIDAction(1, 0.5, 0.1) → dominant 'P'" },
      { description: "describePIDAction(0.2, 2.0, 0.3) → dominant 'I'" },
      { description: "describePIDAction(0.1, 0.1, 5.0) → dominant 'D'" },
      { description: "result always has a non-empty reason string" },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: [1, 0.5, 0.1],  expectedDom: 'P' },
        { input: [0.2, 2.0, 0.3], expectedDom: 'I' },
        { input: [0.1, 0.1, 5.0], expectedDom: 'D' },
        { input: [0.5, 0.5, 0.5], expectAny: true },  // tie — any is acceptable but reason must be non-empty
      ]
      return cases.map(c => {
        try {
          const actual = solution(...c.input)
          const domOk = c.expectAny ? ['P','I','D'].includes(actual?.dominant) : actual?.dominant === c.expectedDom
          const reasonOk = typeof actual?.reason === 'string' && actual.reason.length > 0
          const passed = domOk && reasonOk
          return { passed, expected: { dominant: c.expectedDom || 'P|I|D', reason: '(non-empty string)' }, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 4: Tuning Methods ──────────────────────────────────────────────────
  tuning: {
    id: 'pid-ch4-ex',
    title: 'Lambda Tuning Formulas',
    scenario: `Lambda tuning is a model-based method for FOPDT processes. Given the process model parameters, calculate the PID tuning constants:

  Kp = tau / (K × (lambda + theta))
  Ti = tau                            (integral time equals process time constant)
  Td = theta / 2                      (derivative = half dead time)

Parameters:
  • K      — process gain (ΔPV/ΔCO)
  • tau    — process time constant (seconds)
  • theta  — dead time (seconds)
  • lambda — desired closed-loop time constant (seconds) — larger = slower/more robust

Return { Kp, Ti, Td } with each value rounded to 4 decimal places.`,
    hint: `Plug values directly into the three formulas. Round each result with Math.round(x * 10000) / 10000.`,
    starter: `function lambdaTuning(K, tau, theta, lambda) {
  // Lambda tuning formulas for a FOPDT process:
  // Step 1: Kp = tau / (K * (lambda + theta))
  // Step 2: Ti = tau  (integral time = process time constant)
  // Step 3: Td = theta / 2  (derivative = half dead time, optional)
  // Round each result to 4 decimal places
  // Return { Kp, Ti, Td }

  // TODO: Step 1 — calculate Kp
  // TODO: Step 2 — Ti equals tau
  // TODO: Step 3 — Td equals theta / 2

  return { Kp: 0, Ti: 0, Td: 0 }; // replace with real values
}
const solution = lambdaTuning;

console.log(lambdaTuning(1.5, 30, 5, 10));
// Kp ≈ 1.3333, Ti = 30, Td = 2.5`,
    starterPy: `def lambda_tuning(K, tau, theta, lam):
    # Kp = tau / (K * (lam + theta))
    # Ti = tau
    # Td = theta / 2
    # Round each to 4 decimal places

    # TODO: implement

    return {'Kp': 0, 'Ti': 0, 'Td': 0}

solution = lambda_tuning`,
    starterJython: `def lambda_tuning(K, tau, theta, lam):
    # Kp = tau / (K * (lam + theta))
    # Ti = tau
    # Td = theta / 2
    # In Jython 2.7: use float() to avoid integer division
    # Round each to 4 decimal places with round(value, 4)

    # TODO: implement

    return {'Kp': 0, 'Ti': 0, 'Td': 0}

solution = lambda_tuning`,
    tests: [
      { description: 'lambdaTuning(1.5, 30, 5, 10) → Kp ≈ 1.3333, Ti=30, Td=2.5' },
      { description: 'lambdaTuning(2.0, 60, 10, 20) → Kp=1.5, Ti=60, Td=5' },
      { description: 'lambdaTuning(1.0, 45, 15, 15) → Kp=1.5, Ti=45, Td=7.5' },
      { description: 'Ti always equals tau (third argument)' },
    ],
    testRunner: function (solution) {
      function r4(v) { return Math.round(v * 10000) / 10000 }
      const cases = [
        { input: [1.5, 30,  5,  10], expected: { Kp: r4(30/(1.5*15)),  Ti: 30, Td: 2.5 } },
        { input: [2.0, 60, 10,  20], expected: { Kp: r4(60/(2.0*30)),  Ti: 60, Td: 5.0 } },
        { input: [1.0, 45, 15,  15], expected: { Kp: r4(45/(1.0*30)),  Ti: 45, Td: 7.5 } },
        { input: [0.5, 20,  4,   6], expected: { Kp: r4(20/(0.5*10)),  Ti: 20, Td: 2.0 } },
      ]
      return cases.map(c => {
        try {
          const actual = solution(...c.input)
          const passed = actual &&
            r4(actual.Kp) === c.expected.Kp &&
            r4(actual.Ti) === c.expected.Ti &&
            r4(actual.Td) === c.expected.Td
          return { passed: !!passed, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 5: Process Dynamics ────────────────────────────────────────────────
  process: {
    id: 'pid-ch5-ex',
    title: 'FOPDT Step Response',
    scenario: `The First-Order Plus Dead Time (FOPDT) model describes how most industrial processes respond to a step change in the controller output.

For a step change in CO at time t=0, the PV response at time t is:
  • If t < theta:           PV(t) = 0               (no response during dead time)
  • If t >= theta:          PV(t) = K × (1 − e^(−(t−theta)/tau))

Where:
  • K     — process gain
  • tau   — time constant (seconds to reach ~63.2% of final value)
  • theta — dead time (seconds before any response)
  • t     — time since step (seconds)

Return the PV response rounded to 4 decimal places.`,
    hint: `Use Math.exp() for the exponential. Check dead time first with an if statement. The formula after dead time is K * (1 - Math.exp(-(t - theta) / tau)).`,
    starter: `function fopdt(K, tau, theta, t) {
  // FOPDT step response:
  //   if t < theta → return 0
  //   else         → return K * (1 - Math.exp(-(t - theta) / tau))
  // Round result to 4 decimal places

  // TODO: Step 1 — return 0 if t < theta (dead time, no response yet)
  // TODO: Step 2 — calculate K * (1 - e^(-(t-theta)/tau))
  // TODO: Step 3 — round to 4 decimal places and return

  return 0; // replace with real calculation
}
const solution = fopdt;

console.log(fopdt(2.0, 10, 3, 3));   // 0 (still in dead time at t=3)
console.log(fopdt(2.0, 10, 3, 13));  // K*(1-e^-1) ≈ 1.2642
console.log(fopdt(2.0, 10, 3, 103)); // approaches 2.0 at large t`,
    starterPy: `import math

def fopdt(K, tau, theta, t):
    # if t < theta: return 0
    # else: return K * (1 - math.exp(-(t - theta) / tau))
    # Round to 4 decimal places

    # TODO: implement

    return 0

solution = fopdt`,
    starterJython: `import math

def fopdt(K, tau, theta, t):
    # if t < theta: return 0
    # else: return K * (1 - math.exp(-(t - theta) / float(tau)))
    # Round to 4 decimal places with round(value, 4)
    # Note: use float() to avoid integer division in Jython 2.7

    # TODO: implement

    return 0

solution = fopdt`,
    tests: [
      { description: 'fopdt(2.0, 10, 3, 3) === 0 (at dead time boundary)' },
      { description: 'fopdt(2.0, 10, 3, 2) === 0 (inside dead time)' },
      { description: 'fopdt(2.0, 10, 3, 13) ≈ 1.2642 (one time constant after dead time)' },
      { description: 'fopdt(1.0, 5, 0, 5) ≈ 0.6321 (63.2% of gain at t=tau)' },
    ],
    testRunner: function (solution) {
      function r4(v) { return Math.round(v * 10000) / 10000 }
      const cases = [
        { input: [2.0, 10, 3,  3],  expected: 0 },
        { input: [2.0, 10, 3,  2],  expected: 0 },
        { input: [2.0, 10, 3,  13], expected: r4(2.0 * (1 - Math.exp(-1))) },
        { input: [1.0,  5, 0,   5], expected: r4(1.0 * (1 - Math.exp(-1))) },
      ]
      return cases.map(c => {
        try {
          const actual = r4(solution(...c.input))
          return { passed: actual === c.expected, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 6: Cascade & Advanced Control ─────────────────────────────────────
  cascade: {
    id: 'pid-ch6-ex',
    title: 'Validate a Cascade Configuration',
    scenario: `In a cascade control loop, the secondary (inner) loop must respond significantly faster than the primary (outer) loop. A common rule of thumb is:
  secondary response time × 3 ≤ primary response time

Given two loop descriptor objects:
  { name: string, responseTime: number }   (responseTime in seconds)

Where the first argument is the primary loop and the second is the secondary loop, return:
  { valid: boolean, reason: string }

Validation rules:
  • If secondary.responseTime × 3 > primary.responseTime → invalid (secondary too slow)
  • If secondary.responseTime <= 0 or primary.responseTime <= 0 → invalid (bad data)
  • Otherwise → valid`,
    hint: `Check for zero/negative first, then apply the 3× rule. Write a clear reason string for each failure mode.`,
    starter: `function isValidCascade(primary, secondary) {
  // primary = { name, responseTime }
  // secondary = { name, responseTime }
  //
  // Rule 1: responseTime must be > 0 for both loops
  // Rule 2: secondary.responseTime * 3 must be <= primary.responseTime
  //         (secondary must be at least 3x faster than primary)
  //
  // Return { valid: boolean, reason: string }

  // TODO: Step 1 — check for invalid (zero/negative) response times
  // TODO: Step 2 — apply the 3x timing rule
  // TODO: Step 3 — if both pass, return valid with a reason

  return { valid: false, reason: '' }; // replace with real result
}
const solution = isValidCascade;

console.log(isValidCascade({ name: 'Temperature', responseTime: 60 }, { name: 'Flow', responseTime: 5 }));
// { valid: true, ... }  — 5*3=15 <= 60 ✓
console.log(isValidCascade({ name: 'Temperature', responseTime: 20 }, { name: 'Flow', responseTime: 10 }));
// { valid: false, ... } — 10*3=30 > 20 ✗`,
    starterPy: `def is_valid_cascade(primary, secondary):
    # primary = {'name': str, 'responseTime': float}
    # secondary = {'name': str, 'responseTime': float}
    # Rule: secondary['responseTime'] * 3 <= primary['responseTime']
    # Return {'valid': bool, 'reason': str}

    # TODO: implement

    return {'valid': False, 'reason': ''}

solution = is_valid_cascade`,
    starterJython: `def is_valid_cascade(primary, secondary):
    # primary = {'name': str, 'responseTime': float}
    # secondary = {'name': str, 'responseTime': float}
    # Rule: secondary['responseTime'] * 3 <= primary['responseTime']
    # Return {'valid': bool, 'reason': str}

    # TODO: implement

    return {'valid': False, 'reason': ''}

solution = is_valid_cascade`,
    tests: [
      { description: 'valid cascade: secondary (5s) × 3 = 15s ≤ primary (60s)' },
      { description: 'invalid: secondary (10s) × 3 = 30s > primary (20s)' },
      { description: 'invalid: responseTime of 0 is bad data' },
      { description: 'valid cascade: secondary (2s) × 3 = 6s ≤ primary (30s)' },
    ],
    testRunner: function (solution) {
      const cases = [
        {
          input: [{ name: 'Temp', responseTime: 60 }, { name: 'Flow', responseTime: 5 }],
          expectedValid: true,
        },
        {
          input: [{ name: 'Temp', responseTime: 20 }, { name: 'Flow', responseTime: 10 }],
          expectedValid: false,
        },
        {
          input: [{ name: 'Level', responseTime: 0 }, { name: 'Flow', responseTime: 5 }],
          expectedValid: false,
        },
        {
          input: [{ name: 'Pressure', responseTime: 30 }, { name: 'Flow', responseTime: 2 }],
          expectedValid: true,
        },
      ]
      return cases.map(c => {
        try {
          const actual = solution(...c.input)
          const passed = typeof actual?.valid === 'boolean' &&
            actual.valid === c.expectedValid &&
            typeof actual?.reason === 'string' &&
            actual.reason.length > 0
          return { passed, expected: { valid: c.expectedValid, reason: '(non-empty string)' }, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 7: Digital PID ─────────────────────────────────────────────────────
  digital: {
    id: 'pid-ch7-ex',
    title: 'Position Algorithm Calculation',
    scenario: `The position algorithm computes the absolute controller output at each scan. Given one scan's data, compute the new output:

  error = sp - pv
  integral = prevIntegral + error × dt
  derivative = (error - prevError) / dt
  output = Kp × error + Ki × integral + Kd × derivative

Then clamp output to [0, 100].

Parameters: Kp, Ki, Kd, sp, pv, dt (scan interval in seconds), prevIntegral, prevError

Return: { output, integral, lastError }
  • output    — clamped to [0, 100], rounded to 4 decimal places
  • integral  — updated integral accumulator (not clamped), rounded to 4 decimal places
  • lastError — current error (so next scan can use it as prevError)`,
    hint: `Calculate error, then integral, then derivative using the formulas above. Clamp output with Math.min(100, Math.max(0, rawOutput)).`,
    starter: `function positionAlgorithm(Kp, Ki, Kd, sp, pv, dt, prevIntegral, prevError) {
  // Step 1: error = sp - pv
  // Step 2: integral = prevIntegral + error * dt
  // Step 3: derivative = (error - prevError) / dt
  // Step 4: output = Kp * error + Ki * integral + Kd * derivative
  // Step 5: clamp output to [0, 100]
  // Step 6: round output and integral to 4 decimal places
  // Return { output, integral, lastError: error }

  // TODO: implement all steps

  return { output: 0, integral: 0, lastError: 0 }; // replace with real values
}
const solution = positionAlgorithm;

console.log(positionAlgorithm(1.0, 0.1, 0.05, 100, 90, 1.0, 0, 0));
// error=10, integral=10, deriv=10 → output = 10 + 1 + 0.5 = 11.5`,
    starterPy: `def position_algorithm(Kp, Ki, Kd, sp, pv, dt, prev_integral, prev_error):
    # Step 1: error = sp - pv
    # Step 2: integral = prev_integral + error * dt
    # Step 3: derivative = (error - prev_error) / dt
    # Step 4: output = Kp * error + Ki * integral + Kd * derivative
    # Step 5: clamp output to [0, 100]
    # Step 6: round output and integral to 4 decimal places
    # Return {'output': ..., 'integral': ..., 'lastError': error}

    # TODO: implement

    return {'output': 0, 'integral': 0, 'lastError': 0}

solution = position_algorithm`,
    starterJython: `def position_algorithm(Kp, Ki, Kd, sp, pv, dt, prev_integral, prev_error):
    # Same formula as Python version
    # In Jython 2.7: use float() if any values might be integers to avoid truncation
    # Step 1: error = sp - pv
    # Step 2: integral = prev_integral + error * dt
    # Step 3: derivative = (error - prev_error) / float(dt)
    # Step 4–5: compute and clamp output
    # Return {'output': ..., 'integral': ..., 'lastError': error}

    # TODO: implement

    return {'output': 0, 'integral': 0, 'lastError': 0}

solution = position_algorithm`,
    tests: [
      { description: 'positionAlgorithm(1.0, 0.1, 0.05, 100, 90, 1.0, 0, 0) → output 11.5' },
      { description: 'output is clamped to max 100 when raw calculation exceeds 100' },
      { description: 'output is clamped to min 0 when raw calculation is negative' },
      { description: 'lastError equals current error (sp - pv)' },
    ],
    testRunner: function (solution) {
      function r4(v) { return Math.round(v * 10000) / 10000 }
      const cases = [
        {
          input: [1.0, 0.1, 0.05, 100, 90, 1.0, 0, 0],
          check: r => r && r4(r.output) === 11.5 && r.lastError === 10,
          desc: 'output=11.5, lastError=10',
        },
        {
          // Large error → output should clamp at 100
          input: [5.0, 1.0, 0.5, 100, 0, 1.0, 0, 0],
          check: r => r && r.output === 100,
          desc: 'output clamped to 100',
        },
        {
          // PV above SP, negative output → clamp at 0
          input: [1.0, 0.1, 0.0, 50, 100, 1.0, 0, 0],
          check: r => r && r.output === 0,
          desc: 'output clamped to 0',
        },
        {
          // lastError check
          input: [1.0, 0.0, 0.0, 75, 70, 1.0, 0, 0],
          check: r => r && r.lastError === 5,
          desc: 'lastError === sp - pv = 5',
        },
      ]
      return cases.map(c => {
        try {
          const actual = solution(...c.input)
          const passed = c.check(actual)
          return { passed, expected: c.desc, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 8: PID in PLCs & SCADA ─────────────────────────────────────────────
  plc: {
    id: 'pid-ch8-ex',
    title: 'Parse a DCS Faceplate Object',
    scenario: `DCS and SCADA faceplates expose loop data as structured objects. Parse the following faceplate data format and extract the key fields:

Input object fields (may have different casing or aliases):
  • Mode: 'AUTO'|'MAN'|'CAS' (also may appear as 'mode', 'MODE', 'CtrlMode')
  • SP (setpoint): number (also 'sp', 'Setpoint', 'SetPt')
  • PV (process variable): number (also 'pv', 'ProcessVar', 'Input')
  • OUT (output %): number (also 'out', 'Output', 'CO')

Return: { mode, sp, pv, output }

If a field is not found, use null for that field.`,
    hint: `Check multiple possible key names for each field. Try them in order using the nullish coalescing operator (??) or a helper that checks each alias.`,
    starter: `function parseFaceplate(faceplate) {
  // Extract: mode, sp, pv, output
  // Each field may appear under several aliases — check all of them.
  //
  // mode aliases:   'mode', 'Mode', 'MODE', 'CtrlMode'
  // sp aliases:     'sp', 'SP', 'Setpoint', 'SetPt'
  // pv aliases:     'pv', 'PV', 'ProcessVar', 'Input'
  // output aliases: 'out', 'OUT', 'Output', 'CO'
  //
  // If not found, use null.
  //
  // TODO: implement extraction using alias lookups

  const mode   = null; // TODO: check mode aliases
  const sp     = null; // TODO: check sp aliases
  const pv     = null; // TODO: check pv aliases
  const output = null; // TODO: check output aliases

  return { mode, sp, pv, output };
}
const solution = parseFaceplate;

console.log(parseFaceplate({ MODE: 'AUTO', SP: 100, PV: 98.5, CO: 55.2 }));
// { mode: 'AUTO', sp: 100, pv: 98.5, output: 55.2 }`,
    starterPy: `def parse_faceplate(faceplate):
    # Extract mode, sp, pv, output from a faceplate dict with multiple possible key aliases
    # mode:   'mode', 'Mode', 'MODE', 'CtrlMode'
    # sp:     'sp', 'SP', 'Setpoint', 'SetPt'
    # pv:     'pv', 'PV', 'ProcessVar', 'Input'
    # output: 'out', 'OUT', 'Output', 'CO'
    # Use None if not found.

    def get_first(keys):
        for k in keys:
            if k in faceplate:
                return faceplate[k]
        return None

    # TODO: use get_first() for each field

    return {'mode': None, 'sp': None, 'pv': None, 'output': None}

solution = parse_faceplate`,
    starterJython: `def parse_faceplate(faceplate):
    # Same as Python version — multiple alias keys per field
    # mode, sp, pv, output — use None if missing

    def get_first(keys):
        for k in keys:
            if k in faceplate:
                return faceplate[k]
        return None

    # TODO: call get_first with alias lists for each field

    return {'mode': None, 'sp': None, 'pv': None, 'output': None}

solution = parse_faceplate`,
    tests: [
      { description: "parseFaceplate({ MODE: 'AUTO', SP: 100, PV: 98.5, CO: 55.2 }) extracts all fields" },
      { description: "parseFaceplate({ CtrlMode: 'MAN', Setpoint: 75, Input: 74, Output: 48 }) works with alternate aliases" },
      { description: "parseFaceplate({ mode: 'CAS', sp: 50, pv: 50, out: 60 }) works with lowercase aliases" },
      { description: "parseFaceplate({}) returns { mode: null, sp: null, pv: null, output: null }" },
    ],
    testRunner: function (solution) {
      const cases = [
        {
          input: { MODE: 'AUTO', SP: 100, PV: 98.5, CO: 55.2 },
          expected: { mode: 'AUTO', sp: 100, pv: 98.5, output: 55.2 },
        },
        {
          input: { CtrlMode: 'MAN', Setpoint: 75, Input: 74, Output: 48 },
          expected: { mode: 'MAN', sp: 75, pv: 74, output: 48 },
        },
        {
          input: { mode: 'CAS', sp: 50, pv: 50, out: 60 },
          expected: { mode: 'CAS', sp: 50, pv: 50, output: 60 },
        },
        {
          input: {},
          expected: { mode: null, sp: null, pv: null, output: null },
        },
      ]
      return cases.map(c => {
        try {
          const actual = solution(c.input)
          const passed = actual &&
            actual.mode   === c.expected.mode &&
            actual.sp     === c.expected.sp &&
            actual.pv     === c.expected.pv &&
            actual.output === c.expected.output
          return { passed: !!passed, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },

  // ─── Ch 9: Troubleshooting ─────────────────────────────────────────────────
  troubleshoot: {
    id: 'pid-ch9-ex',
    title: 'Diagnose a PID Loop Symptom',
    scenario: `Given an array of observed symptoms, return the most likely diagnosis for the loop problem:
  • 'oscillation' — loop is hunting/cycling, not settling
  • 'windup'      — output saturated (stuck at 0% or 100%), PV far from SP even when disturbance clears
  • 'offset'      — steady-state error remains; PV never quite reaches SP
  • 'sluggish'    — loop responds very slowly, long settling time, doesn't recover quickly

Symptom → diagnosis rules:
  • 'output_saturated'     → 'windup'
  • 'cycling' or 'hunting' → 'oscillation'
  • 'steady_state_error'   → 'offset'
  • 'slow_response'        → 'sluggish'
  • 'overshoot'            → 'oscillation'
  • 'long_settling_time'   → 'sluggish'

Return the first match found in the symptom array (symptoms are listed in priority order).
Return 'unknown' if no symptom matches.`,
    hint: `Build a symptom-to-diagnosis map, then iterate through the symptoms array and return the first match. Use a for loop or Array.find().`,
    starter: `function diagnoseLoop(symptoms) {
  // symptoms is an array of strings like ['cycling', 'overshoot']
  // Return the first matching diagnosis, or 'unknown'
  //
  // Symptom map:
  //   output_saturated   → 'windup'
  //   cycling            → 'oscillation'
  //   hunting            → 'oscillation'
  //   steady_state_error → 'offset'
  //   slow_response      → 'sluggish'
  //   overshoot          → 'oscillation'
  //   long_settling_time → 'sluggish'

  // TODO: Step 1 — build a lookup object (symptom → diagnosis)
  // TODO: Step 2 — iterate through symptoms and return the first match
  // TODO: Step 3 — return 'unknown' if none matched

  return 'unknown'; // replace with real logic
}
const solution = diagnoseLoop;

console.log(diagnoseLoop(['cycling', 'overshoot']));      // 'oscillation'
console.log(diagnoseLoop(['output_saturated']));           // 'windup'
console.log(diagnoseLoop(['steady_state_error']));         // 'offset'
console.log(diagnoseLoop(['long_settling_time']));         // 'sluggish'`,
    starterPy: `def diagnose_loop(symptoms):
    # Map symptoms to diagnoses, return first match or 'unknown'
    # output_saturated -> 'windup'
    # cycling, hunting, overshoot -> 'oscillation'
    # steady_state_error -> 'offset'
    # slow_response, long_settling_time -> 'sluggish'

    # TODO: build symptom map and return first match

    return 'unknown'

solution = diagnose_loop`,
    starterJython: `def diagnose_loop(symptoms):
    # Map symptoms to diagnoses, return first match or 'unknown'
    # output_saturated -> 'windup'
    # cycling, hunting, overshoot -> 'oscillation'
    # steady_state_error -> 'offset'
    # slow_response, long_settling_time -> 'sluggish'

    # TODO: build symptom map and return first match

    return 'unknown'

solution = diagnose_loop`,
    tests: [
      { description: "diagnoseLoop(['cycling', 'overshoot']) === 'oscillation'" },
      { description: "diagnoseLoop(['output_saturated']) === 'windup'" },
      { description: "diagnoseLoop(['steady_state_error']) === 'offset'" },
      { description: "diagnoseLoop(['long_settling_time', 'slow_response']) === 'sluggish'" },
    ],
    testRunner: function (solution) {
      const cases = [
        { input: [['cycling', 'overshoot']],        expected: 'oscillation' },
        { input: [['output_saturated']],             expected: 'windup' },
        { input: [['steady_state_error']],           expected: 'offset' },
        { input: [['long_settling_time', 'slow_response']], expected: 'sluggish' },
      ]
      return cases.map(c => {
        try {
          const actual = solution(...c.input)
          return { passed: actual === c.expected, expected: c.expected, actual }
        } catch (e) {
          return { passed: false, error: e.message }
        }
      })
    },
  },
}
