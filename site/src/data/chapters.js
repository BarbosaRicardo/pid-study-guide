export const CHAPTERS = [
  { id: 'intro', label: 'Ch 1: Closed-Loop Control', title: 'What Is Closed-Loop Control?', path: '/', icon: 'BookOpen', next: 'loop' },
  { id: 'loop', label: 'Ch 2: Loop Fundamentals', title: 'Control Loop Fundamentals', path: '/loop', icon: 'Settings', prev: 'intro', next: 'pid' },
  { id: 'pid', label: 'Ch 3: P, I, and D Action', title: 'P, I, and D — What Each Does', path: '/pid', icon: 'BarChart2', prev: 'loop', next: 'tuning' },
  { id: 'tuning', label: 'Ch 4: Tuning Methods', title: 'Tuning Methods', path: '/tuning', icon: 'Sliders', prev: 'pid', next: 'process' },
  { id: 'process', label: 'Ch 5: Process Dynamics', title: 'Process Dynamics', path: '/process', icon: 'TrendingUp', prev: 'tuning', next: 'cascade' },
  { id: 'cascade', label: 'Ch 6: Cascade & Advanced', title: 'Cascade & Advanced Control', path: '/cascade', icon: 'Layers', prev: 'process', next: 'digital' },
  { id: 'digital', label: 'Ch 7: Digital PID', title: 'Digital PID Implementation', path: '/digital', icon: 'Cpu', prev: 'cascade', next: 'plc' },
  { id: 'plc', label: 'Ch 8: PID in PLCs & SCADA', title: 'PID in PLCs & SCADA', path: '/plc', icon: 'Monitor', prev: 'digital', next: 'troubleshoot' },
  { id: 'troubleshoot', label: 'Ch 9: Troubleshooting', title: 'Troubleshooting Control Loops', path: '/troubleshoot', icon: 'Wrench', prev: 'plc', next: 'lab' },
  { id: 'lab', label: 'Ch 10: Simulation Lab', title: 'Simulation Lab', path: '/lab', icon: 'FlaskConical', prev: 'troubleshoot' },
  { id: 'flashcards', label: 'Flashcards', icon: 'CreditCard', path: '/flashcards' },
]

export const ANALOGIES = {
  intro: { text: "Open-loop control is like sending a text and never checking if it was delivered — technically you did your part.", author: "Every burned process engineer" },
  loop: { text: "PV chasing SP is like trying to park in a spot while someone keeps moving the cone. The error never fully goes to zero, but you keep trying.", author: "Control theory, summarized" },
  pid: { text: "P is your reflexes. I is your grudges. D is your anxiety. Together they control your shower temperature.", author: "Every controls textbook, unofficially" },
  tuning: { text: "Ziegler-Nichols tuning is like calibrating a guitar by making it oscillate violently and working backwards. It works. Nobody is comfortable watching it.", author: "Field engineers everywhere" },
  process: { text: "Dead time is the arch-enemy of control. It's the lag between when you turn the shower knob and when the water temperature changes. You can't control what hasn't happened yet.", author: "Process dynamics, chapter 1" },
  cascade: { text: "Cascade control is like having a manager who sets goals, and a worker who actually hits them. The manager doesn't care how — just that the result matches the target.", author: "Inner loop, outer loop" },
  digital: { text: "Discrete-time PID is continuous PID with commitment issues — it only looks at the error every T seconds, then pretends nothing happened in between.", author: "Z-transform, probably" },
  plc: { text: "The PLC PID block is 40 years of painful field experience compressed into one function block with 23 parameters nobody reads until something oscillates.", author: "Every commissioning engineer" },
  troubleshoot: { text: "If the loop is oscillating, your gain is too high. If it's sluggish, too low. If it's both, check if someone switched it to manual and forgot.", author: "Troubleshooting flowchart, step 1" },
  lab: { text: "Simulating a process is like practicing surgery on a mannequin — better than nothing, but the mannequin never develops an unexpected fever.", author: "Process simulation disclaimer" },
}

export const FUN_FACTS = [
  { text: "The first industrial PID controller was pneumatic — a mechanical device using air pressure to implement proportional, integral, and derivative action. Engineers tuned it with a screwdriver. It worked better than most modern auto-tuners.", icon: "Wind" },
  { text: "Ziegler and Nichols published their tuning rules in 1942. They're still used — unchanged — on process loops today. In an industry that deprecates everything, 80-year-old math is still considered state of the art.", icon: "Ruler" },
  { text: "The PID algorithm is so ubiquitous that some estimates put 95% of all industrial control loops running some variant of it. The other 5% are either model predictive control or a guy in manual mode who forgot to switch back.", icon: "Factory" },
  { text: "Derivative action on error — not PV — causes 'derivative kick': every time an operator changes the setpoint, the controller output spikes violently. Most modern controllers default to D-on-PV for this reason. Most legacy systems don't.", icon: "Zap" },
  { text: "Integral windup has destroyed more batch processes than any other single software issue. When the output is saturated and can't fix the error, the integral term just keeps accumulating — until the output finally does something, and it overcorrects catastrophically.", icon: "AlertTriangle" },
  { text: "Dead time is defined as the time between a change in manipulated variable and the first measurable response in the process variable. For a pipeline transporting product 3 miles, dead time might be 20 minutes. Good luck tuning that loop.", icon: "Clock" },
  { text: "The word 'hunting' in process control refers to a loop that oscillates continuously around setpoint. The origin is from early steam engine governors, where the flyball weights would 'hunt' for equilibrium. The hunting was so bad on some engines it shook them apart.", icon: "Target" },
  { text: "In the 1980s, Texas Instruments sold a PID instruction for their 520 PLC series. The documentation was so sparse that field engineers developed their own undocumented 'tribal knowledge' about tuning it — passed down orally at industry conferences.", icon: "BookOpen" },
  { text: "Lambda tuning (IMC-based) was developed specifically to give engineers a tuning target they could understand: 'How fast do you want the loop to respond?' The lambda parameter is literally the desired closed-loop time constant. Deceptively simple. Surprisingly robust.", icon: "Activity" },
  { text: "A single PID loop on a refinery distillation column can control hundreds of thousands of dollars of product throughput per hour. The tuning constants are often locked by password — not because of cybersecurity, but because someone will inevitably 'improve' them.", icon: "Database" },
  { text: "On/Off control is technically a special case of proportional control with infinite gain. When error > 0: full output. When error < 0: zero output. Simple, effective, and the reason your home thermostat clicks on and off instead of running at 47% power.", icon: "ArrowLeftRight" },
  { text: "The 'offset' produced by proportional-only control is a physical inevitability, not a software bug. You cannot have a non-zero steady-state error with a P-only controller and still maintain stability — unless you add integral action. This is why I exists.", icon: "Ruler" },
]
