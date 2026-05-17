import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Intro from './pages/Intro'
import LoopFundamentals from './pages/LoopFundamentals'
import PIDAction from './pages/PIDAction'
import Tuning from './pages/Tuning'
import ProcessDynamics from './pages/ProcessDynamics'
import CascadeControl from './pages/CascadeControl'
import DigitalPID from './pages/DigitalPID'
import PLCImplementation from './pages/PLCImplementation'
import Troubleshoot from './pages/Troubleshoot'
import Lab from './pages/Lab'
import Flashcards from './pages/Flashcards'

export default function App() {
  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto pt-14 lg:pt-0">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/intro"         element={<Intro />} />
          <Route path="/loop"        element={<LoopFundamentals />} />
          <Route path="/pid"         element={<PIDAction />} />
          <Route path="/tuning"      element={<Tuning />} />
          <Route path="/process"     element={<ProcessDynamics />} />
          <Route path="/cascade"     element={<CascadeControl />} />
          <Route path="/digital"     element={<DigitalPID />} />
          <Route path="/plc"         element={<PLCImplementation />} />
          <Route path="/troubleshoot" element={<Troubleshoot />} />
          <Route path="/lab"         element={<Lab />} />
          <Route path="/flashcards"  element={<Flashcards />} />
        </Routes>
      </main>
    </div>
  )
}
