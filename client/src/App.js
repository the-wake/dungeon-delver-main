import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//components:
import NavBar from './components/NavBar';
import Footer from './components/Footer';

//pages:
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Campaign from './pages/Campaign';
import Dungeon from './pages/Dungeon';
import Creatures from './pages/Creatures';


function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/landingpage" element={<LandingPage/>} />
        <Route path="/campaigns" element={<Campaign/>} />
        <Route path="/dungeons" element={<Dungeon/>} />
        <Route path="/creatures" element={<Creatures/>} />
      </Routes>
     <Footer />
    </div>
    </Router>
  );
}

export default App;
