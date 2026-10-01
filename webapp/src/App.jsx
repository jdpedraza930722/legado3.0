import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import InvitationFlow from './pages/InvitationFlow';
import ScannerPage from './pages/ScannerPage';
import VoiceAI from './pages/VoiceAI';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-gray-200">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<InvitationFlow />} />
            <Route path="/scanner" element={<ScannerPage />} />
            <Route path="/ia" element={<VoiceAI />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
