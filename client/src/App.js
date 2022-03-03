import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


//components:
import NavBar from './components/NavBar';
import Footer from './components/Footer';

//pages:
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>} />
      </Routes>
     <Footer />
    </div>
    </Router>
  );
}

export default App;
