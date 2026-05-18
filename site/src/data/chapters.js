export const CHAPTERS = [
  { id: 'home',  label: 'Home',                        icon: 'Home',     path: '/' },
  { id: 'intro', label: 'Ch 1: Closed-Loop Control', title: 'What Is Closed-Loop Control?', path: '/intro', icon: 'BookOpen', next: 'loop' },
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

export const FIELD_STORIES = [
  {
    title: "The Integral That Wound Up for Days",
    icon: "AlertTriangle",
    story: "A chemical reactor temperature loop ran in AUTO mode during normal operation. During a planned maintenance window, operators switched to MANUAL — but left the controller in AUTO with the output clamped by a manual valve. The integral term kept accumulating error for 72 hours. When the manual valve reopened, the controller output jumped to 100% instantly. The reactor overheated within minutes. The vessel had to be purged. The fix: implement anti-windup that disables integral accumulation when the output is saturated. Standard feature on modern controllers. This one was a custom implementation from 1997 that didn't have it."
  },
  {
    title: "The Derivative Kick on Setpoint Change",
    icon: "AlertOctagon",
    story: "A flow controller used ideal PID — D action applied to the full error signal including setpoint changes. An operator increased the setpoint by 15% in a single step. The derivative term saw a massive instantaneous error change and drove the output to 100% for two scan cycles. The downstream valve slammed open. A water hammer event cracked a pipe fitting. Total damage: 4 hours of production loss and a $3,200 fitting replacement. The fix: switch to derivative on process variable only (D-on-PV), which eliminates setpoint kicks entirely. This is now the default in most PLC PID function blocks — for exactly this reason."
  },
  {
    title: "The Gain That Worked at 60°C and Failed at 90°C",
    icon: "Ghost",
    story: "A heat exchanger loop was tuned at normal operating temperature. The process worked perfectly for months. When the plant ran a high-temperature batch at 90°C, the same tuning caused sustained oscillation — product had to be scrapped. The process gain had changed: the heat exchanger transferred heat differently at elevated temperatures. The PID gains tuned at 60°C were aggressive at 90°C. The solution: a gain-scheduled controller with two tuning sets — one for below 75°C, one above. The lesson: tuning at one operating point does not guarantee stability at all operating points."
  },
  {
    title: "The Feedforward That Fed Forward the Wrong Way",
    icon: "AlertTriangle",
    story: "A boiler steam pressure loop had feedforward compensation for load changes. The feedforward gain was entered as negative instead of positive — a sign error. When load increased (which should have increased fuel), the feedforward reduced fuel. The feedback loop eventually corrected, but with a 90-second lag during which pressure dropped below minimum. An operator noticed the response was slow and increased the proportional gain to compensate. The combination of wrong feedforward and high gain caused the loop to oscillate. The sign error had been present since commissioning — it just hadn't caused enough of a problem to investigate until load swings became larger."
  },
  {
    title: "The Dead Time That Made Everything Worse",
    icon: "Archive",
    story: "A pH neutralization loop used aggressive integral tuning. In lab testing with the analyzer 1 meter from the mixing point, it worked fine. In the field, the analyzer was 40 meters of pipe away — adding 8 minutes of dead time at normal flow rates. The integral action kept driving the output during that 8 minutes, then the correction arrived all at once. The pH swung from 4 to 11. Effluent went out of spec. The loop had to be switched to manual. A process engineer recalculated the dead time, reduced integral gain by a factor of 20, and added a first-order lag filter on the measurement. The loop became stable in 90 minutes."
  },
]

export const CHAPTER_HOOKS = {
  intro:    "A temperature loop is running in open loop — no feedback. The heater is at 50% output. The temperature is steady at 180°C instead of the 200°C setpoint. In closed-loop control, how would the controller respond — and what could go wrong if the gain is set too high?",
  loop:     "Process Variable chases Setpoint. Error drives Output. Output affects PV. PV affects Error. This feedback loop is fundamental — but what happens when dead time breaks the chain?",
  pid:      "Proportional action gives you speed. Integral action eliminates steady-state error. Derivative action reduces overshoot. Pick any two: what do you give up by omitting the third?",
  tuning:   "Ziegler-Nichols tuning requires you to drive the loop into sustained oscillation on purpose. Would you do that on a live process? If not, what's your alternative?",
  process:  "Dead time is the single hardest process characteristic to compensate for. Why can't you simply increase integral gain to overcome it — and what happens when you try?",
  cascade:  "A cascade loop has an inner (secondary) controller and an outer (primary) controller. The inner loop is unstable. Does fixing the inner loop fix the outer loop? Does fixing the outer loop help the inner loop?",
  digital:  "Digital PID runs at a discrete sample interval T. If T is too large, what failure mode appears — and how does that compare to the failure mode when T is too small?",
  plc:      "A PLC PID function block has 23 parameters. In practice, which 5 do you configure for 90% of loops — and which ones can you leave at defaults safely?",
  troubleshoot: "A control loop is oscillating with a consistent period. Without touching any tuning parameters, what's the one measurement that tells you whether the problem is the controller or the process?",
  lab:      "Before you simulate a PID loop: what three process characteristics (not controller parameters) must you know to get a meaningful result?",
}

export const CHAPTER_RETRIEVAL = {
  intro:    { q: "What is the difference between open-loop and closed-loop control?", a: "Open-loop: no feedback, output set manually or by schedule. Closed-loop: measures actual output and corrects based on error." },
  loop:     { q: "What is 'dead time' in a control loop?", a: "The delay between when a control output changes and when the process variable begins to respond" },
  pid:      { q: "What does integral action do that proportional action cannot?", a: "Eliminates steady-state offset — integral accumulates error over time until the error reaches zero" },
  tuning:   { q: "In Ziegler-Nichols ultimate gain method, what is the 'ultimate gain' (Ku)?", a: "The proportional gain at which the loop sustains steady oscillation — used to calculate PID tuning parameters" },
  process:  { q: "What is process gain?", a: "The ratio of the change in process variable to the change in controller output — how sensitive the process is to control action" },
  cascade:  { q: "In cascade control, which loop must be tuned first — inner or outer?", a: "Inner (secondary) loop — it must be stable and fast before the outer loop can be tuned" },
  digital:  { q: "What happens to derivative action in a digital PID when the sample interval is too large?", a: "Derivative becomes ineffective or destabilizing — it amplifies noise and produces large, infrequent output spikes" },
  plc:      { q: "What is anti-windup in a PID controller?", a: "A mechanism that stops integral accumulation when the output is saturated — prevents the integral from winding up to large values during output limits" },
  troubleshoot: { q: "A control loop oscillates with a consistent period. What does a consistent period suggest about the cause?", a: "It suggests a gain-related instability (too high Kp or Ki) rather than a process disturbance or noise issue" },
  lab:      { q: "What is the transfer function of an ideal PID controller in the Laplace domain?", a: "G(s) = Kp(1 + 1/(Ti·s) + Td·s) — or equivalently Kp + Ki/s + Kd·s" },
}
