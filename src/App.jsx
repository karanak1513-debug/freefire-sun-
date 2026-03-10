import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import Leaderboard from './pages/Leaderboard';
import TournamentDetails from './pages/TournamentDetails';
import MatchRoom from './pages/MatchRoom';
import AdminPanel from './pages/AdminPanel';
import AdminTutorial from './pages/AdminTutorial';
import HowToPlay from './pages/HowToPlay';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/tournament/:id" element={<TournamentDetails />} />
            <Route path="/match-room/:id" element={<MatchRoom />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/tutorial" element={<AdminTutorial />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            {/* Other routes will be added here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
