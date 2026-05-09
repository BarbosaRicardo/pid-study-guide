const yt = (q, title) => ({ type: 'youtube', title, searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}` })
const doc = (title, url) => ({ type: 'doc', title, url })
const book = (title, author, chapter, page) => ({ type: 'book', title, author, chapter, page })
const oppenheim = (ch, pg) => book('Signals and Systems', 'Oppenheim & Willsky', ch, pg)
const tanenbaum = (ch, pg) => book('Modern Operating Systems', 'Tanenbaum, 4th ed.', ch, pg)

export const DEEP_DIVE = {
  intro: {
    level1: [
      yt('closed loop control system explained feedback', 'Closed-Loop Control Systems Explained'),
      yt('open loop vs closed loop control difference', 'Open-Loop vs Closed-Loop: When Feedback Matters'),
      doc('Control Guru — Free Process Control Tutorials', 'https://controlguru.com'),
    ],
    level2: [
      yt('feedback control system stability Bode plot', 'Feedback Stability — Bode Plots and Gain Margin'),
      oppenheim('Chapter 1: Introduction to Signals and Systems', '1'),
    ],
  },
  loop: {
    level1: [
      yt('PID control loop setpoint process variable error explained', 'Control Loop Variables: SP, PV, Error, CO Explained'),
      yt('block diagram feedback control system tutorial', 'Block Diagram of a Feedback Control System'),
      doc('Control Guru — The Feedback Control Loop', 'https://controlguru.com/the-feedback-control-loop/'),
    ],
    level2: [
      yt('transfer function Laplace transform control systems', 'Transfer Functions and Laplace Transform in Control'),
      oppenheim('Chapter 9: The Laplace Transform', '654'),
    ],
  },
  pid: {
    level1: [
      yt('PID controller explained proportional integral derivative intuition', 'PID Controller — Intuitive Explanation of P, I, D'),
      yt('PID controller proportional band reset rate derivative action', 'Proportional, Integral, Derivative Action Explained'),
      doc('NI — PID Theory Explained', 'https://www.ni.com/en/shop/labview/pid-theory-explained.html'),
    ],
    level2: [
      yt('PID controller steady state error offset integral windup', 'Integral Windup — Causes and Anti-Windup Solutions'),
      yt('derivative kick PID filter derivative on measurement', 'Derivative Kick — Why D Acts on PV, Not Error'),
      oppenheim('Chapter 11: Linear Feedback Systems', '790'),
    ],
  },
  tuning: {
    level1: [
      yt('Ziegler Nichols tuning method PID step by step', 'Ziegler-Nichols PID Tuning — Step by Step'),
      yt('PID tuning open loop process reaction curve method', 'Open-Loop Step Test & Process Reaction Curve'),
      doc('Control Guru — Tuning Methods Overview', 'https://controlguru.com/table-of-contents/'),
    ],
    level2: [
      yt('Lambda IMC tuning method PID robust', 'Lambda (IMC) PID Tuning — Robust and Reliable'),
      yt('Cohen Coon PID tuning dead time dominant process', 'Cohen-Coon Tuning for Dead-Time Dominant Processes'),
      oppenheim('Chapter 11: Feedback and Control Systems', '800'),
    ],
  },
  process: {
    level1: [
      yt('first order process dynamics time constant dead time explained', 'First-Order Process Dynamics — Time Constant and Dead Time'),
      yt('self regulating vs integrating process control', 'Self-Regulating vs Integrating Processes'),
      doc('Control Guru — Process Dynamics', 'https://controlguru.com/process-dynamics-and-the-first-order-plus-dead-time-model/'),
    ],
    level2: [
      yt('second order process underdamped overdamped critically damped control', 'Second-Order Process Dynamics — Damping and Oscillation'),
      oppenheim('Chapter 9: Laplace Transform — System Poles and Response', '680'),
    ],
  },
  cascade: {
    level1: [
      yt('cascade control loop explained inner outer primary secondary', 'Cascade Control — Inner and Outer Loop Explained'),
      yt('cascade control heat exchanger flow temperature example', 'Cascade Control Example: Heat Exchanger'),
    ],
    level2: [
      yt('feedforward control disturbance rejection combined PID', 'Feedforward + Feedback Control — Disturbance Rejection'),
      yt('ratio control blending process SCADA', 'Ratio Control for Blending Processes'),
    ],
  },
  digital: {
    level1: [
      yt('digital PID algorithm position velocity form discrete time', 'Digital PID — Position vs Velocity Algorithm'),
      yt('PID sampling period scan time effect control performance', 'Sampling Period Effects on Digital PID Performance'),
      tanenbaum('Chapter 2: Real-Time Systems and Scheduling', '95'),
    ],
    level2: [
      yt('anti windup digital PID clamping back calculation', 'Anti-Windup for Digital PID — Clamping vs Back-Calculation'),
      yt('Tustin bilinear transform discretization PID', 'Tustin Discretization of Continuous PID'),
      tanenbaum('Chapter 2: Timer Interrupts and Periodic Tasks', '110'),
    ],
  },
  plc: {
    level1: [
      yt('PID function block PLC Allen Bradley Studio 5000 Logix', 'PID Block in Allen-Bradley Studio 5000'),
      yt('IEC 61131-3 PID CTRL_PID function block tutorial', 'IEC 61131-3 CTRL_PID Function Block'),
    ],
    level2: [
      yt('bumpless transfer PID manual auto mode SCADA HMI', 'Bumpless Transfer — Manual to Auto Mode in PLC PID'),
      yt('SCADA HMI PID faceplate operator interface setpoint', 'SCADA PID Faceplate — Operator Interface Design'),
    ],
  },
  troubleshoot: {
    level1: [
      yt('PID loop troubleshooting oscillation sluggish offset hunting', 'PID Troubleshooting — Oscillation, Offset, and Sluggish Response'),
      yt('control valve stiction limit cycling PID loop', 'Valve Stiction and Limit Cycling in Control Loops'),
      doc('Control Guru — Troubleshooting PID', 'https://controlguru.com/troubleshooting-pid/'),
    ],
    level2: [
      yt('integral windup symptoms troubleshoot PID', 'Integral Windup — Symptoms and Fixes'),
      yt('derivative noise filter PID control loop problem', 'Derivative Noise — When D Action Makes Things Worse'),
    ],
  },
  lab: {
    level1: [
      yt('MATLAB Simulink PID controller simulation tutorial', 'MATLAB/Simulink PID Simulation Tutorial'),
      yt('Python control library PID simulation scipy', 'Python Control Library — PID Simulation'),
      doc('Control Guru — Online Simulators', 'https://controlguru.com'),
    ],
    level2: [
      yt('CADSIM Plus free process simulator PID tuning', 'CADSIM Plus — Free Process Simulator for PID Tuning'),
      yt('Excel PID simulation spreadsheet control loop', 'PID Simulation in Excel — Build Your Own Control Loop'),
    ],
  },
}
